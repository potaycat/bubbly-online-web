import Vue from "vue"

Vue.mixin({
    methods: {
        renderLastMsg(data) {
            let message = ""
            const usn = this.$store.state.auth.my_profile.username
            if (data.author == usn || data.author.username == usn) {
                message += "Me: " 
            }
            switch (data.msg_type) {
                case 1:
                    message += data.content
                    break
                case 2:
                    message += "[Image]"
                    break
                case 3:
                    message += "[Youtube video]"
                    break
                case 4:
                    message += "[Voice note]"
                    break
                case 8:
                    message += "New chat room!"
                    break
                default:
                    message += "Sent a message"
            }
            return message
        },
        myOneSignalInit() {
            this.$OneSignal.isPushNotificationsEnabled(yes => {
                if (yes) {
                    this.$OneSignal.getExternalUserId()
                    .then(selfDefId => {
                        console.log(selfDefId)
                        const usrnm = this.$store.state.auth.my_profile.username || "__"
                        if (selfDefId != usrnm) {
                            this.$OneSignal.removeExternalUserId()
                            this.$OneSignal.setExternalUserId(usrnm)
                        }
                    })
                }
            })
        },
    },
})
