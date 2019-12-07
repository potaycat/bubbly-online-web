<template>
    <div>
        <!-- <Tabs
            :tabs="['ALL', 'FILTERED']"
            :currentTab="currentTab"
            @switchTo="newTab"
        /> -->
        
        <AllNoti v-if="currentTab==0"/>
    </div>
</template>

<script>
import { tabs } from '@/mixins/cmpnentsCtrl/tabs'
import AllNoti from './AllNoti'

export default {
    components: {AllNoti},
    mixins: [tabs],
}
</script>
