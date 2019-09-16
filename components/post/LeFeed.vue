<template>
    <div>
        <keep-alive>
        <HomeFeed v-if="activeSubTab==0" />
        <MyChats v-if="activeSubTab==1" />
        
        </keep-alive>
    </div>
</template>

<script>
import { subTabs } from '@/mixins/subTabs'

import HomeFeed from './HomeFeed'
import MyChats from '@/components/chat/list/Mien'

export default {
    components: {
        HomeFeed,
        MyChats,
    },
    mixins: [
        subTabs,
    ],
    data() {
        return {
            subTTL: ["CỘNG ĐỒNG", "CÁ NHÂN"],
        }
    },
}
</script>

<style>
</style>
