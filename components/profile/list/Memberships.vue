<template>
    <div style="width:100%">
        <CmntyItem v-for="community in fetchedData"
            :key="community.id"
            :community="community"
        />
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