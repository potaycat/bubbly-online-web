<template>
    <div class="the_big_frame"><div class="common_ls_cntainr --top-lev-app-bar --with-tabs" ref="feed">
        <div v-for="roomCluster in fetchedData"
            class="xplr-chat__cmty"
            :key="roomCluster.id"
        >
            <nuxt-link :to="`/communities/${roomCluster.id}`" class="xplr-chat__cmty-inf glow">
                <img class="cmty_ico" :src="roomCluster.icon_img">
                <p>{{ roomCluster.name }}</p>
                <i class="material-icons-round">arrow_forward</i>
            </nuxt-link>

            <div v-for="room in roomCluster.recently_active"
                class="pblc-chats box-shadow-2 bg lift"
                @click="$store.dispatch('chatx/toChat', room)"
                :key="room.id"
                :style="`background:url(${room.bg_img || roomCluster.cover_img}) center`"
            >
                <div class="pblc-chats__inf">
                    <div class="name">{{ room.name || `Chat #${room.order}` }}</div>
                    <span>{{ room.last_msg.timestamp | tiemstamp2 }}</span>
                </div>
                <p class="pblc-chats__last-msg">{{ renderLastMsg(room.last_msg) }}</p>
            </div>
        </div>
        <StatusIndicator :isFetching="loading4More" :listLen="fetchedData.length"
            headsup="Try joining some communities. Their public chats will appear here"/>
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
.xplr-chat__cmty {
    width: 100%;
    word-wrap: break-word;
}

.xplr-chat__cmty-inf {
    display: flex;
    padding: 5px;
}
.xplr-chat__cmty-inf .cmty_ico {
    height: 35px;
    width: 35px;
    
    margin: 0 10px;
}
.xplr-chat__cmty-inf > p {
    word-spacing: 0;
    margin: auto;
    margin-left: 3px;
    font-weight: bold;
    /* font-size: 15px; */
}
.xplr-chat__cmty-inf .material-icons-round {
    margin: 9px 6px 0 0;
    font-size: 19px;
    color: #777;
}

.pblc-chats {
    height: 110px;
    margin: 2px 30px 10px 64px;
    border-radius: 25px;
    display: flex;
    flex-direction: column;
}
.pblc-chats .pblc-chats__inf {
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
.pblc-chats .pblc-chats__last-msg {
    margin: 0 14px 9px 14px;
    color: #eee;
    text-shadow: 0px 0px 4px #222;
    font-size: 14px;

    word-break: break-all;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
}
.pblc-chats span {
    font-size: 14px;
    margin: 5px 14px 0 auto;
}
</style>
