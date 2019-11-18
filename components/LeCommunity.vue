<template>
    <div class="the_big_frame"><div class="la_content" ref="feed">
        <div style="min-height:57px"/>
        <CommunityInfo :community="community" />

        <Tabs
            lockable=1
            :tabs="['POSTS', 'CHAT ROOMS', 'ABOUT']"
            :currentTab="currentTab"
            @switchTo="newTab"
        />
        <keep-alive>
            <CommunityPosts v-if="currentTab==0" :community="community" />
            <PublicChats :community="community" v-if="currentTab==1" />
        </keep-alive>

    </div></div>
</template>

<script>
import { _comp_tabs } from '@/mixins/_comp_tabs'

import CommunityInfo from './community/CommunityInfo'
import CommunityPosts from './community/list/CommunityPosts'
import PublicChats from './community/list/PublicChats'

export default {
    components: {
        CommunityInfo,
        CommunityPosts,
        PublicChats,
    },
    mixins: [_comp_tabs],
    props: ['community'],
    created() {
        this.$store.dispatch("reactIcons/getCmntyIcons", this.community.id)
    },
    mounted() {
        const scroll = this.$refs.feed
        scroll.addEventListener('scroll', () => {
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
</style>
