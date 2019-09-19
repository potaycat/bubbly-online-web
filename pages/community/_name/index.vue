<template>
    <div class="the_big_frame"><div class="la_content
    " ref="scroll">
        <div style="min-height:60px"/>
        <CommunityInfo :community="community" />

        <div id="tb-container" ref="tbContainer"><Tabs
            :class="['tabs-block', lockTabs ? 'fixed-tabs': null]"
            :tabs="['POSTS', 'CHAT ROOMS', 'INFO']"
            :currentTab="currentTab"
            @switchTo="newTab"
        /></div>
        
        <keep-alive>
            <div v-if="currentTab==0">
                <CommunityInfo :community="community" />
                <CommunityInfo :community="community" />
                <CommunityInfo :community="community" />
            </div>
            <PublicChats :community="community" v-if="currentTab==1" />
        </keep-alive>

    </div></div>
</template>

<script>
import { tabs } from '@/mixins/tabs'

import CommunityInfo from "@/components/community/CommunityInfo"
import PublicChats from "@/components/community/list/PublicChats"

export default {
    layout: "immerse",
    components: {
        CommunityInfo,
        PublicChats,
    },
    mixins: [
        tabs
    ],

    async asyncData({ $axios, params }) {
        let communityInfoRes = await $axios.$get(`/communities/${params.name}/?format=json`)
        // let communityPostsRes = await $axios.$get(`/posts/feed?format=json&community=${communityInfoRes.id}`)

        return {
            community: communityInfoRes
            // posts: communityPostsRes
        };
    },
    head: {
        title: "`${community.name} | Bubbly`"
    },
    data() {
        return {
            lockTabs: false,
        }
    },
    created() {
        this.$store.commit('detailBanner/loadText', null)
        this.$store.commit('detailBanner/loadPic', {})
    },
    mounted() {
        let tabs = this.$refs.tbContainer
        const scroll = this.$refs.scroll
        scroll.addEventListener('scroll', () => {
            if (scroll.scrollTop > tabs.offsetTop-23) {
                this.lockTabs = true
            } else this.lockTabs = false
            if (scroll.scrollTop > 350) {
                this.$store.commit('detailBanner/loadText', this.community.name)
                this.$store.commit('detailBanner/loadPic', {
                    src: this.community.icon_img,
                    style:'square'
                })
            } else {
                this.$store.commit('detailBanner/loadText', null)
                this.$store.commit('detailBanner/loadPic', {})
            }
        }, {
            capture: true,
            passive: true})
    }
};
</script>

<style>
#tb-container {
    min-height: 75px;
    padding: 35px 0;
    /* margin: 0 -8px; */
    width: 100%;
}
.tabs-block {
    /* background: #000; */
    padding-top: 0;
}
.fixed-tabs {
    transition: .2s;
    position: fixed;
    /* margin-left: -8px; */
    top: 56px;
    width: 100%;
    background: linear-gradient(180deg,
        rgba(255,255,255,0.88) 50%,
        #ffffff00 100%);
}
</style>
