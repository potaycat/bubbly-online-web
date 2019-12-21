<template>
    <div class="the_big_frame">
        <div class="common_ls_cntainr --dtail-app-bar" ref="feed">
            <CommunityInfo :community="community" />
            <Tabs
                lockable=1
                :tabs="['POSTS', 'CHAT ROOMS', 'PINBOARD']"
                :currentTab="currentTab"
                @switchTo="newTab"
            />
            <keep-alive>
                <CommunityPosts v-if="currentTab==0" :community="community" />
                <PublicChats v-if="currentTab==1"  :community="community"/>
                <Anouncements v-if="currentTab==2"  :community="community"/>
            </keep-alive>
        </div>
    </div>
</template>

<script>
import { tabs } from '@/mixins/cmpnentsCtrl/tabs'

import CommunityInfo from './CommunityInfo'
import CommunityPosts from './list/CommunityPosts'
import PublicChats from './list/PublicChats'
import Anouncements from './list/Anouncements'
export default {
    components: {
        CommunityInfo,
        CommunityPosts,
        PublicChats,
        Anouncements,
    },
    mixins: [tabs],
    props: ['community'],
    created() {
        this.$store.dispatch("reactionx/getCmtyEmotes", this.community.id)
    },
    mounted() {
        const scroll = this.$refs.feed
        scroll.addEventListener('scroll', () => {
            if (scroll.scrollTop > 350) {
                this.$store.commit('appBar/loadText', this.community.name)
                this.$store.commit('appBar/loadPic', {
                    src: this.community.icon_img,
                    style:'square'
                })
            } else {
                this.$store.commit('appBar/reset')
            }
        }, {
            capture: true,
            passive: true})
    }
};
</script>
