<template>
        <transition appear name="zoom_fade">
    <div id="_c_info">
        <div style="height: 90px"/>
            <transition name="fade">
        <div v-if="loading" class="_lding">
            <Spinner style="margin:auto"/>
        </div>
            </transition>

        <div class="_set_info" v-if="type=='direct'">
            <img class="pfp" :src="threadInfo.meta_data.data.profile_pic">
            <div id="_alias">{{ threadInfo.meta_data.data.alias }}</div>
            <div class="glow _chat_cmd_list">
                <div class="_chat_cmd">
                    <i class="material-icons-round">person</i>
                    <p>View Profile</p>
                    <i class="material-icons-round">launch</i>
                </div>
                <div class="_chat_cmd" @click="command=2">
                    <i class="material-icons-round">block</i>
                    <p>Block</p>
                </div>
            </div>
        </div>
        <div class="_set_info" v-else-if="type=='group'">
            <img v-if="threadInfo.bg_img" class="pfp" :src="threadInfo.bg_img">
            <img v-else class="pfp" style="filter: invert(1)" src="~assets/grup_de.png">
            <div v-if="threadInfo.name" id="_alias">{{ threadInfo.name }}</div>
            <div v-else id="_alias">Chưa đặt tên</div>
        </div>
        <div class="_set_info" v-else-if="type=='public'">
            <div v-if="threadInfo.name" id="_alias">{{ threadInfo.name }}</div>
            <div v-else id="_alias">Chưa đặt tên</div>
            <div class="glow _chat_cmd_list">
                <div class="_chat_cmd">
                    <img class="comu_icon" :src="threadInfo.meta_data.data.icon_img">
                    <p> {{threadInfo.meta_data.data.name}} </p>
                    <i class="material-icons-round">launch</i>
                </div>
            </div>
        </div>

        <div class="glow _chat_cmd_list">
            <div v-if="type=='group'" class="_chat_cmd" @click="more_members=!more_members">
                <i class="material-icons-round">people_outline</i>
                <p>Chat Members ({{threadInfo.meta_data.data.member_count}})</p>
                <i v-if="more_members" class="material-icons-round">expand_less</i>
                <i v-else class="material-icons-round">expand_more</i>
            </div>
        </div>
        <div style="margin-top:-20px"/>
        <Roomates v-if="more_members" :room_id="threadInfo.id"
            :isAdmin="isAdmin"/>
        <div class="glow _chat_cmd_list">
            <!-- <div v-if="threadInfo.meta_data.room_type=='direct'" class="_chat_cmd" @click="command=3">
                <i class="material-icons-round">group_add</i>
                <p>Add Members To Chat</p>
            </div> -->
            <div class="_chat_cmd" @click="command=3">
                <i class="material-icons-round">search</i>
                <p>Search For Message</p>
            </div>
            <div v-if="isAdmin" class="_chat_cmd" @click="command=1">
                <i class="material-icons-round">text_fields</i>
                <p>Change Chat Name</p>
            </div>
            <div v-if="isAdmin||type=='direct'" class="_chat_cmd" @click="command=3">
                <i class="material-icons-round">photo_size_select_actual</i>
                <p>Change Background Image</p>
            </div>
            <div v-if="threadInfo.roommate_info">
                <div class="_chat_cmd" v-if="threadInfo.roommate_info.enable_noti" @click="turnNoti(false)">
                    <i class="material-icons-round">notifications</i>
                    <p>Notification: On</p>
                </div>
                <div class="_chat_cmd" v-else @click="turnNoti(true)">
                    <i class="material-icons-round">notifications_off</i>
                    <p>Notification: Turned Off</p>
                </div>
            </div>
            <div v-else>
                <div class="_chat_cmd" @click="turnNoti()">
                    <i class="material-icons-round">person_add</i>
                    <p>Add to My Chats</p>
                </div>
            </div>
        </div>
        <div class="glow _chat_cmd_list">
            <div class="_chat_cmd" @click="command=4">
                <i class="material-icons-round" style="color:red">exit_to_app</i>
                <p style="color:red">Leave conversation</p>
            </div>
        </div>
        <!-- <p id="tssss">{{ threadInfo }}</p> -->
        <InputDialog v-if="command"
            @btn_emmited="loadDatInfo"
            :leDisplay = "diagContent"
        />
    </div>
        </transition>
</template>

<script>
import Spinner from '@/components/Spinner'
import InputDialog from '@/components/actions/InputDialog'
import Roomates from './Roomates'
export default {
    components: {
        InputDialog,
        Spinner,
        Roomates,
    },
    props: [
        // 'threadInfo',
    ],
    data() {
        return {
            // threadInfo: this.$store.state.tInfo,
            loading: false,
            command: null,
            more_members: false,
        }
    },
    computed: {
        threadInfo() {
            return this.$store.state.chat.currentChat
        },
        isAdmin() {
            let i = this.threadInfo.roommate_info
            if (i) return i.has_admin_role
            return false
        },
        type() {
            return this.threadInfo.meta_data.room_type
        },

        diagContent() {
            switch(this.command) {
                case 1: // CHANGE CHAT NAME
                    return {
                        input_desc: "New Chat Name"
                    }
                case 2: // CONFIRM BLOCK SOMEONE
                    return {
                        title: "Block this person?",
                        description: "They will no longer be able to contact you on this site"
                    }
                case 3:
                    return {
                        alert: true,
                        title: "Feature rolling out soon",
                        description: "Thank you for supporting us!"
                    }
                case 4: // CONFIRM LEAVE CHAT
                    return {
                        title: "Leave this chat?",
                    }
                default: return { alert: true, title: "Hi"}
            }
        }
    },
    methods: {
        turnNoti(boolval) {
            this.loading = true;
            let data = { enable_noti: boolval };
            this.$axios.patch(
                'chat/edit-room-role/?format=json&room='+this.threadInfo.id+'&user_id='+this.$store.state.jwtlogin.my_profile.id,
                data, this.$store.state.pheader)
            .then(res => {
                this.loading = false;
                this.$store.commit('chat/bellUpdate', res.data.enable_noti)
            })
        },
        
        loadDatInfo(datInfo){
            this.command= null
            if (datInfo){ // add cases
                this.loading = true;
                let data = { name: datInfo };
                this.$axios.patch('chat/room-detail/'+this.threadInfo.id+'?format=json',
                    data, this.$store.state.pheader)
                .then(res => { this.loading = false;
                    this.threadInfo.name = res.data.name})
            }
        },

    },
    mounted() {
        setTimeout((index) => { // get rid of the scroll bar
            document.getElementById("_c_info").style["position"]= 'absolute';
        }, 300)
    },
    destroyed() {
        document.getElementById("_c_info").style["position"]= 'fixed'
        this.$store.commit('detailBanner/openInfo', false)
    }
}
</script>

<style>
#_c_info{
    width: 100%;
    min-height: 100vh;
    background: #1d99ff77;
    position: fixed; top: 0; left: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
}
#_c_info ._lding{
    position: fixed;
    width: 100%;
    height: 100%;
    background: #00000033;
    text-align: center;
    display: flex;
    /* z-index: 99; */
}
#_c_info ._set_info div, #_c_info ._chat_cmd_list div{
    color: #fff;
    text-shadow: 0px 0px 17px #333;
}

#_c_info ._set_info{
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
}
._set_info .pfp{
    height: 90px;
    width: 90px;
}
._set_info .comu_icon{
    height: 40px;
    width: 40px;
    margin: 4px 12px;
}
#_c_info #_alias {
    font-size: 22px;
    margin: 10px 20px 25px 20px;
    font-weight: bold;
    text-align: center;
    word-break: break-all;
}

#_c_info ._chat_cmd_list {
    margin-bottom: 20px;
    display: flex;
    flex-direction: column;
    width: 100%;
}

._chat_cmd_list ._chat_cmd {
    width: 100%;
    display: flex;
}
._chat_cmd_list .material-icons-round {
    pointer-events: none;
    margin: 12px 20px;
}
._chat_cmd_list p {
    pointer-events: none;
    margin: auto;
    margin-left: 10px;
    font-size: 16px;
}
</style>
