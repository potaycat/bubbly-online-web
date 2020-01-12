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
    head:() => ({
        title: "Reactions"
    }),
    meta: {
        useAppBar: true,
        disableHamburger: true,
        appBarTitle: "Reactions"
    },
    components: {
        ActivityView,
        ReactionList,
    },
}
</script>