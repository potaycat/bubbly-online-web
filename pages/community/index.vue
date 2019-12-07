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
    components: {TopLvlDestination, TopLvlList},
    activated() {
        this.$store.commit('changeDestination', 2)
    },
}
</script>

<style>
</style>