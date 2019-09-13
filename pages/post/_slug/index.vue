<template>
    <div>
        <PostFullView 
            :slug="$route.params.slug"
        />
    </div>
</template>

<script>
import PostFullView from '@/components/post/PostFullView'
export default {
    layout: 'immerse',
    components: {
        PostFullView,
    },
}
</script>

<style>
</style>
