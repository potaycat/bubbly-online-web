<template>
    <div>
        
        <nuxt-child keep-alive :keep-alive-props="{ exclude: ['modal'] }" />
        <ConvoList />
    </div>
</template>

<script>
import ConvoList from '@/components/chat/list'
export default {
    components: {
        ConvoList,
    },
    created() {
        this.$store.commit('changeDestination', 3)
    },
}
</script>

<style>
</style>
