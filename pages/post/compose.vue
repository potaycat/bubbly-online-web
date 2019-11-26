<template>
    <div>
        <ActivityView />
        <PostEditor :community="{
            id: $route.params.cmnty,
        }" />
    </div>
</template>

<script>
import ActivityView from '@/components/layout/ActivityView'
import PostEditor from '@/components/post/editor/'
export default {
    components: {ActivityView, PostEditor},
    head() {
        return {
            title: "Write a post",
        }
    },
    created() {
    }
}
</script>
