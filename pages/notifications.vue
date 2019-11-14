<template>
    <LeNoti />
</template>

<script>
import LeNoti from '@/components/LeNoti'
export default {
    components: {LeNoti},
    created() {
        this.$store.commit('changeDestination', 4)
    },
}
</script>

<style>
</style>
