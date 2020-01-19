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
                        const exported = new File([blob], `${input.name}_${now}cmprssd.jpeg`, {
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
                    const toPost = res.data.presigned

                    let postData = new FormData()
                    for (const key in toPost.fields) {
                        postData.append(key, toPost.fields[key])
                    }
                    postData.append('file', file)

                    const proxyurl = "https://cors-anywhere.herokuapp.com/"
                    const s3Url = toPost.url.replace("s3.amazonaws", "s3.ap-east-1.amazonaws") // bruh
                    this.$axios.post(s3Url, postData)
                        .then(res => {
                            callback(res.headers.location || s3Url+"pblcly_rdable/"+file.name)
                        })
                })
        },
        batchCompressUpload(fileList, callback, index=0, sittingOnCloud=[]) {
            if (index+1 > fileList.length) {
                callback(sittingOnCloud)
            } else {
                this.compress(fileList[index], compressed => {
                    this.performUpload(compressed, uploadedUrl => {
                        sittingOnCloud.push(uploadedUrl)
                        this.batchCompressUpload(fileList, callback, index+1, sittingOnCloud)
                    })
                })
            }
        }
    },
})
