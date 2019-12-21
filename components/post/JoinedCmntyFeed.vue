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
    data() {
        return {
            feedUrl: 'posts/feed/',
        }
    },
    watch: {
        "fetchedData.length"(val) {
            if (!val && !this.loading4More) {
                this.$router.push('/explore')
            }
            if (val && val < 50) {
                this.$OneSignal.isPushNotificationsEnabled(yes => {
                    if (!yes) {
                        this.$OneSignal.showSlidedownPrompt()
                        .then(() => {
                            this.myOneSignalInit()
                        })
                    }
                })
            }
        }
    },
}
</script>
