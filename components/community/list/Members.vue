<template>
    <div class="the_big_frame"><div class="la_content" ref="feed">
        <div style="min-height:65px"/>
        <UserItem v-for="profile in fetchedData"
            :key="profile.username"
            :profile="profile"
        />
    </div></div>
</template>

<script>
import { feedingFrenzy } from '@/mixins/feedingFrenzy'

import UserItem from '@/components/profile/list/UserItem'

export default {
    components: {
        UserItem,
    },
    mixins: [feedingFrenzy],
    data() {
        return {
            feedUrl: `communities/${this.$route.params.id}/members/`,
        }
    },
    created() {
        this.$store.commit('detailBanner/openInfo', null)
    },
    destroyed() {
        this.$store.commit('detailBanner/openInfo', false)
    }
}
</script>
