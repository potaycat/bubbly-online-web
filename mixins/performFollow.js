import { _comp_inputDiag } from '@/mixins/_comp_inputDiag'
export const performFollow = {
    mixins: [_comp_inputDiag],
    methods: {
        confirmUnfollow() {
            this.openDiag = {
                title: `Unfollow ${this.profile.alias}?`,
            }
            this.diagHndlFun = this.performUnfollow
        },
        performUnfollow() {
            this.$axios.delete(
                `circles/follow/${this.profile.username}`,
                this.$store.state.authHeader
            )
                .then(res => {
                    this.onUnfollowHandle(res)
                })
        },
        onUnfollowHandle() {console.log("Unfollowed")},
        

        makeFollow() {
            this.onPerformFollow() // inability to `super()` sucks
            this.$axios.post(
                `circles/follow/${this.profile.username}`, null,
                this.$store.state.authHeader
            )
                .catch((error) => {
                    this.onFollowFailHandle(error)
                })
        },
        onPerformFollow() {console.log("Followed")},
        onFollowFailHandle(e) {
            console.log(e)
            console.log("Follow failed!")
        },
    },
}
export const performBlock = {
    mixins: [_comp_inputDiag],
    methods: {
        confirmBlock() {
            this.openDiag = {
                title: `Block ${this.profile.alias}?`,
                description: "They will no longer be able to interact with you on this site. Private chat will also be deleted"
            }
            this.diagHndlFun = this.performBlock
        },
        onPerformBlock() {
            // console.log("Perform blocking...")
        },
        performBlock() {
            this.onPerformBlock()
            this.$axios.post(
                `circles/block/${this.profile.username}`, null,
                this.$store.state.authHeader
            )
                .then(res => {
                    this.onBlockHandle(res)
                })
        },
        onBlockHandle() {console.log("Blocked")},


        makeUnblock() {
            this.$axios.delete(
                `circles/block/${this.profile.username}`,
                this.$store.state.authHeader
            )
                .then(res => {
                    this.onUnblockHandle(res)
                })
        },
        onUnblockHandle() {console.log("Unlocked")},
    },
}
export const performJoin = {
    mixins: [_comp_inputDiag],
    methods: {
        makeJoin() {
            if (this.community.visibility == 'public') {
                this.$axios.post(`communities/${this.community.id}/members/_self`, null,
                    this.$store.state.authHeader
                )
                    .then(res => {
                        this.onJoinHandle(res)
                    })
            }
        },
        onJoinHandle() {console.log("Joined")},


        confirmLeave() {
            this.openDiag = {
                title: `Leave ${this.community.name}?`,
                description: "You will no longer see this community in your feed. Your reputation will be preserved"
            }
            this.diagHndlFun = this.performLeave
        },
        performLeave() {
            this.$axios.delete(`communities/${this.community.id}/members/_self`,
                this.$store.state.authHeader
            )
                .then(res => {
                    this.onLeaveHandle(res)
                })
        },
        onLeaveHandle() {console.log("Blocked")},
    },
}
export const performToPrivate = {
    mixins: [_comp_inputDiag],
    methods: {
        confirmToPrivate() {
            this.openDiag = {
                title: `Chat with ${this.profile.alias}?`,
                description: 'This will create a new private room if there are not any yet'
            }
            this.diagHndlFun = this.performToPrivate
        },
        performToPrivate() {
            this.$axios.post(
                `chat/__new_or_direct/add`,
                {participants: [{identity: this.profile.username}]},
                this.$store.state.authHeader
            )
                .then(res => {
                    this.$router.push('/chat/t/'+res.data.id)
                })
        },
    },
}