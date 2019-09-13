import jwt_decode from 'jwt-decode'

export const state = () => ({
  jwt: localStorage.getItem('t'),
  stored_profile: localStorage.getItem('p'),
  my_profile: null,
})

export const mutations = {
  getLoggedInProfile(state, profile_obj){
    localStorage.setItem('p', JSON.stringify(profile_obj));
    state.my_profile = JSON.parse(state.stored_profile);
  },
  loadProfileFromStorage(state){
    state.my_profile = JSON.parse(state.stored_profile);
  },

  updateToken(state, newToken){
    localStorage.setItem('t', newToken);
    state.jwt = newToken;
  },
  removeToken(state){
    localStorage.removeItem('t');
    localStorage.removeItem('p');
    state.jwt = null;
    state.stored_profile = null;
    state.my_profile = null;
  }
}

export const actions = {
  login(state, credential){
    this.$axios.post('acc/get-jwt/?format=json', credential)
      .then((response)=>{
          this.commit('jwtlogin/updateToken', response.data.token);
          this.$axios.get('acc/profile/'+credential.username+'?format=json')
            .then((response)=>{              
                this.commit('jwtlogin/getLoggedInProfile', response.data);
              })
        })
      .catch((error)=>{
          console.log(error);
        })
    
  },
  loadProfile(state){
    if(state.my_profile==null){
      this.commit('jwtlogin/loadProfileFromStorage');
    }
  },

  refreshToken(){
    const payload = {
      token: this.state.jwt
    }
    this.$axios.post('acc/refresh-jwt/?format=json', payload)
      .then((response)=>{
          this.commit('jwtlogin/updateToken', response.data.token)
        })
      .catch((error)=>{
          console.log(error);
        })
  },

  inspectToken(){
    const token = this.state.jwt;
    if(token){
      const decoded = jwt_decode(token);
      const exp = decoded.exp
      const orig_iat = decode.orig_iat
      if(exp - (Date.now()/1000) < 1800 && (Date.now()/1000) - orig_iat < 628200){
        this.dispatch('refreshToken')
      } else if (exp -(Date.now()/1000) < 1800){
        // DO NOTHING, DO NOT REFRESH          
      } else {
        // PROMPT USER TO RE-LOGIN, THIS ELSE CLAUSE COVERS THE CONDITION WHERE A TOKEN IS EXPIRED AS WELL
      }
    }
  }
}

export const getters = {
}