<template>
    <div class="the_big_frame"><div class="la_content">
        <div style="min-height:110px"/>
        <div v-for="roomCluster in fetchedData"
            class="_p"
            :key="roomCluster.community.id"
        >
            <div  class="glow"><div class="_p_info">
                <img class="comu_icon" :src="roomCluster.community.icon_img">
                <p>{{ roomCluster.community.name }}</p>
                <i class="material-icons-round">launch</i>
            </div></div>

            <div class="lift"><div v-for="room in roomCluster.recently_active"
                class="room_p bg"
                @click="toChat(room)"
                :key="room.id"
                :style="`background:url(${room.bg_img ? room.bg_img : roomCluster.community.cover_img}) center`"
            >
                <div class="tt">
                    <div class="name">{{ room.name ? room.name : "Phòng chat cộng đồng" }}</div>
                    <span>{{ tiemstamp(room.last_msg.timestamp) }}</span>
                </div>
                <p class="last">{{ displayLastMsg(room.last_msg) }}</p>
            </div></div>
        </div>
        <div style="min-height: 69px"/>
    </div></div>
</template>

<script>
import { feedingFrenzy } from '@/mixins/feedingFrenzy'
import { chatLs } from '@/mixins/chatLs'

export default {
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
            return 'communities/joined/avail-rooms/'
        },
    },
}
</script>

<style>
._p {
    width: 100%;
    word-wrap: break-word;
}

._p_info .material-icons-round {
    margin: 10px 6px 0 0;
    font-size: 19px;
    color: #777;
}

._p ._p_info {
    display: flex;
    padding: 5px;
}
._p ._p_info .comu_icon {
    height: 35px;
    width: 35px;
    
    margin: 0 10px;
}
._p ._p_info p {
    word-spacing: 0;
    pointer-events: none;
    margin:auto;
    margin-left: 3px;
    font-weight: bold;
    /* font-size: 15px; */
}

.room_p {
    /* box-shadow: inset 0 -10px 10px -10px #000000; */
    /* width: 100%; */
    box-shadow: 0 5px 5px rgba(0,0,0,0.1);
    height: 120px;
    margin: 2px 10px 10px 63px;
    border-radius: 25px;
    display: flex;
    flex-direction: column;
    align-items: stretch;

}
.room_p .tt {
    color: #fff;
    margin-top: auto;
    text-shadow: 0px 0px 10px #000;
    pointer-events: none;
    display: flex;
}
.room_p .name {
    font-size: 18px;
    overflow: hidden;
    padding: 1px 5px 5px 14px;
    /* white-space: nowrap; */
    margin-right: 5px;
    font-weight: bold;
    max-height: 50px;
}
.room_p .last {
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
.room_p span {
    font-size: 14px;
    margin: 5px 14px 0 auto;
}
</style>
