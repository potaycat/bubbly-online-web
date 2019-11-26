<template>
<transition appear name="fade_in">
    <div :class="['_msg-ctnr', isMe ? '_yay' :null]">
        <div v-if="isMe && !consecutive" class='msg__timestmp'>
            <p v-if="sending">Sending</p>
            <p v-else>Me • {{ message.timestamp | tiemstamp }}</p>
        </div>
        <div v-else-if="!consecutive" class="_budd__info-ctn">
            <img class="pfp push" :src="message.author.profile_pic" @click="$emit('peak',{pos:$event, profile:message.author})">
            <div class="_budd__alias">{{ message.author.alias }}</div>
            <span class='msg__timestmp'>{{ message.timestamp | tiemstamp }}</span>
        </div>
        <ShowContent class="msg__content nopaque"
            :isMe="isMe"
            :msg_type="message.msg_type"
            :content="message.content"
        />
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
    computed: {
        isMe() { // tod o optimize?
            return this.message.author.username == this.$store.state.auth.my_profile.username
        },
        sending() {
            return this.message.timestamp == "sndng"
        },
        consecutive() {
            if (this.prev) {
                if (this.prev.author.username==this.message.author.username) {
                    let p = new Date(this.prev.timestamp)
                    let d = new Date(this.message.timestamp)
                    if (d - p < 600000 || (
                        this.sending )//&& new Date() - p < 600000)
                    ) return true
                }
            }
            return false
        },
    },
}
</script>

<style>
._msg-ctnr {
    padding: 2px 10px;
    width: 100%;
    user-select: text;
}

._msg-ctnr ._budd__info-ctn {
    display: flex;
    align-items: center;
}
._budd__info-ctn .pfp {
    width: 35px;
    height: 35px;
    margin-bottom: -21px;
    z-index: 2;
}
._budd__info-ctn ._budd__alias {
    margin: 0 7px 2px 16px;
    font-size: 14px;
    color: #fff;
    text-shadow: 0px 0px 5px rgba(0, 0, 0, 0.3);
}
._msg-ctnr .msg__timestmp{
    font-size: 11px;
    color: #999;
    text-shadow: 0px 0px 4px rgba(0, 0, 0, .3);
}

._msg-ctnr .msg__content{
    margin-left: 40px;
    cursor: auto;
}


._yay .msg__timestmp {
    text-align: right;
}
._yay .msg__content{
    float: right;
}

._msg-ctnr ._budd__info-ctn, ._yay .msg__timestmp {
    margin-top: 5px;
    margin-bottom: 2px;
}

.wipe_down-leave-active {
    transition: 1s;
}
.wipe_down-leave-to {
    height: 0;
}
</style>
