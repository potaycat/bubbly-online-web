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

        sendThourghWs(msg) {
            try {
                this.$socket.sendObj(msg)
            } catch (error) {
                console.error("CAUGHT: "+error)
            }
        },

        pseudoIdGenerator() {
            const present = new Date
            return present.getTime()
        },
        showImmediately(pseudoId, msg_type, msg_content) {
            this.fetchedData.unshift({ 
                author: this.$store.state.auth.my_profile,
                id: pseudoId,
                msg_type: msg_type,
                content: msg_content,
                timestamp: "sndng",
            })
        },

        outBoxing(input) {
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

            const message = messageConstr(input)
            const pseudoId = this.pseudoIdGenerator()
            this.sendThourghWs({
                c__id: pseudoId,
                c__msg_type: message[0],
                c__content: message[1],
            })
            this.showImmediately(pseudoId, message[0], message[1])
        },

        performSendEmote(emote) {
            const pseudoId = this.pseudoIdGenerator()
            this.sendThourghWs({
                c__id: pseudoId,
                c__msg_type: 11,
                c__content: emote.id,
            })
            this.showImmediately(pseudoId, 11, emote.img_src)
        }
    },
}