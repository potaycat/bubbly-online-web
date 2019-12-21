import jwt_decode from 'jwt-decode'

export const state = () => ({
    jwt: localStorage.getItem('t'),
    my_profile: JSON.parse(localStorage.getItem('p')) || {},
    error: null
})

export const mutations = {
    storeAuthUser(state, profile_obj) {
        if (profile_obj.constructor === Object) {
            state.my_profile = profile_obj
            localStorage.setItem('p', JSON.stringify(profile_obj))
        }
    },
    updateToken(state, newToken) {
        state.jwt = newToken // because localStorage is not reactive
        localStorage.setItem('t', newToken)
    },
    removeToken(state) {
        state.jwt = null
        localStorage.removeItem('t')
    },
    throwServerErr(state, data) {
        state.error = data
    }
}

export const actions = {
    login(state, credential) {
        this.$axios.post('accounts/get-jwt', credential)
            .then((res) => {
                this.commit('auth/updateToken', res.data.token)
                this.$axios.get(`accounts/${credential.username}`)
                    .then((res) => {
                        this.commit('auth/storeAuthUser', res.data)
                        this.$router.go()
                    })
            })
            .catch((error) => {
                this.commit('auth/throwServerErr', error.response.data)
            })
    },
    refreshToken() {
        const payload = {
            token: this.state.jwt
        }
        this.$axios.post('accounts/refresh-jwt', payload)
            .then((res) => {
                this.commit('auth/updateToken', res.data.token)
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
}