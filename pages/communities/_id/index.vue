<template>
    <div>
        <ActivityView />
        <LeCommunity :community="community"/>
    </div>
</template>

<script>
import ActivityView from '@/components/layout/ActivityView'
import LeCommunity from '@/components/community/'
export default {
    components: {ActivityView, LeCommunity},
    head() {
        return {
            title: `${this.community.name} | Bubbly`,
        }
    },
    async asyncData({ $axios, params, store }) {
        const cmtyInfoRes = await $axios.$get(`/communities/${params.id}`, store.state.authHeader)
        // let postsRes = await $axios.$get(`/posts/feed?format=json&community=${communityInfoRes.id}`)
        return {
            community: cmtyInfoRes
            // posts: communityPostsRes
        }
    },
};
</script>
