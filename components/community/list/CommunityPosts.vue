<template>
    <div style="width:100%;padding:0 8px">
        <PostCard v-for="post in fetchedData"
            :key ="post.id"
            :post ="post"
            :community="community"
        />
    </div>
</template>

<script>
import { feedingFrenzy } from '@/mixins/feedingFrenzy'
import PostCard from '@/components/post/PostCard'

export default {
    components: {
        PostCard,
    },
    mixins: [feedingFrenzy],
    props: ['community'],
    data() {
        return {
            feedUrl: `communities/${this.community.id}/posts/`,
        }
    },
    computed: {
        scrollCtnr() {
            return this.$parent.$refs.feed
        },
    },
};
</script>