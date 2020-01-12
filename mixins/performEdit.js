import { inputDiag } from '@/mixins/cmpnentsCtrl/inputDiag'
export const performEdit = {
    mixins: [inputDiag],
    methods: {
        goToEdit() {
            this.$store.dispatch('postx/goAndEdit', this.post)
        },
        
        confirm_delete() {
            this.openDiag = {
                title: `Delete ${this.post.title || this.post.text.slice(0, 10)+"..."}?`,
                hndlFun: this.perform_delete
            }
        },
        perform_delete() {
            this.$axios.delete(`posts/${this.post.id}/edit`,
                this.$store.state.auth.head
            )
                .then(res => {
                    this.$router.go()
                })
        },

        confirm_modDelete() {
            this.openDiag = {
                title: `Delete ${this.post.title || this.post.text.slice(0, 10)+"..."}?`,
                description: "Thank you for keeping the community safe",
                hndlFun: this.perform_modDel
            }
        },
        perform_modDel() {
            this.$axios.delete(`moderation/${this.post.allocated_to.id}/posts/${this.post.id}`,
                this.$store.state.auth.head
            )
                .then(res => {
                    this.$router.go()
                })
        },

        confirm_report() {
            this.openDiag = {
                alert: true,
                title: "Please follow the steps to report",
                description: "Copy the post's URL and send it to one of your moderators.\nThank you for keeping the community safe"
            }
        },

        goToReactions() {
            this.$store.commit('postx/LOAD_POST', this.post)
            this.$router.push(`/post/${this.post.id}/reactions`)
        },
    },
}
