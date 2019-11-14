<template>
    <div class="the-post card box-shadow-1">
        
        <section v-if="post.allocated_to" class="p__info">
            <img class="cmnty-ico lift" :src="post.allocated_to.icon_img"
                @click="$router.push(`/community/${post.allocated_to.id}`)"
            />
            <div class="p-info__text">
                <strong>{{ post.allocated_to.name }}</strong>
                <div class="_smol">
                    <span v-if="post.author">
                        Posted by 
                        <nuxt-link class="glow" :to="'/user/' + post.author.username"
                            :style="'color:#'+post.author.fave_color"
                        >
                            {{ post.author.alias }}
                        </nuxt-link> •
                    </span>
                    {{ post.timestamp | timeAgo }}
                </div>
            </div>
        </section>
        <section v-else-if="post.author">
            <nuxt-link class="p-info__author-only" :to="'/user/' + post.author.username">
                <img class="pfp lift" :src="post.author.profile_pic"/>
                <div class="p-info__txt-ctn">
                    <p class="p-info__alias glow" :style="'color:#'+post.author.fave_color">{{ post.author.alias }}</p>
                    <div class="p-info__timestmp">{{ post.timestamp |timeAgo }}</div>
                </div>
            </nuxt-link>
        </section>


        <div class="post__content glow" @click="toPost(post)">
            <h4 class="p__title" :style="`border-color:#${allocated_to.theme_color}`">{{ post.title }}</h4>
            <p class="p__prview-txt">{{ post.text }}</p>
            <div class="p__imges">
                <img v-for="attachment in post.attachments_preview.attchs"
                    :key="attachment.order"
                    :src="attachment.content"
                />
            </div>
        </div>


        <div class="_P_stuff">
            <div v-if="post.reacts" class="_p__reactions">
                <p>Reactions:</p>
                <React
                    :reacts="post.reacts"
                    :community="allocated_to.id"
                />
            </div>
            <div v-else class="_p__reactions glow" @click="">
                <span>{{ post.total_reacts }} react{{post.total_reacts>1?"s":""}}</span>
                <!-- <span class="glow" style="margin-left:auto">•••</span> -->
            </div>

            <div class="_p__actions">
                <button v-if="post.my_react" class="_p__my-react glow">
                    <img :src="getMyReact(post.my_react).img_ref">
                    <p>aaaaaaaaaaaaaaaaaaaaaaa</p>
                </button>
                <button v-else class="glow">
                    <i class="material-icons-outlined">insert_emoticon</i>
                    <p>React</p>
                </button>

                <button class="glow">
                    <i class="material-icons-outlined">comment</i>
                    <p>Comment</p>
                </button>
                <button class="glow">
                    <i class="material-icons-outlined">share</i>
                    <p>Share</p>
                </button>
            </div>
        </div>

    </div>
</template>

<script>
import React from './react'
export default {
    components: {
        React,
    },
    props: [
        'post',
        'community',
        'user',
    ],
    computed: {
        allocated_to() {
            return this.community ? this.community :
                this.post.allocated_to
        },
        author() {
            return this.user ? this.user :
                this.post.author
        }
    },
    methods: {
        toPost(post) {
            this.$router.push('/post/' + post.id)
        },
        getMyReact(reactId) {
            return this.$store.state.reactIcons.icons[this.allocated_to.id][reactId]
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
.p__info .cmnty-ico {
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
    border: 0;
    border-left: 4px;
    border-style: solid;
    /* border-color: rgb(206, 115, 206); */
    padding: 0 6px;
    margin: 6px 0 6px -10px;
}
.p__prview-txt {
    font-size: 14px;
}
.p__imges { 
    width: auto;
    margin: 0 -10px;
    margin-top: 8px;
}
.p__imges img {
    width: 100%;
}


._p__reactions {    
    padding: 6px 0;
    display: flex;
    align-items: center;
    overflow: auto;
}
._p__reactions p {
    font-size: 13px;
    /* font-weight: bold; */
    color: #bbb;
    margin-right: 5px;
}
._p__reactions span {
    font-size: 13px;
    /* font-weight: bold; */
    color: #555;
    margin: auto 0;
}


._p__actions {
    display: flex;
    border: 0;
    border-top: 1px;
    border-style: solid;
    border-color: #eee;
}
._p__actions > button {
    display: flex;
    color: #cecece;
    margin: auto;
    padding: 7px;
    width: 30%;
    overflow: hidden;
}
._p__actions > button > p {
    margin: auto;
    margin-left: 6px;
    font-weight: 600;
}
._p__actions > button > i {
    font-size: 19px;
    margin: auto;
    margin-right: 0;
}

._p__my-react > img {
    margin: auto;
    margin-right: 0;
    height: 18px;
    width: 18px;
}
._p__my-react > p {
    color: rgb(72, 133, 237);
}

.p-info__author-only {
    display: flex;
    padding: 9px 0;
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
