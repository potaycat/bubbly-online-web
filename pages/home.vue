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
        // this.$store.commit('reactionx/clearLocal')
        if (Object.entries(this.$store.state.reactionx.localEmotes).length == 0) {
            this.$store.dispatch("reactionx/getMyEmotes")
        }
    },
}
</script>

<style>
</style>
