<template>
    <div>
        <ActivityView />
        <PostFullView v-if="post"
            :post="post"
        />
    </div>
</template>

<script>
import ActivityView from '@/components/layout/ActivityView'
import PostFullView from '@/components/post/fullView/'
export default {
    components: {ActivityView, PostFullView},
    asyncData ({ $axios, params }) {

    },
    data() {
        return {
            post: null
        }
    },
    created() {
        this.$axios.get(`posts/${this.$route.params.slug}`, 
            this.$store.state.authHeader)
            .then(res => {
                this.post = res.data
            })
            .catch(error => {
                console.log(error);
            })
    }
}
</script>
