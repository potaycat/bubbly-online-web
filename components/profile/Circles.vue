<template>
    <div class="the_big_frame">
        <div class="common_ls_cntainr --with-tabs" ref="feed">
            <Tabs
                lockable=1
                locked=1
                :tabs="['FOLLOWINGS', 'FOLLOWERS']"
                :currentTab="currentTab"
                @switchTo="newTab"
            />
            <UserItem v-for="profile in fetchedData"
                :key="profile.username"
                :profile="profile"
            />
            <StatusIndicator :isFetching="loading4More" :listLen="fetchedData.length"/>
        </div>
    </div>
</template>

<script>
import { tabs } from '@/mixins/cmpnentsCtrl/tabs'
import { feedingFrenzy } from '@/mixins/feedingFrenzy'
import { disableHamburger, appBarTitle } from '@/mixins/appBarStuff'

import UserItem from './list/UserItem'

export default {
    components: { UserItem },
    mixins: [tabs, feedingFrenzy, disableHamburger, appBarTitle],
    data() {
        return {
            currentTab: this.$route.query.get=="followers"?1:0,
            appBarDisplayTitle: "Follows",
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
        currentTab(get_flwer) {
            if (get_flwer) {
                this.$router.replace({query: {get: 'followers'}})
            } else {
                this.$router.replace({query: {get: 'followings'}})
            }
            this.firstFetch()
        },
    },
}
</script>
