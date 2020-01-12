<template>
    <div>
        <ActivityView />
        <PostComposer />
    </div>
</template>

<script>
import ActivityView from '@/components/layout/ActivityView'
import PostComposer from '@/components/post/composer/'
export default {
    head:() => ({
        title: "Composer",
    }),
    meta: {
        useAppBar: true,
        disableHamburger: true,
        appBarTitle: "Write a post"
    },
    components: {ActivityView, PostComposer},
}
</script>
