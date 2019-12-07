import { inputDiag } from '@/mixins/cmpnentsCtrl/inputDiag'
export const performFollow = {
    mixins: [inputDiag],
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

        make_userCopyUrl() {
            
        }
    },
}
export const performBlock = {
    mixins: [inputDiag],
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
    mixins: [inputDiag],
    methods: {
        makeJoin() {
            if (this.community.visibility == 'public') {
                this.$axios.post(`communities/${this.community.id}/members/__self`, null,
                    this.$store.state.authHeader
                )
                    .then(res => {
                        this.onJoinHandle(res)
                    })
            } else {
                this.confirmJoinWithCode()
            }
        },
        onJoinHandle() {console.log("Joined")},

        confirmJoinWithCode() {
            this.openDiag = {
                title: `${this.community.name} requires a code to join`,
                description: "You should go ask someone for the code",
                input_desc: "Invite Code"
            }
            this.diagHndlFun = this.performJoinWithCode
        },
        performJoinWithCode(value) {
            this.$router.push(`/community/${this.$route.params.id}/join/${value}`)
        },
        confirmLeave() {
            this.openDiag = {
                title: `Leave ${this.community.name}?`,
                description: "You will no longer see this community in your feed. Your reputation will be preserved"
            }
            this.diagHndlFun = this.performLeave
        },
        performLeave() {
            this.$axios.delete(`communities/${this.community.id}/members/__self`,
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
    mixins: [inputDiag],
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

        confirm_userReport() {
            this.openDiag = {
                alert: true,
                title: "Please follow the steps to report",
                description: "Copy the offender's profile URL and send it to one of your moderators.\nThank you for keeping the community safe"
            }
        },
    },
}