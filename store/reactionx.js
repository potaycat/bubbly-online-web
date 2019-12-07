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
    handleMultiCmntyRes(state, cmntyLs) {
        const newEmotes = {}
        for (const cmnty of cmntyLs) {
            newEmotes[cmnty.id] = cmnty.icons
        } // for-of for-in forEach. what on earth javascript?
        state.emotes = {
            ...newEmotes,
            ...state.emotes
        }
    },
    handleEmotesRes(state, payload) {
        // payload = {communityId, iconArray}
        Vue.set(state.emotes, payload.cmntyId, payload.iconList)
    },
    toLocal(state) {
        localStorage.setItem('lcl_emos', JSON.stringify({
            ...state.localEmotes,
            ...state.emotes,
        }))
    },
    clearLocal() {
        localStorage.removeItem('lcl_emos')
    },
}

export const actions = {
    getMyEmotes({ rootState }) {
        this.$axios.get('reacts/icons/all/',
            rootState.authHeader
        )
            .then((res) => {
                this.commit('reactionx/handleMultiCmntyRes', res.data)
                this.commit('reactionx/toLocal')
            })
            // .catch((error) => {
            //     console.error("CAUGHT: "+error)
            // })
    },
    getCmntyEmotes({ rootState }, cmntyId) {
        this.$axios.get(`communities/${cmntyId}/icons/`,
            rootState.authHeader
        )
            .then((res) => {
                this.commit('reactionx/handleEmotesRes', {
                    cmntyId: cmntyId,
                    iconList: res.data
                })
                this.commit('reactionx/toLocal')
            })
            .catch((error) => {
                console.error("CAUGHT: "+error)
            })
    },
}

export const getters = {
    emotesByCmnty: (state) => (cmntyId) => {
        return state.emotes[cmntyId] || state.localEmotes[cmntyId]
    },
    emoteById: (state, getters) => (cmntyId, icon_id) => {
        const icons = getters.emotesByCmnty(cmntyId)
        return icons ? icons.find(emote => emote.id == icon_id) : null
    }
}