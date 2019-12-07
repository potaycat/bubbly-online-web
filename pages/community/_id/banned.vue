<template>
    <div>
        <ActivityView />
        <Banned />
    </div>
</template>

<script>
import ActivityView from '@/components/layout/ActivityView'
import Banned from '@/components/community/list/Banned'
export default {
    components: {ActivityView, Banned},
}
</script>
