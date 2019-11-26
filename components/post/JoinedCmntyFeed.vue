<template>
    <div id="" class="the_big_frame">
        <div class="common_ls_cntainr --top-lev-app-bar --with-tabs cards-wrapper" ref="feed">
            <PostCard v-for="post in fetchedData"
                :key ="post.id"
                :post ="post"
            />
            <Spinner v-if="loading4More" />
        </div>
    </div>
</template>

<script>
import { feedingFrenzy, maintainScrllPos, scrlDirection } from '@/mixins/feedingFrenzy'
import PostCard from './postCard/'

export default {
    components: {PostCard},
    mixins: [feedingFrenzy, maintainScrllPos, scrlDirection],
    data() {
        return {
            feedUrl: 'posts/feed/',
        }
    },
}
</script>
