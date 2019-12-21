<template>
    <div class="post-full-view-wrapper">
        <ActivityView />
        <PostFullView v-if="post" :post="post" />
        <h2 v-if="error">No post found</h2>
    </div>
</template>

<script>
import ActivityView from '@/components/layout/ActivityView'
import PostFullView from '@/components/post/fullView/'
export default {
    components: {ActivityView, PostFullView},
    asyncData({ $axios, store, params }) {
        const stored = store.state.postx.currentPost
        if (!stored) {
            return $axios.get(`posts/${params.slug}`, store.state.authHeader)
                .then(res => {
                    return {
                        post: res.data,
                        isSSR: true
                    }
                })
                .catch(err => {
                    return { error: err }
                })
        }
        return {
            post: stored
        }
    },
    data:() => ({
        error: null,
    }),
    activated() {
        if (!this.isSSR) {
            this.$axios.get(`posts/${this.$route.params.slug}`, 
                this.$store.state.authHeader
            )
                .then(res => {
                    // this.$store.commit('postx/loadPost', res.data)
                    this.post = res.data
                })
                .catch(error => {
                    this.error = error.response.data
                })
        }
    },
}
</script>

<style>
.post-full-view-wrapper > h2 {
    color: #333;
    margin: 100px;
}
</style>
