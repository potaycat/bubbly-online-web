export const state = () => ({
    localIcons: JSON.parse(localStorage.getItem('lcl_ico')) || {},
    icons: {
        // EXAMPLE:
        // communityId: {
        //     id: {name:'a', img_src:'url', active: true},
        // },
        // communityId: {
        //     id: {name:'b', img_src:'url', active: false},
        //     id: {name:'c', img_src:'url', active: true}
        // },
    },
})

export const mutations = {
    parseMultiCmnty(state, cmntyLs) {
        const newIcons = {}
        for (const cmnty of cmntyLs) {
            newIcons[cmnty.id] = cmnty.icons
        } // for-of for-in forEach. what on earth javascript?
        state.icons = {
            ...newIcons,
            ...state.icons
        }
    },
    parseResIcons(state, payload) {
        // payload = {communityId, iconArray}
        state.icons = { // requied for reactivity. was not in the docs. I can't
            ...state.icons,
            [payload.cmntyId]: payload.iconList
        }
    },
    toLocal(state) {
        localStorage.setItem('lcl_ico', JSON.stringify({
            ...state.localIcons,
            ...state.icons,
        }))
    },
    clearLocal() {
        localStorage.removeItem('lcl_ico')
    }
}

export const actions = {
    getMyIcons({ rootState }) {
        this.$axios.get('reacts/icons/all/',
            rootState.authHeader
        )
            .then((res) => {
                this.commit('reactIcons/parseMultiCmnty', res.data)
                this.commit('reactIcons/toLocal')
            })
            // .catch((error) => {
            //     console.log(error)
            // })
    },
    getCmntyIcons({ rootState }, cmntyId) {
        this.$axios.get(`communities/${cmntyId}/icons/`,
            rootState.authHeader
        )
            .then((res) => {
                this.commit('reactIcons/parseResIcons', {
                    cmntyId: cmntyId,
                    iconList: res.data
                })
                this.commit('reactIcons/toLocal')
            })
            .catch((error) => {
                console.log(error)
            })
    },
}

export const getters = {
    iconsByCmnty: (state) => (cmntyId) => {
        return state.icons[cmntyId] || state.localIcons[cmntyId]
    },
    iconById: (state, getters) => (cmntyId, icon_id) => {
        const icons = getters.iconsByCmnty(cmntyId)
        return icons ? icons.find(react => react.id == icon_id) : null
    }
}