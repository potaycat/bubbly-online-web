<template>
    <div id="_send-box">
        <button @click="sendEmote=true" class="_sb__btn shiny-white-bg box-shadow-4 push lift">
            <i class="material-icons-round">insert_emoticon</i></button>
        <button @click="$emit('picPick')" class="_sb__btn shiny-white-bg box-shadow-4 push lift">
            <i class="material-icons-outlined">photo_library</i></button>
        <div class="sb__input shiny-white-bg box-shadow-4">
            <textarea
                class="sb__input-area no-bg"
                ref="dynH"
                placeholder="Your message..."
                autocomplete="off"
                v-model="input"
                @keydown.enter.exact.prevent
                @keyup.enter.exact="performSend"
                @keydown.enter.shift.exact="input+'\n'"
                @input="startTypin"
            />
            <button @click="performSend" id="_sb__send-btn" 
                :style="[inputNotBlank ? {'transform':'translateY(-3px) rotate(-40deg)'} : {'color':'#00000033'}]"
            ><i class="nopaque material-icons-round">send</i>
            </button>
        </div>
        <EmoteSender v-if="sendEmote" @emoed="onEmoing"/>
    </div>
</template>

<script>
import EmoteSender from "./EmoteSender";
export default {
    components: {EmoteSender},
    props: ['immediateFocus'],
    data:() => ({
        input: "",
        signalable : true,
        sendEmote: false
    }),
    // constants {
        le_height: "27px",
    // }
    computed: {
        inputNotBlank() {
            return this.input.replace(/\s/g, '') != ""
        },
    },
    methods: {
        onEmoing(emoId) {
            this.sendEmote = false
            if (emoId) {
                this.$emit('sendEmote', emoId)
            }
        },
        performSend() {
            if(this.inputNotBlank) {
                this.$emit('outBoxing', this.input)

                this.signalable = true
                this.input = ""
                this.resetHeight()
            }
        },
        startTypin() {            
            if (this.signalable) {
                this.$emit('typing')
                this.signalable = false
                setTimeout(() => { this.signalable = true }, 8000)
            }

            const txtA = this.$refs.dynH
            txtA.style["height"] = this.$options.le_height
            if (txtA.clientHeight < txtA.scrollHeight) {
                if (txtA.scrollHeight < 105) txtA.style["height"] = txtA.scrollHeight+3 +"px"
                else {txtA.style["height"] = "105px"}
            }
            this.$emit('heightChange', txtA.style["height"])
        },
        resetHeight() {
            const txtA = this.$refs.dynH
            txtA.style["height"] = this.$options.le_height
            this.$emit('heightChange', this.$options.le_height)
        }
    },
    mounted() {
        this.resetHeight()
        if (this.immediateFocus) {
            // todo make this works on mobile
            this.$refs.dynH.focus()
        }
    }
}
</script>

<style>
#_send-box {
    overflow: hidden;
    position: absolute;
    bottom: 0;
    z-index: 6;
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
    margin: auto 0 1px 4px;
    
    color: rgb(72, 133, 237);
}

#_send-box .sb__input{
    border-radius: 20px;
    font-size: 14px;
    /* border: solid 1px #eee; */
    background: #fff;
    margin: auto 4px 0 4px;
    width: 100%;

}
#_send-box .sb__input-area {
    resize: none;
    margin: 6px 0 0 8px;
    outline: none;
    border: none;
    width: calc(100% - 44px);
    /* height: 27px; */
    font-size: 14px;
}
#_send-box #_sb__send-btn{
    transition: .2s;
    color: rgb(72, 133, 237);
    position: absolute;
    bottom: 2px;
}

</style>