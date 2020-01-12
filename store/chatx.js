export const state = () => ({
    currentChat: null,
    queued: null
})

export const mutations = {
    LOAD_THREAD(state, thread) {
        // this and life cycle hooks really hate each other
        if (!thread) {
            state.currentChat = state.queued
            state.queued = null
        }
        state.currentChat = {
            ...state.currentChat,
            ...thread,
        }
    },
    PRELOAD_THRD(state, thread) {
        state.queued = thread
    },
    
    BELL_STATE(state, boolval) {
        state.currentChat.roommate_info.enable_noti = boolval
    },

    UPDATE_LAST_MSG(state, newMsg) {
        try {
            state.currentChat.last_msg = newMsg
            state.currentChat.roommate_info.last_seen = newMsg.timestamp
        } catch (error) {}
    },
}

export const actions = {
    toChat({commit}, room) {
        commit('PRELOAD_THRD', room)
        if (window.innerWidth >= 750) {
            if (this.$router.currentRoute.query.room) this.$router.replace(`/chat?room=${room.id}`)
            else this.$router.push(`/chat?room=${room.id}`)
        } else {
            commit('LOAD_THREAD', null)
            this.$router.push(`/chat/t/${room.id}`)
        }
    },
}