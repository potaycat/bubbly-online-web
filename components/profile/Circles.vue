<template>
    <div class="the_big_frame"><div class="common_ls_cntainr" ref="feed">
        <Tabs
            lockable=1
            locked=1
            :tabs="['FOLLOWINGS', 'FOLLOWERS']"
            :currentTab="currentTab"
            @switchTo="newTab"
        />
        <div style="min-height:25px"/>
        <UserItem v-for="profile in fetchedData"
            :key="profile.username"
            :profile="profile"
        />
    </div></div>
</template>

<script>
import { _comp_tabs } from '@/mixins/_comp_tabs'
import { feedingFrenzy } from '@/mixins/feedingFrenzy'
import { disableHamburger } from '@/mixins/commonLogicSeparation'

import UserItem from './list/UserItem'

export default {
    components: {
        UserItem,
    },
    mixins: [_comp_tabs, feedingFrenzy, disableHamburger],
    data() {
        return {
            currentTab: this.$route.query.get=="followers"?1:0,
        }
    },
    // const: {
        offsetProp: 'username',
    // }
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
    },
    watch: {
        currentTab() {
            // if (get_flwer) {
            //     this.$router.push({query: {get: 'followers'}})
            // } else {
            //     this.$router.push({query: {get: 'followings'}})
            // }
            this.fetchNRefresh()
        },
    },
}
</script>
