<template>
    <section class="pf-comments">
        <div>Comments <span>({{total}})</span></div>
            
        <div class="cmt-add-block">
            <img class="pfp" :src="pfp">
            <span class="glow">Add yours...</span>
        </div>

        <CommentItem v-for="comment in comments"
            :key="comment.id"
            :comment="comment"
            :community="community"
        />
        <div style="min-height:69px"/>

    </section>
</template>

<script>
import CommentItem from './CommentItem'

export default {
    components: {
        CommentItem,
    },
    props: [
        'comments',
        'total',
        'community',
    ],
    computed: {
        pfp() {
            const my_profile = this.$store.state.auth.my_profile
            if (my_profile) return my_profile.profile_pic
            return ""
        },
    },
}
</script>

<style>
.pf-comments{
    width: 100%;
    margin-top: 15px;
}
.pf-comments .pfp {
    height: 35px;
    min-width: 35px;
    max-width: 35px;
}
.cmt-add-block {
    display: flex;
    padding: 12px 0 5px;
}
.cmt-add-block > span {
    /* background: #00000022; */
    font-size: 14px;
    color: #aaa;
    border: 1px solid #ccc;
    border-radius: 100px;
    padding: 6px 10px;
    margin: 0 10px;
    width: 100%;
}
</style>