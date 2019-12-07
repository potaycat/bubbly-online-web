<template>
    <div class="single-cmt-view common_ls_cntainr --dtail-app-bar" ref="feed">
        <AppBarCustomBtn
            :customCmds="[{action: 'toPost', icon: 'input'}]"
            @toPost="$router.push(`/post/${comment.on}`)"
        />
        <CommentItem class="smv-cmt-item"
            :comment="comment"
            :communityId="comment.allocated_to"
            @reply="launchReplyComposer"
        />
        <section class="smv-replies-ctnr">
            <CommentItem v-for="reply in fetchedData"
                class="smv-cmt-item"
                :key="reply.id"
                :comment="reply"
                :communityId="comment.allocated_to"
            />
        </section>
        <Spinner v-if="loading4More" />

        <div class="single-cmt__add-block">
            <span class="glow" @click="launchReplyComposer">Write a reply...</span>
        </div>
        <SendBox v-if="openComposer"
            immediateFocus=1
            @outBoxing="outBoxing"
            @sendEmote="performSendEmote"
        />
    </div>
</template>

<script>
import CommentItem from '../post/fullView/commenting/CommentItem'
import { feedingFrenzy, maintainScrllPos } from '@/mixins/feedingFrenzy'
import AppBarCustomBtn from '@/components/misc/AppBarCustomBtn'
import { appBarTitle } from '@/mixins/appBarStuff'
import { sendingHandler } from './composer'

export default {
    components: {CommentItem, AppBarCustomBtn},
    mixins: [feedingFrenzy, maintainScrllPos, appBarTitle, sendingHandler],
    props: ['comment'],
    data() {return {
        feedUrl: `posts/${this.$route.params.id}/comments/?is_reply=1`,
        appBarDisplayTitle: "Comment"
    }},
}
</script>

<style>
.single-cmt-view{
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
}
.smv-replies-ctnr {
    width: 100%;
    padding-left: 30px;
}

.single-cmt__add-block {
    display: flex;
    padding: 12px 0 0 35px;
    width: 100%;
}
.single-cmt__add-block > span {
    font-size: 14px;
    color: #aaa;
    border: 1px solid #ccc;
    border-radius: 100px;
    padding: 6px 10px;
    width: 100%;
}
</style>