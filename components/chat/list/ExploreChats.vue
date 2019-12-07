<template>
    <div class="the_big_frame"><div class="common_ls_cntainr --top-lev-app-bar --with-tabs" ref="feed">
        <div v-for="roomCluster in fetchedData"
            class="xplr-chat__cmnty"
            :key="roomCluster.id"
        >
            <nuxt-link :to="`/community/${roomCluster.id}`" class="xplr-chat__cmnty-inf glow">
                <img class="cmnty_ico" :src="roomCluster.icon_img">
                <p>{{ roomCluster.name }}</p>
                <i class="material-icons-round">arrow_forward</i>
            </nuxt-link>

            <div v-for="room in roomCluster.recently_active"
                class="pblc-chats box-shadow-2 bg lift"
                @click="$router.push(`/chat/t/${room.id}`)"
                :key="room.id"
                :style="`background:url(${room.bg_img || roomCluster.cover_img}) center`"
            >
                <div class="pblc-chats__txt">
                    <div class="name">{{ room.name || `Chat #${room.order}` }}</div>
                    <span>{{ room.last_msg.timestamp | tiemstamp }}</span>
                </div>
                <p class="pblc-chats__last">{{ room.last_msg | lastMsgDspl }}</p>
            </div>
        </div>
        <h3 class="empty-fetchedLs" v-if="empty">Empty list. Get started by joining a few communities</h3>
        <Spinner v-if="loading4More" />
    </div></div>
</template>

<script>
import { feedingFrenzy, maintainScrllPos, scrlDirection } from '@/mixins/feedingFrenzy'

export default {
    mixins: [feedingFrenzy, maintainScrllPos, scrlDirection],
    data: () => ({
        feedUrl: 'chat/explore/',
    }),
}
</script>

<style>
.xplr-chat__cmnty {
    width: 100%;
    word-wrap: break-word;
}

.xplr-chat__cmnty-inf {
    display: flex;
    padding: 5px;
}
.xplr-chat__cmnty-inf .cmnty_ico {
    height: 35px;
    width: 35px;
    
    margin: 0 10px;
}
.xplr-chat__cmnty-inf > p {
    word-spacing: 0;
    margin: auto;
    margin-left: 3px;
    font-weight: bold;
    /* font-size: 15px; */
}
.xplr-chat__cmnty-inf .material-icons-round {
    margin: 9px 6px 0 0;
    font-size: 19px;
    color: #777;
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
