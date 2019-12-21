<template>
<transition name="fade">
    <!-- TODO refactor -->
    <div :class="['total_darkness', 'no-bg', quickLeave&&!$options.isMobile?'react-add--leave':null]"
        oncontextmenu="return false"
        @mousedown.self="$emit('cancel')"
        @touchstart.self="$emit('cancel')"
    >
            <transition name="zoom_in_fade" appear>
        <div class="react-add-ctnr shiny-white-bg box-shadow-4" ref="drpdwn"
            @mouseleave="quickLeave?$emit('cancel'):null">
            <div v-for="emote in emotes" :key="emote.id" class="add__emo-item" oncontextmenu="return false"
                @click="$emit('emoteChose', emote.id)"
            >
                <img :src="emote.img_src">
            </div>
            <Spinner v-if="!emotes" color="#888" style="margin:6px" />
        </div>
            </transition>
    </div>
</transition>
</template>

<script>
import { mapGetters } from "vuex"
import Spinner from '@/components/misc/Spinner'
export default {
    components: {Spinner},
    props: [
        'communityId',
        'position', // {x: int, y: int}
        'quickLeave',
    ],
    // const {
        isMobile: /iPhone|iPad|iPod|Android/i.test(navigator.userAgent),
    // }
    computed: {
        ...mapGetters({
            emotesByCmty: 'reactionx/emotesByCmty',
        }),
        emotes() {
            return this.emotesByCmty(this.communityId).filter(emo => emo.active)
        }
    },
    created() {
        if (!this.emotes) {
            this.$store.dispatch("reactionx/getCmtyEmotes", this.communityId)
        }
    },
    mounted() {
        const drpdwn = this.$refs.drpdwn
        const pos = this.position || {}
        drpdwn.style.bottom = `${pos.y || 20}px`
        drpdwn.style.left = `${pos.x ?
            window.innerWidth-pos.x<280 ? window.innerWidth-280 : pos.x
                : 15}px`
    },
}
</script>

<style>
.react-add--leave {
    pointer-events: none
}
.react-add-ctnr {
    pointer-events: auto;
    display: flex;
    flex-wrap: wrap;
    max-width: 280px;
    max-height: 180px;
    overflow: auto;

    position: fixed;
    padding: 12px 7px;
    border-radius: 15px;
}

.add__emo-item, .add__emo-item > img {
    height: 30px;
    width: 30px;
}
.add__emo-item {
    transition: .2s;
    margin: 4px;
    cursor: pointer;
}
.add__emo-item:hover {
    transform: scale(1.6)
}
</style>
