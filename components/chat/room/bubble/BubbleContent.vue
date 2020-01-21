<template>
    <div :class="['_msg-ct', isMe?'_ct-is-me': null, sending?'--cntn-outbxng':null]">
        <p v-if="msg_type==1" class="m-ct__txt">{{ content }}</p>

        <div v-else-if="msg_type==3" class="m-ct__yt-embed">
            <iframe :src="`https://www.youtube-nocookie.com/embed/${content}`"
                width="276" height="155" frameborder="0" allowfullscreen
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            ></iframe>
        </div>

        <div v-else-if="[2, 11].includes(msg_type)" :class="['msg-ct--img-ctn', msg_type==11?'--emote-ctn':null]">
            <img :src="content">
            <div v-if="sending" class="total_darkness">
                <Spinner color="#fff" />
            </div>
        </div>

        <p v-else-if="msg_type==8" class="m-ct__txt _m-ct__chat-chng">Made the chat room</p>
        <p v-else-if="msg_type==9" class="m-ct__txt _m-ct__chat-chng"><strong>{{content}}</strong> left the chat room</p>
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
import Spinner from '@/components/misc/Spinner'
export default {
    components: { Spinner },
    props: [
        'isMe',
        'msg_type',
        'content',
        'sending'
    ]
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
    background: rgba(255, 255, 255, 0.98);
} 
._ct-is-me .m-ct__txt { /*my bubble*/
    background: var(--primary-color);
    color: #fff;
}

._m-ct__chat-chng {
    background: hsla(0, 0%, 69%, 0.75) !important;
    /* backdrop-filter: blur(10px); */
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

.msg-ct--img-ctn {
    display: flex;
    position: relative;
}
.msg-ct--img-ctn > img {
    border-radius: 20px;
    background: #00000077;
    width: 100%;
    max-height: 10000px;
}
.msg-ct--img-ctn .total_darkness {
    border-radius: 20px;
    z-index: 2;
}

.msg-ct--img-ctn.--emote-ctn > img {
    border-radius: 0;
    background: none;
    width: 100px;
    height: 100px;
}

._msg-ct.--cntn-outbxng .m-ct__txt {
    opacity: 0.7;
}
._msg-ct.--cntn-outbxng .msg-ct--img-ctn {
    min-height: 100px;
    min-width: 100px;
}
</style>
