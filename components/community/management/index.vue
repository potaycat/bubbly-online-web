<template>
    <div class="the_big_frame">
        <div class="cmty-mngmnt common_ls_cntainr --with-tabs" ref="feed">
            <Tabs
                locked=1
                :tabs="['GENERAL', 'MEMBERS', 'EMOTES', 'PINBOARD', 'CHAT ROOMS']"
                :currentTab="currentTab"
                @switchTo="newTab"
            />
            <keep-alive>
                <component v-if="community" :is="compTab"
                    class="common_ls_wrapper"
                    :community="community"
                    :isAdmin="isAdmin"
                />
                <!-- community could move to the store -->
            </keep-alive>
        </div>
    </div>
</template>

<script>
import { appBarTitle } from '@/mixins/appBarStuff'
import { disableHamburger } from '@/mixins/appBarStuff'
import { tabs } from '@/mixins/cmpnentsCtrl/tabs'
import { scrlDirection } from '@/mixins/feedingFrenzy'

import General from './General'
import Members from './Members'
import Emotes from './Emotes/'
import Pinboard from './Pinboard/'
import Chatrooms from './ChatRooms/'
export default {
    components: {General, Members, Emotes, Pinboard, Chatrooms},
    mixins: [appBarTitle, disableHamburger, scrlDirection, tabs],
    data:() => ({
        appBarDisplayTitle: "Community Management",
        community: null
    }),
    computed: {
        compTab() {
            return this.currentTab == 0 ? 'general' :
                this.currentTab == 1 ? 'members' :
                this.currentTab == 2 ? 'emotes' :
                this.currentTab == 3 ? 'pinboard' :
                this.currentTab == 4 ? 'chatrooms' : ''
        },
        isAdmin() {
            return this.community.membership_info.role == "administrator"
        },
    },
    created() {
        this.$axios.get(`communities/${this.$route.params.id}`, 
            this.$store.state.authHeader)
            .then(res => {
                if (res.data.membership_info.role) {
                    this.community = res.data
                }
            })
    },
}
</script>

<style>
.cmty-mngmnt {
    padding-bottom: 150px;
}
.material-icons-round.glow {
    color: var(--primary-color);
}
</style>
