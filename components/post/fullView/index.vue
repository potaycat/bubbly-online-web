<template>
<transition appear name="fade">
    <div id="post-full-view" class="the_big_frame">
        <div class="common_ls_cntainr --dtail-app-bar" ref="feed">

            <h3 ref="title" class="pf-title">{{ post.title }}</h3>

            <nuxt-link class="pf-author" :to="'/user/' + post.author.username">
                <img class="pfp lift" :src="post.author.profile_pic"/>
                <div class="pf-text-info">
                    <p class="hoverline" :style="'color:#'+post.author.fave_color">{{ post.author.alias }}</p>
                    <div class="pf-timestamp">{{ post.timestamp | timeAgo }}
                        <span v-if="post.edited"> • Edited</span>
                    </div>
                </div>
            </nuxt-link>

            <BubblyMarkdownParse :text="post.text" :attachments="post.attachments||post.attachments_preview.atchs" />

            <nuxt-link :to="`/communities/${post.allocated_to.id}`" class="pf__where glow">
                <img class="cmty_ico" :src=" post.allocated_to.icon_img">
                <p>Posted to <strong>{{post.allocated_to.name}}</strong> on <strong> Bubbly </strong></p>
            </nuxt-link>

            <section >
                <p class="pf__react-label">Reactions ({{post.total_reacts}})</p> 
                <div class="pf-reactions">
                    <React v-if="post.reactions"
                        :reacts="reactionsLsSorted"
                        :myReact="post.my_react"
                        :communityId="post.allocated_to.id"
                        size= "react-icon--big"
                        @toggleAdd="launchAddBox"
                        @emoteChose="performReact"
                        @deleteReact="deleteReaction"
                    />
                    <FloatingEmotes v-if="reacting"
                        :position="reacting"
                        :communityId="post.allocated_to.id"
                        @emoteChose="performReact"
                        @cancel="closeEmoteSelector"
                    />
                </div>
            </section>
            
            <Commenting :onPost="post" />
        </div>
        <Dropdown v-if="moring" :options="hamburgerOptions" />
        <InputDialog v-if="openDiag" :toDisplay="openDiag" />
        <Share v-if="sharing" :touchPos="touchPos" :postId="post.id" :postTitle="post.title"/>
    </div>
</transition>
</template>

<script>
import { mapGetters } from "vuex"
import BubblyMarkdownParse from '../mdParse'
import { reactAdd } from '@/mixins/cmpnentsCtrl/reactAdd'
import { performEdit } from '@/mixins/performEdit'
import { performFollow, performBlock } from '@/mixins/performFollow'
import Dropdown from '@/components/misc/Dropdown'
import Commenting from './commenting/'
import { sharePost } from '@/mixins/cmpnentsCtrl/sharePost'
export default {
    components: {
        BubblyMarkdownParse,
        Dropdown,
        Commenting,
    },
    mixins: [reactAdd, performEdit, sharePost,
        performFollow, performBlock],
    props: ['post'],
    computed: {
        ...mapGetters({
            isMod: 'communityx/isMod',
            moring: 'appBar/hmbrgrLaunchd',
        }),
        profile() {return this.post.author}, // to work with performFollow mixin
        bannerText() {
            return this.post.title || `Post by ${this.post.author.alias}`
        },
        hamburgerOptions() {
            const vbName = this.profile.alias
            return [
                ...[
                    {action:'goToReactions', label:'View reactions'},
                    {action:'goToShare', label:'Share...'},
                ],
                ...this.post.author.username==this.$store.state.auth.my_profile.username ? [
                    {action:'goToEdit', label:'Edit'},
                    {action:'confirm_delete', label:'Delete post'},
                ] : [
                    this.post.author.you_follow ? {action:'confirmUnfollow', label:`Unfollow ${vbName}`} :
                        {action:'makeFollow', label:`Follow ${vbName}`},
                    this.post.author.you_block ? {action:'makeUnblock', label:`Unblock ${vbName}`} :
                        {action:'confirmBlock', label:`Block ${vbName}`},
                    this.isMod(this.post.allocated_to.id) ? {action:'confirm_modDelete', label:'[Mod] Remove Post'} :
                        {action:'confirm_report', label:'Report'},
                ],
            ]
        }
    },
    deactivated() {
        this.$store.commit('postx/LOAD_POST', this.post)
    },
    mounted() {
        const tt = this.$refs.title
        const container = this.$refs.feed
        container.addEventListener('scroll', () => {
            if (container.scrollTop > tt.offsetTop) {
                this.$store.commit('appBar/LOAD_TITLE', this.bannerText)
            } else {
                this.$store.commit('appBar/LOAD_TITLE', null)
            }
        }, {
            capture: true,
            passive: true})
    },
    methods: {
        onDropDownPick() {
            this.$store.commit('appBar/BURGER_STATE', false)
        },
        goToShare() {
            this.popItUp({clientX:400})
            this.sharing=true
        }
    }
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
    user-select: text;
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
.pf__where .cmty_ico {
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
