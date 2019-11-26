<template>
<transition appear name="fade_in">
    <div id="post-full-view" class="the_big_frame">
        <div class="common_ls_cntainr --dtail-app-bar" ref="feed">

            <h3 ref="title" class="pf-title">{{ post.title }}</h3>

            <nuxt-link class="pf-author" :to="'/user/' + post.author.username">
                <img class="pfp lift" :src="post.author.profile_pic"/>
                <div class="pf-text-info">
                    <p class="glow" :style="'color:#'+post.author.fave_color">{{ post.author.alias }}</p>
                    <div class="pf-timestamp">{{ post.timestamp | timeAgo }}</div>
                </div>
            </nuxt-link>

            <BubblyMarkdownParse :text="post.text" :attachments="post.attachments" />

            <nuxt-link :to="`/community/${post.allocated_to.id}`" class="pf__where glow">
                <img class="cmnty-ico" :src=" post.allocated_to.icon_img">
                <p>Được đăng ở <strong>{{ post.allocated_to.name }}</strong> trên <strong>tên mxh của long</strong></p>
            </nuxt-link>

            <section >
                <p class="pf__react-label glow">Reactions ({{post.total_reacts}})</p> 
                <div class="pf-reactions">
                    <React
                        :reacts="reactionsLsSorted"
                        :myReact="post.my_react"
                        :communityId="post.allocated_to.id"
                        size= "react-icon--big"
                        @toggleAdd="launchAddBox"
                        @quickReact="performReact"
                        @deleteReact="deleteReaction"
                    />
                    <ReactAdd v-if="reacting"
                        :position="reacting"
                        :communityId="post.allocated_to.id"
                        @performReact="performReact"
                    />
                </div>
            </section>
            
            <Commenting :onPost="post" />
        </div>
        <Dropdown v-if="moring" @pick="onDropDownPick"
            :options="hamburgerOptions"
        />
    </div>
</transition>
</template>

<script>
import { mapGetters } from "vuex"
import BubblyMarkdownParse from '../mdParse'
import { _comp_reactAdd } from '@/mixins/_comp_reactAdd'
import Dropdown from '@/components/misc/Dropdown'

import Commenting from './commenting/'
export default {
    components: {
        BubblyMarkdownParse,
        Dropdown,
        Commenting,
    },
    mixins: [_comp_reactAdd],
    props: ['post'],
    computed: {
        ...mapGetters({
            isMod: 'moderating/isMod',
            moring: 'appBar/hmbrgrLaunchd',
        }),
        profile() {return this.post.author}, // to work with performFollow mixin
        bannerText() {
            if (this.post.title) {
                return this.post.title
            }
            return "Bài đăng của "+ this.post.author.alias
        },
        hamburgerOptions() {
            const vbName = this.profile.alias
            return [
                ...this.post.author.username==this.$store.state.auth.my_profile.username ? [
                    {value:'edit', name:'Edit'},
                    {value:'delete', name:'Delete post'},
                ] : [
                    this.post.author.you_follow ? {value:'unfollow', name:`Unfollow ${vbName}`} :
                        {value:'follow', name:`Follow ${vbName}`},
                    this.post.author.you_block ? {value:'unblock', name:`Unblock ${vbName}`} :
                        {value:'block', name:`Block ${vbName}`},
                    this.isMod(this.post.allocated_to.id) ? {value:'mod_delete', name:'[Mod] Remove comment'} :
                        {value:'flag', name:'Report'},
                ],
                ...[
                    {value:'copyLink', name:'Copy post URL'},
                ]
            ]
        }
    },
    mounted() {
        const tt = this.$refs.title
        const container = this.$refs.feed
        container.addEventListener('scroll', () => {
            if (container.scrollTop > tt.offsetTop) {
                this.$store.commit('appBar/loadText', this.bannerText)
            } else {
                this.$store.commit('appBar/reset')
            }
        }, {
            capture: true,
            passive: true})
    },
    methods: {
        onDropDownPick(value) {
            this.$store.commit('appBar/burgerState', false)
            switch (value) {
                default:
                    break
            }
        },

        
    },
}
</script>

<style>
#post-full-view .common_ls_cntainr {
    padding: 56px 15px 80px 15px;
    align-items: flex-start;
}

.pf-title {
    padding: 0 41px;
    padding-bottom: 10px;
    width: 100%;
    border-bottom: solid 1px #eee;
}

.pf-author {
    margin: 15px 0 10px;
    display: flex;
}
.pf-author .pfp {
    width: 35px;
    height: 35px;
}
.pf-author .pf-text-info {
    margin-left: 8px;
    font-size: 14px;
}
.pf-author .pf-timestamp {
    font-size: 10px;
    margin: 2px 0 5px;
    color: #aaa;
}

.pf__where {
    display: flex;
    align-items: center;
    margin: 20px 0 20px;
}
.pf__where .cmnty-ico {
    height: 26px;
    width: 26px;
}
.pf__where > p {
    margin-left: 10px;
    font-size: 11px;
    color: #bfbfbf;
}

.pf-stuff .pf__react-label {
    color: #444;
    /* font-weight: 500; */
}

.pf-reactions {
    padding: 10px 0;
    max-height: 120px;
    overflow: auto;
}



.unused-attchs {
    margin: 15px -15px 0 -15px;
}
</style>
