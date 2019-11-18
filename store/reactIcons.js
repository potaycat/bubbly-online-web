export const state = () => ({
    localIcons: JSON.parse(localStorage.getItem('lcl_ico')),
    icons: 
    {
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
    parseResIcons(state, payload) {
        // payload = {communityId, iconArray}
        state.icons[payload.cmntyId] = payload.iconList
    },
    toLocal(state) {
        localStorage.setItem('lcl_ico', JSON.stringify({
            ...state.localIcons,
            ...state.icons,
        }))
    }
}

export const actions = {
    getMyIcons({ rootState }) {
        this.$axios.get('reacts/icons/all/',
            rootState.authHeader
        )
            .then((res) => {
                for (const cmnty of res.data) {
                    this.commit('reactIcons/parseResIcons', {
                        cmntyId: cmnty.id,
                        iconList: cmnty.icons
                    })
                } // for-of for-in forEach. what on earth javascript?
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
        const icons = state.localIcons[cmntyId]
        return icons ? icons : []
    },
    iconById: (state, getters) => (cmntyId, icon_id) => {
        return getters.iconsByCmnty(cmntyId)
            .find(react => react.id == icon_id)
    }
}