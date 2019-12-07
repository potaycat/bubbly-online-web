<template>
    <div>
        <TopLvlDestination />
        <Explore />
    </div>
</template>

<script>
import TopLvlDestination from '@/components/layout/TopLvlDestination'
import Explore from '@/components/explore/'
export default {
    components: {TopLvlDestination, Explore},
    activated() {
        this.$store.commit('changeDestination', 5)
    },
}
</script>

<style>
</style>
