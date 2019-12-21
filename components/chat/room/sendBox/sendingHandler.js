import SendBox from './'
export const sendingHandler = {
    components: {SendBox},
    methods: {
        bottomShift(height) { // dynamic send box height
            const butt = this.$refs.sndBxLev
            butt.style["min-height"] = height
            if (this.atBottom) this.scroll2Bottom()
        },
        signalTyping() {
            try { this.$socket.send("tpng") }
            catch (error) {}
        },

        pseudoIdGenerator() {
            return this.$store.state.auth.my_profile.username + Date.now()
        },
        wsSend(pseudoId, msgType, msgContent) {
            try {
                this.$socket.sendObj({
                    c__id: pseudoId,
                    c__msg_type: msgType,
                    c__content: msgContent,
                })
            } catch (error) {
                console.error("CAUGHT ON WS SEND: "+error)
            }
        },
        toPreview(pseudoId, msgType, msgContent) {
            this.scroll2Bottom()
            this.fetchedData.unshift({ 
                author: this.$store.state.auth.my_profile,
                id: pseudoId,
                msg_type: msgType,
                content: msgContent,
                timestamp: "sndng",
            })
        },

        textOutBoxing(input) {
            function messageConstr(content) {
                function youtubeParser(url) { //https://stackoverflow.com/questions/3452546/how-do-i-get-the-youtube-video-id-from-a-url
                    const regExp = /.*(?:youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=)([^#\&\?]*).*/
                    const match = url.match(regExp)
                    return (match && !/\s/.test(url) && match[1].length==11) ? match[1] : false
                }
                const youTube = (youtubeParser(content))
                if (youTube) {
                    return [3, youTube]                    
                }
                return [1, content]
            }
            let message = messageConstr(input)
            message.unshift(this.pseudoIdGenerator())
            this.toPreview(...message)
            this.wsSend(...message)

            if (input == "test") {
                for (let index = 0; index < 100; index++) {
                    this.wsSend(index, 1, "test "+index)
                }
            }
        },
        emoteOutBoxing(emote) {
            const idNType = [this.pseudoIdGenerator(), 11]
            this.toPreview(...idNType, emote.img_src)
            this.wsSend(...idNType, emote.id)
        },
        imageOutBoxing(evt) {
            const files = evt.target.files
            const idNType = [this.pseudoIdGenerator(), 2]
            this.toPreview(...idNType, URL.createObjectURL(files[0]))

            this.batchCompressUpload(files, uploadedUrls => {
                console.log(uploadedUrls);
                
                this.wsSend(...idNType, uploadedUrls[0])
            })
        }
    },
}