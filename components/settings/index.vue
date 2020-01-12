<template>
    <div class="common_ls_cntainr --dtail-app-bar">
        <ButtonList :allCommands="[
            [
                {icon: 'email', lable: 'Change Email', scndIcon: 'chevron_right', action: 'goToEmail'},
                {icon: 'lock', lable: 'Change Password', scndIcon: 'chevron_right', action: 'goToPassword'},
            ],
            [
                {icon: 'language', lable: 'Đổi ngôn ngữ', scndIcon: 'chevron_right', action: 'goToLanguage'},
                {icon: 'cloud_download', lable: 'Install PWA', action: 'goToInstallInstruct'},
                enableNoti,
            ].filter(x => x),
            [
                {icon: '_', lable: 'About and FAQs', action: 'goToFAQ', scndIcon: 'chevron_right'},
                {icon: '_', lable: 'Legal stuff', action: 'goToLegalStuff', scndIcon: 'chevron_right'},
                {icon: '_', lable: '🤗 Donate/Get involved', action: 'goToCntrbt', scndIcon: 'chevron_right'},
            ],
            [
                {icon: '_', lable: 'Log out', action: 'performLogout', style: 'color:red'},
            ]
        ]"/>
    </div>
</template>

<script>
import ButtonList from '@/components/misc/ButtonList'
export default {
    components: {ButtonList},
    data:() => ({
        enableNoti: null
    }),
    created() {
        if (this.$OneSignal) {
            this.$OneSignal.isPushNotificationsEnabled(yes => {
                this.enableNoti = {icon: 'notifications', lable: 'Enable push notification', action: 'performEnablePush', scndIcon:'_'}
                if (yes) {
                    this.enableNoti.scndIcon = 'done'
                }
            })
        }
    },
    methods: {
        goToEmail() { this.$router.push('/settings/account/email') },
        goToPassword() { this.$router.push('/settings/account/password') },

        goToLanguage() { this.$router.push('/settings/app/language') },
        performEnablePush() {
            this.$OneSignal.showNativePrompt()
            .then(res => {
                this.myOneSignalInit()
            })
        },
        goToInstallInstruct() {},

        goToFAQ() { this.$router.push('/docs/faq') },
        goToLegalStuff() { this.$router.push('/docs/legal') },
        goToCntrbt() { this.$router.push('/docs/contribute') },

        performLogout() {
            if (this.confirmLogOut) {
                this.$store.commit('auth/STORE_AUTH_USR', {})
                this.$store.commit('auth/REMOVE_TOKEN')
                this.myOneSignalInit()
                this.$router.push('/')
            } else {
                this.confirmLogOut = 1
            }
        }
    }
}
</script>