<template>
    <div class="the_big_frame">
        <div class="common_ls_cntainr --with-tabs" ref="feed">
            <Tabs lockable locked
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
import UserItem from './list/UserItem'

export default {
    components: { UserItem },
    mixins: [tabs, feedingFrenzy],
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
        currentTab(get_flwer) {
            if (get_flwer) {
                this.$router.replace({query: {get: 'followers'}})
            } else {
                this.$router.replace({query: {get: 'followings'}})
            }
            this.fetchedData = []
            this.firstFetch()
        },
    },
}
</script>
