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
    components: {ActivityView, ProfileSettings}
}
</script>
