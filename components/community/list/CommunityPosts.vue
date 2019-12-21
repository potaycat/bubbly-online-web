<template>
    <div class="common_ls_wrapper" style="padding:0 8px">
        <PostCard v-for="post in fetchedData"
            :key ="post.id"
            :post ="post"
            :community="community"
        />
        <StatusIndicator :isFetching="loading4More" :listLen="fetchedData.length"/>
        
        <FAB @clicked="$router.push(`/post/compose?to=${community.id}`)"
            v-if="community.membership_info && 
                ['moderator','administrator','member'].includes(community.membership_info.role)"
            icon= "add"
            actionName= "Post to community"
        />
    </div>
</template>

<script>
import { feedingFrenzy, postFeed, maintainScrllPos, scrlDirection } from '@/mixins/feedingFrenzy'
import PostCard from '@/components/post/postCard/'
import FAB from '@/components/misc/FAB'

export default {
    components: {PostCard, FAB},
    mixins: [feedingFrenzy, postFeed, maintainScrllPos, scrlDirection],
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