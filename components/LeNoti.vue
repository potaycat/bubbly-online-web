<template>
    <div>
        <!-- <Tabs
            :tabs="['ALL', 'FILTERED']"
            :currentTab="currentTab"
            @switchTo="newTab"
        /> -->
        
        <AllNoti v-if="currentTab===0"/>
    </div>
</template>

<script>
import { _comp_tabs } from '@/mixins/_comp_tabs'

import AllNoti from './notification/AllNoti'

export default {
    components: {
        AllNoti,
    },
    mixins: [_comp_tabs],
}
</script>

<style>
.noti__no-new {
    font-size: 20px;
    font-weight: bold;
    color: #666;
    width: 100%;
    text-align: center;
    margin-top: 50px;
}
</style>