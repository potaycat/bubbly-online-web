export const state = () => ({
    joined: JSON.parse(localStorage.getItem('joined')),
})

export const mutations = {
    save(state, cmtyArr) {
        state.joined = cmtyArr
        localStorage.setItem('joined', JSON.stringify(cmtyArr))
    },
}

export const actions = {
    getJoinedCmnties({ rootState }) {
        this.$axios.get('accounts/__self/communities/',
            rootState.authHeader
        )
            .then((res) => {
                this.commit('communityx/save', res.data)
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