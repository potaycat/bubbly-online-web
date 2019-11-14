<template>
    <div class="the_big_frame" id="mbrshp-ls"><div class="la_content" ref="feed">
        <div style="min-height:69px"/>
        <CmntyItem v-for="community in fetchedData"
            :key="community.id"
            :community="community"
        />
        <div style="min-height: 120px"/>
    </div>
    <FAB @clicked="newCmnty"
        icon= "add_circle_outline"
        actionName= "Create your community"
    />
    </div>
</template>

<script>
import { feedingFrenzy, scrlDirection } from '@/mixins/feedingFrenzy'
import FAB from '@/components/actions/FAB'
import CmntyItem from './list/CmntyItem'

export default {
    components: {
        FAB,
        CmntyItem
    },
    mixins: [feedingFrenzy, scrlDirection],
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

<style>
#mbrshp-ls .la_content {
    width: 100%;
}
</style>
