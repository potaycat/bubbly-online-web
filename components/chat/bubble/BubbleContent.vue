<template>
    <div :class="['_msg-ct', isMe ? '_ct-is-me': null]">
        <p v-if="msg_type==1" class="m-ct__txt">{{ content }}</p>

        <div v-else-if="msg_type==3" class="m-ct__yt-embed">
            <iframe width="276" height="155" :src="ytLink" frameborder="0"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen>
            </iframe>
        </div>

        <div v-else-if="msg_type==2" :style="[{'display':'flex', }]">
            <img class="m-ct__img" :src="content">
        </div>

        <p v-else-if="msg_type==8" class="m-ct__txt _m-ct__chat-chng">Made the chat room</p>
        <p v-else-if="msg_type==5" class="m-ct__txt _m-ct__chat-chng">
            Added {{content==1?"someone":`${content} people`}} to the chat</p>
        <p v-else-if="msg_type==6" class="m-ct__txt _m-ct__chat-chng">Changed chat name to <strong>{{ content }}</strong></p>
        <p v-else-if="msg_type==7" class="m-ct__txt _m-ct__chat-chng">
            Changed chat background
            <img :src="content" class="m-ct__new-bg">
        </p>
        
        <p v-else-if="msg_type==10" class="m-ct__txt _m-ct__deleted">Đã xóa một tin nhắn</p>
    </div>
</template>

<script>
export default {
    props: [
        'isMe',
        'msg_type',
        'content',
    ],
    computed: {
        ytLink() { 
            return `https://www.youtube-nocookie.com/embed/${this.content}`
        },
    }
}
</script>

<style>
._msg-ct {
    display: inline-block;
    max-width: 75%;
}
.m-ct__txt {
    border-radius: 20px;
    /* word-break: break-all; */
    word-wrap: break-word;
    padding: 6px 11px;
    background: rgba(255, 255, 255, 0.95);
} 
._ct-is-me .m-ct__txt { /*my bubble*/
    background: rgba(72, 133, 237, 0.95);
    color: #fff;
}

._m-ct__chat-chng {
    background: hsla(0, 0%, 69%, 0.719) !important;
    color: #fff;
    font-style: italic;
}
.m-ct__new-bg {
    display: block;
    max-width: 100%;
}

._m-ct__deleted {
    background: #88888888;
    font-style: italic;
}

.m-ct__yt-embed{
    /* max-width: 280px; */
    border-radius: 20px;
    overflow: hidden;
    z-index: 1;
    height: 155px;
    background: #00000077;
}

.m-ct__img {
    border-radius: 20px;
    background: #00000077;
    width: 100%;
    max-height: 10000px;
}
</style>
