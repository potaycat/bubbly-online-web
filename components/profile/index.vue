<template>
    <div class="the_big_frame">
        <div class="common_ls_cntainr --dtail-app-bar" v-if="profile" ref="feed">
            <ProfileInfo
                :profile="profile"
                @followed="profile.you_follow=true;profile.follower_count+=1"
                @unfollowed="profile.you_follow=false;profile.follower_count-=1"
                @blocked="profile.you_block=true;profile.you_follow=false"
                @unblocked="profile.you_block=false"
            />

            <Tabs
                lockable=1
                :tabs="['POSTS', 'COMMUNITIES']"
                :currentTab="currentTab"
                @switchTo="newTab"
            />
            
            <keep-alive>
                <UserPosts v-if="currentTab==0" :profile="profile" />
                <Memberships v-if="currentTab==1" :profile="profile" />
            </keep-alive>
        </div>
    </div>
</template>

<script>
import { tabs } from '@/mixins/cmpnentsCtrl/tabs'

import ProfileInfo from './ProfileInfo'
import UserPosts from './list/UserPosts'
import Memberships from './list/Memberships'

export default {
    components: {
        ProfileInfo,
        UserPosts,
        Memberships,
    },
    mixins: [tabs],
    props: ['profile'],
    created() {
        if (this.isSelf) this.$store.commit('auth/storeAuthUser', {
            ...this.$store.state.auth.my_profile, ...this.profile 
        })
    },
    mounted() {
        const scroll = this.$refs.feed
        scroll.addEventListener('scroll', evt => {
            if (scroll.scrollTop > 310) {
                this.$store.commit('appBar/loadText', this.profile.alias)
                this.$store.commit('appBar/loadPic', {
                    src: this.profile.profile_pic,
                    style:'circle'
                })
            } else {
                this.$store.commit('appBar/reset')
            }
        }, {
            capture: true,
            passive: true})
    }
}
</script>

<style>
</style>
