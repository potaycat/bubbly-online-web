<template>
    <div class="common_ls_cntainr" ref="feed">
        <p class="side-bar__cmty-title">{{ title }}</p>
        <User
            class="side-bar__user-item"
            v-for="item in fetchedData"
            :key="item.id"
            :profile="item"
        />
        <StatusIndicator :isFetching="loading4More" :listLen="fetchedData.length" headsup="Empty"/>
    </div>
</template>

<script>
import User from '@/components/profile/list/UserItem'
import { feedingFrenzy } from '@/mixins/feedingFrenzy'
export default {
    components: { User },
    mixins: [feedingFrenzy],
    props: ['title', 'toFetch'],
    // const {
        offsetProp: 'username',
    // },
    computed: {
        feedUrl() {
            return this.toFetch
        }
    },
    methods: {
        simulateDisableKeepAlive() {
            this.fetchedData = []
            this.firstFetch()
        }
    }
}
</script>

<style>
.side-bar__user-item .usr-blck__btn > div {
    font-size: 11px;
}
.side-bar__user-item .user-block .pfp {
    height: 40px;
    min-width: 40px;
    max-width: 40px;
}
.side-bar__user-item .usr-blck__alias {
    font-size: 14px;
}
.side-bar__user-item .usr-blck__bio {
    font-size: 12px;
}.side-bar__user-item .usr-blck__role {
    top: 42px;
    font-size: 9px;
}
</style>