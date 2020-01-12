<template>
    <div class="the_big_frame">
        <AppBarCustomBtn
            :customCmds="[{action: 'toPost', icon: 'input'}]"
            @toPost="$router.push(`/post/${comment.on}`)"
        />
        <div class="single-cmt-view common_ls_cntainr --dtail-app-bar" ref="feed">
            <CommentItem class="smv-cmt-item"
                :comment="comment"
                :communityId="comment.allocated_to"
                @reply="launchReplyComposer"
            />
            <div class="cmt-add-block">
                <img class="pfp" :src="this.$store.state.auth.my_profile.profile_pic">
                <span class="glow" @click="launchReplyComposer">Write a reply...</span>
            </div>
            <section class="smv-replies-ctnr">
                <CommentItem v-for="reply in fetchedData"
                    class="smv-cmt-item"
                    :key="reply.id"
                    :comment="reply"
                    :communityId="comment.allocated_to"
                />
            </section>
            <StatusIndicator :isFetching="loading4More" :listLen="fetchedData.length" headsup=""/>
        </div>
        <ComposerAttch
            :attachmentList="attachmentList"
            @remove="attachmentList=[]"
            :uploading="uploading"
        />
        <SendBox v-if="openComposer"
            immediateFocus=1
            @textOutbox="outBoxing"
            @picPick="addPic"
        />
    </div>
</template>

<script>
import CommentItem from '../post/fullView/commenting/CommentItem'
import { feedingFrenzy, refreshFrenzy, maintainScrllPos } from '@/mixins/feedingFrenzy'
import AppBarCustomBtn from '@/components/misc/AppBarCustomBtn'
import { sendingHandler } from './composer'

export default {
    components: {CommentItem, AppBarCustomBtn},
    mixins: [feedingFrenzy, refreshFrenzy, maintainScrllPos, sendingHandler],
    props: ['comment'],
    data() {return {
        feedUrl: `posts/${this.$route.params.id}/comments/?is_reply=1&`,
    }},
}
</script>

<style>
.single-cmt-view {
    width: 100%;
    padding-right: 15px;
    padding-left: 15px;
}
.single-cmt-view .pfp {
    height: 35px;
    min-width: 35px;
    max-width: 35px;
}

.smv-cmt-item{
    width: 100%;
    margin: 15px 0;
}
.smv-replies-ctnr {
    width: 100%;
    padding-left: 30px;
}

/* CARBON COPIED */
.cmt-add-block {
    display: flex;
    padding: 12px 0;
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
/* END OF COPIED */
.single-cmt-view > .cmt-add-block {
    padding: 0 0 5px 30px;
    width: 100%;
}
</style>