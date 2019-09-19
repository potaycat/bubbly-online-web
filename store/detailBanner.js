export const state = () => ({
  text: null,

  picSrc: null,
  picStyle: null,

  back_link: null,
  moring: false,
  initializing: true,
})

export const mutations = {
  loadText(state, text2display){
    state.text = text2display;
  },
  loadPic(state, {src, style}){
    state.picSrc = src;
    state.picStyle = style;
  },
  openInfo(state, boolval){
    state.moring = boolval;
  },
}
