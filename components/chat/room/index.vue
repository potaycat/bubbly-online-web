<template>
    <div id="inside-chat-room">
        <div class="the_big_frame">
            <transition appear name="fade">
                <div class="chat-bg box-shadow-2"
                    :style="'background:'+roomBackground"
                />
            </transition>
            <div ref="scrollCtn" class="common_ls_cntainr --dtail-app-bar">
                <transition name="fade">
                    <div v-if="reachedEnd" class="_thread-beginning">
                        👋 Welcome to the beginning<br>of this conversation </div>
                </transition>
                <Spinner v-if="loading4More" style="margin: 10px 0 30px"
                    :color="roomBackground=='#fefefe'?'#888':'#fff'"/>
                
                <Bubble v-for="(message, index) in conversation"
                    :key="message.pseudoId || message.id"
                    :message="message"
                    :prev="conversation[index-1]"
                    @peak="popItUp($event.pos);performDisplay($event.profile)"
                />
                <PeepTyping :peeps="typing"/>
                
                <div ref="sndBxLev" style="transition:.2s"/>
            </div>
            <transition name="just_slide_up" >
                <button class="chat__s2b-btn shiny-white-bg box-shadow-2 nopaque --lite" v-if="!atBottom"
                    @click="scroll2Bottom">Jump to present</button>
            </transition>
            <SendBox
                @heightChange="bottomShift"
                @typing="signalTyping"
                @textOutbox="textOutBoxing"
                @sendEmote="emoteOutBoxing"
                @picPick="imageOutBoxing"
            />
        </div>
        <div v-if="fullyLoaded">
            <ChatInfo v-if="$store.state.appBar.moring" :threadInfo="threadInfo" :title="roomTitle[1]"/>
            <ProfilePeak v-if="threadInfo.room_type!='direct'&&peakingAt" @close="onClose" 
                :profile="peakingAt" :touchPos="touchPos"
                :threadInfo="threadInfo"
            />
        </div>
    </div>
</template>

<script>
import Bubble from './bubble'
import PeepTyping from './PeepTyping'
import { feedingFrenzy } from '@/mixins/feedingFrenzy'
import ChatInfo from './info'
import { profilePeak } from '@/mixins/cmpnentsCtrl/profilePeak'
import { sendingHandler } from './sendBox/sendingHandler'
import Spinner from '@/components/misc/Spinner'

export default {
    components: {
        Bubble,
        PeepTyping,
        ChatInfo,
        Spinner
    },
    mixins: [feedingFrenzy, profilePeak, sendingHandler],
    data() {
        return {
            typing: [],
            atBottom: true,
            fullyLoaded: false,
            roomId: this.$route.query.room || this.$route.params.id || this.threadInfo.id,
        }
    },
    // consts: {
        safeMsgTypes: [6, 7, 5, 9],
        randomDeg: Math.floor(Math.random()*360),
    //}
    computed: {
        threadInfo() {return this.$store.state.chatx.currentChat ||{}},
        feedUrl() {return `chat/${this.roomId}/history/?limit=30&`},
        conversation() {return this.fetchedData.slice().reverse()},
        roomBackground() {
            if (this.threadInfo.bg_img) {
                return `url(${this.threadInfo.bg_img})`
            }
            if (this.threadInfo.room_type == 'direct') {
                return `linear-gradient(${this.$options.randomDeg
                    }deg, #${this.$store.state.auth.my_profile.fave_color}, #${this.threadInfo.room_type_data.fave_color})`
            } return "#fefefe"
        },
        roomTitle() {
            const owo = this.threadInfo.room_type_data
            const tName = this.threadInfo.name
            switch (this.threadInfo.room_type) {
                case 'direct':
                    return [
                        {src: owo.profile_pic, style: 'circle'},
                        tName || owo.alias
                    ]
                case 'group':
                    return [{}, tName || `Nhóm chat ${owo.roommate_count} người`]
                case 'public':
                    return [
                        {src: owo.bg_img, style: 'square'},
                        tName || owo.community.name + ` #${owo.order}`
                    ]
            } return [{}, null]
        },
    },
    watch: {
        fetchedData() {
            if (!this.atBottom) {
                const container = this.$refs.scrollCtn
                const curntHeight = container.scrollHeight
                this.$nextTick(() => { // fixes sticking to top
                    container.scrollTop = container.scrollHeight - curntHeight
                })
            } else {
                this.$nextTick(() => {
                    this.scroll2Bottom()
                })
            }
        },
        typing() {
            if (this.atBottom) {
                this.$nextTick(() => {
                    this.scroll2Bottom()
                })
            }
        },
        roomTitle: {
            immediate: true,
            handler(newVal, oldVal) {
                this.$store.commit('appBar/LOAD_ICON', newVal[0])
                this.$store.commit('appBar/LOAD_TITLE', newVal[1])
            },
        },
    },
    methods: {
        scrllActive() {
            const ctnr = this.$refs.scrollCtn
            ctnr.addEventListener('scroll', () => {
                if (ctnr.scrollTop <= 350) {
                    if (!this.loading4More && !this.reachedEnd) {
                        this.fetch()
                    }
                }
                if (ctnr.scrollHeight-ctnr.clientHeight-ctnr.scrollTop <= 200) { // +57 is for hiding url bar
                    if (!this.atBottom) this.atBottom = true
                } else if (this.atBottom) this.atBottom = false
            }, {capture: true, passive: true})
        },
        scroll2Bottom() {
            this.atBottom = true
            const ctnr = this.$refs.scrollCtn
            if (ctnr.scrollHeight-ctnr.clientHeight-ctnr.scrollTop > 500 || !ctnr.scrollTo) {
                ctnr.scrollTop = ctnr.scrollHeight
            } else {
                ctnr.scrollTo({
                    top: ctnr.scrollHeight,
                    behavior: this.fetchedData.length<31?'smooth':null
                })
            }
        },
        updateSeen() {
            if (this.fullyLoaded) {
                if (this.threadInfo.roommate_info) {
                    this.$axios.put(`chat/${this.roomId}/roommates/__self`, null,
                        this.$store.state.auth.head)
                        .catch(err => console.error("CATCHED: "+err))
                }
                if (this.threadInfo.last_msg) {
                    this.$store.commit('chatx/UPDATE_LAST_MSG', this.threadInfo.last_msg)
                }
            }
        },
    },
    created() {
        this.$axios.get(`chat/${this.roomId}`, 
            this.$store.state.auth.head)
            .then(res => {
                this.$store.commit('chatx/LOAD_THREAD', res.data)
                this.fullyLoaded = true
                this.updateSeen()
            })
        this.$connect(`${process.env.WS_BASE}/ws/chat/${this.roomId}?token=${this.$store.state.auth.jwt}`)
            this.$options.sockets.onmessage = (res) => { // collasp for easier skimming
                const recived = JSON.parse(res.data)
                if (recived.type == 'tpng') {
                    // typing signal
                    if (recived.user.username != this.$store.state.auth.my_profile.username) {
                        const i = this.typing.findIndex(x => x.user.username==recived.user.username)
                        if (i == -1) {
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
                // else if (recived.type == 'update') {
                // }
                else {
                    const msg = recived.msg_data
                    this.$store.commit('chatx/UPDATE_LAST_MSG', msg)
                    if (this.$options.safeMsgTypes.includes(msg.msg_type)) {
                        this.fetchedData.unshift(msg)
                    }
                    if (msg.msg_type == 6) {
                        this.$store.commit('chatx/LOAD_THREAD', { name: msg.content })
                        this.$store.commit('appBar/LOAD_TITLE', msg.content)
                    } else if (msg.msg_type == 7) {
                        this.$store.commit('chatx/LOAD_THREAD', { bg_img: msg.content })
                    }
                    else if (msg.author.username != this.$store.state.auth.my_profile.username) {
                        // remove "typing" status
                        const i =this.typing.findIndex(x => x.user.username==msg.author.username)
                        if (i != -1) {
                            clearTimeout(this.typing[i].selfDestruct)
                            this.typing.splice(i, 1)
                        }
                        this.fetchedData.unshift(msg)
                    } else {
                        // update my message
                        const index = this.fetchedData.findIndex(x => x.pseudoId==recived.nonce)
                        if (index != -1) {
                            for (const key in msg)
                                this.fetchedData[index][key] = msg[key]
                        } else {
                            this.fetchedData.unshift(msg)
                        }
                    }
                }
            }
    },
    mounted() {
        this.scroll2Bottom()
        window.addEventListener('resize', () => {
            if (this.atBottom) this.scroll2Bottom()
        })
    },
    beforeDestroy() {
        this.updateSeen()
        this.$disconnect()
        this.$store.commit('chatx/LOAD_THREAD', null)
        this.$emit('cleansed')
    },
}
</script>

<style>
#inside-chat-room .common_ls_cntainr {
    padding-bottom: 44px;
    z-index: 2; 
    /* disable pull to refresh */
}
#inside-chat-room .chat-bg {
    z-index: -9;
    height: 100vh;
    width: 100%;
    position: absolute;
    background-size: cover;
    background-repeat: no-repeat;
    transition: background;
}

._thread-beginning {
    width: 100%;
    background: linear-gradient(#fff, rgba(0,0,0,0));
    margin: -69px 0 0 0;
    padding: 80px 0 20px 0;
    text-align: center;
    /* font-weight: bold; */
    color: #eee;
    text-shadow: 0px 0px 3px rgba(0, 0, 0, 1);
}

.chat__s2b-btn {
    border-radius: 100px 100px 50px 50px ;
    position: absolute; bottom: 60px;
    left: 50%;
    transform: translateX(-50%);
    padding: 4px 8px;
    font-size: 12px;
    color: var(--primary-color);
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