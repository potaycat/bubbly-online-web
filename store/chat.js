export const state = () => ({
    currentChat: null,
})

export const mutations = {
    loadChat(state, threadInfo){
        if (!state.currentChat ||!threadInfo) state.currentChat = threadInfo
        // else Object.keys(threadInfo).forEach(function(key) { state.currentChat[key] = threadInfo[key]; })
        else state.currentChat = Object.assign(threadInfo, state.currentChat)
    },
    bellUpdate(state, boolval){
        state.currentChat.roommate_info.enable_noti = boolval
    },
}

export const actions = {
}