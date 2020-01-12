export const editMode = {
    computed: {
        editMode() { return this.$route.query.mode == 'edit' },
        content() {
            return this.$store.state.postx.contentToEdit || {}
        }
    },
    activated() {
        if (this.editMode) {
            this.$store.commit('appBar/LOAD_TITLE', `Edit ${this.content.title ||
                this.content.text.substring(0,22)+'...' }`)
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
                this.$store.state.auth.head
            )
                .then(res => {
                    this.uploading = false
                    this.$store.commit('postx/LOAD_TO_EDIT', res.data)
                    this.$router.back()
                })
        },
    }
}
