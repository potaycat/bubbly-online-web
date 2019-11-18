<template>
    <div id="_send-box">
        <button @click="" class="_sb__btn box-shadow-4 push lift" href="#">
            <i class="material-icons-round">add</i></button>
        <button @click="contentType=2;pushMsg()" class="_sb__btn box-shadow-4 push lift" href="#">
            <i class="material-icons-outlined">photo_library</i></button>
        <div id="sb__input" class="box-shadow-4">
            <textarea
                ref="dynH"
                placeholder="Your message..."
                autocomplete="off"
                v-model="input"
                @keydown.enter.exact.prevent
                @keyup.enter.exact="contentType=1;pushMsg()"
                @keydown.enter.shift.exact="input+'\n'"
                @input= "startTypin()"
            />
            <button @click="contentType=1;pushMsg()" id="_sb__send-btn" 
                :style="[input ? {'transform':'translateY(-3px) rotate(-40deg)'} : {'color':'#00000033'}]"
            ><i class="nopaque material-icons-round">send</i>
            </button>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            input: "",
            signalable : true,
            contentType: 1,
        }
    },
    // an ok place to put constants {
        le_height: "27px",
    // }
    computed: {
        msg_content() {
            if (this.input.replace(/\s/g, '')!="") {
                const ifYtLink = (this.youtubeParser(this.input))
                if (ifYtLink) {
                    return [3, ifYtLink]                    
                }
                return [this.contentType, this.input]
            }
            return null
        },
    },
    methods: {
        youtubeParser(url) { //https://stackoverflow.com/questions/3452546/how-do-i-get-the-youtube-video-id-from-a-url
            const regExp = /.*(?:youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=)([^#\&\?]*).*/
            const match = url.match(regExp)
            return (match && !/\s/.test(url) && match[1].length==11) ? match[1] : false
        },
        scroll2Bottom() {
            const container = document.querySelector(".la_content")
            container.scrollTop = container.scrollHeight
        },

        pushMsg() {
            if(this.msg_content) {
                const present = new Date; const pseudoId = present.getTime()
                this.$emit('outBoxing', {
                    author: this.$store.state.auth.my_profile,
                    id: pseudoId,
                    msg_type: this.msg_content[0],
                    content: this.msg_content[1],
                    timestamp: "sndng",
                })
                this.$socket.sendObj({
                    f_pseudoId: pseudoId,
                    f_msg_type: this.msg_content[0],
                    f_content: this.msg_content[1],
                })
                this.signalable = true
                this.input = ""
                this.resetHeight()
            }
        },
        signalTyping(){
            try { this.$socket.send("tpng") } catch (error) {}
        },
        startTypin(){            
            if (this.signalable) {
                this.signalTyping()
                this.signalable = false
                setTimeout(() => { this.signalable = true }, 8000)
            }

            const txtA = this.$refs.dynH
            txtA.style["height"] = this.$options.le_height
            if (txtA.clientHeight < txtA.scrollHeight) {
                if (txtA.scrollHeight < 105) txtA.style["height"] = txtA.scrollHeight+3 +"px"
                else {txtA.style["height"] = "105px"}
            }
            this.$emit('barHeight', txtA.style["height"])
            this.scroll2Bottom()
        },
        resetHeight() {
            const txtA = this.$refs.dynH
            txtA.style["height"] = this.$options.le_height
            this.$emit('barHeight', this.$options.le_height)
        }
    },
    mounted() {
        this.resetHeight()
    }
}
</script>

<style>
#_send-box {
    overflow: hidden;
    position: fixed;
    bottom: 0;
    z-index: 999;
    display: flex;
    padding: 10px 3px;
    width: 100%;
    /* width: 110%;
    margin-left: -10%; */
}
#_send-box ._sb__btn {  
    border-radius: 100px;
   
    width: 35px;
    height: 35px;
    padding: 5px;
    margin: auto 0 1px 5px;
    
    color: rgba(72, 133, 237, 0.95);
    background: #fff;
}

#_send-box #sb__input{
    border-radius: 20px;
    font-size: 14px;
    /* border: solid 1px #eee; */
    background: rgba(255, 255, 255, 0.95);
    margin: auto 6px;
    width: 100%;

}
#_send-box textarea {
    resize: none;
    margin: 6px 0 0 8px;
    outline: none;
    border: none;
    background: none;
    width: calc(100% - 44px);
    /* height: 27px; */
    font-size: 14px;
    
}
#_send-box #_sb__send-btn{
    transition: .2s;
    color: rgb(72, 133, 237);
    position: absolute;
    bottom: 12px;
}
</style>