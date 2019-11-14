<template>
    <div class="the_big_frame"><div class="la_content" ref="feed">
        <Tabs
            lockable=1
            locked=1
            :tabs="['FOLLOWINGS', 'FOLLOWERS']"
            :currentTab="currentTab"
            @switchTo="newTab"
        />
        <div style="min-height:30px"/>
        <UserItem v-for="profile in fetchedData"
            :key="profile.username"
            :profile="profile"
        />
    </div></div>
</template>

<script>
import { tabs } from '@/mixins/tabs'
import { feedingFrenzy } from '@/mixins/feedingFrenzy'
import { disableHamburger } from '@/mixins/commonLogicSeparation'

import UserItem from './list/UserItem'

export default {
    components: {
        UserItem,
    },
    mixins: [tabs, feedingFrenzy, disableHamburger],
    data() {
        return {
            currentTab: this.$route.query.get=="followers"?1:0,
        }
    },
    computed: {
        feedUrl() {
            const usr = this.$route.params.username
            switch (this.currentTab) {
                case 1:
                    return `accounts/${usr}/circles/?get_followers=1&`
                case 0:
                    return `accounts/${usr}/circles/`
            }
        },
        // offset() {
        //     const last = this.fetchedData[this.fetchedData.length-1]
        //     return last ? last.username : ""
        // },
    },
    watch: {
        currentTab() {
            // if (get_flwer) {
            //     this.$router.push({query: {get: 'followers'}})
            // } else {
            //     this.$router.push({query: {get: 'followings'}})
            // }
            this.fetchedData = []
            this.fetch()
        },
    },
}
</script>
