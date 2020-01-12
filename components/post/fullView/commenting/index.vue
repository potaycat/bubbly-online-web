<template>
    <section class="common_ls_wrapper pf-comments">
        <div>Comments <span>({{onPost.reply_count}})</span></div>
        <div class="cmt-add-block">
            <img class="pfp" :src="this.$store.state.auth.my_profile.profile_pic">
            <span class="glow" @click="launchReplyComposer">Add yours...</span>
        </div>
        <CommentItem v-for="comment in fetchedData"
            :key="comment.id"
            :comment="comment"
            :communityId="onPost.allocated_to.id"
        />
        <StatusIndicator :isFetching="loading4More" :listLen="fetchedData.length" headsup=""/>

        <ComposerAttch
            :attachmentList="attachmentList"
            @remove="attachmentList=[]"
            :uploading="uploading"
            class="pf-padding-fix"
        />
        <SendBox v-if="openComposer"
            immediateFocus=1
            @textOutbox="outBoxing"
            @picPick="addPic"
            class="pf-padding-fix"
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
    padding: 10px 0;
}
.cmt-add-block > span {
    font-size: 14px;
    color: #aaa;
    border: 1px solid #ccc;
    border-radius: 100px;
    padding: 6px 10px;
    margin-left: 10px;
    width: 100%;
}

.pf-padding-fix {
    /* bruh */
    transform: translateX(-15px);
}
</style>