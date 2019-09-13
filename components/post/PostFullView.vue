<template>
    <div id="inPost">
        <div class="the_big_frame">
                <transition appear name="fade_in">
            <div v-if="cantviewpost" class="la_content" style="padding:34%">
                Can't view post <br>:(
            </div>
            <div v-else class="la_content">

                <div style="min-height:56px"/>
                
                <h3 class="_pf_title" v-if="post.title">{{ post.title }}</h3>

                <n-link class="_pf_author" :to="'/user/' + post.content.author.username">
                    <img class="pfp" :src="post.content.author.profile_pic"/>
                    <div class="_pf_txtxt glow">
                        <p class="_pf_username" :style="'color:#'+post.content.author.fave_color">{{ post.content.author.alias }}</p>
                        <div class="_pf_time">{{ timeAgo(post.content.timestamp) }}</div>
                    </div>
                </n-link>

                <p class="_pf_text">{{ post.content.text }}</p>

                <div>
                <img v-for="attachment in post.content.attachments"
                    class="_pf_img"
                    :key="attachment.ordering"
                    :src="attachment.content"
                /></div>

                <div class="glow"><n-link to="" class="_pf_where">
                    <img class="comu_icon" :src=" post.allocated_to.icon_img">
                    <p>Bài viết được đăng ở <strong>{{ post.allocated_to.name }}</strong> trên <strong>tên mxh của long</strong></p>
                </n-link></div>
                    <!-- <p>Nếu được thì cho quảng cáo kiếm thu nhập ở đây >:)</p> -->

                <!-- <div class="_pf_share">
                    <social-sharing
                        url="https://vuejs.org/"
                        title="The Progressive JavaScript Framework"
                        description="Intuitive, Fast and Composable MVVM for building interactive interfaces."
                        quote="Vue is a progressive framework for building user interfaces."
                        hashtags="vuejs,javascript,framework"
                        twitter-user="vuejs"
                        inline-template>
                    <div>
                        <network network="email">
                            <i class="fa fa-envelope"></i> Email
                        </network>
                        <network network="facebook">
                            <i class="fa fa-facebook"></i> Facebook
                        </network>
                        <network network="googleplus">
                            <i class="fa fa-google-plus"></i> Google +
                        </network>
                        <network network="line">
                            <i class="fa fa-line"></i> Line
                        </network>
                        <network network="linkedin">
                            <i class="fa fa-linkedin"></i> LinkedIn
                        </network>
                        <network network="odnoklassniki">
                            <i class="fa fa-odnoklassniki"></i> Odnoklassniki
                        </network>
                        <network network="pinterest">
                            <i class="fa fa-pinterest"></i> Pinterest
                        </network>
                        <network network="reddit">
                            <i class="fa fa-reddit"></i> Reddit
                        </network>
                        <network network="skype">
                            <i class="fa fa-skype"></i> Skype
                        </network>
                        <network network="sms">
                            <i class="fa fa-commenting-o"></i> SMS
                        </network>
                        <network network="telegram">
                            <i class="fa fa-telegram"></i> Telegram
                        </network>
                        <network network="twitter">
                            <i class="fa fa-twitter"></i> Twitter
                        </network>
                        <network network="vk">
                            <i class="fa fa-vk"></i> VKontakte
                        </network>
                        <network network="weibo">
                            <i class="fa fa-weibo"></i> Weibo
                        </network> 
                        <network network="whatsapp">
                            <i class="fa fa-whatsapp"></i> Whatsapp
                        </network>
                    </div>
                    </social-sharing>
                </div> -->

        <div class="_PFull_stuff">
                <section class="glow">Reactions <span>View detail</span></section> 
            <div class="_pf_reactions">
                <React v-for="react in post.content.react_count"
                    :key="react.react"
                    :reactId="react.react"
                    :reactCount="react.count"
                    :reactData="post.content.reacts"
                    size= "_rea_big"
                />
                <AddReact size="_smol_addo" :community="post.allocated_to.id"/>
            </div>
        </div>
        
        <div class="_PFull_stuff _PF_comments">
            <section>Comments <span>({{post.comment_count}})</span></section>
                
            <div class="_add_cmt glow">
                <img class="pfp" :src="pfp">
                <span>Add yours...</span>
            </div>

            <div v-for="cmt in post.comments"
                :key="cmt.id"
                class="_pf_comments" 
            >
                <div class="_le_cmt">
                    <img class="pfp" :src="cmt.content.author.profile_pic">
                    <div class="_cmt_txt">
                        <div class="_cmt_info">
                            <div class="_cmt_alias"> {{cmt.content.author.alias}} </div>
                            <div class="_cmt_time">• {{timeAgo(cmt.content.timestamp)}}</div>
                            <div class="glow"><i class="material-icons-round">more_horiz</i></div>
                        </div>
                        <p> {{cmt.content.text}} </p>
                        
                        <div v-for="atch in cmt.content.attachments"
                            :key="atch.ordering"
                        >
                            <img v-if="atch.type==2" class="_cmt_pic" :src="atch.content">
                        </div>

                        <div class="_cmt_reacts">
                            <React v-for="react in cmt.content.react_count"
                                :key="react.react"
                                :reactId="react.react"
                                :reactCount="react.count"
                                :reactData="cmt.content.reacts"
                                size= "_rea_smol"
                            />
                            <AddReact size="_smol_addo" :community="post.allocated_to.id"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>

                <div style="min-height:200px"/>
            </div>
                </transition>
        </div>
    </div>
</template>

<script>
import React from './React'
import AddReact from './AddReact'
import { timeAgo } from '@/mixins/timeAgo'
export default {
    components: {
        React,
        AddReact,
    },
    mixins: [
        timeAgo,
    ],
    props: [
        'slug',
    ],
    data() {
        return {
            cantviewpost: false,
        }
    },
    computed: {
        post() {
            return this.$store.state.post.currentPost
        },
        bannerText() {
            if (this.post.title) {
                return this.post.title
            }
            return "Bài đăng của "+ this.post.content.author.alias
        },
        pfp() {
            let pfp = this.$store.state.jwtlogin.stored_profile
            if (pfp) return JSON.parse(pfp).profile_pic
            return null
        },
    },
    asyncData ({ $axios, params }) {

    },
    created() {
        if (!this.post) {
            this.cantviewpost = true
        }
        this.$axios.get(`posts/${this.slug}/?format=json`, 
            this.$store.state.pheader)
        .then(res => {
            this.$store.commit('post/loadPost', res.data)
            this.cantviewpost = false //bruh this
        })
        .catch(error => {
            this.cantviewpost = true
            console.log(error);
        })
    },
    mounted() {
        let container = document.querySelector(".la_content")
        container.addEventListener('scroll', () => {
            if (container.scrollTop > 65) {
                this.$store.commit('detailBanner/loadText', this.bannerText)
            } else {
                this.$store.commit('detailBanner/loadText', null)
            }
        }, {
            capture: true,
            passive: true
        })
    },
    destroyed() {
        this.$store.commit('post/loadPost', null)
    }
}
</script>

<style>
/* #inPost .the_big_frame {
    background: white;
    z-index: 9999999;
} */

._pf_title {
    padding: 10px 15px;
    width: 100%;
    border: 0;
    border-bottom: 1px;
    border-style: solid;
    border-color: #eee;
}

._pf_author {
    margin: 10px 15px;
    margin-top: 20px;
    display: flex;
}
._pf_author .pfp {
    width: 35px;
    height: 35px;
}
._pf_author ._pf_txtxt {
    margin-left: 8px;
    font-size: 15px;
}
._pf_author ._pf_time {
    pointer-events: none;
    font-size: 11px;
    margin-top: 2px;
    color: #aaa;
}

._pf_text {
    margin: 10px 15px;
    margin-top: 5px;
}
._pf_img {
    width: 100%;
}

._pf_where {
    display: flex;
    margin: 15px;
    margin-bottom: 30px;
}
._pf_where .comu_icon {
    height: 32px;
    width: 32px;
    margin: auto 10px auto 0;
}
._pf_where p {
    pointer-events: none;
    margin: auto;
    font-size: 13px;
    color: #aaa;
}

._PFull_stuff {
    width: 100%;
}
._PFull_stuff section {
    margin: 0 15px;
    color: #444;
    /* font-weight: 500; */
    display: flex;
}
._PFull_stuff section span {
    font-weight: normal;
    margin: auto 0 auto auto;
    color: #999;
    font-size: 14px;
}

._pf_reactions {
    /* border: */
    
    padding: 10px 15px;
    /* max-height: 120px; */
    overflow: auto;
}

._PF_comments{
    margin-top: 15px;
}
._PF_comments section span {
    margin-left: 8px;
    font-size: 15px;
}
._PF_comments .pfp {
    width: 35px;
    height: 35px;
}
._add_cmt {
    display: flex;
    padding: 12px 15px 2px 15px;
}
._add_cmt span {
    /* background: #00000022; */
    font-size: 14px;
    color: #aaa;
    border: 1px solid #ccc;
    border-radius: 100px;
    padding: 6px 10px;
    margin: 0 10px;
    width: 100%;
}

._le_cmt {
    margin: 15px;
    display: flex;
    font-size: 14px;
}
._le_cmt ._cmt_txt {
    margin-left: 10px;
    width: 100%;
}
._cmt_txt ._cmt_info {
    display: flex;
    margin-bottom: -3px;
}
._cmt_info ._cmt_alias {
    font-weight: bold;
    /* margin: -5px 5px; */
}
._cmt_info ._cmt_time {
    color: #aaa;
    margin: 2px 5px;
    font-size: 12px;
}
._cmt_info .glow {
    color: #aaa;
    margin-left: auto;
    height: 25px;
}

._cmt_txt p {
    margin-bottom: 5px;
}
._cmt_pic {
    width: 100%;
    border-radius: 20px;
    margin: 2px 0;
}
</style>
