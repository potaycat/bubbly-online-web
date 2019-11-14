<template>
<transition appear name="fade_in">
    <div id="post-full-view" class="the_big_frame">
            <div class="la_content" ref="feed">

            <h3 ref="title" class="pf-title" v-if="post.title">{{ post.title }}</h3>

            <n-link class="pf-author" :to="'/user/' + post.author.username">
                <img class="pfp lift" :src="post.author.profile_pic"/>
                <div class="pf-text-info">
                    <p class="glow" :style="'color:#'+post.author.fave_color">{{ post.author.alias }}</p>
                    <div class="pf-timestamp">{{ post.timestamp | timeAgo }}</div>
                </div>
            </n-link>

            <BubblyMarkdownParse :text="post.text" :attachments="post.attachments" />

            <nuxt-link :to="`/community/${post.allocated_to.id}`" class="pf__where glow">
                <img class="cmnty-ico" :src=" post.allocated_to.icon_img">
                <p>Bài viết được đăng ở <strong>{{ post.allocated_to.name }}</strong> trên <strong>tên mxh của long</strong></p>
            </nuxt-link>

            <section class="pf-stuff">
                <p class="pf__react-label">Reactions ({{post.total_reacts}})<span class="glow">View detail</span></p> 
                <div class="pf-reactions">
                    <React
                        :reacts="post.reacts"
                        :community="post.allocated_to.id"
                        size= "react-icon--big"
                    />
                </div>
            </section>
            
            <Commenting
                :comments="fetchedData"
                :total="post.reply_count"
                :community="post.allocated_to"
            />
        </div>
        <Dropdown v-if="moring" @pick="onDropDownPick"
            :options="[
                isSelf ? {value:'edit', name:'Edit'} : null,
                isSelf ? {value:'delete', name:'Delete post'} : null,
                isMod(post.allocated_to.id) ? {value:'mod_delete', name:'[Mod] Remove post'} : null,
            ].filter(x=>x)"
        />
    </div>
</transition>
</template>

<script>
import BubblyMarkdownParse from '../mdParse'
import React from '../react'

import Commenting from './Commenting'
import { feedingFrenzy } from '@/mixins/feedingFrenzy'

import Dropdown from '@/components/actions/Dropdown'
import { mapGetters } from "vuex"

export default {
    components: {
        BubblyMarkdownParse,
        React,
        Commenting,
        Dropdown,
    },
    mixins: [feedingFrenzy],
    props: ['post'],
    data() {
        return {
            feedUrl: `posts/${this.post.id}/comments/`,
        }
    },
    computed: {
        ...mapGetters({
            isMod: 'moderating/isMod',
            moring: 'detailBanner/hmbrgrLaunchd',
        }),
        isSelf() {
            return this.post.author.username == this.$store.state.auth.my_profile.username
        },
        bannerText() {
            if (this.post.title) {
                return this.post.title
            }
            return "Bài đăng của "+ this.post.author.alias
        },
    },
    mounted() {
        const tt = this.$refs.title
        const container = this.$refs.feed
        container.addEventListener('scroll', () => {
            if (container.scrollTop > tt.offsetTop) {
                this.$store.commit('detailBanner/loadText', this.bannerText)
            } else {
                this.$store.commit('detailBanner/loadText', null)
            }
        }, {
            capture: true,
            passive: true})
    },
    methods: {
        onDropDownPick(value) {
            this.$store.commit('detailBanner/openInfo', false)
            switch (value) {
                default:
                    break
            }
        },
    },
}
</script>

<style scoped>
#post-full-view .la_content {
    padding: 56px 15px 20px 15px;
}

.pf-title {
    padding: 10px 0;
    width: 100%;
    border: 0;
    border-bottom: 1px;
    border-style: solid;
    border-color: #eee;
}

.pf-author {
    margin: 20px 0 10px;
    display: flex;
}
.pf-author .pfp {
    width: 35px;
    height: 35px;
}
.pf-author .pf-text-info {
    margin-left: 8px;
    font-size: 15px;
}
.pf-author .pf-timestamp {
    font-size: 11px;
    margin: 2px 0 5px;
    color: #aaa;
}

.pf__where {
    display: flex;
    margin: 20px 0 20px;
}
.pf__where .cmnty-ico {
    height: 28px;
    width: 28px;
    margin: auto 10px auto 0;
}
.pf__where > p {
    margin: auto;
    font-size: 11px;
    color: #888;
}

.pf-stuff {
    width: 100%;
}
.pf-stuff .pf__react-label {
    color: #444;
    /* font-weight: 500; */
    display: flex;
}
.pf-stuff .pf__react-label span {
    font-weight: normal;
    margin: auto 0 auto auto;
    color: #999;
    font-size: 14px;
}

.pf-reactions {
    /* border: */
    
    padding: 10px 0;
    /* max-height: 120px; */
    overflow: auto;
}
</style>
