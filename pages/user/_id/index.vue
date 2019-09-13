<template>
    <div>
        <nuxt-child keep-alive :keep-alive-props="{ exclude: ['modal'] }" />
        <LeProfile />
    </div>
</template>

<script>
import LeProfile from '@/components/profile/LeProfile'
export default {
    components: {
        LeProfile,
    }
}
</script>

<style>
</style>
