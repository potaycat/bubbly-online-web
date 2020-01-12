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
    head:() => ({
        title: "Join",
    }),
    meta: {
        requiresAuth: true,

        useAppBar: true,
        disableHamburger: true,
    },
    components: {ActivityView, JoinProcedure},
    deactivated() {
        this.$destroy()
    }
};
</script>
