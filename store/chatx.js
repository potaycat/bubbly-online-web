export const state = () => ({
    currentChat: null,
    queued: null
})

export const mutations = {
    loadChat(state, thread) {
        if (!thread) {
            state.currentChat = state.queued
            state.queued = null
        }
        state.currentChat = {
            ...state.currentChat,
            ...thread,
        }
    },
    preloadChat(state, thread) {
        state.queued = thread
    },
    
    bellUpdate(state, boolval) {
        state.currentChat.roommate_info.enable_noti = boolval
    },

    updateLastMsg(state, newMsg) {
        try {
            state.currentChat.last_msg = newMsg
            state.currentChat.roommate_info.last_seen = newMsg.timestamp
        } catch (error) {}
    },
}

export const actions = {
    toChat(state, room) {
        this.commit('chatx/preloadChat', room)
        if (window.innerWidth >= 750) {
            if (this.$router.currentRoute.query.room) this.$router.replace(`/chat?room=${room.id}`)
            else this.$router.push(`/chat?room=${room.id}`)
        } else {
            this.$router.push(`/chat/t/${room.id}`)
        }
    },
}