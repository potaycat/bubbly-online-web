<template>
    <section class="pf-comments">
        <div>Comments <span>({{onPost.reply_count}})</span></div>
        <div class="cmt-add-block">
            <img class="pfp" :src="pfp">
            <span class="glow">Add yours...</span>
        </div>

        <CommentItem v-for="comment in fetchedData"
            :key="comment.id"
            :comment="comment"
            :community="onPost.allocated_to"
        />
        <Spinner v-if="loading4More" />
    </section>
</template>

<script>
import CommentItem from './CommentItem'
import { feedingFrenzy, maintainScrllPos } from '@/mixins/feedingFrenzy'

export default {
    components: {CommentItem},
    mixins: [feedingFrenzy, maintainScrllPos],
    props: ['onPost'],
    data() {return {
        feedUrl: `posts/${this.onPost.id}/comments/`,
    }},
    computed: {
        pfp() {
            const my_profile = this.$store.state.auth.my_profile
            if (my_profile) return my_profile.profile_pic
            return ""
        },
        scrollCtnr() {return this.$parent.$refs.feed},
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