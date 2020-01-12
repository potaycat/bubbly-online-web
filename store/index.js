// export const strict = false

export const state = () => ({
    wsBase: 'ws://localhost:8000/',
    scrollinUp: false,

    hasUnreadMsg: null,
    lastRead: localStorage.getItem('notiTme') || 1,
    lastest: 0,
})

export const mutations = {
    TOGGLE_SCRL_DIR(state) {
        state.scrollinUp = !state.scrollinUp
    },
    SHOW_CHAT_DOT(state, data) {
        state.hasUnreadMsg = data
    },
    SHOW_NOTI_DOT(state, data) {
        state.lastest = data
    },
    HIDE_NOTI_DOT(state) {
        localStorage.setItem('notiTme', state.lastest)
        state.lastRead = state.lastest
    },
}

export const actions = {
    getBadgeCount({ rootState, commit }) {
        this.$axios.get('accounts/__self/badge-count',
            rootState.auth.head
        )
            .then(res => {
                commit('SHOW_CHAT_DOT', res.data.has_unread_msg)
                commit('SHOW_NOTI_DOT', res.data.lastest_noti)
            })
    }
}
