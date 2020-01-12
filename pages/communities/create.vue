<template>
    <div>
        <ActivityView />
        <Create />
    </div>
</template>

<script>
import ActivityView from '@/components/layout/ActivityView'
import Create from '@/components/community/create/'
export default {
    head:() => ({
        title: "Create a Bubbly Community",
    }),
    meta: {
        useAppBar: true,
        disableHamburger: true,
    },
    components: {
        ActivityView,
        Create,
    },
    beforeCreate() {
        if (this.$route.query.step) {
            this.$router.replace('create')
        }
    }
}
</script>