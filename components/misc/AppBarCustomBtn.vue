<template>
    <div class="app-bar-custom-actions">
        <i v-for="action in customCmds" :key="action.icon"
            @click="$emit(action.action)" class="material-icons-round glow"
        >
            {{ action.icon }}
        </i>
    </div>
</template>


<script>
import { disableHamburger } from '@/mixins/appBarStuff'
export default {
    props: ['customCmds'],
    mixins: [disableHamburger],
}
</script>

<style>
.app-bar-custom-actions {
    position: absolute;
    top: 2px;
    right: 3px;
    z-index: 9999999;
    background: #fff;
}
.app-bar-custom-actions > i {
    padding: 12px;
    color: rgba(72, 133, 237, 0.95);
}
</style>