export const state = () => ({
    joined: JSON.parse(localStorage.getItem('joined')),
})

export const mutations = {
    save(state, cmntyArr) {
        state.joined = cmntyArr
        localStorage.setItem('joined', JSON.stringify(cmntyArr))
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
        return state.joined.find(cmnty => cmnty.id == id) ||{}
    },
    isMod: (state) => (id) => {
        return state.joined.find(cmnty => cmnty.id == id &&
            ['moderator','administrator'].includes(cmnty.role))
    },
}