<template>
    <div>
        <ActivityView />
        <SingleCommentView v-if="comment" :comment="comment" />
    </div>
</template>

<script>
import ActivityView from '@/components/layout/ActivityView'
import SingleCommentView from '@/components/comment/'
export default {
    components: {ActivityView, SingleCommentView},
    data:() => ({
        comment: null
    }),
    created() {
        this.$axios.get(`posts/comment/${this.$route.params.id}`, 
            this.$store.state.authHeader
        )
            .then(res => {
                console.log("AAAAAAAAAAaa");
                console.log(res.data);
                
                this.comment = res.data
            })
            .catch(error => {
                console.error("CAUGHT: "+error);
            })
    },
}
</script>
