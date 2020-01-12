<template>
<transition appear name="zoom_in_fade">
    <div id="chat-info" class="the_big_frame shiny-white-bg">
        <div class="common_ls_cntainr">
            <div class="chat-inf__set" v-if="type=='direct'">
                <img class="pfp" :src="threadInfo.room_type_data.profile_pic">
                <div class="chat-inf__alias">{{ title }}</div>
            </div>
            <div class="chat-inf__set" v-else-if="type=='group'">
                <img v-if="threadInfo.bg_img" class="pfp" :src="threadInfo.bg_img">
                <img v-else class="pfp" style="filter: invert(1)" src="~assets/group.png">
                <div class="chat-inf__alias">{{ title }}</div>
            </div>
            <Roomates v-if="more_members" :threadInfo="threadInfo"
                :isAdmin="isAdmin"/>
            <div class="chat-inf__set" v-else-if="type=='public'">
                <div class="chat-inf__alias">{{ title }}</div>
                <p class="chat-inf__desc">{{ threadInfo.description }}</p>
            </div>
            <ButtonList :allCommands="visibleCmd" class="chat-cmd-list"/>
            <input type="file" accept="image/*" @change="performChangeBg" ref="img_input" style="display:none">
        </div>
        <transition name="fade">
            <div v-if="loading" class="total_darkness">
                <Spinner color="#fff" />
            </div>
        </transition>
        <InputDialog v-if="openDiag" :toDisplay="openDiag" class="no-bg" />
    </div>
</transition>
</template>

<script>
import Spinner from '@/components/misc/Spinner'
import Roomates from './Roomates'
import { performBlock } from '@/mixins/performFollow'
import ButtonList from '@/components/misc/ButtonList'

export default {
    components: {Spinner, Roomates, ButtonList},
    mixins: [performBlock],
    props: ['threadInfo', 'title'],
    data:() => ({
        loading: false,
        more_members: false,
    }),
    computed: {
        roommateInfo() {
            return this.threadInfo.roommate_info
        },
        visibleCmd() {
            return [
                this.type == 'direct' ? 
                    [
                        {icon: "person", lable: "View Profile", action: 'toProfile', scndIcon: "arrow_forward"},
                        {icon: "block", lable: "Block", action: 'confirmBlock'},
                    ] :
                this.type == 'group' ?
                    [
                        {
                            icon: "people_outline",
                            lable: `Chat Members (${this.spcfcTypdData.roommate_count})`,
                            action: 'showRoomates',
                            scndIcon: this.more_members ? "expand_less" : "expand_more"
                        },
                    ] :
                this.type == 'public' ?
                    [
                        {icon: "group_work", lable: `Go to ${this.spcfcTypdData.community.name}`, action: 'toCommunity', scndIcon: "arrow_forward"},
                    ] :
                [],
                [
                    this.isAdmin && this.type != 'direct' ?
                        {icon: "text_fields", lable: "Change Chat Name", action: 'cnfrm_ChngeName'} :null,
                    this.isAdmin || this.type == 'direct' ?
                        {icon: "photo_size_select_actual", lable: "Change Background Image", action: 'pickBgPic'} :null,
                    // {icon: "search", lable: "Search For Message", action: 'soon'},
                    this.roommateInfo ?
                        this.roommateInfo.enable_noti ?
                            {icon: "notifications", lable: "Notification: On", action: 'turnNotiOff'} : 
                            {icon: "notifications_off", lable: "Notification: Turned Off", action: 'turnNotiOn'} : 
                        {icon: "person_add", lable: "Add to My Chats", action: 'cnfrm_AddPblcRoom'},
                ].filter(x => x), // removes nulls
                this.roommateInfo ? 
                    [
                        {icon: "exit_to_app", lable: "Leave conversation", action: 'cnfrm_Leave', style: 'color:red'},
                    ] :
                [],
            ]
        },
        isAdmin() {
            if (this.roommateInfo) { // public rooms may not have roommate_info
                return this.roommateInfo.is_admin
            } return false
        },
        type() {return this.threadInfo.room_type},
        spcfcTypdData() {return this.threadInfo.room_type_data},
        profile() { // to work with follow mixin
            if (this.type == 'direct') {
                return this.spcfcTypdData
            }
            console.error("Room type is not direct!")
            return null
        }
    },
    methods: {
        cnfrm_ChngeName() {
            this.openDiag = {
                input_desc: "New Chat Name",
                hndlFun: this.performChngeName
            }
        },
        pickBgPic() {
            this.$refs.img_input.click()
        },
        cnfrm_Leave() {
            this.openDiag = {
                title: "Leave this chat?",
                hndlFun: this.performLeave
            }
        },
        cnfrm_AddPblcRoom() {
            this.openDiag = {
                title: "Save this public chat room?",
                description: "It will appear in your chat list and you will recieve notifications",
                hndlFun: this.performAddPblcRoom
            }
        },
        showRoomates() {this.more_members = !this.more_members},
        turnNotiOn() {this.turnNoti(true)},
        turnNotiOff() {this.turnNoti(false)},
        toProfile() {this.$router.push(`/user/${this.profile.username}`)},
        toCommunity() {this.$router.push(`/communities/${this.spcfcTypdData.community.id}`)},
        soon() {
            this.openDiag = {
                alert: true,
                title: "Feature rolling out soon",
                description: "Thank you for supporting us!"
            }
        },

        performChngeName(value){
            this.loading = true
            this.$axios.patch(`chat/${this.threadInfo.id}`,
                {name: value},
                this.$store.state.auth.head
            )
                .then(res => {
                    this.loading = false
                })
        },
        performChangeBg(file_evt) {
            this.loading = true
            const files = file_evt.target.files
            this.$refs.img_input.value=null
            this.batchCompressUpload(files, uploadedUrls => {
                this.$axios.patch(`chat/${this.threadInfo.id}`,
                    {bg_img: uploadedUrls[0]},
                    this.$store.state.auth.head
                )
                    .then(res => {
                        this.loading = false
                    })
            })
        },
        performAddPblcRoom() {
            this.loading = true
            this.$axios.post(`chat/${this.threadInfo.id}/save-public${
                this.$store.getters['communityx/isMod'](this.spcfcTypdData.community.id) ?
                    '?as-mod=1' : ''}`, null,
                this.$store.state.auth.head
            )
                .then(res => {
                    this.loading = false
                    this.$store.commit('chatx/LOAD_THREAD', {
                        roommate_info: res.data
                    })
                })
        },
        turnNoti(boolval) {
            this.loading = true
            this.$axios.patch(`chat/${this.threadInfo.id}/roommates/__self`,
                {enable_noti: boolval},
                this.$store.state.auth.head
            )
                .then(res => {
                    this.loading = false
                    this.$store.commit('chatx/BELL_STATE', res.data.enable_noti)
                })
        },
        performLeave() {
            this.loading = true
            this.$axios.delete(`chat/${this.threadInfo.id}/roommates/__self`,
                this.$store.state.auth.head
            )
                .then(res => {
                    this.onBlockHandle()
                })
        },
        onPerformBlock() {this.loading = true},
        onBlockHandle() {
            this.$store.commit('chatx/LOAD_THREAD',
                {roommate_info: {}}
            )
            this.loading = false
            this.$router.back()
        },
    },
    destroyed() {
        this.$store.commit('appBar/BURGER_STATE', false)
    }
}
</script>

<style>
#chat-info {
    background: rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(20px);
    z-index: 8;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
}
#chat-info .common_ls_cntainr{
    padding-top: 90px;
}
.chat-inf__set, .chat-cmd-list {
    color: #fff;
    text-shadow: 0px 0px 5px #555;
}

#chat-info .chat-inf__set{
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
}
.chat-inf__set > .pfp{
    height: 90px;
    width: 90px;
}
.chat-inf__set .cmty_ico{
    height: 40px;
    width: 40px;
    margin: 4px 12px;
}
#chat-info .chat-inf__alias {
    font-size: 22px;
    margin: 10px 20px 25px 20px;
    font-weight: bold;
    text-align: center;
    word-break: break-all;
}

.chat-cmd-list .generic-btn-ls__btn {
    border-bottom: none;
}
</style>
