<template>
    <div id="mienCLs">
        <div class="the_big_frame">
            <div class="la_content">
                <div style="min-height:110px;width:100%"/>
                    <div name="list-complete" class="lift">
                <div v-for="room in fetchedData"
                    class="thr"
                    @click="toChat(room)"
                    :key="room.id"
                >
                    <img class="pfp" :src="getDisplayPic(room)">
                    <div id="text_part">
                        <div id="_top_text">
                            <p id="_r_title" v-bind:style="[room.meta_data.room_type=='direct' ? {'color':'#'+room.meta_data.data.fave_color} :null]"
                            >{{ getRoomTitle(room) }}</p>
                            <span>{{ tiemstamp(room.last_msg.timestamp) }}</span>
                        </div>
                        <p id="last">
                            {{ displayLastMsg(room.last_msg) }}
                        </p>
                    </div>
                </div>
                    </div>
                <div style="min-height: 120px"/>
            </div>
            
            <FAB @clicked="toggleMemAdd()"
                icon= "create"
                actionName= "New message"
            />
        </div>
        <NewCh v-if="addingMem"
            @close_diag="toggleMemAdd"/>
    </div>
</template>

<script>
import bruh from '@/assets/grup_de.png'
import { feedingFrenzy } from '@/mixins/feedingFrenzy'
import { chatLs } from '@/mixins/chatLs'

import FAB from '@/components/actions/FAB'
import NewCh from '../NewCh'

export default {
    components: {
        FAB,
        NewCh,
    },
    mixins: [
        feedingFrenzy,
        chatLs,
    ],
    data() {
        return {
            addingMem: false,
            cache: 'st_chats',
        }
    },
    methods: {
        getDisplayPic(room) {
            // return "https://pbs.twimg.com/profile_images/1074714981931704320/akH6pRLV_bigger.jpg"
            if (room.meta_data.room_type=='direct') {
                return room.meta_data.data.profile_pic
            }
            if (room.bg_img) return room.bg_img
            if (room.meta_data.room_type=='public') {
                return room.meta_data.data.icon_img
            }
            return bruh
        },
        getRoomTitle(room) {
            if (room.meta_data.room_type=='direct') { // optimize this!
                let namm = room.meta_data.data.alias
                if (room.name) namm+=" • "+room.name
                return namm
            }
            if (room.name) return room.name
            if (room.meta_data.room_type=='group') {
                return "Nhóm " + room.meta_data.data.member_count + " người"
            }
            return "Chat cộng đồng " + room.meta_data.data.name
        },

        urlConstruct(offset) {
            return 'chat/rooms/'
        },
        toggleMemAdd() {
            console.log(this.$store.state.jwtlogin.jwt);
            this.addingMem = ! this.addingMem
        },
    },
}
</script>

<style>
#mienCLs .lift {
}
.thr{
    padding: 10px 20px;
    word-wrap: break-word;
    display: flex;
    /* FIX THIS! FRICK TRANSITION GROUP! */
    /* width: 100vw; */
}
.thr .pfp {
    z-index: -2;
    width: 60px;
    height: 60px;
}
#text_part {
    pointer-events: none;
    margin:auto;
    margin-left: 15px;
    min-width: calc(100vw - 120px);
}
#text_part #_top_text{
    display: flex;
}
#_top_text #_r_title {
    word-break: break-all;
    overflow: hidden;
    font-weight: bold;

    margin-top: -1px;
    line-height: 19px;
    max-height: 41px;
    /* width: calc(100wv - 80px); */
}
#_top_text span {
    /* display: inline-block;  */
    /* BRUH */
    color: #777;
    margin-left: auto;
    font-size: 14px;
    padding-left: 10px;
}
#text_part #last{
    color: #777;
    font-size: 14px;
    max-height: 38px;
    word-break: break-all;
    overflow: hidden;
    width: 100;
}
</style>
