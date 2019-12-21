<template>
    <div class="side-bar__cmnty common_ls_cntainr" ref="feed">
        <p class="side-bar__cmnty-title">{{ title }}</p>
        <Community
            class="side-bar__cmnty-item"
            v-for="item in fetchedData"
            :key="item.id"
            :community="item"
        />
        <StatusIndicator :isFetching="loading4More" :listLen="fetchedData.length"/>
    </div>
</template>

<script>
import Community from '@/components/community/list/CmntyItem'
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
.side-bar__cmnty-item {
    min-height: 75px;
}.side-bar__cmnty-item .mbrshp__role, .side-bar__cmnty-item .mbrshp__join-btn {
    display: none;
}.side-bar__cmnty-item .mbrshp__cmnty-name {
    font-size: 16px;
}.side-bar__cmnty-item .mbrshp__subtxt {
    font-size: 11px;
}
.side-bar__cmnty-item:hover {
    box-shadow: inset 0px -120px 50px -40px rgba(0, 0, 0, 0.35);
    text-shadow: 0px 0px 6px #000;
}
.side-bar__cmnty-title {
    font-size: 14px;
    margin: 20px 20px;
    font-weight: bold;
    text-align: center;
}
</style>