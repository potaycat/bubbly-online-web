export const state = () => ({
    currentChat: null,
})

export const mutations = {
    loadChat(state, threadInfo){
        if (!state.currentChat ||!threadInfo) state.currentChat = threadInfo
        else state.currentChat = Object.assign(threadInfo, state.currentChat)
    },
    bellUpdate(state, boolval){
        state.currentChat.roommate_info.enable_noti = boolval
    },
    pblcRoomSaved(state, mateObj){
        state.currentChat.roommate_info = mateObj
    },
    updateName(state, newName){
        state.currentChat.name = newName
    },
    updateBgImg(state, imgUrl){
        state.currentChat.bg_img = imgUrl
    },
}

export const actions = {
}