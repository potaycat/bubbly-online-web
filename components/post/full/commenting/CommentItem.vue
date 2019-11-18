<template>
    <div class="le-cmt">
        <nuxt-link :to="'/user/' + comment.author.username">
            <img class="pfp" :src="comment.author.profile_pic">
        </nuxt-link>
        <div class="cmt-content">
            <div class="cmt-info">
                <div class="cmt-inf__author-name glow"> {{comment.author.alias}}&nbsp;</div>
                <div class="cmt-inf__timestmp">• {{comment.timestamp | timeAgo}}</div>
                <i @click="performDrop" class="material-icons-round glow">more_horiz</i>
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
                    :communityId="community.id"
                    size= "react-icon--smol"
                    @toggleAdd="launchAddBox"
                    @quickReact="performReact"
                    @deleteReact="deleteReaction"
                />
            </div>
        </div>
        <Dropdown v-if="touchPos" @pick="onDropDownPick"
            :position="{y:touchPos.y, x:18}"
            :options="[
                ...comment.author.username==$store.state.auth.my_profile.username ? [
                    {value:'edit', name:'Edit'},
                    {value:'delete', name:'Delete comment'}
                ] : [
                    isMod(this.community.id) ? {value:'mod_delete', name:'[Mod] Remove comment'} :
                        {value:'flag', name:'Report'}
                ],
                ...[
                    //{value:'copyLink', name:'Copy post URL'}, Vue bug?
                ]
            ]"
        />
        <ReactAdd v-if="reacting"
            :position="reacting"
            :community="community"
            @performReact="performReact"
        />
    </div>
</template>

<script>
import { _comp_reactAdd } from '@/mixins/_comp_reactAdd'
import { _comp_dropdown } from '@/mixins/_comp_dropdown'
import { mapGetters } from "vuex"

export default {
    mixins: [_comp_reactAdd, _comp_dropdown],
    props: ['comment', 'community'],
    computed: {
        ...mapGetters({
            isMod: 'moderating/isMod',
        }),
        isSelf() {
            return this.comment.author.username == this.$store.state.auth.my_profile.username
        },
        post() {return this.comment} // to work with _comp_reactAdd mixin
    },
    methods: {
        onDropDownPick(value) {
            this.touchPos = null
            switch (value) {
                default:
                    break
            }
        },
    }
}
</script>

<style>
.le-cmt {
    margin: 15px 0;
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
}
.cmt-info .cmt-inf__timestmp {
    color: #aaa;
    font-size: 12px;
}
.cmt-info .material-icons-round{
    color: rgba(72, 133, 237, .9);
    margin: auto 0 0 auto;
    font-size: 18px;
}

.cmt-content p {
    margin-bottom: 5px;
}
.cmt__attch {
    width: 100%;
    border-radius: 20px;
    margin: 2px 0;
}
</style>