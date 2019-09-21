<template>
    <div id="community-chats" class="cards-wrapper lift">
        <div v-for="room in fetchedData"
            class="c-p-room bg"
            @click="toChat(room)"
            :key="room.id"
            :style="`background:url(${room.bg_img ? room.bg_img : community.cover_img}) center`"
        >
            <div class="tt">
                <div class="name">{{ room.name ? room.name : "Phòng chat cộng đồng" }}</div>
                <span>{{ tiemstamp(room.last_msg.timestamp) }}</span>
            </div>
            <p class="last">{{ displayLastMsg(room.last_msg) }}</p>
        </div>
    </div>
</template>

<script>
import { feedingFrenzy } from '@/mixins/feedingFrenzy'
import { chatLs } from '@/mixins/chatLs'

export default {
    props: [
        'community',
    ],
    mixins: [
        feedingFrenzy,
        chatLs,
    ],
    data() {
        return {
            cache: 'st_pChats',
        }
    },
    methods: {
        urlConstruct(offset) {
            return `communities/${this.community.id}/public-rooms/`
        },
    },
}
</script>

<style>
#community-chats {
    width: 100%;
}
#community-chats .c-p-room {
    /* box-shadow: inset 0 -10px 10px -10px #000000; */
    /* box-shadow: 0 5px 5px rgba(0,0,0,0.1); */
    height: 150px;
    margin-bottom: 15px;
    border-radius: 25px;
    display: flex;
    flex-direction: column;
    align-items: stretch;

}
#community-chats .c-p-room .tt {
    color: #fff;
    margin-top: auto;
    text-shadow: 0px 0px 10px #000;
    pointer-events: none;
    display: flex;
}
#community-chats .c-p-room .name {
    font-size: 18px;
    overflow: hidden;
    padding: 1px 5px 5px 14px;
    /* white-space: nowrap; */
    margin-right: 5px;
    font-weight: bold;
    max-height: 50px;
}
#community-chats .c-p-room .last {
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
    pointer-events: none;
    word-break: break-all;
}
#community-chats .c-p-room span {
    font-size: 14px;
    margin: 5px 14px 0 auto;
}
</style>
