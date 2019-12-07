<template>
    <div class="cmnty-mnge-mems" ref="feed">
        <div class="mnge-mems__btns">
            <div v-for="cmdGroup in visibleCmd" class="mnge-mems__btn-grp" :key="cmdGroup[0].icon+'_'">
                <div v-for="cmd in cmdGroup" :key="cmd.icon"
                    class="mnge-mems__btn glow" :style="cmd.style"
                    @click="cmd.action()"
                >
                    <i class="material-icons-round">{{ cmd.icon }}</i>
                    <p>{{ cmd.lable }}</p>
                    <i class="material-icons-round">{{ cmd.scndIcon }}</i>
                </div>
            </div>
        </div>
        <section class="mnge__mod-list">
            <h4>Community management team</h4>
            <UserItem v-for="profile in fetchedData"
                :key="profile.username"
                :profile="profile"
            />
        </section>

        <InputDialog v-if="openDiag" :toDisplay="openDiag"/>
    </div>
</template>

<script>
import { feedingFrenzy } from '@/mixins/feedingFrenzy'
import UserItem from '@/components/profile/list/UserItem'
import { inputDiag } from '@/mixins/cmpnentsCtrl/inputDiag'

export default {
    components: {UserItem},
    mixins: [feedingFrenzy, inputDiag],
    props: ['community', 'isAdmin'],
    data() {return {
        feedUrl: `communities/${this.$route.params.id}/members/?filter_by=mod_team&`,
    }},
    computed: {
        visibleCmd() {
            return [
                [
                    {icon: "people", lable: `All members (${this.community.total_members})`, scndIcon: "chevron_right", action: this.allMembers},
                    {icon: "sentiment_very_dissatisfied", lable: "Banned accounts", scndIcon: "chevron_right", action: this.allBanned},
                ],
                [
                    {icon: "gavel", lable: "Ban an account", action: this.cnfrmBan},
                    {icon: "_", lable: "Revoke ban an account", action: this.cnfrmUnban},
                ],
                true ? [
                    {icon: "star_border", lable: "Promote to Moderator", action: this.cnfrmPromoteMod},
                    {icon: "star", lable: "Promote to Administrator", action: this.cnfrmPromoteAdmin},
                    {icon: "_", lable: "Demote a Mod/Admin", action: this.cnfrmDemote},
                ] : null
            ].filter(x => x)
        },
    },
    methods: {
        allMembers() {
            this.$router.push(`/community/${this.$route.params.id}/members`)
        },
        allBanned() {
            this.$router.push(`/community/${this.$route.params.id}/banned`)
        },

        cnfrmBan() {
            this.openDiag = {
                title: `Ban an account from ${this.community.name}`,
                description: "Once banned, the account will not be able to interact with this community",
                input_desc: "Account URL"
            }
            this.diagHndlFun = this.performBan
        },
        cnfrmUnban() {
            this.openDiag = {
                title: "Revoke ban",
                input_desc: "Account URL"
            }
            this.diagHndlFun = this.performUnban
        },

        cnfrmPromoteMod() {
            this.openDiag = {
                title: "Promote to Moderator",
                input_desc: "Account URL"
            }
            this.diagHndlFun = this.performPromoteMod
        },
        cnfrmPromoteAdmin() {
            this.openDiag = {
                title: "Promote to Administrator",
                input_desc: "Account URL"
            }
            this.diagHndlFun = this.performPromoteAdmin
        },
        cnfrmDemote() {
            this.openDiag = {
                title: "Demote a staff member",
                input_desc: "Account URL"
            }
            this.diagHndlFun = this.performDemote
        },

        getUsername(url){
            return url.substring(url.lastIndexOf('/') + 1)
        },
        performBan(usn) { this.changeRole(usn, -100)},
        performUnban(usn) { this.changeRole(usn, -10)},
        performPromoteMod(usn) { this.changeRole(usn, 100)},
        performPromoteAdmin(usn) { this.changeRole(usn, 200)},
        performDemote(usn) { this.changeRole(usn, 10)},
        changeRole(usn, roleVal) {
            this.loading = true
            this.$axios.patch(`moderation/${this.$route.params.id}/members/${this.getUsername(usn)}`,
                {role: roleVal},
                this.$store.state.authHeader
            )
                .then(res => {
                    this.firstFetch()
                    this.loading = false
                })
        }
    }
}
</script>

<style>
.mnge-mems__btn-grp {
    margin-top: 20px;
}
.mnge-mems__btn {
    width: 100%;
    border-bottom: solid 1px #ddd;
    padding: 10px;
    display: flex;
}
.mnge-mems__btn > p {
    margin: 0 auto 0 15px;
}

.mnge__mod-list > h4 {
    margin: 60px 0 10px 15px;
    color: #999;
}
</style>