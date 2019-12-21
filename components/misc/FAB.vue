<template>
    <button :class="['FAB --has-bg-primary box-shadow-2 lift', topLev?'--fab-top-lev':null]"
        @click="$emit('clicked')"
        @mousedown="startDrag"
        @mousemove="doDrag"
        @mouseup="resetDrag" @mouseleave="resetDrag"
        
        @touchstart="startDrag($event.touches[0])"
        @touchmove="doDrag($event.touches[0])"
        @touchend="resetDrag"
        :style="`transform:translate(-${buttonPos[0]}px,-${buttonPos[1]}px)`"
        :title="actionName"
    >
        <i class="material-icons-round">{{icon}}</i>
        <transition name="text_begone">
            <span v-if="$store.state.scrollinUp || $options.notMinifiable"
                >&nbsp; {{actionName}}</span>
        </transition>
    </button>
</template>

<script>
export default {
    props: [
        'actionName',
        'icon',
    ],
    data() {
        return {
            topLev: ['home', 'explore', 'communities', 'chat', 'notifications'].includes(this.$route.name),

            dragable: false,
            firstMouseLoc: [0, 0],
            secndMouseLoc: [0, 0],
        }
    },
    // consts: {
        notMinifiable: window.innerWidth > 1200,
    // },
    computed: {
        buttonPos() {
            return [
                (this.firstMouseLoc[0]-this.secndMouseLoc[0]),
                (this.firstMouseLoc[1]-this.secndMouseLoc[1])
            ]
        }
    },
    methods: {
        startDrag(evt) {
            this.dragable = true
            this.firstMouseLoc = [evt.clientX , evt.clientY]
            this.secndMouseLoc = [evt.clientX , evt.clientY]
        },
        doDrag(evt) {
            if (this.dragable) {
                this.secndMouseLoc = [evt.clientX , evt.clientY]
            }
        },
        resetDrag() {
            this.dragable = false
            this.firstMouseLoc = [0, 0]
            this.secndMouseLoc = [0, 0]
        },
    },
}
</script>

<style>
.FAB {
    position: fixed;
    /* bottom: 70px; */
    /* to work with keep-alive page transition for some reason */
    top: calc(100vh - 80px);
    right: 20px;
    border-radius: 100px;
    display: flex;
    align-items: center;
    padding: 15px;
    color: #fff;
    font-weight: bold;
    z-index: 9999;
}
@media only screen and (max-width: 500px) {
    .--fab-top-lev {
        top: calc(100vh - 123px);
    }
}

@media only screen and (min-height: 550px) {
    @media only screen and (min-width: 900px) {
        .FAB {
            position: fixed;
            right: unset;
            top: 465px;
            left: 4%;
            height: 54px;
            text-align: center;
            box-shadow: none;
        }.FAB:hover {
            filter: brightness(1.3);
        }
        .FAB > span {
            display: none;
        }
    }
    @media only screen and (min-width: 1200px) {
        .FAB {
            position: absolute;
            left: -248px;
            padding: 0;
            height: 50px;
            width: 200px;
        }
        .FAB > span {
            font-size: 14px;
            margin: auto;
            display: flex;
        }.FAB > span:after {
            content: "\00a0\00a0";
        }
        .FAB > i {
            display: none;
        }
    }
}

.text_begone-enter-active,
.text_begone-leave-active {
    transition: .2s;
}
.text_begone-enter,
.text_begone-leave-to {
    font-size: 0;
    /* padding-top: 8px; */
    /* opacity: 0; */
}
</style>