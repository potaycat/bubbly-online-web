<template>
    <div>
        <ActivityView />
        <ChatRoom />
    </div>
</template>

<script>
import ActivityView from '@/components/layout/ActivityView'
import ChatRoom from '@/components/chat/room/'
export default {
    meta: {
        useAppBar: true,
        requiresAuth: true
    },
    components: {ActivityView, ChatRoom,},
    beforeCreate() {
        if (window.innerWidth >= 750) {
            this.$router.replace(`/chat?room=${this.$route.params.id}`)
        }
    },
    deactivated() {
        this.$destroy()
    }
}
</script>
