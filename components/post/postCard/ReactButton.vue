<template>
    <button oncontextmenu="return false" v-if="myReact" class="_p__my-react push"
        @mouseenter="onMouseDown"
        @mouseleave="longEnough=false"
        @mouseup="deleteReact"
        @touchstart.prevent="onMouseDown"
        @touchend.self="deleteReact"
    >
        <transition name="bounce_in" appear>
            <img :src="myReactIcon.img_src">
            <!-- <div>💗</div> -->
        </transition>
        <p>{{ myReactIcon.name }}</p>
    </button>
    <button oncontextmenu="return false" v-else class="push"
        @mouseenter="onMouseDown"
        @mouseleave="longEnough=false"
        @mouseup="quickReact"
        @touchstart.prevent="onMouseDown"
        @touchend.self="quickReact"
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
        mousePos: null,
        longEnough: true,
    // }
    computed: {
        ...mapGetters({
            iconsByCmnty: 'reactIcons/iconsByCmnty',
            iconById: 'reactIcons/iconById',
        }),
        myReactIcon() {
            try {
                return this.iconById(this.communityId, this.myReact)
            } catch (error) {
                console.log("My React not found!")
                return {}
            }
        },
    },
    methods: {
        onMouseDown(evt) {
            if (evt.type=='touchstart') this.$options.mousePos = evt.touches[0]
            else this.$options.mousePos = evt

            this.$options.longEnough = true
            setTimeout(() => {
                if (this.$options.longEnough) {
                    this.$emit('toggleAdd', this.$options.mousePos)
                }
            }, 500)
        },
        quickReact() {
            this.$options.longEnough = false
            this.$emit('quickReact')
        },
        deleteReact() {
            this.$options.longEnough = false
            this.$emit('deleteReact')
        }
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