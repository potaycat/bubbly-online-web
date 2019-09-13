<template>
    <div class="_the_post_itself">
        <!-- <div class="info" v-if="show_user">
            <InCommunityInfo
                :author = "author"
                :community = "community"
                :timestamp = "timestamp"
            />
        </div> -->
        <div class="_p_info" :to="'/community/' + post.allocated_to.id">
            <img class="comu_icon glow" :src="post.allocated_to.icon_img"/>
            <div class="_txtxt">
                <div class="glow"> <strong>
                    {{ post.allocated_to.name }}</strong>
                </div>
                <div class="_smol">
                    <span class="glow">Posted by <span :style="'color:#'+post.content.author.fave_color">
                       {{ post.content.author.alias }}</span>
                    </span>
                    <span>• {{ timeAgo(post.content.timestamp) }}</span>
                </div>
            </div>
        </div>
        <div class="_P_text glow" @click="toPost(post)">
            <h4 class="_p_title" :style="'border-color:#'+post.allocated_to.theme_color">{{ post.title }}</h4>
            <p class="_p_preview">{{ post.content.text }}</p>
        </div>
        <img v-for="attachment in post.content.attachments"
            class="image1"
            :key="attachment.ordering"
            :src="attachment.content"
        />
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
                <button style="border-bottom-left-radius:10px">
                    <i class="material-icons-round">comment</i>
                    <p>Comment</p>
                </button>
                <button style="border-bottom-right-radius:10px">
                    <i class="material-icons-round">share</i>
                    <p>Share</p>
                </button>
            </div>
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
._the_post_itself {
    /* border: 1px;
    border-style: solid;
    border-color: #ccc; */
    background: rgb(252, 252, 252);
    border-radius: 10px;
    width: calc(100% - 16px);
    margin: 5px auto;
    box-shadow: 0 10px 20px #aaa;
}

._p_info {
    padding: 10px;
    margin-bottom: 1px;
    display: flex;
    border-radius: 10px 10px 0 0;
}
._p_info .comu_icon {
    width: 28px;
    height: 28px;
}
._p_info ._txtxt{
    word-spacing: 0;
    margin-left: 8px;
    display: flex;
    flex-direction: column;
    font-size: 11px;
}
._p_info ._txtxt span {
    font-size: 10px;
    color: #777;
}

._P_text ._p_title {
    border: 0;
    border-left: 4px;
    border-style: solid;
    /* border-color: rgb(206, 115, 206); */
    padding: 0 6px;
}
._p_preview {
    padding: 3px 0 8px 10px;
    font-size: 14px;
}
.image1{ 
    width: 100%;
    /* margin-top: 5px; */
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
    margin: auto 10px;
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
    margin-left: 10px;
}
._p_action i {
    pointer-events: none;
    font-size: 15px;
    margin: auto;
    margin-right: 0;
}
</style>
