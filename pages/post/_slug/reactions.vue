<template>
    <div>
        <ActivityView />
        <ReactionList />
    </div>
</template>

<script>
import ActivityView from '@/components/layout/ActivityView'
import ReactionList from '@/components/post/ReactionList'
export default {
    components: {
        ActivityView,
        ReactionList,
    },
}
</script>