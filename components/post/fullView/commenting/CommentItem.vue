<template>
    <div class="le-cmt">
        <nuxt-link tag="img" :to="'/user/'+comment.author.username"
            class="pfp lift" :src="comment.author.profile_pic"
        />
        <div class="cmt-content">
            <div class="cmt-info">
                <div class="cmt-inf__author-name"> {{comment.author.alias}}&nbsp;</div>
                <div class="cmt-inf__timestmp">• {{comment.timestamp | timeAgo}}
                    <span v-if="comment.edited"> • Edited</span>
                </div>
                <i @click="performDrop" class="material-icons-round nopaque">more_horiz</i>
            </div>
            <p> {{comment.text}} </p>
            
            <div v-for="atch in comment.attachments"
                :key="atch.ordering"
            >
                <img v-if="atch.type==2" class="cmt__attch" :src="atch.content">
            </div>

            <div class="cmt__reacts">
                <React
                    :reacts="reactionsLsSorted"
                    :myReact="comment.my_react"
                    :communityId="communityId"
                    size="react-icon--smol"
                    @toggleAdd="launchAddBox"
                    @emoteChose="performReact"
                    @deleteReact="deleteReaction"
                    @reply="$emit('reply');$router.push(`/comment/${comment.id}`)"
                />
            </div>
            <nuxt-link tag="div" v-if="comment.reply_count" :to="`/comment/${comment.id}`"
                class="cmt__replies-count glow" :src="comment.author.profile_pic"
            >
                {{comment.reply_count}} replies <span>></span>
            </nuxt-link>
        </div>
        <FloatingEmotes v-if="reacting"
            :position="reacting"
            :communityId="communityId"
            @emoteChose="performReact"
            @cancel="closeEmoteSelector"
        />
        <Dropdown v-if="touchPos"
            :position="{y:touchPos.y, x:touchPos.x}"
            :options="[
                ...[
                    {action:'goToReactions', label:'View reactions'},
                    {action:'copyLink', label:'Copy comment URL'},
                ],
                ...comment.author.username==$store.state.auth.my_profile.username ? [
                    {action:'goToEdit', label:'Edit'},
                    {action:'confirm_delete', label:'Delete'}
                ] : [
                    isMod(communityId) ? {action:'mod_delete', label:'[Mod] Remove comment'} :
                        {action:'confirm_report', label:'Report'}
                ]
            ]"
        />
        <InputDialog v-if="openDiag" :toDisplay="openDiag"/>
    </div>
</template>

<script>
import { reactAdd } from '@/mixins/cmpnentsCtrl/reactAdd'
import { dropdown } from '@/mixins/cmpnentsCtrl/dropdown'
import { performEdit } from '@/mixins/performEdit'
import { mapGetters } from "vuex"

export default {
    mixins: [reactAdd, dropdown, performEdit],
    props: ['comment', 'communityId'],
    computed: {
        ...mapGetters({
            isMod: 'communityx/isMod',
        }),
        isSelf() {
            return this.comment.author.username == this.$store.state.auth.my_profile.username
        },
        post() { return this.comment } // to work with 'reactAdd'
    },
    methods: {
        goToReactions() {
            this.$router.push(`/post/${this.comment.id}/reactions?comment=1`)
        },
        copyLink() {
            navigator.clipboard.writeText(`${window.location.origin}/comment/${this.comment.id}`)
            .then(() => {
                this.$store.dispatch('cpntCtrl/toast/toastAlert', {message: "Copied to clipboard"})
            })
        }
    }
}
</script>

<style>
.le-cmt {
    margin: 10px 0;
    display: flex;
    font-size: 14px;
}
.le-cmt .cmt-content {
    margin-left: 10px;
    width: 100%;
    transform: translate(0, -4px);
}
.cmt-content .cmt-info {
    display: flex;
    align-items: center;
    /* margin-bottom: -3px; */
}
.cmt-info .cmt-inf__author-name {
    font-weight: bold;
    font-size: 12px;
}
.cmt-info .cmt-inf__timestmp {
    color: #aaa;
    font-size: 10px;
    margin: auto 0 1px;
}
.cmt-info > i {
    color: var(--primary-color);
    margin: auto 0 0 auto;
    font-size: 18px;
}

.cmt-content > p {
    margin: 2px 0 6px;
    user-select: text;
}
.cmt__attch {
    width: 100%;
    border-radius: 20px;
    margin: 2px 0;
}

.cmt__reply-btn {
    /* display: inline; */
}
.cmt__replies-count {
    background: #eee;
    padding: 2px 10px;
    transform: translateY(5px);
    border-radius: 20px;
    font-size: 11px;
    font-weight: bold;
}
.cmt__replies-count >span {
    float: right;
}
</style>