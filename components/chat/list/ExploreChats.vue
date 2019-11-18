<template>
    <div class="the_big_frame"><div class="la_content" ref="feed">
        <div style="min-height:105px"/>
        <div v-for="roomCluster in fetchedData"
            class="_p"
            :key="roomCluster.id"
        >
            <nuxt-link :to="`/community/${roomCluster.id}`" class="_p_info glow">
                <img class="cmnty-ico" :src="roomCluster.icon_img">
                <p>{{ roomCluster.name }}</p>
                <i class="material-icons-round">arrow_forward</i>
            </nuxt-link>

            <div v-for="room in roomCluster.recently_active"
                class="pblc-chats box-shadow-2 bg lift"
                @click="toChat(room)"
                :key="room.id"
                :style="`background:url(${room.bg_img ? room.bg_img : roomCluster.cover_img}) center`"
            >
                <div class="pblc-chats__txt">
                    <div class="name">{{ room.name ? room.name : "Phòng chat cộng đồng" }}</div>
                    <span>{{ room.last_msg.timestamp | tiemstamp }}</span>
                </div>
                <p class="pblc-chats__last">{{ room.last_msg | lastMsgDspl }}</p>
            </div>
        </div>
        <div style="min-height: 69px"/>
    </div></div>
</template>

<script>
import { feedingFrenzy, scrlDirection } from '@/mixins/feedingFrenzy'
import { chatLs } from '@/mixins/chatLs'

export default {
    mixins: [feedingFrenzy, chatLs, scrlDirection],
    data() {
        return {
            feedUrl: 'chat/explore/',
        }
    },
}
</script>

<style>
._p {
    width: 100%;
    word-wrap: break-word;
}

._p_info .material-icons-round {
    margin: 9px 6px 0 0;
    font-size: 19px;
    color: #777;
}

._p ._p_info {
    display: flex;
    padding: 5px;
}
._p ._p_info .cmnty-ico {
    height: 35px;
    width: 35px;
    
    margin: 0 10px;
}
._p ._p_info p {
    word-spacing: 0;
    margin: auto;
    margin-left: 3px;
    font-weight: bold;
    /* font-size: 15px; */
}

.pblc-chats {
    /* box-shadow: inset 0 -10px 10px -10px #000000; */
    /* width: 100%; */
    height: 120px;
    margin: 2px 25px 10px 60px;
    border-radius: 25px;
    display: flex;
    flex-direction: column;
    align-items: stretch;

}
.pblc-chats .pblc-chats__txt {
    color: #fff;
    margin-top: auto;
    text-shadow: 0px 0px 6px #000;
    display: flex;
}
.pblc-chats .name {
    font-size: 18px;
    overflow: hidden;
    padding: 1px 5px 5px 14px;
    /* white-space: nowrap; */
    margin-right: 5px;
    font-weight: bold;
    max-height: 50px;
}
.pblc-chats .pblc-chats__last {
    margin: 0 14px 9px 14px;

    /* border-radius: 20px;
    max-width: 290px;
    padding: 4px 8px;
    background: rgba(255, 255, 255, 0.95); */
    color: #eee;
    text-shadow: 0px 0px 4px #222;
    font-size: 14px;
    max-height: 53px;
    overflow: hidden;
    word-break: break-all;
}
.pblc-chats span {
    font-size: 14px;
    margin: 5px 14px 0 auto;
}
</style>
