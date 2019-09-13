<template>
    <div id="inChat">
        <div class="the_big_frame" v-bind:style="[moring ? {'filter':'blur(15px)'} :null]"><div class="la_content">
            <transition appear name="fade_in">
                <img class="_chat_bg"></transition>
            <div style="min-height: 65px"/>

            <transition name="fade">
                <div v-if="reachedEnd" class="_thread_beginning">
                    👋 Welcome to the beginning<br>of this conversation </div>
            </transition>

            <div v-if="loading4More" class="_fetchin_indcat"><Spinner/>
            </div>
            <Bubble v-for="(message, index) in conversation"
                :key="message.id"
                :message="message"
                :prev="conversation[index-1]"
            />
            <PeepTyping :peeps="typing"/>
            
            <div id="_bottomH" style="transition:.2s"/><div style="min-height: 44px;"/>
            
            <div class="nopaque"><transition name="just_slide_up" >
                <button v-if="!atBottom" id="_s2b_btn" @click="jump2Present()">Jump to present</button>
            </transition></div>
            <SendBox
                @sentMeMsg="viewMyMsgNow"
                @barHeight="bottomShift"
            />
        </div></div>
        <ChatInfo v-if="moring && threadInfo"/>
        <!-- <button style="position:fixed;top:550px;right:150px;z-index:99999" @click="DEBUG()">DEBUG</button> -->
    </div>
</template>

<script>
import SendBox from './SendBox'
import Bubble from './bubble/Bubble'
import Spinner from '@/components/Spinner'
import PeepTyping from './PeepTyping'
import ChatInfo from './info/ChatInfo'
export default {
    components: {
        SendBox,
        Bubble,
        Spinner,
        PeepTyping,
        ChatInfo,
    },
    data() {
        return {
            conversation: [], //equavelent to fetched data
            typing: [],

            loading4More: false,
            reachedEnd: false,

            atBottom: true,
        }
    },
    updated() {
        // console.log("oh no");
        
        // this.$nextTick(function () {})
        if (this.atBottom) this.scroll2Bottom()
    },
    computed: {
        moring() {
            return this.$store.state.detailBanner.moring
        },
        threadInfo() {
            return this.$store.state.chat.currentChat
        },
    },
    methods: {
            DEBUG(){
            console.log("debug bruh");
            // console.log(this.butteryscroll);
        
            // document.getElementById("the_big_frame").style["filter"]= 'blur(35px)';        
            },
            
        viewMyMsgNow(myMsg) {
            this.conversation.push( myMsg );
        },
        bottomShift(height) {
            let butt = document.querySelector("#_bottomH");
            butt.style["min-height"] = height
        },
        butt(){ this.atBottom=!this.atBottom },

        scroll2Bottom() {
            let container = document.querySelector(".la_content");
            if (container.scrollHeight-container.clientHeight> container.scrollTop + 90){
                container.scrollTop = container.scrollHeight;
            }
            else {
                let butter = setInterval(() => { container.scrollBy(0, 1) }, 1)// smooth scroll
                setTimeout(() => {
                    clearInterval(butter) // smooth scroll is tiring bruh
                }, 300);
            }
        },
        jump2Present() {
            this.reachedEnd = false;
            this.conversation=this.conversation.slice(-30, );
            this.scroll2Bottom();
        },

        fetch(last_msg) {
            this.loading4More = true
            this.$axios.get('chat/history/?format=json&thread='+this.$route.params.id+'&offset='+last_msg,
                this.$store.state.pheader)
            .then(res => {
                if (res.data.length < 20) this.reachedEnd = true
                let container = document.querySelector(".la_content");
                if (container.scrollTop == 0) {container.scrollTop = 100}
                
                this.conversation.unshift(...res.data.reverse());
                this.loading4More = false
            })
        },

        initRoom(){
            if (!this.$store.state.detailBanner.text) {
                let owo = this.threadInfo.meta_data
                if (owo.room_type == "group") {
                    let t = this.threadInfo.name
                    if (!t) {
                        t = "Nhóm chat gồm "+owo.data.member_count.toString()+" người"
                    }
                    this.$store.commit('detailBanner/loadText', t);
                }
                if (owo.room_type == "direct") {
                    let prases = ['Chat riêng', 'Chat riêng', 'Chat riêng', 'Chat riêng', 'Chat riêng', 'Chat riêng', 'Chat riêng', 'Thì thầm'];//, 'Nói nhỏ', 'Cách cảm'];
                    let t = prases[Math.floor(Math.random() * prases.length)]; // reconsider this .-.
                    this.$store.commit('detailBanner/loadText', t+" với "+owo.data.alias);
                }
            }
            this.$nextTick(() => {
                let bg = document.querySelector("#inChat ._chat_bg")
                if (this.threadInfo.bg_img) {
                    bg.src = this.threadInfo.bg_img
                } else if (!bg.style.background) {
                    bg.style.background= 'linear-gradient(' + Math.floor(Math.random() * (360)) // random degree
                        +'deg,' + 'rgb(252,0,0)' + ',' + 'rgb(0, 0, 255)' +')'
                }
            })

        }
    },
    created() {
        let body = document.querySelector('body')
        body.style['overscroll-behavior']= 'contain';

        this.$connect(this.$store.state.wsBase+'ws/chat/'+this.$route.params.id+'/?token='+this.$store.state.jwtlogin.jwt)
        // this.conversation.unshift(...this.threadInfo.last_few_msgs.reverse());
        // delete this.threadInfo.last_few_msgs
        if (this.conversation.length==0) this.fetch('')
        // else this.fetch(this.conversation[0].id)
        if (this.threadInfo) {
            this.initRoom()
        }
        this.$axios.get('chat/room/?format=json&id='+this.$route.params.id, 
            this.$store.state.pheader)
        .then(res => {
            this.$store.commit('chat/loadChat', res.data)
            this.initRoom()
        })
        
        this.$options.sockets.onmessage = (res) => {
            let recived = JSON.parse(res.data)

            if (recived.msg_data.msg_type == 9){ // typing indicator            
                if (recived.user.id != this.$store.state.jwtlogin.my_profile.id) {
                    let index = this.typing.findIndex(x => x.user.id ==recived.user.id);
                    if (index == -1){
                        this.typing.push({
                            user: recived.user,
                            selfDestruct: setTimeout((index) => {
                                this.typing.splice(index, 1);
                            }, 10000), 
                        });
                    } else {
                        clearTimeout(this.typing[index].selfDestruct);
                        this.typing[index].selfDestruct = setTimeout((index) => {
                            this.typing.splice(index, 1);
                        }, 10000);
                    }
                }
            }

            else {
                if (recived.msg_data.author.id != this.$store.state.jwtlogin.my_profile.id){
                    this.conversation.push( recived.msg_data );
                    let index =this.typing.findIndex(x => x.user.id ==recived.msg_data.author.id)
                    if (index != -1){ //remove "typing" status
                        clearTimeout(this.typing[index].selfDestruct);
                        this.typing.splice(index, 1);
                    }
                }
                else {
                    let index =this.conversation.findIndex(x => x.id==recived.f_pseudoId)
                    let changeThis = this.conversation[index]
                    
                    changeThis.timestamp = recived.msg_data.timestamp;
                    changeThis.realId = recived.msg_data.id; // fixes auto re-render
                }
            }
        }
    },
    mounted() {
        // INFINITE SCROLL // Can't mixins due to distinct functionalities 
        let container = document.querySelector(".la_content");
        container.addEventListener('scroll', () => {
            // console.log(evt);
            if (container.scrollTop <= 400) {
                if (!this.loading4More && !this.reachedEnd) {
                    this.fetch(this.conversation[0].id);
                }
            }
            if (container.scrollHeight - container.clientHeight <= container.scrollTop + 80) { // +57 is for hiding url bar
                if(!this.atBottom) this.butt()
            } else { if(this.atBottom) this.butt() }
        }, {
            capture: true,
            passive: true})
        // End of infinite scroll
    },
    destroyed() {
        this.$disconnect()
        this.$store.commit('chat/loadChat', null)
    },
}
</script>

<style>
/* big frame at main css */
#inChat .the_big_frame ._chat_bg{
    z-index: -999;
    height: 100%;
    width: 100%;
    position: fixed;
}

#_s2b_btn {
  box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
    border-radius: 100px 100px 50px 50px ;
    position: fixed; bottom: 61px; left: 39%;
    padding: 4px 8px;
    background: #ffffffcc;
    font-size: 12px;
    color: rgba(72, 133, 237, 0.75);
    z-index: 19;
}

._thread_beginning {
    width: 100%;
    background: linear-gradient(rgb(255,255,255), rgba(0,0,0,0) );
    margin: -69px 0 0 0;
    padding: 80px 0 20px 0;
    text-align: center;
    /* font-weight: bold; */
    color: #eee;
    text-shadow: -1px -1px 0 #444
}

._fetchin_indcat {
    text-align: center;
    width: 100%;
}
</style>