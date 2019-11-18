<template>
    <div class="the_big_frame"><div class="la_content" v-if="profile" ref="feed">
        <div style="min-height:57px"/>
        <ProfileInfo
            :profile="profile"
            @followed="profile.you_follow=true;profile.follower_count+=1"
            @unfollowed="profile.you_follow=false;profile.follower_count-=1"
            @blocked="profile.you_block=true;profile.you_follow=false"
            @unblocked="profile.you_block=false"
        />

        <Tabs
            lockable=1
            :tabs="['POSTS', 'COMMUNITY', 'LIKED POSTS']"
            :currentTab="currentTab"
            @switchTo="newTab"
        />
        
        <keep-alive>
            <UserPosts v-if="currentTab==0" :profile="profile" />
            <Memberships v-if="currentTab==1" :profile="profile" />
        </keep-alive>
    </div></div>
</template>

<script>
import { _comp_tabs } from '@/mixins/_comp_tabs'

import ProfileInfo from './profile/ProfileInfo'
import UserPosts from './profile/list/UserPosts'
import Memberships from './profile/list/Memberships'

export default {
    components: {
        ProfileInfo,
        UserPosts,
        Memberships,
    },
    mixins: [_comp_tabs],
    props: ['profile'],
    mounted() {
        const scroll = this.$refs.feed
        scroll.addEventListener('scroll', () => {
            if (scroll.scrollTop > 300) {
                this.$store.commit('detailBanner/loadText', this.profile.alias)
                this.$store.commit('detailBanner/loadPic', {
                    src: this.profile.profile_pic,
                    style:'circle'
                })
            } else {
                this.$store.commit('detailBanner/loadText', null)
                this.$store.commit('detailBanner/loadPic', {})
            }
        }, {
            capture: true,
            passive: true})
    }
}
</script>

<style>
</style>
