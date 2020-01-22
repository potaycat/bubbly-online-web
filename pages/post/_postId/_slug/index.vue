<template>
    <div class="post-full-view-wrapper">
        <ActivityView />
        <PostFullView v-if="post" :post="post" />
        <h2 v-if="error">Post is not available</h2>
    </div>
</template>

<script>
import ActivityView from '@/components/layout/ActivityView'
import PostFullView from '@/components/post/fullView/'
export default {
    meta: {
        useAppBar: true,
    },
    components: {ActivityView, PostFullView},
    asyncData({ $axios, store, params }) {
        const stored = store.state.postx.currentPost
        if (!stored) {
            return $axios.get(`posts/${params.postId}`, store.state.auth.head)
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
    watch: {
        post: {
            immediate: true,
            handler(obj) {
                if (obj.slug) {
                    this.$route.params.postId = obj.id
                    history.replaceState({}, null,
                        this.$route.path.replace(/post\/(.*)/, `post/${obj.id}/${obj.slug}`)
                    )
                }
            }
        }
    },
    activated() {
        if (!this.isSSR) {
            this.$axios.get(`posts/${this.$route.params.postId}`, 
                this.$store.state.auth.head
            )
            .then(res => {
                // this.$store.commit('postx/LOAD_POST', res.data)
                this.post = res.data
            })
            .catch(error => {
                this.error = error.response.data
            })
        } else
            this.isSSR = false
    },
}
</script>

<style>
.post-full-view-wrapper > h2 {
    color: #333;
    text-align: center;
    margin-top: 100px;
    color: #666;
}
</style>
