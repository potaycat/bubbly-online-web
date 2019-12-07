<template>
    <transition name="zoom_in_fade" appear>
        <div class="total_darkness no-bg" @click.self="$emit('emoed')">
            <div class="send-emote-ctn box-shadow-3 shiny-white-bg">
                <p v-if="!cmntyIdLs.length" class="send-emote__none-found">
                    Community Emotes will appear here. Start by joining a few of them!</p>
                <div class="send-emote__group" v-for="cmntyId in cmntyIdLs" :key="cmntyId">
                    <p v-if="myEmotes[cmntyId].length" class="send-emote__cmnty">{{ getJoinedById(cmntyId).name }}</p>
                    <div v-for="emote in myEmotes[cmntyId]"
                        :key="emote.id"
                        class="send-emote__item glow"
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
        cmntyIdLs() {return Object.keys(this.myEmotes)}
    },
}
</script>

<style>
.send-emote-ctn {
    width: 95%;
    height: 270px;
    overflow: auto;
    border-radius: 20px;
    position: absolute;
    bottom: 55px;
    padding: 0 12px;
}

.send-emote__group {
    display: flex;
    flex-wrap: wrap;
}
.send-emote__cmnty {
    font-weight: bold;
    color: #999;
    padding: 15px 0 10px 0;
    width: 100%;
}

.send-emote__item {
    width: 55px;
    height: 55px;
    text-align: center;
}
.send-emote__item > img {
    height: 48px;
    width: 48px;
}

.send-emote__none-found {
    text-align: center;
    color: #666;
    margin-top: 100px;
}
</style>