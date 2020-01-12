<template>
    <div>
        <ActivityView />
        <Settings />
    </div>
</template>

<script>
import ActivityView from '@/components/layout/ActivityView'
import Settings from '@/components/settings/'
export default {
    meta: {
        requiresAuth: true,

        useAppBar: true,
        disableHamburger: true,
        appBarTitle: "Settings"
    },
    components: {ActivityView, Settings}
}
</script>

<style>
.form__fields-wrapper {
    width: 100%;
}
</style>
