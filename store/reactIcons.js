export const state = () => ({
    icons: {
        // EXAMPLE:
        // communityId: {
        //     id: {name:'a', img_ref:'url', active: true},
        // },
        // communityId: {
        //     id: {name:'b', img_ref:'url', active: false},
        //     id: {name:'c', img_ref:'url', active: true}
        // },
    },
})

export const mutations = {
    parseResIcons(state, payload) {
        // payload = {communityId, iconArray}
        const cmnty = payload.cmntyId
        state.icons[cmnty] = {}
        payload.iconList.forEach((icon, index) => {
            state.icons[cmnty][icon.id] = icon
        })
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
            })
            // .catch((error) => {
            //     console.log(error)
            // })
    },
    getCmntyIcons({ rootState }, cmntyId) {
        this.$axios.post(`communities/${cmntyId}/icons/`, {},
            rootState.authHeader
        )
            .then((res) => {
                this.commit('reactIcons/parseResIcons', {
                    cmntyId: cmntyId,
                    iconList: res.data
                })
            })
            .catch((error) => {
                console.log(error)
            })
    },
}
