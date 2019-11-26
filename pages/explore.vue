<template>
    <div>
        <TopLvlDestination />
    </div>
</template>

<script>
import TopLvlDestination from '@/components/layout/TopLvlDestination'
export default {
    components: {TopLvlDestination,},
    activated() {
        this.$store.commit('changeDestination', 5)
    },
}
</script>

<style>
</style>
