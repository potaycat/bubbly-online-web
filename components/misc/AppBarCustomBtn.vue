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
export default {
    props: ['customCmds'],
}
</script>

<style>
.app-bar-custom-actions {
    position: absolute;
    top: 4px;
    right: 4px;
    z-index: 9999999;
}
.app-bar-custom-actions > i {
    padding: 12px;
    color: var(--primary-color);
}
</style>