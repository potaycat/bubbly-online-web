import jwt_decode from 'jwt-decode'

export const state = () => ({
    jwt: localStorage.getItem('t'),
    head: localStorage.getItem('t') ?
        {headers: {Authorization: "JWT "+localStorage.getItem('t')}} : null,
    my_profile: JSON.parse(localStorage.getItem('p')) || {},
    loggedInTo: null,
})

export const mutations = {
    STORE_AUTH_USR(state, profile_obj) {
        if (profile_obj.constructor === Object) {
            state.my_profile = profile_obj
            localStorage.setItem('p', JSON.stringify(profile_obj))
        }
    },
    UPDATE_TOKEN(state, newToken) {
        // because localStorage is not reactive. TODO refactor. axios config headers
        state.jwt = newToken
        state.head = {headers: {Authorization: "JWT "+newToken}}
        localStorage.setItem('t', newToken)
    },
    REMOVE_TOKEN(state) {
        state.jwt = null
        localStorage.removeItem('t')
    },
    LOG_IN_TO(state, path) {
        state.loggedInTo = path
    }
}

export const actions = {
    logInToDoThat({commit, getters}) {
        if (!getters.loggedIn) {
            commit('LOG_IN_TO', this.$router.currentRoute.fullPath)
            this.$router.push('/auth/register')
        }
    },
    login({state, commit}, credential) {
        return new Promise((resolve, reject) => {
            this.$axios.post('accounts/get-jwt', credential)
            .then((res) => {
                commit('UPDATE_TOKEN', res.data.token)
                this.$axios.get(`accounts/${credential.username}`)
                .then((res) => {
                    commit('STORE_AUTH_USR', res.data)
                    this.$router.push(state.loggedInTo || '/home')
                    commit('LOG_IN_TO', null)
                    resolve()
                })
            })
            .catch((error) => {
                reject(error)
            })
        })
    },
    refreshToken() {
        const payload = {
            token: this.state.jwt
        }
        this.$axios.post('accounts/refresh-jwt', payload)
            .then((res) => {
                this.commit('auth/UPDATE_TOKEN', res.data.token)
            })
            .catch((error) => {
                console.error("CAUGHT: "+error)
            })
    },
    inspectToken() {
        const token = this.state.jwt;
        if (token) {
            const decoded = jwt_decode(token);
            const exp = decoded.exp
            const orig_iat = decode.orig_iat
            if (exp - (Date.now() / 1000) < 1800 && (Date.now() / 1000) - orig_iat < 628200) {
                this.dispatch('refreshToken')
            } else if (exp - (Date.now() / 1000) < 1800) {
                // DO NOTHING, DO NOT REFRESH          
            } else {
                // PROMPT USER TO RE-LOGIN, THIS ELSE CLAUSE COVERS THE CONDITION WHERE A TOKEN IS EXPIRED AS WELL
            }
        }
    }
}

export const getters = {
    loggedIn: (state) => {
        return Object.entries(state.my_profile).length
    },
}