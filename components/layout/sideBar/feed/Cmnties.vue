<template>
    <div :style="fetchedData.length?null:'display:none'"
        class="side-bar__cmty common_ls_cntainr" ref="feed">
        <p class="side-bar__cmty-title">{{ title }}</p>
        <Community
            class="side-bar__cmty-item"
            v-for="item in fetchedData"
            :key="item.id"
            :community="item"
        />
        <StatusIndicator :isFetching="loading4More" :listLen="1"/>
    </div>
</template>

<script>
import Community from '@/components/community/list/CmtyItem'
import { feedingFrenzy } from '@/mixins/feedingFrenzy'
export default {
    components: { Community },
    mixins: [feedingFrenzy],
    props: ['title', 'toFetch'],
    data() {
        return {
            feedUrl: this.toFetch
        }
    }
}
</script>

<style>
.side-bar__cmty-item {
    min-height: 75px;
}.side-bar__cmty-item .mbrshp__role, .side-bar__cmty-item .mbrshp__join-btn {
    display: none;
}.side-bar__cmty-item .mbrshp__cmty-name {
    font-size: 16px;
}.side-bar__cmty-item .mbrshp__subtxt {
    font-size: 11px;
}
.side-bar__cmty-title {
    font-size: 14px;
    margin: 20px 20px;
    font-weight: bold;
    text-align: center;
}
</style>