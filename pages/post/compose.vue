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
    components: {ActivityView, PostComposer},
    head:() => ({
        title: "Write a post",
    })
}
</script>
