<template>
    <div style="width:100%">
        <transition name="fade" appear>
            <div class="cmty-info card box-shadow-3">
                <img class="cmty-inf__cover" :src="community.cover_img" />
                <img class="cmty_ico" :src="community.icon_img" />
                <section class="cmty-inf__txt-ctn">
                    <div class="cmty-inf__txt__smol">
                        {{ community.visibility }} • 
                        <span class="hoverline cmty-inf__mem-ctn" @click="toCmtyMembers">
                            <strong>{{community.total_members}}</strong> members
                        </span>
                    </div>
                    <div class="cmty-inf__name">{{ community.name }}</div>
                    <div class="cmty-inf__moto">{{ community.moto }}</div>
                    <div v-if="isBanned">You are banned from this community</div>
                    <div v-else class="cmty-inf__actions">
                        <Button v-if="roleDisplay" @clicked="onRoleButtonClick" :text="roleDisplay" :padding="['5px', '0']" 
                            :colorScnd="`#${community.theme_color}`" fill/>
                        <Button v-else @clicked="makeJoin" text="Join" :padding="['5px', '0']"
                            :colorScnd="`#${community.theme_color}`" />
                    </div>
                </section>
            </div>
        </transition>
        <InputDialog v-if="openDiag" :toDisplay="openDiag"/>
        <Dropdown v-if="moring"
            :options="[
                {action:'copyUrl', label:'Copy Community URL'},
                {action:'confirm_report', label:'Report Community'},
            ]"
        />
    </div>
</template>

<script>
import Button from "@/components/misc/Button"
import { performJoin } from '@/mixins/performFollow'
import Dropdown from '@/components/misc/Dropdown'

export default {
    components: {
        Button,
        Dropdown
    },
    mixins: [performJoin],
    props: ["community"],
    computed: {
        moring() {return this.$store.state.appBar.moring},
        hasRole() {
            if (this.community.membership_info) {
                return this.community.membership_info.role
            } return null
        },
        isBanned() { return this.hasRole == 'banned' },
        isModerator() { return this.hasRole == 'moderator' },
        isAdministrator() { return this.hasRole == 'administrator' },
        isMember() { return this.hasRole == 'member' },
        roleDisplay() {
            if (this.isMember) return 'Joined'
            if (this.isModerator) return 'Moderating'
            if (this.isAdministrator) return 'Administering'
            return ''
        }
    },
    methods: {
        onDropDownPick() {
            this.$store.commit('appBar/BURGER_STATE', false)
        },
        onRoleButtonClick() {
            if (this.isMember) {
                this.confirmLeave()
            } else if (this.isModerator || this.isAdministrator) {
                this.$router.push(`/communities/${this.$route.params.id}/manage`)
            }
        },
        toCmtyMembers() {
            this.$router.push(`/communities/${this.$route.params.id}/members`)
        },
        onLeaveHandle() {
            this.community.membership_info = null
            this.$store.dispatch("communityx/getJoinedCmties")
        },

        confirm_report() {
            this.openDiag = {
                alert: true,
                title: "If you believe this Community has violated Bubbly's ToS, follow these steps to report",
                description: `Copy the Community's URL and send it to ${process.env.GENERAL_EMAIL}.\nThank you for keeping Bubbly safe`
            }
        },
        copyUrl() {
            navigator.clipboard.writeText(`${window.location.origin}/communities/${this.community.id}`)
            .then(() => {
                this.$store.dispatch('cpntCtrl/toast/toastAlert', {message: "Copied to clipboard"})
            })
        }
    }
};
</script>

<style>
.cmty-info {
    max-width: 950px;
    margin: 0 8px;
}

.cmty-info .cmty-inf__cover {
    border-radius: 15px 15px 0 0;
    /*box-shadow: inset 0 0 10px #000;*/
    /* top: 0; */
    right: 0;
    width: 100%;
    height: 250px;
    z-index: -1;
}
.cmty-inf__txt-ctn {
    padding: 0 16px;
}
.cmty-info .cmty_ico {
    border: 3px solid #fff;
    position: relative;
    left: 11px;
    margin-top: -70px;
    width: 100px;
    height: 100px;
}
.cmty-info .cmty-inf__txt__smol {
    text-transform: capitalize;
    color: gray;
    /* text-align: right; */
    margin: -27px 0 7px 105px;
    font-size: 14px;
}
.cmty-inf__mem-ctn {
    text-transform: none;
    color: var(--primary-color);
}
.cmty-info .cmty-inf__name {
    margin: 5px 0 2px;
    font-weight: bold;
    font-size: 23px;
}
.cmty-info .cmty-inf__moto {
    padding: 10px 0;
    font-size: 14px;
    /* text-align: center; */
}

.cmty-inf__actions {
    padding: 8px 0 20px;
    width: 100%;
}
</style>
