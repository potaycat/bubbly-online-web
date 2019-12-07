<template>
    <transition name="big_slide_up" appear>
        <div class="fsb-ctn">
            <Button class="fsb" :color="color" text="Save" fill @clicked="$emit('clicked')"/>
        </div>
    </transition>
</template>

<script>
import Button from '@/components/misc/Button'
export default {
    components: {Button},
    props: ['color']
}
</script>

<style>
.fsb-ctn {
    position: absolute;
    width: 100%;
    bottom: 10px;
    padding: 10px 30px;
    z-index: 99;
}

.fsb {
    /* animation: name duration timing-function delay iteration-count direction fill-mode; */
    animation: float 2s infinite;
}
@keyframes float {
    0%, 100% { transform: translateY(-10px) }
    50% { transform: translateY(0) }
}


.big_slide_up-enter-active,
.big_slide_up-leave-active {
    transition: .4s;
}
.big_slide_up-enter,
.big_slide_up-leave-to { /* .fade-leave-active below version 2.1.8 */
    margin-bottom: -60px;
}
</style>