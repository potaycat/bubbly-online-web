<template>
    <div class="_send_box">
        <div class="lift">
        <button @click="" class="_sb_btn" href="#"><i class="material-icons-round">add</i></button>
        <button @click="" class="_sb_btn" href="#"><i class="material-icons-round">insert_photo</i></button>
        </div>
        <div class="input">
            <!-- for .style to flipping work vvvvv -->
            <textarea
                type="text"
                placeholder="Your message"
                name="da_message"
                v-model="msg"

                @keydown.enter.exact.prevent
                @keyup.enter.exact="pushMsg()"
                @keydown.enter.shift.exact="msg+'\n'"

                autocomplete="off"
                @input= "startTypin()"
            />
        </div>
        <button @click="pushMsg()" id="_send_btn" class="nopaque" v-bind:style="[!msg ? {'color':'#00000033'} : {'transform':'rotate(-40deg)'}]"><i class="material-icons-round">send</i></button>
    </div>
</template>

<script>
export default {
    data() {
        return {
            msg: "",
            signalable : true,
            pseudoId: 0,
        }
    },
    // non-reactive data {
        le_height: "27px",
    // }
    computed: {
        msg_content() { 
            if (this.msg.replace(/\s/g, '')!="") {
                let ifYtLink = (this.youtube_parser(this.msg))
                if (ifYtLink) {
                    return [3, ifYtLink]                    
                }
                return [1, this.msg]
            }
            return false
        },
    },
    methods: {
        youtube_parser(url){ //https://stackoverflow.com/questions/3452546/how-do-i-get-the-youtube-video-id-from-a-url
            let regExp = /.*(?:youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=)([^#\&\?]*).*/
            let match = url.match(regExp)
            return (match&& !/\s/.test(url) &&match[1].length==11)? match[1] : false
        },
        scroll2Bottom() {
            let container = document.querySelector(".la_content")
            container.scrollTop = container.scrollHeight
        },

        pushMsg() {
            if(this.msg_content) {
                this.$emit('sentMeMsg', {
                    author: this.$store.state.jwtlogin.my_profile,
                    id: this.pseudoId,
                    msg_type: this.msg_content[0],
                    content: this.msg_content[1],
                    timestamp: "sendin",
                })
                this.$socket.sendObj({
                    f_pseudoId: this.pseudoId,
                    f_msg_type: this.msg_content[0],
                    f_content: this.msg_content[1],
                })
                this.signalable = true
                this.msg = ""
                this.pseudoId +=1
                this.resetHeight()
            }
        },

        signalTyping(){
            try { this.$socket.send("typin") } catch (error) {}
        },

        startTypin(){
            let input = document.querySelector("._send_box textarea")
            input.style["height"] = this.$options.le_height
            if (input.clientHeight < input.scrollHeight) {
                if (input.scrollHeight < 105) input.style["height"] = input.scrollHeight +"px"
                else {input.style["height"] = "105px"}
            }
            this.$emit('barHeight', input.style["height"])
            
            this.scroll2Bottom()
            if (this.signalable) {
                this.signalTyping()
                this.signalable = false;
                setTimeout(() => { this.signalable = true }, 8000)
            }
        },

        resetHeight() {
            let input = document.querySelector("._send_box textarea")
            input.style["height"] = this.$options.le_height
            this.$emit('barHeight', this.$options.le_height)
        }
    },
    mounted() {
        this.resetHeight()
    }
}
</script>

<style>
._send_box {
    background-color: transparent;
    overflow: hidden;
    position: fixed;
    bottom: 0;
    width: 100%;
    z-index: 999;
    display: flex;
    padding: 10px 0;
}
._send_box ._sb_btn {  
    border-radius: 100px;
   
    width: 35px;
    height: 35px;
    
    color: #fff;
    padding: 5px;
    
    background: rgba(72, 133, 237, 0.95);
    box-shadow: 0 10px 20px rgba(0,0,0,0.5);
}
._send_box .lift {
    margin: auto 0 1px 5px;
}

._send_box .input{
    outline: none;
    -webkit-border-radius: 20px;
    -moz-border-radius: 20px;
    border-radius: 20px;
    /* border: 1px;
    border-style: solid;
    border-color: #eee; */
    background: rgba(255, 255, 255, 0.95);
    box-shadow: 0 10px 20px rgba(0,0,0,0.5);
    margin: auto 5px;
    width: calc(100% - 95px);

    font-size: 14px;
    
    /* border: none;
    background: #ffffff77; */
}
._send_box textarea {
    resize: none;
    margin: 6px 0 0 8px;
    outline: none;
    border: none;
    background: none;
    width: calc(100% - 44px);
    /* height: 27px; */
    font-size: 14px;
    
}
._send_box #_send_btn{
    transition: .2s;

    color: rgb(72, 133, 237);
    text-align: center;
    vertical-align: middle;
    padding: 3px 0 0 9px;
    
    position: relative;
    right: 45px;
    margin-right: -99px;
}

</style>