<template>
    <div>
        <ActivityView />
        <Circles />
    </div>
</template>

<script>
import ActivityView from '@/components/layout/ActivityView'
import Circles from '@/components/profile/Circles'
export default {
    meta: {
        useAppBar: true,
        disableHamburger: true,
        appBarTitle: "Follows"
    },
    components: {ActivityView, Circles},
}
</script>
