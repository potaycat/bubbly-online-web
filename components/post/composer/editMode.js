export const editMode = {
    computed: {
        editMode() { return this.$route.query.mode == 'edit' },
        content() {
            return this.$store.state.postx.contentToEdit || {}
        }
    },
    activated() {
        if (this.editMode) {
            this.appBarDisplayTitle = `Edit ${this.content.title ||
                this.content.text.substring(0,22)+'...' }`
            this.body = this.content.text
        }
    },
    methods: {
        performPatch() {
            const data = {
                text: this.body,
            }
            this.$axios.patch(
                `posts/${this.content.id}/edit`, data,
                this.$store.state.authHeader
            )
                .then(res => {
                    this.uploading = false
                    this.$store.commit('postx/loadToEdit', res.data)
                    this.$router.back()
                })
        },
    }
}
