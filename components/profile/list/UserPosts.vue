<template>
    <div class="common_ls_wrapper" style="padding:0 8px">
        <PostCard v-for="post in fetchedData"
            :key ="post.id"
            :post ="post"
            :user="profile"
        />
        <StatusIndicator :isFetching="loading4More" :listLen="fetchedData.length"
            headsup="This user has not posted anything"/>
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