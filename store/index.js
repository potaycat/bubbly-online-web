// export const strict = false

export const state = () => ({
    wsBase: 'ws://localhost:8000/',
    authHeader: localStorage.getItem('t') ?
        {headers: {Authorization: "JWT "+localStorage.getItem('t')}} : null,

    scrollinUp: true,
})

export const mutations = {
    toggleScrDir(state) {
        state.scrollinUp = !state.scrollinUp
    },
}