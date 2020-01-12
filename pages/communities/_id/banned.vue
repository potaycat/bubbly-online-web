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
    meta: {
        useAppBar: true,
        disableHamburger: true,
        appBarTitle: "Banned"
    },
    components: {ActivityView, Banned},
}
</script>
