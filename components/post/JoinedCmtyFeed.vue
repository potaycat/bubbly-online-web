<template>
    <div id="" class="the_big_frame">
        <div class="common_ls_cntainr --top-lev-app-bar cards-wrapper" ref="feed">
            <PostCard v-for="post in fetchedData"
                :key ="post.id"
                :post ="post"
            />
            <StatusIndicator :isFetching="loading4More" :listLen="fetchedData.length"
                headsup="Empty post feed? Get started by joining a few communities"/>
        </div>
    </div>
</template>

<script>
import { feedingFrenzy, postFeed, maintainScrllPos, scrlDirection } from '@/mixins/feedingFrenzy'
import PostCard from './postCard/'

export default {
    components: {PostCard},
    mixins: [feedingFrenzy, postFeed, maintainScrllPos, scrlDirection],
    data:() => ({
        feedUrl: 'posts/feed/',
        updatePending: false,
    }),
    computed: {
        joinedCount() {
            return this.$store.state.communityx.joined.length
        },
    },
    watch: {
        "fetchedData.length"(val) {
            if (val && val < 50 && this.$OneSignal) {
                this.$OneSignal.isPushNotificationsEnabled(yes => {
                    if (!yes) {
                        this.$OneSignal.showSlidedownPrompt()
                        .then(() => {
                            this.myOneSignalInit()
                        })
                    }
                })
            }
        },
        joinedCount() {
            this.updatePending = true
        },
        loading4More(boolVal) {
            if (!boolVal && !this.fetchedData.length) {
                this.$router.push('/explore')
            }
        }
    },
    activated() {
        if (this.updatePending) {
            this.updatePending = false
            this.firstFetch()
        }
    }
}
</script>
