export const state = () => ({
    currentPost: null,
    contentToEdit: null,
})

export const mutations = {
    loadPost(state, postObj) {
        state.currentPost = postObj
    },
    loadToEdit(state, obj){
        state.contentToEdit = obj
    },
}

export const actions = {
    goAndEdit(state, contentObj) {
        this.commit('postx/loadToEdit', contentObj)
        this.$router.push('/post/compose?mode=edit')
    }
}
