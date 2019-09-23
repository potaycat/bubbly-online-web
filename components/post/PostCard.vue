<template>
    <div class="the-post-itself card">
        <!-- <div class="info" v-if="show_user">
            <InCommunityInfo
                :author = "author"
                :community = "community"
                :timestamp = "timestamp"
            />
        </div> -->
        <nuxt-link class="post-info" :to="`/community/${post.allocated_to.id}`">
            <img class="comu_icon glow" :src="post.allocated_to.icon_img"/>
            <div class="p-info-text">
                <strong>{{ post.allocated_to.name }}</strong>
                <div class="_smol">
                    <span class="glow">
                        Posted by 
                        <nuxt-link :to="'/user/' + post.content.author.username"
                            :style="'color:#'+post.content.author.fave_color"
                        >
                            {{ post.content.author.alias }}
                        </nuxt-link>
                    </span>
                    <span>• {{ timeAgo(post.content.timestamp) }}</span>
                </div>
            </div>
        </nuxt-link>

        <div class="post-content glow" @click="toPost(post)">
            <h4 class="p-title" :style="'border-color:#'+post.allocated_to.theme_color">{{ post.title }}</h4>
            <p class="p-preview-txt">{{ post.content.text }}</p>
            <div class="p-images">
                <img v-for="attachment in post.content.attachments"
                    :key="attachment.ordering"
                    :src="attachment.content"
                />
            </div>
        </div>

        <div class="_P_stuff">
            <div class="_p_reactions">
                <p>Reactions:</p>
                <React v-for="react in post.content.react_count"
                    :key="react.react"
                    :reactId="react.react"
                    :reactCount="react.count"
                    :reactData="post.content.reacts"
                />
                <AddReact size="_norm_addo" />
            </div>
            <div class="_p_action glow">
                <button>
                 <!-- style="border-bottom-left-radius:10px"> -->
                    <i class="material-icons-outlined">comment</i>
                    <p>Comment</p>
                </button>
                <button>
                <!-- style="border-bottom-right-radius:10px"> -->
                    <i class="material-icons-outlined">share</i>
                    <p>Share</p>
                </button>
            </div>
        </div>

    </div>
</template>

<script>
import React from './react/React'
import AddReact from './react/AddReact'
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
        'post',
    ],
    methods: {
        toPost(post) {
            this.$store.commit('post/loadPost', post)
            this.$router.push('/post/' + post.content_id)
        },
    }
}
</script>

<style scoped>
.the-post-itself {
    /* border: 1px;
    border-style: solid;
    border-color: #ccc; */
    margin-bottom: 10px;
    padding: 0 10px;
}

.post-info {
    margin: 10px 0;
    display: inline-flex;
}
.post-info .comu_icon {
    width: 28px;
    height: 28px;
}
.post-info .p-info-text{
    word-spacing: 0;
    margin-left: 8px;
    font-size: 11px;
}
.post-info .p-info-text span {
    font-size: 10px;
    color: #777;
}

.post-content .p-title {
    border: 0;
    border-left: 4px;
    border-style: solid;
    /* border-color: rgb(206, 115, 206); */
    padding: 0 6px;
    margin: 0 0 6px -10px;
}
.p-preview-txt {
    font-size: 14px;
    /* white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: ;
    max-height: 200px; */
}
.p-images { 
    margin: 0 -10px;
    width: auto;
    margin-top: 5px;
}
.p-images img {
    width: 100%;
}

._p_reactions {    
    padding: 10px 0;
    display: flex;
    overflow: auto;
}
._p_reactions p {
    pointer-events: none;
    font-size: 13px;
    font-weight: bold;
    color: #bbb;
    margin: auto 0;
}

._p_action {
    display: flex;
    border: 0;
    border-top: 1px;
    border-style: solid;
    border-color: #eee;
}
._p_action button {
    display: flex;
    color: #bbb;
    margin: auto;
    padding: 8px;
    font-weight: bold;
    width: 50%;
}
._p_action p {
    pointer-events: none;
    margin: auto;
    margin-left: 6px;
}
._p_action i {
    pointer-events: none;
    font-size: 19px;
    margin: auto;
    margin-right: 0;
}
</style>
