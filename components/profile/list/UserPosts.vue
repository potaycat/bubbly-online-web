<template>
    <div style="width:100%;padding:0 8px">
        <PostCard v-for="post in fetchedData"
            :key ="post.id"
            :post ="post"
        />
    </div>
</template>

<script>
import { feedingFrenzy } from '@/mixins/feedingFrenzy'
import PostCard from '@/components/post/postCard/'

export default {
    components: {
        PostCard,
    },
    mixins: [feedingFrenzy],
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