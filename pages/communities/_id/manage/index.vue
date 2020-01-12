<template>
    <div>
        <ActivityView />
        <Management />
    </div>
</template>

<script>
import ActivityView from '@/components/layout/ActivityView'
import Management from '@/components/community/management/'
export default {
    head:() => ({
        title: "Community management"
    }),
    meta: {
        useAppBar: true,
        disableHamburger: true,
        appBarTitle: "Community Management"
    },
    components: {ActivityView, Management},
};
</script>
