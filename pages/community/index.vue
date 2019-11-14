<template>
    <div>
        <TopLevelList />
        <keep-alive>
            <router-view></router-view>
        </keep-alive>
    </div>
</template>

<script>
import TopLevelList from '@/components/community/TopLevelList'
export default {
    components: {
        TopLevelList,
    },
    created() {
        this.$store.commit('changeDestination', 2)
        this.$store.dispatch("moderating/getCmntyIManage")
    },
}
</script>

<style>
</style>