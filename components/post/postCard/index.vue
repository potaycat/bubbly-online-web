<template>
    <div class="the-post card box-shadow-1">
        
        <section v-if="post.allocated_to" class="p__info">
            <img class="cmnty_ico lift" :src="post.allocated_to.icon_img"
                @click="$router.push(`/communities/${post.allocated_to.id}`)"
            />
            <div class="p-info__text">
                <strong>{{ post.allocated_to.name }}</strong>
                <div class="_smol">
                    <span v-if="post.author">
                        Posted by 
                        <a class="glow" @click="toAuthor"
                            :style="'color:#'+post.author.fave_color"
                        >
                            {{ post.author.alias }}
                        </a> •
                    </span>
                    {{ post.timestamp | timeAgo }}
                </div>
            </div>
        </section>
        <section v-else-if="post.author" class="p-info__author-only">
            <img class="pfp lift" :src="post.author.profile_pic" @click="toAuthor"/>
            <div class="p-info__txt-ctn">
                <p class="p-info__alias glow" :style="'color:#'+post.author.fave_color" @click="toAuthor"
                    >{{ post.author.alias }}</p>
                <div class="p-info__timestmp">{{ post.timestamp|timeAgo }}</div>
            </div>
        </section>


        <div class="post__content glow" @click="toPost">
            <h4 class="p__title" :style="`border-color:#${allocated_to.theme_color}`">{{ post.title }}</h4>
            <p class="p__prview-txt">{{ post.text }}</p>
            <div class="p__imges">
                <img v-for="attachment in post.attachments_preview.attchs"
                    :key="attachment.order"
                    :src="attachment.content"
                />
            </div>
        </div>


        <React v-if="post.reactions" class="_p__reactions"
            :reacts="reactionsLsSorted"
            :myReact="post.my_react"
            :communityId="allocated_to.id"
            diableAdd=1
            @emoteChose="performReact"
            @deleteReact="deleteReaction"
        />
        <TotalReacts v-else class="_p__reactions glow"
            :total="post.total_reacts"
            :communityId="allocated_to.id"
            :replyCount="post.reply_count"
            @click.native="getReactions"
        />

        <div class="_p__actions">
            <ReactButton 
                :myReact="post.my_react"
                :communityId="allocated_to.id"
                @quickReact="performReact(1)"
                @deleteReact="deleteReaction"
                @toggleAdd="launchAddBox"
            />
            <button class="glow" @click="toPost">
                <i class="material-icons-outlined">comment</i>
                <p>Comment</p>
            </button>
            <button class="glow" @click="popItUp($event);sharing=true">
                <i class="material-icons-outlined">share</i>
                <p>Share</p>
            </button>
        </div>
        <FloatingEmotes v-if="reacting"
            :position="reacting"
            :communityId="allocated_to.id"
            @emoteChose="performReact"
            @cancel="closeEmoteSelector"
            quickLeave=1
        />
        <Share v-if="sharing" :touchPos="touchPos" :postId="post.id" :postTitle="post.title"/>
    </div>
</template>

<script>
import TotalReacts from './TotalReacts'
import ReactButton from './ReactButton'
import { reactAdd } from '@/mixins/cmpnentsCtrl/reactAdd'
import { sharePost } from '@/mixins/cmpnentsCtrl/sharePost'
export default {
    components: {
        TotalReacts,
        ReactButton,
    },
    mixins: [reactAdd, sharePost],
    props: ['post', 'community', 'user'],
    computed: {
        allocated_to() {
            return this.community || this.post.allocated_to
        },
        author() {
            return this.user || this.post.author
        },
    },
    methods: {
        toPost() {
            this.$store.commit('postx/loadPost', {
                ...this.post,
                allocated_to: this.allocated_to,
                author: this.author,
            })
            this.$router.push(`/post/${this.post.id}`)
        },
        toAuthor() {
            this.$router.push(`/user/${this.post.author.username}`)
        },
        getReactions() {
            this.$axios.get(`reacts/${this.post.id}`,
                this.$store.state.authHeader
            )
                .then(res => {
                    this.$set(this.post, 'reactions', res.data.reactions)
                })
        }
    }
}
</script>

<style>
.the-post {
    /* border: 1px;
    border-style: solid;
    border-color: #ccc; */
    margin-bottom: 7px;
    padding: 0 10px;
    width: 100%;
    position: relative;
}


.p__info {
    margin-top: 10px;
    display: inline-flex;
}
.p__info .cmnty_ico {
    width: 28px;
    height: 28px;
}
.p__info .p-info__text{
    word-spacing: 0;
    margin-left: 8px;
    font-size: 11px;
}
.p__info .p-info__text ._smol {
    font-size: 10px;
    color: #666;
    opacity: 0.75;
}


.post__content .p__title {
    border-left: solid 4px;
    /* border-color: rgb(206, 115, 206); */
    padding: 0 6px;
    margin: 6px 0 6px -10px;
    max-height: 200vh;
    overflow: hidden;
}
.p__prview-txt {
    font-size: 14px;
    margin-bottom: 5px;
}
.p__imges { 
    /* width: auto; */
    margin: 0 -10px -4px -10px;
}
.p__imges img {
    margin-top: 2px;
    width: 100%;
}

.p__reply-count {
    position: absolute;
    right: 11px;
}

._p__reactions {
    display: flex;
    align-items: center;
    height: 37px;
}
._p__reactions > p {
    font-size: 12px;
    /* font-weight: bold; */
    color: #666;
    margin-right: 6px;
}

._p__actions {
    display: flex;
    justify-content: center;
    border: 0;
    border-top: 1px;
    border-style: solid;
    border-color: #eee;
}
._p__actions > button {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 34px;
    width: 90%;
    overflow: hidden;
    color: #999;
}
._p__actions > button > p {
    font-size: 12px;
    margin-left: 6px;
    font-weight: 600;
}
._p__actions > button > i {
    font-size: 19px;
    /* margin-right: 0; */
}


.p-info__author-only {
    display: flex;
    padding: 9px 0 5px;
}
.p-info__author-only .pfp {
    width: 32px;
    height: 32px;
    margin: auto 7px auto 0;
}
.p-info__author-only .p-info__alias {
    font-size: 13px;
    font-weight: bold;
}
.p-info__author-only .p-info__timestmp {
    font-size: 10px;
    color: #555;
}
</style>
