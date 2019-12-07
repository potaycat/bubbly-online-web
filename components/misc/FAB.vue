<template>
    <button :class="['FAB box-shadow-2 lift', inActvtView?'--fab-top-lev':null]"
        @click="$emit('clicked')"
        @mousedown="startDrag"
        @mousemove="doDrag"
        @mouseup="resetDrag" @mouseleave="resetDrag"
        
        @touchstart="startDrag($event.touches[0])"
        @touchmove="doDrag($event.touches[0])"
        @touchend="resetDrag"
        :style="`transform:translate(-${buttonPos[0]}px,-${buttonPos[1]}px)`"
    >
        <i class="material-icons-round">{{icon}}</i>
        <transition name="text_begone">
            <span v-if="$store.state.scrollinUp">&nbsp; {{actionName}}</span>
        </transition>
    </button>
</template>

<script>
export default {
    props: [
        'actionName',
        'icon',
        'inActvtView'
    ],
    data() {
        return {
            dragable: false,
            firstMouseLoc: [0, 0],
            secndMouseLoc: [0, 0],
        }
    },
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
.FAB{
    position: fixed;
    /* bottom: 70px; */
    /* to work with keep-alive page transition for some reason */
    top: calc(100vh - 125px);
    right: 20px;
    background: rgba(72, 133, 237, 0.95);
    border-radius: 100px;
    display: flex;
    align-items: center;
    padding: 16px;
    color: #fff;
}
.--fab-top-lev {
    top: calc(100vh - 80px);
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