<template>
    <div>
        <keep-alive>
        
        <Mien />
        <!-- <FindChats v-if="activeSubTab==1" /> -->
        </keep-alive>
    </div>
</template>

<script>
import { subTabs } from '@/mixins/subTabs'

import Mien from './list/Mien'
// import Find from './list/ExploreChats'

export default {
    components: {
        Mien,
        // FindChats,
    },
    mixins: [
        subTabs,
    ],
    data() {
        return {
            subTTL: "",
        }
    },
    created() {
        this.$store.commit('changeTab', 2)
    },
}
</script>

<style>
</style>
