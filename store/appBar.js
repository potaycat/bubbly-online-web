export const state = () => ({
  text: null,
  picSrc: null,
  picStyle: null,

  moring: false,
})

export const mutations = {
  LOAD_TITLE(state, text2display) {
    state.text = text2display
  },
  LOAD_ICON(state, {src, style}) {
    state.picSrc = src
    state.picStyle = style
  },
  BURGER_STATE(state, boolval) {
    state.moring = boolval
  },
  APP_BAR_RESET(state) {
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