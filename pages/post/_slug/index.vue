<template>
    <div>
        <PostFullView v-if="post"
            :post="post"
        />
    </div>
</template>

<script>
import PostFullView from '@/components/post/full/PostFullView'
export default {
    layout: 'immerse',
    components: {
        PostFullView,
    },
    asyncData ({ $axios, params }) {

    },
    data() {
        return {
            post: null
        }
    },
    created() {
        this.$store.commit('detailBanner/loadText', null)
        this.$store.commit('detailBanner/loadPic', {})
        
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
