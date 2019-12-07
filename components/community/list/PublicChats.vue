<template>
    <div class="community-chats-ls common_ls_wrapper">
        <div v-for="room in fetchedData"
            class="c-p-room box-shadow-2 bg lift"
            @click="$router.push(`/chat/t/${room.id}`)"
            :key="room.id"
            :style="`background:url(${room.bg_img || community.cover_img}) center`"
        >
            <div class="text-info">
                <div class="name">{{ room.name || `Chat #${room.order}` }}</div>
                <span>{{ room.last_msg.timestamp | tiemstamp}}</span>
            </div>
            <p class="last"><strong>{{ room.description }}</strong></p>
            <p class="last">{{ room.last_msg | lastMsgDspl }}</p>
        </div>
        <h3 class="empty-fetchedLs" v-if="empty">Community has no public chats</h3>
        <Spinner v-if="loading4More" />
    </div>
</template>

<script>
import { feedingFrenzy, maintainScrllPos } from '@/mixins/feedingFrenzy'

export default {
    props: ['community',],
    mixins: [feedingFrenzy, maintainScrllPos],
    data() {
        return {
            feedUrl: `communities/${this.community.id}/public-rooms/`,
        }
    },
    computed: {
        scrollCtnr() {
            return this.$parent.$refs.feed
        },
    },
}
</script>

<style>
.community-chats-ls {
    padding: 0 20px;
}
.community-chats-ls .c-p-room {
    height: 160px;
    margin-bottom: 20px;
    border-radius: 25px;
    display: flex;
    flex-direction: column;
    align-items: stretch;

}
.community-chats-ls .c-p-room .text-info {
    color: #fff;
    margin-top: auto;
    text-shadow: 0px 0px 10px #000;
    display: flex;
}
.community-chats-ls .c-p-room .name {
    font-size: 19px;
    overflow: hidden;
    padding: 1px 5px 5px 14px;
    /* white-space: nowrap; */
    margin-right: 5px;
    font-weight: bold;
    max-height: 50px;
}
.community-chats-ls .c-p-room .last {
    margin: 0 14px 9px 14px;

    /* border-radius: 20px;
    max-width: 290px;
    padding: 4px 8px;
    background: rgba(255, 255, 255, 0.95); */
    color: #eee;
    text-shadow: 0px 0px 3px #444;
    font-size: 14px;
    max-height: 53px;
    overflow: hidden;
    word-break: break-all;
}
.community-chats-ls .c-p-room span {
    font-size: 14px;
    margin: 5px 14px 0 auto;
}
</style>
