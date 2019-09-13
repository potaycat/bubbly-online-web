export const state = () => ({
    currentPost: null,
})

export const mutations = {
    loadPost(state, postInfo){
        state.currentPost = postInfo
    },
}
