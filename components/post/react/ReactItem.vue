<template>
    <div :class="['react_ push glow', size, isMine?'--mine box-shadow-1':null]">
        <img :src="sauce">
        <div> {{ react.count }} </div>
    </div>
</template>

<script>
import { mapGetters } from "vuex"
export default {
    props: [
        'communityId',
        'react',
        'size',
        'isMine',
    ],
    computed: {
        ...mapGetters({
            emoteById: 'reactionx/emoteById',
        }),
        sauce() {
            switch (this.react.img_src) {
                case "_":
                    return require('@/assets/heart.png')
                default:
                    return this.react.img_src || this.emote.img_src
            }
        },
        emote() {            
            const emote = this.emoteById(this.communityId, this.react.icon_id)
            if (emote) {
                return emote
            } else {
                this.$emit('emote404')
                return {}
            }
        },
    },
}
</script>

<style>
.react_ {
    display: inline-flex;
    align-items: center;
    font-size: 12px;
    background: #eee;
    border-radius: 5px;
    padding: 2px 4px;
    margin-right: 4px;
}

.react_.--mine {
    background: var(--primary-color-low-opacity);
}
.react_.--mine > div {
    color: var(--primary-color);
}

.react_ > img {
    width: 20px;
    height: 20px;
    margin: 0 2.5px;
}
.react_ > div {
    color: #555;
    font-weight: bold;
    margin: 0 3px;
}

.react_.react-icon--big {
    margin: 5px 0;
    padding: 3px 6px;
    border-radius: 6px;
    margin-right: 6px;
}
.react_.react-icon--big > img {
    width: 24px;
    height: 24px;
}
.react_.react-icon--big > div {
    font-size: 15px;
}

.react_.react-icon--smol {
    margin: 2px 0;
    margin-right: 4px;
    padding: 1.75px 2px;
}
.react_.react-icon--smol > img {
    height: 16px;
    width: 16px;
}
.react_.react-icon--smol > div {
    font-size: 10px;
    margin-left: 2px;
}

@media (hover: hover) {
    .react_: {
        color: white !important;
    }
}
</style>
