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
    components: {TopLvlDestination,TopLvlFeed},
    activated() {
        this.$store.commit('changeDestination', 1)
        // this.$store.commit('reactIcons/clearLocal')
        if (Object.entries(this.$store.state.reactIcons.localIcons).length == 0) {
            this.$store.dispatch("reactIcons/getMyIcons")
        }
    },
}
</script>

<style>
</style>
