export const state = () => ({
    alert: null,
})
  
export const mutations = {
    TOAST(state, message) {
        state.alert = message
    },
}

export const actions = {
    toastAlert({commit}, payload) {
        commit('TOAST', payload.message)
        setTimeout(() => {
            commit('TOAST', null)
        }, payload.timeOut || 2500)
    },
}
