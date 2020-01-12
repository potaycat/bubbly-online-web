<template>
    <div>
        <ConvoList />
    </div>
</template>

<script>
import ConvoList from '@/components/chat/list'
export default {
    meta: {
        useAppBar: true,
        requiresAuth: true
    },
    components: { ConvoList },
    activated() {
        this.$store.commit('SHOW_CHAT_DOT', null)
    }
}
</script>
