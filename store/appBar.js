export const state = () => ({
  text: null,
  picSrc: null,
  picStyle: null,

  moring: false,
})

export const mutations = {
  loadText(state, text2display) {
    state.text = text2display
  },
  loadPic(state, {src, style}) {
    state.picSrc = src
    state.picStyle = style
  },
  burgerState(state, boolval) {
    state.moring = boolval
  },
  reset(state) {
    state.text = null
    state.picSrc = null
    state.picStyle = null
    state.moring = false
  }
}

export const getters = {
  hmbrgrLaunchd: (state) => {
    return state.moring
  }
}