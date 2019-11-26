<template>
    <div class="the_big_frame" id="mbrshp-ls">
        <div class="common_ls_cntainr --top-lev-app-bar" ref="feed">
            <CmntyItem v-for="community in fetchedData"
                :key="community.id"
                :community="community"
            />
            <Spinner v-if="loading4More" />
        </div>
    <FAB @clicked="$router.push('/community/create')"
        icon= "add_circle_outline"
        actionName= "Create your community"
    />
    </div>
</template>

<script>
import { feedingFrenzy, maintainScrllPos, scrlDirection } from '@/mixins/feedingFrenzy'
import FAB from '@/components/misc/FAB'
import CmntyItem from './list/CmntyItem'

export default {
    components: {
        FAB,
        CmntyItem
    },
    mixins: [feedingFrenzy, maintainScrllPos, scrlDirection],
    data() {
        return {
            feedUrl: 'accounts/__self/communities/',
            // cache: 'st_cmnt',
        }
    },
    methods: {
        newCmnty() { // TODO
            console.log(this.$store.state.auth.jwt)
        },
    },
}
</script>
