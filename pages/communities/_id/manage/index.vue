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
    components: {ActivityView, Management},
    head:() => ({
        title: "Community management"
    }),
};
</script>
