import SendBox from '@/components/chat/room/sendBox/'
export const sendingHandler = {
    components: {SendBox},
    data:() => ({
        openComposer: false,
    }),
    computed: {
        content() { return this.onPost || this.comment }  
    },
    methods: {
        launchReplyComposer() {
            this.openComposer = false
            this.$nextTick(() => {
                this.openComposer = true
            })

        },
        outBoxing(input) {
            let url = ""
            let data = null
            if (this.content.slug) { // is post, otherwise comment
                url = `posts/${this.content.id}/comments/create`
                data = { text: input }
            } else {
                url = `posts/${this.content.on}/comments/create`
                data = {
                    text: input,
                    reply_to: this.content.id
                }
            }
            this.$axios.post(url, data, this.$store.state.authHeader)
                .then(res => {
                    this.fetchedData.unshift({
                        ...res.data,
                        author: this.$store.state.auth.my_profile,
                        my_react: null,
                        reactions: [],
                        reply_count: 0,
                    })
                })
        },

        performSendEmote(emote) {
            
        }
    },
}