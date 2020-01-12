import Vue from "vue"

Vue.mixin({
    /*
    mounted() {
        // textarea auto resizing
        const txA = document.getElementsByTagName('textarea');
        for (let i = 0; i < txA.length; i++) {
            txA[i].setAttribute('style', 'height:' + (txA[i].scrollHeight) + 'px');
            txA[i].addEventListener("input", OnInput, false);
        }
        function OnInput() {
            this.style.height = 'auto';
            this.style.height = (this.scrollHeight) + 'px';
        }
    },
    */
    methods: {
        renderLastMsg(data) {
            let message = ""
            const usn = this.$store.state.auth.my_profile.username
            if (data.author == usn || data.author.username == usn)
                message += "Me: "
            switch (data.msg_type) {
                case 1: message += data.content; break
                case 2: message += "[Image]"; break
                case 3: message += "[Youtube video]"; break
                case 4: message += "[Voice note]"; break
                case 8: message += "New chat room!"; break
                case 11: message += "[Emote]"; break
                default: message += "Sent a message"
            }
            return message
        },
        myOneSignalInit() {
            if (this.$OneSignal) {
                this.$OneSignal.isPushNotificationsEnabled(yes => {
                    if (yes) {
                        this.$OneSignal.getExternalUserId()
                        .then(selfDefId => {
                            const usrnm = this.$store.state.auth.my_profile.username || "__"
                            if (selfDefId != usrnm) {
                                this.$OneSignal.removeExternalUserId()
                                this.$OneSignal.setExternalUserId(usrnm)
                            }
                        })
                    }
                })
            }
        },
    },
})
