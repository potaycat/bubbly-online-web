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
    components: {ActivityView, Settings}
}
</script>

<style>
.form__fields-wrapper {
    width: 100%;
}
</style>
