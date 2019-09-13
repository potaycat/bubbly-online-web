export const state = () => ({
  text: null,
  back_link: null,
  moring: false,
  initializing: true,
})

export const mutations = {
  loadText(state, text2display){
    state.text = text2display;
  },
  openInfo(state, boolval){
    state.moring = boolval;
  },
}
