<template>
    <div class="total-reacts-ctn">
        <div class="emo-preview-ctn">
            <div class="emo-preview-ctn__ani" ref="emote_ctnr__ani">
                <div v-for="(emote, index) in emotesPreview" :key="index" class="emot-ico">
                    <img v-if="emote.img_src" :src="emote.img_src">
                    <p v-else>{{ emote }}</p>
                </div>
            </div>
        </div>
        <!-- <span>{{total}} react{{total>1?"s":""}}</span> -->
        <span>{{ total }}</span>
        <span v-if="replyCount" class="p__reply-count"
            >{{replyCount}} comment{{replyCount>1?"s":""}}</span>
    </div>
</template>

<script>
import { mapGetters } from "vuex"
export default {
    props: [
        'total',
        'communityId',
        'replyCount',
    ],
    // const: {
        defaultList: ["😢","👍","🤣","😲","😡"],
    // }
    computed: {
        ...mapGetters({
            emotesByCmty: 'reactionx/emotesByCmty',
        }),
        emotesPreview() {
            let emoArr = this.emotesByCmty(this.communityId)
            const len = emoArr.length
            if (len < 6) {
                emoArr = [
                    ...emoArr,
                    ...this.$options.defaultList.slice(0, 6-len)
                ]
            }
            return this.shuffle(emoArr).slice(0, 6)
        }
    },
    mounted() {
        this.$refs.emote_ctnr__ani.style['animation-delay'] = Math.abs(Math.random()*10-5) +"s"
    },
    methods: {
        shuffle(array) {
            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                const temp = array[i];
                array[i] = array[j];
                array[j] = temp;
            }
            return array
        }
    }
}
</script>

<style>
.total-reacts-ctn {
    display: flex;
    align-items: center;
}
.total-reacts-ctn span {
    font-size: 12.5px;
    color: #333;
    margin-left: 7px;
}

.emo-preview-ctn__ani {
    display: flex;
    width: 60px;
    transform: translateX(-60px);
    animation: slide 24s infinite
}
.emo-preview-ctn {
    /* border: solid 1px red; */
    overflow: hidden;
}
.emot-ico {
    /* border: solid 1px red; */
    height: 18px;
    width: 18px;
    margin: 0 1px;
}
.emot-ico > p{
    font-size: 13.5px;
}
.emot-ico > img{
    height: 100%;
    min-width: 100%;
}
@keyframes slide {
    5%, 25% {
        transform: translateX(-40px);
    }
    30%, 50% {
        transform: translateX(-20px);
    }
    55%, 75% {
        transform: translateX(0px);
    }
    80%, 100%, 0% {
        transform: translateX(-60px);
    }
}
</style>