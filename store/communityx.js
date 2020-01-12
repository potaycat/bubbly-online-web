export const state = () => ({
    joined: JSON.parse(localStorage.getItem('joined')) ||[],
})

export const mutations = {
    SAVE_CMTIES(state, cmtyArr) {
        localStorage.setItem('joined', JSON.stringify(cmtyArr))
        state.joined = cmtyArr
    },
}

export const actions = {
    getJoinedCmties({ rootState, commit }) {
        this.$axios.get('accounts/__self/communities/',
            rootState.auth.head
        )
            .then((res) => {
                commit('SAVE_CMTIES', res.data)
            })
            .catch((error) => {
                console.error("CAUGHT: "+error)
            })
    },
}

export const getters = {
    getJoinedById: (state) => (id) => {
        return state.joined.find(cmty => cmty.id == id) ||{}
    },
    isMod: (state) => (id) => {
        return state.joined.find(cmty => cmty.id == id &&
            ['moderator','administrator'].includes(cmty.role))
    },
}