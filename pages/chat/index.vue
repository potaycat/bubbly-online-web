<template>
    <div>
        
        <nuxt-child keep-alive :keep-alive-props="{ exclude: ['modal'] }" />
        <ConvoList />
    </div>
</template>

<script>
import ConvoList from '@/components/chat/ConvoList'
export default {
    components: {
        ConvoList,
    },
    created() {
    },
}
</script>

<style>
</style>
