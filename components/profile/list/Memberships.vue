<template>
    <div class="common_ls_wrapper">
        <CmntyItem v-for="community in fetchedData"
            :key="community.id"
            :community="community"
        />
        <h3 class="empty-fetchedLs" v-if="empty">This user has not joined any community</h3>
        <Spinner v-if="loading4More" />
    </div>
</template>

<script>
import { feedingFrenzy, maintainScrllPos } from '@/mixins/feedingFrenzy'
import CmntyItem from '@/components/community/list/CmntyItem'

export default {
    components: {
        CmntyItem,
    },
    mixins: [feedingFrenzy, maintainScrllPos],
    props: ['profile'],
    data() {
        return {
            feedUrl: `accounts/${this.profile.username}/communities/`,
        }
    },
    computed: {
        scrollCtnr() {
            return this.$parent.$refs.feed
        },
    },
};
</script>