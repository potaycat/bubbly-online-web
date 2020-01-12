<template>
    <div>
        <TopLvlDestination />
        <TopLvlList />
    </div>
</template>

<script>
import TopLvlDestination from '@/components/layout/TopLvlDestination'
import TopLvlList from '@/components/community/TopLvlList'
export default {
    meta: {
        requiresAuth: true
    },
    components: {TopLvlDestination, TopLvlList},
}
</script>

<style>
</style>