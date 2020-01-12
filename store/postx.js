export const state = () => ({
    currentPost: null,
    contentToEdit: null,
})

export const mutations = {
    LOAD_POST(state, postObj) {
        state.currentPost = postObj
    },
    LOAD_TO_EDIT(state, obj){
        state.contentToEdit = obj
    },
}

export const actions = {
    goAndEdit({commit}, contentObj) {
        commit('LOAD_TO_EDIT', contentObj)
        this.$router.push('/post/compose?mode=edit')
    }
}
