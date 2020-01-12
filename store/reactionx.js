import Vue from 'vue'

export const state = () => ({
    localEmotes: JSON.parse(localStorage.getItem('lcl_emos')) || {},
    emotes: {
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
    HANDLE_MULTI_CMTY_RES(state, cmtyLs) {
        const newEmotes = {}
        for (const cmty of cmtyLs) {
            newEmotes[cmty.id] = cmty.icons
        } // for-of for-in forEach. what on earth javascript?
        state.emotes = {
            ...newEmotes,
            ...state.emotes
        }
    },
    HANDLE_EMOTES_RES(state, payload) {
        // payload = {communityId, iconArray}
        Vue.set(state.emotes, payload.cmtyId, payload.iconList)
    },
    EMOTES_TO_LOCAL(state) {
        localStorage.setItem('lcl_emos', JSON.stringify({
            ...state.localEmotes,
            ...state.emotes,
        }))
    },
    CLEAR_LOCAL_EMOTES() {
        localStorage.removeItem('lcl_emos')
    },
}

export const actions = {
    getMyEmotes({ rootState, commit }) {
        this.$axios.get('reacts/icons/all/',
            rootState.auth.head
        )
            .then((res) => {
                commit('HANDLE_MULTI_CMTY_RES', res.data)
                commit('EMOTES_TO_LOCAL')
            })
            // .catch((error) => {
            //     console.error("CAUGHT: "+error)
            // })
    },
    getCmtyEmotes({ rootState, commit }, cmtyId) {
        this.$axios.get(`communities/${cmtyId}/icons/`,
            rootState.auth.head
        )
            .then((res) => {
                commit('HANDLE_EMOTES_RES', {
                    cmtyId: cmtyId,
                    iconList: res.data
                })
                commit('EMOTES_TO_LOCAL')
            })
            .catch((error) => {
                console.error("CAUGHT: "+error)
            })
    },
}

export const getters = {
    emotesByCmty: (state) => (cmtyId) => {
        const eArr = state.emotes[cmtyId] || state.localEmotes[cmtyId] || []
        return [
            {  
                id: 1,
                img_src: require('@/assets/heart.png'),
                name: "Like",
                active: true
            },
            ...eArr
        ]
    },
    emoteById: (state, getters) => (cmtyId, icon_id) => {
        const icons = getters.emotesByCmty(cmtyId)
        return icons ? icons.find(emote => emote.id == icon_id) : null
    }
}