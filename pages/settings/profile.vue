<template>
    <div>
        <ActivityView />
        <ProfileSettings />
    </div>
</template>

<script>
import ActivityView from '@/components/layout/ActivityView'
import ProfileSettings from '@/components/profile/Settings'
export default {
    meta: {
        useAppBar: true,
        disableHamburger: true,
        appBarTitle: "Profile edit"
    },
    components: {ActivityView, ProfileSettings},
    deactivated() { this.$destroy() }
}
</script>
