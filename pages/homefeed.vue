<template>
    <div>
        <nuxt-child keep-alive :keep-alive-props="{ exclude: ['modal'] }" />
        <LeFeed />
    </div>
</template>

<script>
import LeFeed from '@/components/LeFeed'
export default {
    components: {
        LeFeed,
    },
    created() {
        this.$store.commit('changeDestination', 1)
    },
}
</script>

<style>
</style>
