<template>
    <div>
        <TopLvlDestination />
        <TopLvlFeed />
    </div>
</template>

<script>
import TopLvlDestination from '@/components/layout/TopLvlDestination'
import TopLvlFeed from '@/components/post/TopLvlFeed'
export default {
    meta: {
        requiresAuth: true
    },
    components: {TopLvlDestination,TopLvlFeed},
}
</script>

<style>
</style>
