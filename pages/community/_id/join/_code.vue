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
    layout: 'lethalActivity',
    components: {ActivityView, JoinProcedure},
    head:() => ({
        title: "Join",
    })
};
</script>
