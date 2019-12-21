<template>
    <div class="chat-list-ctnr">
        <TopLvlDestination />
        <Tabs
            :tabs="['MY CHATS', 'EXPLORE']"
            :currentTab="currentTab"
            @switchTo="newTab"
        />
        <!-- <keep-alive> -->
            <MyChatList v-if="currentTab==0" />
            <FindChats v-if="currentTab==1" />
        <!-- </keep-alive> -->
        <SideView v-if="$route.query.room" />
    </div>
</template>

<script>
import TopLvlDestination from '@/components/layout/TopLvlDestination'
import { tabs } from '@/mixins/cmpnentsCtrl/tabs'

import MyChatList from './MyChatList'
import FindChats from './ExploreChats'

import SideView from '../SideView'

export default {
    components: { TopLvlDestination,
        MyChatList,
        FindChats,
        SideView,
    },
    mixins: [tabs],
}
</script>

<style>
@media only screen and (min-width: 750px) {
    .chat-list-ctnr {
        width: 310px;
        margin-left: -40px;
        z-index: 99;
    }
}
@media only screen and (min-width: 1200px) {
    .chat-list-ctnr {
        width: 380px;
        margin-left: unset;
    }
}

</style>
