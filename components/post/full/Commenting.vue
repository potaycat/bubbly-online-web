<template>
    <section class="pf-comments">
        <div>Comments <span>({{total}})</span></div>
            
        <div class="cmt-add-block">
            <img class="pfp" :src="pfp">
            <span class="glow">Add yours...</span>
        </div>

        <div v-for="cmt in comments"
            :key="cmt.id"
            class="le-cmt" 
        >
            <nuxt-link :to="'/user/' + cmt.author.username">
                <img class="pfp" :src="cmt.author.profile_pic">
            </nuxt-link>
            <div class="cmt-content">
                <div class="cmt-info">
                    <div class="cmt-author-name glow"> {{cmt.author.alias}}&nbsp;</div>
                    <div class="cmt-timestamp">• {{cmt.timestamp | timeAgo}}</div>
                    <i class="material-icons-round glow">more_horiz</i>
                </div>
                <p> {{cmt.text}} </p>
                
                <div v-for="atch in cmt.attachments"
                    :key="atch.ordering"
                >
                    <img v-if="atch.type==2" class="cmt-pic-attch" :src="atch.content">
                </div>

                <div class="cmt-reacts">
                    <React v-for="react in cmt.react_count"
                        :key="react.react"
                        :reactId="react.react"
                        :reactCount="react.count"
                        :reactData="cmt.reacts"
                        size= "_rea_smol"
                    />
                    <AddReact size="_smol_addo" :community="community.id"/>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import BubblyMarkdownParse from '../mdParse'
import React from '../react'
import AddReact from '../react/AddReact'

export default {
    components: {
        BubblyMarkdownParse,
        React,
        AddReact,
    },
    props: [
        'comments',
        'total',
        'community',
    ],
    computed: {
        pfp() {
            let pfp = this.$store.state.auth.stored_profile
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