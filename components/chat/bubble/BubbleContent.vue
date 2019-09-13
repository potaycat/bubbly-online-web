<template>
    <div>
        <p v-if="msg_type==1" class="_w txt_msg" v-bind:id="isMe">{{ content }}</p>

        <div v-if="msg_type==3" class="yt_embed" v-bind:id="isMe">
        <iframe width="276" height="155" :src="ytLink" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>

        <div v-if="msg_type==2" style="display:flex; flex-direction:column">
        <img class="_w picture_msg" :src="content">
        </div>

        <p v-if="msg_type==10" class="_w deleted_msg">Đã xóa một tin nhắn</p>        

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
            return "https://www.youtube-nocookie.com/embed/" + this.content
        },
    }
}
</script>

<style>
._w {
    max-width: 70vw;
}
.txt_msg {
    /* user-select: text; */
    border-radius: 20px;
    /* word-break: break-all; */
    word-wrap: break-word;
    padding: 6px 11px;
    background: rgba(255, 255, 255, 0.95);
    color: #000;
} 
.txt_msg#true { /*override friend's bubble*/
    background: rgba(72, 133, 237, 0.95);
    color: #fff;
}

.deleted_msg {
    border-radius: 20px;
    /* word-break: break-all; */
    word-wrap: break-word;
    padding: 6px 11px;
    background: #88888888;
    font-style: italic;
}

.yt_embed{
    /* max-width: 280px; */
    border-radius: 20px;
    overflow: hidden;
    z-index: 1;
    height: 155px;
    background: #00000077;
}

.picture_msg {
    border-radius: 20px;
    margin: 1px 0;
    background: #00000077;
}
</style>
