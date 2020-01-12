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
    meta: {
        useAppBar: true,
        disableHamburger: true,
        appBarTitle: "All Members"
    },
    components: {ActivityView, Members},
}
</script>
