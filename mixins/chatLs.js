export const chatLs = {
    methods: {
        toChat(room){ // TODO refactor/remove
            this.$router.push('/chat/t/' + room.id)
            this.$store.commit('detailBanner/loadPic', {})
            this.$store.commit('detailBanner/loadText', room.name ? room.name : "Chat cộng đồng"); // TODO fix this
            this.$store.commit('chat/loadChat', room)
        },
    },
}