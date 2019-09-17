<template>
    <div class="the_big_frame"><div class="la_content" ref="scroll">
        <div style="min-height:60px"/>
        <CommunityInfo :community="community" />

        <div id="tb-container" ref="tbContainer"><Tabs
            :class="['tabs-block', lockTabs ? 'fixed-tabs': null]"
            :tabs="['POSTS', 'CHAT ROOMS', 'INFO']"
            :currentTab="currentTab"
            @switchTo="newTab"
        /></div>
        
        <CommunityInfo :community="community" />
        <CommunityInfo :community="community" />
    </div></div>
</template>

<script>
import { tabs } from '@/mixins/tabs'

import PostCard from "@/components/post/PostCard";
import CommunityInfo from "@/components/community/CommunityInfo";
import MembersBlock from "@/components/community/MembersBlock";
export default {
    layout: "immerse",
    components: {
        CommunityInfo,
        PostCard,
        MembersBlock
    },
    mixins: [
        tabs
    ],

    async asyncData({ $axios, params }) {
        let communityInfoRes = await $axios.$get(
            `/communities/${params.name}/?format=json`
        );
        // let communityPostsRes = await $axios.$get(`/posts/feed?format=json&community=${communityInfoRes.id}`)

        return {
            community: communityInfoRes
            // posts: communityPostsRes
        };
    },
    head: {
        title: "Cộng đồng trên this"
    },
    data() {
        return {
            lockTabs: false,
        }
    },
    mounted() {
        let tabs = this.$refs.tbContainer
        const scroll = this.$refs.scroll
        scroll.addEventListener('scroll', () => {
            if (scroll.scrollTop > tabs.offsetTop-31) {
                this.lockTabs = true
            } else this.lockTabs = false
            if (scroll.scrollTop > 350) {
                this.$store.commit('detailBanner/loadText', this.community.name)
            } else {
                this.$store.commit('detailBanner/loadText', null)
            }
        }, {
            capture: true,
            passive: true})
    },
};
</script>

<style>
#tb-container {
    min-height: 75px;
    padding: 15px 0;
    /* margin: 0 -8px; */
    width: 100%;
}
.tabs-block {
    /* background: #000 */
}
.fixed-tabs {
    position: fixed;
    top: 56px;
    padding-top: 0;
    background: linear-gradient(180deg,
        rgba(255,255,255,0.88) 50%,
        rgba(255,255,255,0.0) 100%);
}
</style>
