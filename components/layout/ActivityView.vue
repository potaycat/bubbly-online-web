<template>
    <div>
        <AppBar />
    </div>
</template>

<script>
import AppBar from "./bars/AppBar";
export default {
    components: {
        AppBar
    },
    activated() {
        this.$store.commit('changeDestination', 0)
    },
};
</script>
