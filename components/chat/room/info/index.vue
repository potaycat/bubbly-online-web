<template>
<transition appear name="zoom_fade">
    <div id="chat-info" class="the_big_frame">
        <div class="common_ls_cntainr">

            <div class="_set_info" v-if="type=='direct'">
                <img class="pfp" :src="threadInfo.room_type_data.profile_pic">
                <div id="_alias">{{ title }}</div>
            </div>
            <div class="_set_info" v-else-if="type=='group'">
                <img v-if="threadInfo.bg_img" class="pfp" :src="threadInfo.bg_img">
                <img v-else class="pfp" style="filter: invert(1)" src="~assets/group.png">
                <div id="_alias">{{ title }}</div>
                <Roomates v-if="more_members" :threadInfo="threadInfo"
                    :isAdmin="isAdmin"/>
            </div>
            <div class="_set_info" v-else-if="type=='public'">
                <div id="_alias">{{ title }}</div>
                <!-- cmnty name, room dscrption -->
            </div>

            <div v-for="cmdGroup in visibleCmd" class="_chat-cmd-list" :key="cmdGroup[0].icon+'_'">
                <div v-for="cmd in cmdGroup"
                    :key="cmd.icon"
                    class="_chat-cmd glow"
                    :style="cmd.style"
                    @click="cmd.action()"
                >
                    <i class="material-icons-round">{{ cmd.icon }}</i>
                    <p>{{ cmd.lable }}</p>
                    <i class="material-icons-round">{{ cmd.scndIcon }}</i>
                </div>
            </div>

        </div>
        <InputDialog v-if="openDiag"
            :toDisplay = "openDiag"
            @clicked="onDiagClose"
        />
        <transition name="fade">
            <div v-if="loading" class="total_darkness">
                <Spinner color="#fff" />
            </div>
        </transition>
    </div>
</transition>
</template>

<script>
import Spinner from '@/components/misc/Spinner'
import Roomates from './Roomates'
import { performBlock } from '@/mixins/performFollow'

export default {
    components: {Spinner, Roomates},
    mixins: [performBlock],
    props: ['threadInfo', 'title'],
    data: () => ({
        loading: false,
        more_members: false,
    }),
    computed: {
        // threadInfo() {
        //     return this.$store.state.chat.currentChat
        // },
        visibleCmd() {
            return [
                this.type == 'direct' ? 
                    [
                        {icon: "person", lable: "View Profile", action: this.toProfile, scndIcon: "arrow_forward"},
                        {icon: "block", lable: "Block", action: this.confirmBlock},
                    ] :
                this.type == 'group' ?
                    [
                        {
                            icon: "people_outline",
                            lable: `Chat Members (${this.spcfcTypdData.member_count})`,
                            action: this.showRoomates,
                            scndIcon: this.more_members ? "expand_less" : "expand_more"
                        },
                    ] :
                this.type == 'public' ?
                    [
                        {icon: "group_work", lable: "Go to community", action: this.toCommunity, scndIcon: "launch"},
                    ] :
                null,
                [
                    this.isAdmin && this.type != 'direct' ?
                        {icon: "text_fields", lable: "Change Chat Name", action: this.cnfrm_ChngeName} :null,

                    this.isAdmin || this.type == 'direct' ?
                        {icon: "photo_size_select_actual", lable: "Change Background Image", action: this.cnfrm_ChngeBg} :null,

                    {icon: "search", lable: "Search For Message", action: this.soon},

                    this.threadInfo.roommate_info ?
                        this.threadInfo.roommate_info.enable_noti ?
                            {icon: "notifications", lable: "Notification: On", action: this.turnNotiOff} : 
                            {icon: "notifications_off", lable: "Notification: Turned Off", action: this.turnNotiOn} : 
                        {icon: "person_add", lable: "Add to My Chats", action: this.cnfrm_AddPblcRoom},
                ].filter(x => x), // removes nulls
                this.threadInfo.roommate_info ? 
                    [
                        {icon: "exit_to_app", lable: "Leave conversation", action: this.cnfrm_Leave, style: 'color:red'},
                    ] :
                null,
            ].filter(x => x)
        },
        isAdmin() {
            return this.threadInfo.roommate_info && this.threadInfo.roommate_info.is_admin
        },
        type() {return this.threadInfo.room_type},
        spcfcTypdData() {return this.threadInfo.room_type_data},
        profile() { // to work with follow mixin
            if (this.type == 'direct') {
                return this.spcfcTypdData
            }
            console.log("Room type is not direct!")
            return null
        }
    },
    methods: {
        cnfrm_ChngeName() {
            this.openDiag = {
                input_desc: "New Chat Name"
            }
            this.diagHndlFun = this.performChngeName
        },
        cnfrm_ChngeBg() {
            this.openDiag = {
                input_desc: "Bg img url" // todo img uploader
            }
            this.diagHndlFun = this.performChngeBg
        },
        cnfrm_Leave() {
            this.openDiag = {
                title: "Leave this chat?",
            }
            this.diagHndlFun = this.performLeave
        },
        cnfrm_AddPblcRoom() {
            this.openDiag = {
                title: "Save this public chat room?",
                description: "It will appear in your chat list and you will recieve notifications"
            }
            this.diagHndlFun = this.performAddPblcRoom
        },
        showRoomates() {this.more_members = !this.more_members},
        turnNotiOn() {this.turnNoti(true)},
        turnNotiOff() {this.turnNoti(false)},
        toProfile() {this.$router.push(`/user/${this.profile.username}`)},
        toCommunity() {this.$router.push(`/community/${this.spcfcTypdData.id}`)},
        soon() {
            this.openDiag = {
                alert: true,
                title: "Feature rolling out soon",
                description: "Thank you for supporting us!"
            }
        },

        // TODO put all these POST in a unified place
        performChngeName(value){
            this.loading = true
            this.$axios.patch(`chat/${this.threadInfo.id}`,
                {name: value},
                this.$store.state.authHeader
            )
                .then(res => {
                    this.loading = false
                })
        },
        performChngeBg(imgUrl) {
            this.loading = true
            this.$axios.patch(`chat/${this.threadInfo.id}`,
                {bg_img: imgUrl},
                this.$store.state.authHeader
            )
                .then(res => {
                    this.loading = false
                })
        },
        performAddPblcRoom() {
            this.loading = true
            this.$axios.post(`chat/${this.threadInfo.id}/save-as-public`, null,
                this.$store.state.authHeader
            )
                .then(res => {
                    this.loading = false
                    this.$store.commit('chat/pblcRoomSaved', res.data)
                })
        },
        turnNoti(boolval) {
            this.loading = true
            this.$axios.patch(`chat/${this.threadInfo.id}/self-edit`,
                {enable_noti: boolval},
                this.$store.state.authHeader
            )
                .then(res => {
                    this.loading = false
                    this.$store.commit('chat/bellUpdate', res.data.enable_noti)
                })
        },
        performLeave() {
            this.loading = true
            this.$axios.delete(`chat/${this.threadInfo.id}/self-edit`,
                this.$store.state.authHeader
            )
                .then(res => {
                    this.loading = false
                    this.$store.commit('chat/pblcRoomSaved', null)
                    this.$router.back()
                })
        },
        onPerformBlock() {this.loading = true},
        onBlockHandle() {
            this.$store.commit('chat/pblcRoomSaved', null)
            this.loading = false
            this.$router.back()
        },
    },
    destroyed() {
        this.$store.commit('appBar/burgerState', false)
    }
}
</script>

<style scoped>
#chat-info{
    width: 100%;
    min-height: 100vh;
    background: #1d99ff77;
    position: fixed; top: 0; left: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
}
#chat-info .common_ls_cntainr{
    padding-top: 90px;
}
#chat-info ._set_info #_alias, #chat-info ._chat-cmd-list ._chat-cmd{
    color: #fff;
    text-shadow: 0px 0px 17px #333;
}

#chat-info ._set_info{
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
}
._set_info .pfp{
    height: 90px;
    width: 90px;
}
._set_info .cmnty-ico{
    height: 40px;
    width: 40px;
    margin: 4px 12px;
}
#chat-info #_alias {
    font-size: 22px;
    margin: 10px 20px 25px 20px;
    font-weight: bold;
    text-align: center;
    word-break: break-all;
}

#chat-info ._chat-cmd-list {
    margin-bottom: 20px;
    display: flex;
    flex-direction: column;
    width: 100%;
}

._chat-cmd-list ._chat-cmd {
    width: 100%;
    display: flex;
}
._chat-cmd-list .material-icons-round {
    margin: 12px 20px;
}
._chat-cmd-list p {
    margin: auto;
    margin-left: 10px;
    font-size: 16px;
}
</style>
