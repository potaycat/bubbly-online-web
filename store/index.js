// export const strict = false

export const state = () => ({
    wsBase: 'ws://localhost:8000/',
    authHeader: localStorage.getItem('t') ?
        {headers: {Authorization: "JWT "+localStorage.getItem('t')}} : null,

    topLevelDestination: 1,
    scrollinUp: true,
})

export const mutations = {
    changeDestination(state, tab) {
        state.topLevelDestination = tab
    },
    toggleScrDir(state) {
        state.scrollinUp = !state.scrollinUp
    },
}