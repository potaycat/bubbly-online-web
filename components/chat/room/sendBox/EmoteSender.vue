<template>
    <transition name="zoom_in_fade" appear>
        <div class="emo-sndr total_darkness no-bg" @click.self="$emit('emoed')">
            <div class="emo-sndr-ctn box-shadow-3 shiny-white-bg">
                <p v-if="!cmtyIdLs.length" class="emo-sndr__none-found">
                    Community Emotes will appear here. Start by joining a few of them!</p>
                <div class="emo-sndr__group" v-for="cmtyId in cmtyIdLs" :key="cmtyId">
                    <p v-if="myEmotes[cmtyId].length" class="emo-sndr__cmty">{{ getJoinedById(cmtyId).name }}</p>
                    <div v-for="emote in myEmotes[cmtyId]"
                        :key="emote.id"
                        class="emo-sndr__item glow"
                        @click="$emit('emoed', emote)"
                    >
                        <img :src="emote.img_src">
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
import { mapGetters } from "vuex"
export default {
    computed: {
        ...mapGetters({
            getJoinedById: 'communityx/getJoinedById',
        }),
        myEmotes() {
            return this.$store.state.reactionx.localEmotes
        },
        cmtyIdLs() {return Object.keys(this.myEmotes)}
    },
}
</script>

<style>
.emo-sndr {
    top: calc(-100vh + 55px);
}
.emo-sndr-ctn {
    width: 95%;
    height: 270px;
    overflow: auto;
    border-radius: 20px;
    position: absolute;
    bottom: 55px;
    padding: 0 12px;
}

.emo-sndr__group {
    display: flex;
    flex-wrap: wrap;
}
.emo-sndr__cmty {
    font-weight: bold;
    color: #999;
    padding: 15px 0 10px 0;
    width: 100%;
}

.emo-sndr__item {
    width: 55px;
    height: 55px;
    text-align: center;
}
.emo-sndr__item > img {
    height: 48px;
    width: 48px;
}

.emo-sndr__none-found {
    text-align: center;
    color: #666;
    margin-top: 100px;
}
</style>