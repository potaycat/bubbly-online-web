<template>
    <section class="common_ls_wrapper pf-comments">
        <div>Comments <span>({{onPost.reply_count}})</span></div>
        <div class="cmt-add-block">
            <img class="pfp" :src="pfp">
            <span class="glow" @click="launchReplyComposer">Add yours...</span>
        </div>

        <CommentItem v-for="comment in fetchedData"
            :key="comment.id"
            :comment="comment"
            :communityId="onPost.allocated_to.id"
        />
        <Spinner v-if="loading4More" />
        <SendBox v-if="openComposer"
            class="in-comment-send-box"
            immediateFocus=1
            @outBoxing="outBoxing"
            @sendEmote="performSendEmote"
        />
    </section>
</template>

<script>
import CommentItem from './CommentItem'
import { feedingFrenzy, refreshFrenzy, maintainScrllPos } from '@/mixins/feedingFrenzy'
import { sendingHandler } from '@/components/comment/composer'

export default {
    components: {CommentItem},
    mixins: [feedingFrenzy, refreshFrenzy, maintainScrllPos, sendingHandler],
    props: ['onPost'],
    data() {return {
        feedUrl: `posts/${this.onPost.id}/comments/?sort_by=best&`,
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

.in-comment-send-box {
    transform: translateX(-56px);
    width: calc(100% + 41px) !important;
    clip-path: inset(0 0 0 41px);
}
</style>