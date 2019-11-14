<template>
    <div id="inChat">
        <div class="the_big_frame" v-bind:style="[moring ? {'filter':'blur(15px)'} :null]">
            <transition appear name="fade_in">
                <img class="chat-bg"
                    :style="'background:'+roomBackground"
                />
            </transition>
            <div ref="scrollCtn" class="la_content">
                <div style="min-height: 65px"/>

                <transition name="fade">
                    <div v-if="reachedEnd" class="_thread-beginning">
                        👋 Welcome to the beginning<br>of this conversation </div>
                </transition>

                <div v-if="loading4More" class="_fetch-indcat"><Spinner/>
                </div>
                <Bubble v-for="(message, index) in conversation"
                    :key="message.id"
                    :message="message"
                    :prev="conversation[index-1]"
                />
                <PeepTyping :peeps="typing"/>
                
                <div ref="sndBxLev" style="transition:.2s"/><div style="min-height: 44px;"/>
                
                <transition name="just_slide_up" >
                    <button v-if="!atBottom" id="chat__s2b-btn box-shadow-2" class="nopaque" @click="jump2Present()">Jump to present</button>
                </transition>
                <SendBox
                    @outBoxing="showAnyway"
                    @barHeight="bottomShift"
                />
            </div>
        </div>
        <ChatInfo v-if="moring && fullyLoaded" :threadInfo="threadInfo" :title="roomTitle[1]"/>
        <!-- <button style="position:fixed;top:50%;right:150px;z-index:99999" @click="DEBUG()">DEBUG</button> -->
    </div>
</template>

<script>
import SendBox from './SendBox'
import Bubble from './bubble'
import PeepTyping from './PeepTyping'
import ChatInfo from './info'
import { feedingFrenzy } from '@/mixins/feedingFrenzy'

export default {
    components: {
        SendBox,
        Bubble,
        PeepTyping,
        ChatInfo,
    },
    mixins: [feedingFrenzy],
    data() {
        return {
            feedUrl: `chat/${this.$route.params.id}/history/`,
            typing: [],
            atBottom: true,
            fullyLoaded: false
        }
    },
    computed: {
        conversation() {return this.fetchedData.slice().reverse()},
        threadInfo() {return this.$store.state.chat.currentChat},
        moring() {return this.$store.state.detailBanner.moring},
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
                const t = this.threadInfo.name
                switch (owo.room_type) {
                    case 'direct':
                        return [
                            {
                                src: owo.room_type_data.profile_pic,
                                style: 'circle'
                            },
                            t ? t : owo.room_type_data.alias
                        ]
                    case 'group':
                        return [null, t ? t : `Nhóm chat gồm ${owo.room_type_data.member_count.toString()} người`]
                    case 'public':
                        return [
                            {
                                src: owo.room_type_data.bg_img,
                                style: 'square'
                            },
                            t ? t : "Chat cộng đồng"
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
                if (newVal[0]) this.$store.commit('detailBanner/loadPic', newVal[0])
                this.$store.commit('detailBanner/loadText', newVal[1])
            },
        },
    },
    updated() {
        // this.$nextTick(function () {})
        if (this.atBottom) this.scroll2Bottom()
    },
    methods: {
        scrllActive() {
            const container = this.$refs.scrollCtn
            container.addEventListener('scroll', () => {
                // console.log(evt);
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

            DEBUG(){
                console.log("debug bruh")
            // document.getElementById("the_big_frame").style["filter"]= 'blur(35px)';        
            },
            
        bottomShift(height) { // dynamic send box height
            const butt = this.$refs.sndBxLev
            butt.style["min-height"] = height
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

        showAnyway(outboxMsg) {
            this.fetchedData.unshift(outboxMsg)
        },

        onMessageHandler() {
            this.$connect(`${this.$store.state.wsBase}ws/chat/${this.$route.params.id}?token=${this.$store.state.auth.jwt}`)
            this.$options.sockets.onmessage = (res) => {
                const recived = JSON.parse(res.data)

                if (recived.typing){ // typing signal            
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
                        this.$store.commit('chat/updateName', msg.content)
                        this.$store.commit('detailBanner/loadText', msg.content)
                        this.fetchedData.unshift(msg)
                    } else if (msg.msg_type == 7) {
                        this.$store.commit('chat/updateBgImg', msg.content)
                        this.fetchedData.unshift(msg)
                    } else if (msg.msg_type == 5) {
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
                        const index = this.fetchedData.findIndex(x => x.id==recived.f_pseudoId)
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
        document.querySelector('body').style['overscroll-behavior']='contain'

        this.$axios.get(`chat/${this.$route.params.id}`, 
            this.$store.state.authHeader)
            .then(res => {
                this.$store.commit('chat/loadChat', res.data)
                this.fullyLoaded = true
            })

        this.onMessageHandler()
    },
    destroyed() {
        this.$disconnect()
        if (this.threadInfo.roommate_info) {
            this.$axios.patch(`chat/${this.threadInfo.id}/self-edit`, null,
                this.$store.state.authHeader).then(res => {}) // update last seen
        }
        this.$store.commit('chat/loadChat', null)
    },
}
</script>

<style>
/* big frame at main css */
#inChat .chat-bg {
    z-index: -999;
    height: 100%;
    width: 100%;
    position: fixed;
}

#chat__s2b-btn {
    border-radius: 100px 100px 50px 50px ;
    position: fixed; bottom: 60px;
    left: 50%;
    transform: translateX(-50%);
    padding: 4px 8px;
    background: #ffffffcc;
    font-size: 12px;
    color: rgba(72, 133, 237, 0.75);
    z-index: 19;
    word-spacing: 0;
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

._fetch-indcat {
    text-align: center;
    width: 100%;
    transform: scale(0.7)
}
</style>