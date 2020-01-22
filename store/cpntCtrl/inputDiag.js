export const state = () => ({
    diag: null,
    onOK: null,
    onCancel: null
})
  
export const mutations = {
    OPEN(state, payload) {
        state.diag = payload.diag
        state.onOK = payload.resolve
        state.onCancel = payload.reject
    },
    CLOSE(state) {
        state.diag = null
        state.onOK = null
        state.onCancel = null
    },
}

export const actions = {
    openDiag({commit}, diagObj) {
        return new Promise((resolve, reject) => {
            commit('OPEN', {
                diag: diagObj,
                resolve: resolve,
                reject: reject,
            })
        })
    },
    onClose({commit, state}, input) {
        if (input)
            state.onOK(input)
        commit('CLOSE')
    }
}
