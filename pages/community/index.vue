<template>
    <div>
        <ComuList />
        <keep-alive>
            <router-view></router-view>
        </keep-alive>
    </div>
</template>

<script>
import ComuList from '@/components/community/ComuList'
export default {
    components: {
        ComuList,
    },
    created() {
        this.$store.commit('changeDestination', 2)
    },
}
</script>

<style>
</style>