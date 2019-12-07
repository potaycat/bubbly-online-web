<template>
    <div>
        <Tabs
            :tabs="['MY CHATS', 'EXPLORE']"
            :currentTab="currentTab"
            @switchTo="newTab"
        />
        <keep-alive>
            <MyChatList v-if="currentTab==0" />
            <FindChats v-if="currentTab==1" />
        </keep-alive>
    </div>
</template>

<script>
import { tabs } from '@/mixins/cmpnentsCtrl/tabs'

import MyChatList from './MyChatList'
import FindChats from './ExploreChats'

export default {
    components: {
        MyChatList,
        FindChats,
    },
    mixins: [tabs],
}
</script>

<style>
</style>
