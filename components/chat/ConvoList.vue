<template>
    <div>
        <Tabs
            :class="['top-lev-tabs', $store.state.scrollinUp ? null: 'top-lev-contract']"
            :tabs="['MY CHATS', 'EXPLORE']"
            :currentTab="currentTab"
            @switchTo="newTab"
        />
        <MyChats v-if="currentTab==0" />
        <FindChats v-if="currentTab==1" />
    </div>
</template>

<script>
import { tabs } from '@/mixins/tabs'

import MyChats from './list/Mien'
import FindChats from './list/ExploreChats'

export default {
    components: {
        MyChats,
        FindChats,
    },
    mixins: [
        tabs
    ],
}
</script>

<style>
</style>
