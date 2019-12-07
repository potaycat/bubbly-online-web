<template>
    <div class="common_ls_wrapper" style="padding:0 8px">
        <PostCard v-for="post in fetchedData"
            :key ="post.id"
            :post ="post"
            :user="profile"
        />
        <h3 class="empty-fetchedLs" v-if="empty">This user has not posted anything</h3>
        <Spinner v-if="loading4More" />
    </div>
</template>

<script>
import { feedingFrenzy, postFeed, maintainScrllPos } from '@/mixins/feedingFrenzy'
import PostCard from '@/components/post/postCard/'

export default {
    components: {
        PostCard,
    },
    mixins: [feedingFrenzy, postFeed, maintainScrllPos],
    props: ['profile'],
    data() {
        return {
            feedUrl: `accounts/${this.profile.username}/posts/`,
        }
    },
    computed: {
        scrollCtnr() {
            return this.$parent.$refs.feed
        },
    },
};
</script>