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
                {icon: '_', lable: 'Log out', action: 'performLogout', style: 'color:red'},
            ]
        ]"/>
    </div>
</template>

<script>
import { appBarTitle } from '@/mixins/appBarStuff'
import { disableHamburger } from '@/mixins/appBarStuff'
import ButtonList from '@/components/misc/ButtonList'
export default {
    components: {ButtonList},
    mixins: [appBarTitle, disableHamburger],
    data:() => ({
        appBarDisplayTitle: "Settings",
        enableNoti: null
    }),
    created() {
        this.$OneSignal.isPushNotificationsEnabled(yes => {
            this.enableNoti = {icon: 'notifications', lable: 'Enable push notification', action: 'performEnablePush', scndIcon:"_"}
            if (yes) {
                this.enableNoti.scndIcon = 'done'
            }
        })
    },
    methods: {
        goToEmail() { this.$router.push('/settings/account/email') },
        goToPassword() { this.$router.push('/settings/account/password') },
        goToLanguage() { this.$router.push('/settings/app/language') },
        goToInstallInstruct() { this.$router.push('/settings/app/install') },
        performEnablePush() {
            this.$OneSignal.showNativePrompt()
            .then(res => {
                this.myOneSignalInit()
            })
        },
        performLogout() {
            this.$store.commit('auth/storeAuthUser', {})
            this.$store.commit('auth/removeToken')
            this.myOneSignalInit()
            this.$router.go()
        }
    }
}
</script>