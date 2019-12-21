export const comment = {
    computed: {
        isComment() { return this.$route.query.type == 'comment' },
        post() {
            return this.$store.state.postx.currentPost
        }
    },
    activated() {
        if (this.isComment) {
            this.appBarDisplayTitle = `Commenting on ${this.post.title ||
                this.post.text.substring(0,20)+'...' }`
        }
    },
    methods: {
        performComment() {
            const data = {
                text: this.body,
            }
            this.$axios.patch(
                `posts/${this.post.id}/edit`, data,
                this.$store.state.authHeader
            )
                .then(res => {
                    this.uploading = false
                    this.$store.commit('postx/loadPost', null)
                    this.$router.back()
                })
        },
    }
}

export const pinboard = {
    computed: {
        isPinboard() { return this.$route.query.type == 'pinboard' },
    },
    activated() {
        if (this.isPinboard) {
            this.$store.commit('appBar/loadText', "Write to Pinboard")
        }
    },
    methods: {
        performPinToBoard() {
            const data = {
                text: this.body,
                // attachments:
            }
            this.$axios.post(
                `moderation/${this.$route.query.to}/anouncements`, data,
                this.$store.state.authHeader
            )
                .then(res => {
                    this.uploading = false
                    this.$router.back()
                })
        },
    }
}
