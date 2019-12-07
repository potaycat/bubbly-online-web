<template>
    <div>
        <ActivityView />
        <Members />
    </div>
</template>

<script>
import ActivityView from '@/components/layout/ActivityView'
import Members from '@/components/community/list/Members'
export default {
    components: {ActivityView, Members},
}
</script>
