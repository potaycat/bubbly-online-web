<template>
    <div>
        <TopLvlDestination />
        <ConvoList />
    </div>
</template>

<script>
import ConvoList from '@/components/chat/list'
import TopLvlDestination from '@/components/layout/TopLvlDestination'
export default {
    components: {ConvoList, TopLvlDestination},
    activated() {
        this.$store.commit('changeDestination', 3)
    },
}
</script>

<style>
</style>
