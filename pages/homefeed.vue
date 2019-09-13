<template>
    <div>
        <nuxt-child keep-alive :keep-alive-props="{ exclude: ['modal'] }" />
        <LeFeed />
    </div>
</template>

<script>
import LeFeed from '@/components/post/LeFeed'
export default {
    components: {
        LeFeed,
    }
}
</script>

<style>
</style>
