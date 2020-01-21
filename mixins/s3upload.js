import Vue from "vue"

Vue.mixin({
    methods: {
        compress(input, callback) {
            if (['image/gif', 'image/png'].includes(input.type)) {
                if (input.size < 256 * 1024) { // 256kB
                    return callback(input)
                }
            }
            const maxW = 960
            const maxH = 960
            const reader = new FileReader()
            reader.onload = event => {
                const img = new Image()
                img.src = event.target.result
                img.onload = () => {
                    const scaleFactor = Math.min(maxW/img.width, maxH/img.height, 1)
                    const scaledW = img.width*scaleFactor
                    const scaledH = img.height*scaleFactor

                    const elem = document.createElement('canvas')
                    elem.width = scaledW
                    elem.height = scaledH

                    const ctx = elem.getContext('2d')
                    ctx.drawImage(img, 0, 0, scaledW, scaledH)
                    ctx.canvas.toBlob(blob => {
                        const now = Date.now()
                        const exported = new File([blob],
                            `${input.name.substr(0,8)}_${now}@bubblysocial.com.jpeg`, {
                            type: 'image/jpeg',
                            lastModified: now
                        })
                        callback(exported)
                    },
                        'image/jpeg',
                        0.69 // quality
                    )
                }
            }
            reader.readAsDataURL(input)
        },
        performUpload(file, callback) {
            this.$axios.get(`storage-layer/get-upload-url?file=${
                encodeURI(file.name)}&type=${file.type}`,
                this.$store.state.auth.head
            )
                .then(res => {
                    const toPost = res.data

                    let postData = new FormData()
                    for (const key in toPost.fields) {
                        postData.append(key, toPost.fields[key])
                    }
                    postData.append('Content-Type', file.type)
                    postData.append('Cache-Control', 'max-age=604800')
                    postData.append('file', file)
                    // const proxyurl = "https://cors-anywhere.herokuapp.com/"
                    const s3Url = toPost.url.replace("s3.amazonaws", "s3.ap-east-1.amazonaws") // bruh
                    this.$axios.post(s3Url, postData)
                        .then(res => {
                            callback(res.headers.location || s3Url+"pu/"+file.name)
                        })
                })
        },
        batchCompressUpload(fileList, callback) {
            let sittingOnCloud = []
            fileList.forEach((file, index) => {
                this.compress(file, compressed => {
                    this.performUpload(compressed, url => {
                        sittingOnCloud.push(url)
                        if (fileList.length == index+1) {
                            callback(sittingOnCloud)
                        }
                    })
                })
            })
        }
    },
})
