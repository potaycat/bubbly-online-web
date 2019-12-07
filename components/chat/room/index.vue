<template>
    <div id="inside-chat-room">
        <div class="the_big_frame">
            <transition appear name="fade_in">
                <img class="chat-bg"
                    :style="'background:'+roomBackground"
                />
            </transition>
            <div ref="scrollCtn" class="common_ls_cntainr --dtail-app-bar">
                <transition name="fade">
                    <div v-if="reachedEnd" class="_thread-beginning">
                        👋 Welcome to the beginning<br>of this conversation </div>
                </transition>
                <Spinner v-if="loading4More" color="#fff" />
                
                <Bubble v-for="(message, index) in conversation"
                    :key="message.id"
                    :message="message"
                    :prev="conversation[index-1]"
                    @peak="popItUp($event.pos);performDisplay($event.profile)"
                />
                <PeepTyping :peeps="typing"/>
                
                <div ref="sndBxLev" style="transition:.2s"/>
            </div>
            <transition name="just_slide_up" >
                <button v-if="!atBottom" class="chat__s2b-btn shiny-white-bg box-shadow-2 nopaque" @click="jump2Present()">Jump to present</button>
            </transition>
            <SendBox
                @outBoxing="outBoxing"
                @heightChange="bottomShift"
                @typing="signalTyping"
                @sendEmote="performSendEmote"
            />
        </div>
        <div v-if="fullyLoaded">
            <ChatInfo v-if="moring" :threadInfo="threadInfo" :title="roomTitle[1]" />
            <ProfilePeak v-if="threadInfo.room_type!='direct'&&peakingAt" @close="onClose" 
                :profile="peakingAt" :touchPos="touchPos"
                :threadInfo="threadInfo"
            />
        </div>
        <!-- <button style="position:fixed;top:50%;right:150px;z-index:99999" @click="DEBUG()">DEBUG</button> -->
    </div>
</template>

<script>
import Bubble from './bubble'
import PeepTyping from './PeepTyping'
import { feedingFrenzy } from '@/mixins/feedingFrenzy'
import ChatInfo from './info'
import { profilePeak } from '@/mixins/cmpnentsCtrl/profilePeak'
import { sendingHandler } from './sendBox/sendingHandler'

export default {
    components: {
        Bubble,
        PeepTyping,
        ChatInfo,
    },
    mixins: [feedingFrenzy, profilePeak, sendingHandler],
    data() {
        return {
            feedUrl: `chat/${this.$route.params.id}/history/`,
            typing: [],
            atBottom: true,
            fullyLoaded: false,
        }
    },
    // consts: {
        safeMsgTypes: [5, 9],
    //}
    computed: {
        conversation() {return this.fetchedData.slice().reverse()},
        threadInfo() {return this.$store.state.chatx.currentChat},
        moring() {return this.$store.state.appBar.moring},
        roomBackground() {
            if (this.threadInfo) {
                if (this.threadInfo.bg_img) {
                    return `url(${this.threadInfo.bg_img})`
                }
            }
            return `linear-gradient(${Math.floor(Math.random()*360) // random degree
                }deg, #ff0000, #0000ff)`
        },
        roomTitle() {
            const owo = this.threadInfo            
            if (owo) {
                const t = owo.name
                switch (owo.room_type) {
                    case 'direct':
                        return [
                            {src: owo.room_type_data.profile_pic, style: 'circle'},
                            t || owo.room_type_data.alias
                        ]
                    case 'group':
                        return [null, t || `Nhóm chat ${owo.room_type_data.roommate_count.toString()} người`]
                    case 'public':
                        return [
                            {src: owo.room_type_data.bg_img, style: 'square'},
                            t || owo.room_type_data.community.name + ` #${owo.room_type_data.order}`
                        ]
                }
            }
            return [null, "Loading..."]
        },
    },
    watch: {
        fetchedData() {
            const container = this.$refs.scrollCtn
            if (container.scrollTop < 1) {container.scrollTop = 2} // fixes sticking to top
        },
        roomTitle: {
            immediate: true,
            handler(newVal) {
                if (newVal[0]) this.$store.commit('appBar/loadPic', newVal[0])
                this.$store.commit('appBar/loadText', newVal[1])
            },
        },
    },
    updated() {
        if (this.atBottom) this.scroll2Bottom()
    },
    methods: {
        scrllActive() {
            const container = this.$refs.scrollCtn
            container.addEventListener('scroll', () => {
                if (container.scrollTop <= 350) {
                    if (!this.loading4More && !this.reachedEnd) {
                        this.fetch();
                    }
                }
                if (container.scrollHeight - container.clientHeight <= container.scrollTop + 80) { // +57 is for hiding url bar
                    if(!this.atBottom) this.atBottom=!this.atBottom
                } else if(this.atBottom) this.atBottom=!this.atBottom
            }, {capture: true, passive: true})
        },
        scroll2Bottom() {
            const container = this.$refs.scrollCtn
            if (container.scrollHeight-container.clientHeight> container.scrollTop + 90){
                container.scrollTop = container.scrollHeight;
            }
            else {
                const butter = setInterval(() => { container.scrollBy(0, 1) }, 1)
                setTimeout(() => {
                    clearInterval(butter) // smooth scroll is tiring bruh
                }, 300)
            }
        },
        jump2Present() {
            this.fetchedData=this.fetchedData.slice(0, 35);
            this.reachedEnd = false;
            this.scroll2Bottom()
        },
        onMessageHandler() {
            this.$connect(`${this.$store.state.wsBase}ws/chat/${this.$route.params.id}?token=${this.$store.state.auth.jwt}`)
            this.$options.sockets.onmessage = (res) => {
                const recived = JSON.parse(res.data)
                if (recived.type == 'tpng') { // typing signal
                    if (recived.user.username != this.$store.state.auth.my_profile.username) {
                        const i = this.typing.findIndex(x => x.user.username==recived.user.username)
                        if (i == -1){
                            this.typing.push({
                                user: recived.user,
                                selfDestruct: setTimeout((i) => {
                                    this.typing.splice(i, 1)
                                }, 10000), 
                            });
                        } else {
                            clearTimeout(this.typing[i].selfDestruct);
                            this.typing[i].selfDestruct = setTimeout((i) => {
                                this.typing.splice(i, 1)
                            }, 10000);
                        }
                    }
                }
                else {
                    //todo refector
                    const msg = recived.msg_data
                    if (msg.msg_type == 6) {
                        this.$store.commit('chatx/updateName', msg.content)
                        this.$store.commit('appBar/loadText', msg.content)
                        this.fetchedData.unshift(msg)
                    } else if (msg.msg_type == 7) {
                        this.$store.commit('chatx/updateBgImg', msg.content)
                        this.fetchedData.unshift(msg)
                    } else if (this.$options.safeMsgTypes.includes(msg.msg_type)) {
                        this.fetchedData.unshift(msg)
                    }
                    else if (msg.author.username != this.$store.state.auth.my_profile.username) {
                        // remove "typing" status
                        const i =this.typing.findIndex(x => x.user.username==msg.author.username)
                        if (i != -1) {
                            clearTimeout(this.typing[i].selfDestruct)
                            this.typing.splice(i, 1)
                        }
                        this.fetchedData.unshift(msg)
                    } else { // update my message
                        const index = this.fetchedData.findIndex(x => x.id==recived.c__id)
                        if (index != -1) {
                            const changeThis = this.fetchedData[index]
                            changeThis.timestamp = msg.timestamp
                            changeThis.serverId = msg.id // fix auto re-render
                        }
                    }
                }
            }
        }
    },
    created() {
        this.$axios.get(`chat/${this.$route.params.id}`, 
            this.$store.state.authHeader)
            .then(res => {
                this.$store.commit('chatx/loadChat', res.data)
                this.fullyLoaded = true
            })
        this.onMessageHandler()
    },
    mounted() {
        this.scroll2Bottom()
    },
    destroyed() {
        this.$disconnect()
        if (this.fullyLoaded && this.threadInfo.roommate_info) {
            this.$axios.put(`chat/${this.threadInfo.id}/self-edit`, null,
                this.$store.state.authHeader).then(res => {}) // update last seen
        }
        this.$store.commit('chatx/loadChat', null)
    },
}
</script>

<style>
#inside-chat-room .common_ls_cntainr {
    padding-bottom: 44px;
}
#inside-chat-room .chat-bg {
    z-index: -999;
    height: 100%;
    width: 100%;
    position: absolute;
}

._thread-beginning {
    width: 100%;
    background: linear-gradient(rgb(255,255,255), rgba(0,0,0,0) );
    margin: -69px 0 0 0;
    padding: 80px 0 20px 0;
    text-align: center;
    /* font-weight: bold; */
    color: #eee;
    text-shadow: -1px -1px 0 #444
}

.chat__s2b-btn {
    border-radius: 100px 100px 50px 50px ;
    position: absolute; bottom: 60px;
    left: 50%;
    transform: translateX(-50%);
    padding: 4px 8px;
    font-size: 12px;
    color: rgba(72, 133, 237, 0.75);
    z-index: 5;
    word-spacing: 0;
}
.just_slide_up-enter-active,
.just_slide_up-leave-active {
    transition: .3s;
}
.just_slide_up-enter,
.just_slide_up-leave-to { /* .fade-leave-active below version 2.1.8 */
    margin-bottom: -40px;
}
</style>