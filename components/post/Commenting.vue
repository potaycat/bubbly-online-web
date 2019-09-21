<template>
    <section class="pf-comments">
        <div>Comments <span>({{total}})</span></div>
            
        <div class="cmt-add-block glow">
            <img class="pfp" :src="pfp">
            <span>Add yours...</span>
        </div>

        <div v-for="cmt in comments"
            :key="cmt.id"
            class="le-cmt" 
        >
            <img class="pfp" :src="cmt.content.author.profile_pic">
            <div class="cmt-content">
                <div class="cmt-info glow">
                    <div class="cmt-author-name"> {{cmt.content.author.alias}}&nbsp;</div>
                    <div class="cmt-timestamp">• {{timeAgo(cmt.content.timestamp)}}</div>
                    <i class="material-icons-round">more_horiz</i>
                </div>
                <p> {{cmt.content.text}} </p>
                
                <div v-for="atch in cmt.content.attachments"
                    :key="atch.ordering"
                >
                    <img v-if="atch.type==2" class="cmt-pic-attch" :src="atch.content">
                </div>

                <div class="cmt-reacts">
                    <React v-for="react in cmt.content.react_count"
                        :key="react.react"
                        :reactId="react.react"
                        :reactCount="react.count"
                        :reactData="cmt.content.reacts"
                        size= "_rea_smol"
                    />
                    <AddReact size="_smol_addo" :community="community.id"/>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import { timeAgo } from '@/mixins/timeAgo'

import BubblyMarkdownParse from './BubblyMarkdownParse'
import React from './react/React'
import AddReact from './react/AddReact'

export default {
    components: {
        BubblyMarkdownParse,
        React,
        AddReact,
    },
    mixins: [
        timeAgo,
    ],
    props: [
        'comments',
        'total',
        'community',
    ],
    computed: {
        pfp() {
            let pfp = this.$store.state.jwtlogin.stored_profile
            if (pfp) return JSON.parse(pfp).profile_pic
            return null
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
    width: 35px;
    height: 35px;
}
.cmt-add-block {
    display: flex;
    padding: 12px 0 5px;
}
.cmt-add-block span {
    /* background: #00000022; */
    font-size: 14px;
    color: #aaa;
    border: 1px solid #ccc;
    border-radius: 100px;
    padding: 6px 10px;
    margin: 0 10px;
    width: 100%;
}

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
    /* margin-bottom: -3px; */
}
.cmt-info .cmt-author-name {
    font-weight: bold;
    margin: auto 0;
}
.cmt-info .cmt-timestamp {
    pointer-events: none;
    color: #aaa;
    margin: auto 0;
    font-size: 12px;
}
.cmt-info .material-icons-round{
    color: #aaa;
    margin-left: auto;
}

.cmt-content p {
    margin-bottom: 5px;
}
.cmt-pic-attch {
    width: 100%;
    border-radius: 20px;
    margin: 2px 0;
}
</style>