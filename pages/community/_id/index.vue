<template>
    <div>
        <LeCommunity :community="community"/>
    </div>
</template>

<script>
import LeCommunity from '@/components/LeCommunity'
export default {
    layout: "immerse",
    components: {LeCommunity},
    head() {
        return {
            title: `${this.community.name} | Bubbly`,
        }
    },
    async asyncData({ $axios, params, store }) {
        const cmntyInfoRes = await $axios.$get(`/communities/${params.id}`, store.state.authHeader)
        // let postsRes = await $axios.$get(`/posts/feed?format=json&community=${communityInfoRes.id}`)
        return {
            community: cmntyInfoRes
            // posts: communityPostsRes
        }
    },
    created() {
        this.$store.commit('detailBanner/loadText', null)
        this.$store.commit('detailBanner/loadPic', {})
    }
};
</script>
