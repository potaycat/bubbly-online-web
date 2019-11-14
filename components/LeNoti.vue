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
import { tabs } from '@/mixins/tabs'

import AllNoti from './notification/AllNoti'

export default {
    components: {
        AllNoti,
    },
    mixins: [tabs],
}
</script>
