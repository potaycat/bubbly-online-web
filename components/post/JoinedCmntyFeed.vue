<template>
    <div id="" class="the_big_frame">
        <div class="common_ls_cntainr --top-lev-app-bar --with-tabs cards-wrapper" ref="feed">
            <PostCard v-for="post in fetchedData"
                :key ="post.id"
                :post ="post"
            />
            <h3 class="empty-fetchedLs" v-if="empty">Empty post feed? Get started by joining a few communities</h3>
            <Spinner v-if="loading4More" />
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
        empty(boolVal) {
            if (boolVal) this.$router.push('/explore')
        }
    },
}
</script>
