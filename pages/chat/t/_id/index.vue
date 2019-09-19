<template>
    <div>
        <nuxt-child keep-alive :keep-alive-props="{ exclude: ['modal'] }" />
        <Chat
            :isDirect='this.isDirect' />
        <!-- <div v-else>Please stand by</div> -->
    </div>
</template>

<script>
import Chat from '@/components/chat/Chat'
export default {
    layout: 'immerse',
    components: {
        Chat,
    },

    data() {
        return {
            isDirect: true,
        }
    },
    created() {
        this.$store.dispatch('jwtlogin/loadProfile');
    }
}
</script>

<style>
</style>
