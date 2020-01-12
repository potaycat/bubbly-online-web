<template>
    <div>
        <TopLvlDestination />
        <LeNoti />
    </div>
</template>

<script>
import TopLvlDestination from '@/components/layout/TopLvlDestination'
import LeNoti from '@/components/notification/'
export default {
    meta: {
        requiresAuth: true
    },
    components: {TopLvlDestination, LeNoti},
    activated() {
        this.$store.commit('HIDE_NOTI_DOT')
    }
}
</script>

<style>
</style>
