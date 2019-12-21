<template>
    <div class="the_big_frame"><div class="common_ls_cntainr --dtail-app-bar" ref="feed">
        <UserItem v-for="profile in fetchedData"
            :key="profile.username"
            :profile="profile"
            disableFollowBtn=1
        />
        <StatusIndicator :isFetching="loading4More" :listLen="fetchedData.length"
            headsup="No bans"/>
    </div></div>
</template>

<script>
import { appBarTitle } from '@/mixins/appBarStuff'
import { feedingFrenzy, maintainScrllPos } from '@/mixins/feedingFrenzy'
import { disableHamburger } from '@/mixins/appBarStuff'

import UserItem from '@/components/profile/list/UserItem'

export default {
    components: { UserItem },
    mixins: [feedingFrenzy, maintainScrllPos, disableHamburger, appBarTitle],
    data() {return {
        feedUrl: `communities/${this.$route.params.id}/members/?filter_by=banned`,
        appBarDisplayTitle: "Banned",
    }},
    // const: {
        offsetProp: 'username',
    // },
}
</script>
