<template>
    <button class="FAB box-shadow-2 lift"
        @click="$emit('clicked')"
        @mouseleave="resetDrag"
        @mouseup="resetDrag"
        @mousedown="startDrag"
        @mousemove="doDrag"
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
        startDrag() {
            this.dragable = true
            this.firstMouseLoc = [event.clientX , event.clientY]
            this.secndMouseLoc = [event.clientX , event.clientY]
        },
        doDrag() {
            if (this.dragable) {
                this.secndMouseLoc = [event.clientX , event.clientY]
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
    bottom: 70px;
    right: 20px;
    background: rgba(72, 133, 237, 0.95);
    border-radius:100px;
    display: flex;
    padding: 16px;
    color: #fff;
}
.FAB span{
    margin: 4px 0;
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