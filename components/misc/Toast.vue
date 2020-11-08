<template>
<transition appear name="fade">
    <div v-if="message" class="toast-ctn total_darkness no-bg is-fixed">
        <p class="toast-msg box-shadow-4">{{ message }}</p>
    </div>
</transition>
</template>

<script>
import { mapState } from 'vuex'
export default {
    computed: mapState({
        message: state => state.cpntCtrl.toast.alert,
    }),
}
</script>

<style>
.toast-ctn {
    pointer-events: none;
}
.toast-msg {
    padding: 10px 20px;
    border-radius: 100px;
    background: #666;
    color: #fff;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    bottom: 40px;
    word-spacing: 0;
}
</style>
