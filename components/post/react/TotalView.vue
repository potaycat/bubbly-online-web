<template>
    <div class="total-reacts-ctn">
        <div class="emote-ctnr">
            <div class="emote_ctnr__ani" ref="emote_ctnr__ani">
                <div v-for="(icon, index) in iconPreviewLs" :key="index" class="emot-ico">
                    <img v-if="icon.img_src" :src="icon.img_src">
                    <p>{{ icon }}</p>
                </div>
            </div>
        </div>
        <!-- <span>{{total}} react{{total>1?"s":""}}</span> -->
        <span>{{ total }}</span>
        <span v-if="replyCount!=undefined" class="p__reply-count"
            >{{ replyCount }} comment{{total>1?"s":""}}</span>
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
        defaultList: ["😢","👍","💗","🤣","😲","😡"],
    // }
    computed: {
        ...mapGetters({
            iconsByCmnty: 'reactIcons/iconsByCmnty',
        }),
        iconPreviewLs() {
            let icoArr = this.iconsByCmnty(this.communityId) || []
            const len = icoArr.length
            if (len < 6) {
                icoArr = [
                    ...icoArr,
                    ...this.$options.defaultList.slice(0, 6-len)
                ]
            }
            return this.shuffle(icoArr).slice(0, 6)
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
    font-size: 13px;
    color: #333;
    margin-left: 6px;
}

.emote_ctnr__ani {
    display: flex;
    width: 60px;
    transform: translateX(-60px);
    animation: slide 24s infinite
}
.emote-ctnr {
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
    width: 100%;
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