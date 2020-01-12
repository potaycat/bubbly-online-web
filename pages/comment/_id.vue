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
    meta: {
        useAppBar: true,
        disableHamburger: true,
        appBarTitle: "Comment"
    },
    components: {ActivityView, SingleCommentView},
    data:() => ({
        comment: null
    }),
    activated() {
        this.$axios.get(`posts/comment/${this.$route.params.id}`, 
            this.$store.state.auth.head
        )
            .then(res => {
                this.comment = res.data
            })
            .catch(error => {
                console.error("CAUGHT: "+error);
            })
    },
}
</script>
