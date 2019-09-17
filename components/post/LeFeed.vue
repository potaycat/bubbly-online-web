<template>
    <div>
        <Tabs
            :class="['top-lev-tabs', $store.state.scrollinUp ? null: 'top-lev-contract']"
            :tabs="['CỘNG ĐỒNG', 'CÁ NHÂN']"
            :currentTab="currentTab"
            @switchTo="newTab"
        />

        <keep-alive>
            <HomeFeed v-if="currentTab==0" />
            <MyChats v-if="currentTab==1" />
        </keep-alive>
    </div>
</template>

<script>
import { tabs } from '@/mixins/tabs'

import HomeFeed from './HomeFeed'
import MyChats from '@/components/chat/list/Mien'

export default {
    components: {
        HomeFeed,
        MyChats,
    },
    mixins: [
        tabs,
    ],
}
</script>

<style>
</style>
