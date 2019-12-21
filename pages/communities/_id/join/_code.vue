<template>
    <div>
        <ActivityView />
        <JoinProcedure />
    </div>
</template>

<script>
import ActivityView from '@/components/layout/ActivityView'
import JoinProcedure from '@/components/community/JoinProcedure'
export default {
    components: {ActivityView, JoinProcedure},
    head:() => ({
        title: "Join",
    }),
    deactivated() {
        this.$destroy()
    }
};
</script>
