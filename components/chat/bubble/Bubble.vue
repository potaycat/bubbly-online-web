<template>
        <transition appear name="fade_in">
    <div v-if="isMe" class="_msg_holder _yay">
        <div v-if="!consecutive" class='_le_timestamp'>
            Me • {{ tiemstamp }}</div>
            <!-- FIX THIS -->
        <ShowContent class="_content nopaque"
            :isMe="isMe"
            :msg_type="message.msg_type"
            :content="message.content"/>
    </div>
    <div v-else class="_msg_holder _budy">
        <div v-if="!consecutive" class="_bud_info">
            <img class="pfp" :src="message.author.profile_pic">
            <div class="_chat_alias">{{ message.author.alias }}</div>
            <div class='_le_timestamp'>• {{ tiemstamp }}</div>
        </div>
        <ShowContent class="_content nopaque" 
            :msg_type="message.msg_type"
            :content="message.content"/>
    </div>
        </transition>
</template>

<script>
import ShowContent from './BubbleContent'
export default {
    components: {
        ShowContent,
    },
    props: [
        'message',
        'prev',
    ],
    data() {
        return {
        }
    },
    computed: {
        isMe() { // OPTIMIZE THIS!!
            return this.message.author.id == this.$store.state.jwtlogin.my_profile.id
        },

        sending() {return this.message.timestamp == "sendin"},
        tiemstamp() {
            if (this.sending) return "Sending"
            let d = new Date(this.message.timestamp);
            
            let today = new Date();
            
            let h = d.getHours();
            let m = d.getMinutes();
            if(h<10) h='0'+h
            if(m<10) m='0'+m
            let timestampString = h + ':' + m;

            if (today - d > 86400000) {
                let dd = d.getDate();
                let mm = d.getMonth()+1; 
                let yy = d.getFullYear().toString().substr(-2);
                if(dd<10) dd='0'+dd
                if(mm<10) mm='0'+mm
                timestampString = dd + '/' + mm + '/' + yy + ', '+timestampString;
            }
            return timestampString
        },
        
        consecutive() {
            if(this.prev) {
                if(this.prev.author.id==this.message.author.id) {
                    let p = new Date(this.prev.timestamp);
                    let d = new Date(this.message.timestamp)
                    if (d - p < 600000 ||(this.sending&&new Date()-p<600000)) return true
                }
            }
            return false
        },
    },
}
</script>

<style>
._msg_holder { /* OPTIMIZE ALL THIS MESSED UP MARGINS!! */
    margin: 0 10px;
    user-select: text;
}
._yay{
    margin-top: 2px;
    margin-left: auto;
}
._msg_holder ._content{
    margin: 0 0 0 42px;
    display: flex;
}
._yay ._content{
    justify-content: flex-end;
}

._msg_holder ._bud_info {
    margin: 18px 0 0; /*move up/down WHOLE BLOCK (friend)*/
    display: flex;
}
._bud_info .pfp {
  cursor: pointer;
    width: 35px;
    height: 35px;
    margin: 0 8px -21px 0;
}
._bud_info ._chat_alias {
  cursor: pointer;
    margin: -7px 9px;
    font-size: 14px;
    color: #fff;
    text-shadow: 0px 0px 5px #555;
}
._budy {
    margin: 2px 0 0 10px;  /*friend's consecutive bubble*/
}

._msg_holder ._le_timestamp{
    font-size: 11px;
    color: #ccc;
    text-shadow: 0px 0px 15px #777;
}
._bud_info ._le_timestamp {
    margin: -4px -3px;
}
._yay ._le_timestamp { /*move up/down WHOLE BLOCK of my messages*/
    margin: 11px 0 3px; 
    text-align: right;
}


.wipe_down-leave-active {
    transition: transform 1s;
}
.wipe_down-leave-to { /* .fade-leave-active below version 2.1.8 */
    z-index: -9999;
    transform: translate(0, 20px);
}
</style>
