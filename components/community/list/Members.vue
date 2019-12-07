<template>
    <div class="the_big_frame"><div class="common_ls_cntainr --dtail-app-bar" ref="feed">
        <UserItem v-for="profile in fetchedData"
            :key="profile.username"
            :profile="profile"
        />
        <h3 class="empty-fetchedLs" v-if="empty">No members? Give people your invite URL</h3>
        <Spinner v-if="loading4More" />
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
    data() {
        return {
            feedUrl: `communities/${this.$route.params.id}/members/`,
            appBarDisplayTitle: "All Members",
        }
    },
    // const: {
        offsetProp: 'username',
    // }
}
</script>
