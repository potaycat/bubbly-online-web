<template>
    <div id="post-full-view">
        <div class="the_big_frame">
                <transition appear name="fade_in">
            <div class="la_content" ref="postScroll">
                <div style="min-height:56px"/>
                
                <h3 ref="title" class="pf-title" v-if="post.title">{{ post.title }}</h3>

                <n-link class="pf-author" :to="'/user/' + post.content.author.username">
                    <img class="pfp" :src="post.content.author.profile_pic"/>
                    <div class="pf-text-info glow">
                        <p :style="'color:#'+post.content.author.fave_color">{{ post.content.author.alias }}</p>
                        <div class="pf-timestamp">{{ timeAgo(post.content.timestamp) }}</div>
                    </div>
                </n-link>

                <BubblyMarkdownParse :content="post.content" />

                <div class="glow">
                    <nuxt-link :to="`/community/${post.allocated_to.id}`" class="pf-where">
                        <img class="comu_icon" :src=" post.allocated_to.icon_img">
                        <p>Bài viết được đăng ở <strong>{{ post.allocated_to.name }}</strong> trên <strong>tên mxh của long</strong></p>
                    </nuxt-link>
                </div>
                    <!-- <p>Nếu được thì cho quảng cáo kiếm thu nhập ở đây >:)</p> -->

                <section class="pf-stuff">
                    <p class="stuff-label glow">Reactions <span>View detail</span></p> 
                    <div class="pf-reactions">
                        <React v-for="react in post.content.react_count"
                            :key="react.react"
                            :reactId="react.react"
                            :reactCount="react.count"
                            :reactData="post.content.reacts"
                            size= "_rea_big"
                        />
                        <AddReact size="_smol_addo" :community="post.allocated_to.id"/>
                    </div>
                </section>
                
                <Commenting
                    :comments="post.comments"
                    :total="post.comment_count"
                    :community="post.allocated_to"
                />

                <div style="min-height:100px"/>
            </div>
                </transition>
        </div>
    </div>
</template>

<script>
import { timeAgo } from '@/mixins/timeAgo'

import BubblyMarkdownParse from './BubblyMarkdownParse'
import React from './react/React'
import AddReact from './react/AddReact'
import Commenting from './Commenting'

export default {
    components: {
        BubblyMarkdownParse,
        React,
        AddReact,
        Commenting,
    },
    mixins: [
        timeAgo,
    ],
    props: [
        'post',
    ],
    computed: {
        bannerText() {
            if (this.post.title) {
                return this.post.title
            }
            return "Bài đăng của "+ this.post.content.author.alias
        },
    },
    mounted() {
        const tt = this.$refs.title
        const container = this.$refs.postScroll
        container.addEventListener('scroll', () => {
            if (container.scrollTop > tt.offsetTop) {
                this.$store.commit('detailBanner/loadText', this.bannerText)
            } else {
                this.$store.commit('detailBanner/loadText', null)
            }
        }, {
            capture: true,
            passive: true
        })
    },
}
</script>

<style scoped>
/* #post-full-view .the_big_frame {
    background: white;
    z-index: 9999999;
} */

#post-full-view .la_content {
    padding: 0 15px;
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
    pointer-events: none;
    font-size: 11px;
    margin: 2px 0 5px;
    color: #aaa;
}

.pf-where {
    display: flex;
    margin: 20px 0 20px;
}
.pf-where .comu_icon {
    height: 32px;
    width: 32px;
    margin: auto 10px auto 0;
}
.pf-where p {
    pointer-events: none;
    margin: auto;
    font-size: 13px;
    color: #aaa;
}

.pf-stuff {
    width: 100%;
}
.pf-stuff .stuff-label {
    color: #444;
    /* font-weight: 500; */
    display: flex;
}
.pf-stuff .stuff-label span {
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
