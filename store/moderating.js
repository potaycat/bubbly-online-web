export const state = () => ({
    communities: JSON.parse(localStorage.getItem('mod_of')),
})

export const mutations = {
    save(state, cmntyArr) {
        localStorage.setItem('mod_of', JSON.stringify(cmntyArr))
    }
}

export const actions = {
    getCmntyIManage({ rootState }) {
        this.$axios.get('accounts/__self/communities/__as_mod/',
            rootState.authHeader
        )
            .then((res) => {
                this.commit('moderating/save', res.data)
            })
            .catch((error) => {
                console.log(error)
            })
    },
}

export const getters = {
    isMod: (state) => (id) => {
      return state.communities.find(cmnty => cmnty.community == id)
    }
}