<template>
    <div>
        <transition name="fade" appear>
            <div class="cmnty-info card box-shadow-3">
                <img class="cmnty-inf__cover" :src="community.cover_img" />
                <img class="cmnty_ico" :src="community.icon_img" />
                <section class="cmnty-inf__txt-ctn">
                    <div class="cmnty-inf__txt__smol">
                        {{ community.visibility }} • 
                        <span class="glow" style="color:gray;text-transform:none" @click="toCmntyMembers">
                            <strong>{{community.total_members}}</strong> members
                        </span>
                    </div>
                    <div class="cmnty-inf__name">
                        {{ community.name }}
                    </div>
                    <div class="cmnty-inf__moto">{{ community.moto }}</div>
                    <div v-if="community.membership_info&&community.membership_info.role=='banned'">You are banned from this community</div>
                    <div v-else class="cmnty-inf__actions">
                        <Button v-if="roleDisplay" @clicked="onRoleButtonClick" :text="roleDisplay" :padding="['5px', '0']" fill/>
                        <Button v-else @clicked="makeJoin" text="Join" :padding="['5px', '0']" />
                    </div>
                </section>
            </div>
        </transition>
        <InputDialog v-if="openDiag" :toDisplay="openDiag"/>
        <Dropdown v-if="moring"
            :options="[
                {action:'copyUrl', label:'Copy Community URL'},
                {action:'confirm_report', label:'Report Community'},
                {action:'uwu', label:'OwO'},
            ].filter(x=>x)"
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
        isBanned() {
            return null
        },
        isModerator() {return this.community.membership_info.role=='moderator'},
        isAdministrator() {return this.community.membership_info.role=='administrator'},
        isMember() {return this.community.membership_info.role=='member'},
        roleDisplay() {
            if (this.community.membership_info) {
                return this.isAdministrator ? 'Administering' :
                    this.isModerator ? 'Moderating' :
                    this.isMember ? 'Joined' : ''
            }
            return null
        }
    },
    methods: {
        onDropDownPick() {
            this.$store.commit('appBar/burgerState', false)
        },
        onRoleButtonClick() {
            if (this.isMember) {
                this.confirmLeave()
            } else if (this.isModerator || this.isAdministrator) {
                this.$router.push(`/community/${this.$route.params.id}/manage`)
            }
        },
        toCmntyMembers() {
            this.$store.commit('appBar/loadText', `Members of ${this.community.name}`)  // TODO mixin
            this.$store.commit('appBar/loadPic', {
                src: this.community.icon_img,
                style:'square'
            })
            this.$router.push(`/community/${this.$route.params.id}/members`)
        },
        onJoinHandle(res) {
            this.community.membership_info = res.data
        },
        onLeaveHandle() {
            this.community.membership_info = null
        },

        confirm_report() {
            this.openDiag = {
                alert: true,
                title: "If you believe this Community has violated Bubbly's ToS, follow these steps to report",
                description: "Copy the Community's URL and send it to support@email.com.\nThank you for keeping Bubbly safe"
            }
        },
        copyUrl() {
            navigator.clipboard.writeText(`${window.location.origin}/community/${this.community.id}`)
        }
    }
};
</script>

<style>
.cmnty-info {
    max-width: 950px;
    min-width: 300px;
    margin: 0 8px;
}

.cmnty-info .cmnty-inf__cover {
    border-radius: 15px 15px 0 0;
    /*box-shadow: inset 0 0 10px #000;*/
    /* top: 0; */
    right: 0;
    width: 100%;
    height: 250px;
    z-index: -1;
}
.cmnty-inf__txt-ctn {
    padding: 0 16px;
}
.cmnty-info .cmnty_ico {
    border: 3px solid #fff;
    position: relative;
    left: 11px;
    margin-top: -70px;
    width: 100px;
    height: 100px;
}
.cmnty-info .cmnty-inf__txt__smol {
    text-transform: capitalize;
    color: gray;
    /* text-align: right; */
    margin: -27px 0 7px 105px;
    font-size: 14px;
}
.cmnty-info .cmnty-inf__name {
    margin: 5px 0 2px;
    font-weight: bold;
    font-size: 23px;
}
.cmnty-info .cmnty-inf__moto {
    padding: 10px 0;
    font-size: 14px;
    /* text-align: center; */
}

.cmnty-inf__actions {
    padding: 8px 0 20px;
    width: 100%;
}
</style>
