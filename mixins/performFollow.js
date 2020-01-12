import { inputDiag } from '@/mixins/cmpnentsCtrl/inputDiag'

function logInToDoThat(app) {
    if (!app.$store.getters['auth/loggedIn']) {
        app.$router.push('/auth/register?next=')
    }
}

export const performFollow = {
    mixins: [inputDiag],
    methods: {
        confirmUnfollow() {
            this.openDiag = {
                title: `Unfollow ${this.profile.alias}?`,
                hndlFun: this.performUnfollow
            }
        },
        performUnfollow() {
            this.$axios.delete(
                `circles/follow/${this.profile.username}`,
                this.$store.state.auth.head
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
                this.$store.state.auth.head
            )
                .catch(error => {
                    logInToDoThat(this)
                    this.onFollowFailHandle(error)
                })
        },
        onPerformFollow() {console.log("Followed")},
        onFollowFailHandle(e) {
            console.error("CATCHED on follow fail: "+e)
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
                description: "They will no longer be able to interact with you on this site. Private chat will also be deleted",
                hndlFun: this.performBlock
            }
        },
        onPerformBlock() {
            // console.log("Perform blocking...")
        },
        performBlock() {
            this.onPerformBlock()
            this.$axios.post(
                `circles/block/${this.profile.username}`, null,
                this.$store.state.auth.head
            )
                .then(res => {
                    this.onBlockHandle(res)
                })
        },
        onBlockHandle() {console.log("Blocked")},


        makeUnblock() {
            this.$axios.delete(
                `circles/block/${this.profile.username}`,
                this.$store.state.auth.head
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
                    this.$store.state.auth.head
                )
                    .then(res => {
                        this.onJoinHandle(res.data)
                    })
                    .catch(err => {
                        logInToDoThat(this)
                    })
            } else {
                this.confirmJoinWithCode()
            }
        },
        onJoinHandle(data) {
            this.community.membership_info = data
            this.$store.dispatch("communityx/getJoinedCmties")
        },

        confirmJoinWithCode() {
            this.openDiag = {
                title: `${this.community.name} requires a code to join`,
                description: "You should go ask someone for the code",
                input_desc: "Invite Code",
                hndlFun: this.performJoinWithCode
            }
        },
        performJoinWithCode(value) {
            this.$router.push(`/communities/${this.$route.params.id}/join/${value}`)
        },
        confirmLeave() {
            this.openDiag = {
                title: `Leave ${this.community.name}?`,
                description: "You will no longer see this community in your feed. Your reputation will be preserved",
                hndlFun: this.performLeave
            }
        },
        performLeave() {
            this.$axios.delete(`communities/${this.community.id}/members/__self`,
                this.$store.state.auth.head
            )
                .then(res => {
                    this.onLeaveHandle(res.data)
                })
        },
        onLeaveHandle() {
            this.$store.dispatch("communityx/getJoinedCmties")
        },
    },
}
export const performToPrivate = {
    mixins: [inputDiag],
    methods: {
        confirmToPrivate() {
            this.$axios.get(`accounts/${this.profile.username}/chat-to`,
                this.$store.state.auth.head
            )
                .then(res => {
                    if (res.data.room_id) {
                        this.$store.dispatch("chatx/toChat", {id: res.data.room_id})
                    }
                    else {
                        this.openDiag = {
                            title: `Chat with ${this.profile.alias}?`,
                            description: 'This will create a new private room',
                            hndlFun: this.performToPrivate
                        }
                    }
                })
                .catch(err => {
                    logInToDoThat(this)
                })
        },
        performToPrivate() {
            this.$axios.post(
                "chat/__new_or_direct/add",
                {participants: [{identity: this.profile.username}]},
                this.$store.state.auth.head
            )
                .then(res => {
                    this.$store.dispatch("chatx/toChat", res.data)
                })
                .catch(err => {
                    logInToDoThat(this)
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