// export const strict = false

export const state = () => ({
    wsBase: 'ws://localhost:8000/',
    pheader: { headers: { Authorization: "JWT " + localStorage.getItem('t') } },
    top_level_destination: 1,

    subTabs: "",
    activeSubTab: 0,

    scrollinUp: true,

    scrollPosition: {},
    ramCache: {},
})

export const mutations = {
    changeDestination(state, tab) {
        state.top_level_destination = tab
    },

    loadSubTabs(state, tabList) {
        // if (state.subTabs.toString() != tabList.toString()) {
        state.subTabs = tabList
        this.commit('changeSubTab', 0)
        // }
    },
    changeSubTab(state, tab) {
        state.activeSubTab = tab
    },

    toggleScrDir(state) {
        state.scrollinUp = !state.scrollinUp
    },

    keepLastPosition(state, { key, pos }) {
        state.scrollPosition[key] = pos
    },
    keepLastPosition2(state, { key, pos }) {
        state.ramCache[key] = pos
    },
}