<template>
    <button oncontextmenu="return false" v-if="myReact" class="_p__my-react push"
        @mouseenter="onDown"
        @mouseleave="notLongEnough"
        @click="deleteReact"

        @touchstart="onDown"
        @touchmove="notLongEnough"
    >
        <transition name="bounce_in" appear>
            <img :src="myReactIcon.img_src">
        </transition>
        <p>{{ myReactIcon.name }}</p>
    </button>
    <button oncontextmenu="return false" v-else class="push"
        @mouseenter="onDown"
        @mouseleave="notLongEnough"
        @click="quickReact"

        @touchstart="onDown"
        @touchmove="notLongEnough"
    >
        <i class="material-icons-outlined">insert_emoticon</i>
        <p>Like</p>
    </button>
</template>


<script>
import { mapGetters } from "vuex"
export default {
    props: ['myReact', 'communityId'],
    // this.$options.nonReactiveData {
        longEnough: true,
    // }
    computed: {
        ...mapGetters({
            emoteById: 'reactionx/emoteById',
        }),
        myReactIcon() {
            try {
                const mine = this.emoteById(this.communityId, this.myReact)
                return mine || {
                    img_src: "https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/google/223/grinning-face_1f600.png",
                    name: "Reacted"
                }
            } catch (error) {
                console.log("My React not found!")
                return {}
            }
        },
    },
    methods: {
        onDown(evt) {
            if (evt.type=='touchstart') this.setLaunchAdd(evt.touches[0])
            else this.setLaunchAdd(evt)
        },
        setLaunchAdd(evt) {
            this.$options.longEnough = true
            setTimeout(() => {
                if (this.$options.longEnough) {
                    this.$emit('toggleAdd', evt)
                }
            }, 500)
        },
        quickReact() {
            this.notLongEnough()
            this.$emit('quickReact')
        },
        deleteReact() {
            this.notLongEnough()
            this.$emit('deleteReact')
        },
        notLongEnough() {this.$options.longEnough = false}
    }
}
</script>

<style>
._p__my-react > img {
    margin-right: 0;
    height: 20px;
    width: 20px;
}
._p__my-react > p {
    color: rgb(72, 133, 237);
    word-wrap: break-all;
}
</style>