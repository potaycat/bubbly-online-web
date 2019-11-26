<template>
    <div style="width:100%;padding:0 8px">
        <PostCard v-for="post in fetchedData"
            :key ="post.id"
            :post ="post"
            :community="community"
        />
        <Spinner v-if="loading4More" />
        <!-- <FAB @clicked="$router.push(`/post/compose?cmnty=${community.id}`)"
            icon= "post_add"
            actionName="Post to community"
            style="bottom:20px"
        /> -->
    </div>
</template>

<script>
import { feedingFrenzy, maintainScrllPos, scrlDirection } from '@/mixins/feedingFrenzy'
import PostCard from '@/components/post/postCard/'
import FAB from '@/components/misc/FAB'

export default {
    components: {PostCard, FAB},
    mixins: [feedingFrenzy, maintainScrllPos, scrlDirection],
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