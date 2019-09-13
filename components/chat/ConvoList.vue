<template>
    <div>
        <MyChats v-if="activeSubTab==0" />
        <FindChats v-if="activeSubTab==1" />
    </div>
</template>

<script>
import { subTabs } from '@/mixins/subTabs'

import MyChats from './list/Mien'
import FindChats from './list/ExploreChats'

export default {
    components: {
        MyChats,
        FindChats,
    },
    mixins: [
        subTabs,
    ],
    data() {
        return {
            subTTL: ["MY CHATS", "EXPLORE"],
        }
    },
    created() {
        this.$store.commit('changeTab', 3)
    },
}
</script>

<style>
</style>
