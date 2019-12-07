<template>
    <div class="thr glow"
        @click="$router.push(`/chat/t/${room.id}`);$store.commit('chatx/loadChat', room)">
        <img class="pfp" :src="dsplPicSrc">
        <div v-if="isUnread" class="thr__dot"></div>
        <div class="thread-txt">
            <div class="thr__top-txt">
                <p class="thr-top__title" :style="[room.room_type=='direct' ? {'color':'#'+room.room_type_data.fave_color} :null]"
                >{{ dsplRoomTtle }}</p>
                <span>{{ room.last_msg.timestamp | tiemstamp }}</span>
            </div>
            <p class="thr__last-msg" :style="isUnread? 'font-weight:bold; color:black' :null">
                {{ room.last_msg | lastMsgDspl }}
            </p>
        </div>
    </div>
</template>

<script>
export default {
    props: ['room'],
    computed: {
        isDirect() {return this.room.room_type == 'direct'},
        isGroup() {return this.room.room_type == 'group'},
        isPublic() {return this.room.room_type == 'public'},
        dsplPicSrc() {
            const dat = this.room.room_type_data
            return this.isDirect ? dat.profile_pic :
                this.room.bg_img ? this.room.bg_img :
                this.isPublic ? dat.community.icon_img :
                require('@/assets/group.png')
        },
        dsplRoomTtle() {
            const dat = this.room.room_type_data
            return this.isDirect ? dat.alias :
                this.room.name ? this.room.name :
                this.isGroup ? "Nhóm " + dat.roommate_count + " người" :
                dat.community.name + ` #${dat.order}`
        },
        isUnread() {
            return new Date(this.room.roommate_info.last_seen) < new Date(this.room.last_msg.timestamp)
        }
    }
}
</script>


<style>
.thr {
    padding: 10px 15px;
    word-wrap: break-word;
    display: flex;
    align-items: center;
    width: 100%;
    border-radius: 10px;
    position: relative;
}
.thr .pfp {
    align-self: flex-start;
    z-index: -2;
    height: 55px;
    min-width: 55px;
    max-width: 55px;
}
.thread-txt {
    margin-left: 15px;
    width: 100%;
}
.thread-txt .thr__top-txt{
    display: flex;
    width: 100%;
}
.thr__top-txt .thr-top__title {
    font-weight: bold;
    word-wrap: break-word;
    word-break: break-all;

    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical; 
}
.thr__top-txt span {
    color: #888;
    margin: 2px 0 0 auto;
    font-size: 14px;
    padding-left: 10px;
}
.thread-txt .thr__last-msg{
    color: #777;
    font-size: 15px;
    
    word-break: break-all;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;

    max-height: 70px;
}

.thr__dot {
  position: absolute;
  top: 10px;
  left: 58px;
  height: 15px;
  width: 15px;
  border-radius: 50%;
  background-color: rgba(72, 133, 237, 0.95);
  /* box-shadow: #777 */
}
</style>
