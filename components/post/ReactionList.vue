<template>
    <div class="the_big_frame">
        <div class="react-ls common_ls_cntainr --with-tabs" ref="feed">
            <Tabs
                locked=1
                :tabs="['ALL', ...nameLs]"
                :currentTab="currentTab"
                @switchTo="newTab"
            />
            <transition-group name="zoom_in_fade">
                <UserItem v-for="profile in fetchedData"
                    :key="profile.username"
                    :profile="profile"
                />
            </transition-group>
            <h3 class="empty-fetchedLs" v-if="empty">No one reacted</h3>
        </div>
    </div>
</template>

<script>
import { tabs } from '@/mixins/cmpnentsCtrl/tabs'
import { feedingFrenzy } from '@/mixins/feedingFrenzy'
import { disableHamburger, appBarTitle } from '@/mixins/appBarStuff'
import UserItem from '@/components/profile/list/UserItem'

import { mapGetters } from "vuex"
export default {
    components: { UserItem },
    mixins: [tabs, feedingFrenzy, disableHamburger, appBarTitle],
    data:() => ({
        reactsAggregate: [],
        appBarDisplayTitle: "Reactions",
    }),
    computed: {
        ...mapGetters({
            emoteById: 'reactionx/emoteById',
        }),
        currentEmote() {
            const index = this.currentTab-1
            if (index != -1) {
                return this.reactsAggregate[index].icon_id
            } return ''
        },
        feedUrl() {
            return `posts/${this.$route.params.slug}/reacts/?emote=${this.currentEmote}&`
        },
        nameLs() {
            const obj = this.reactsAggregate            
            return Object.keys(obj).map(key => `${
                obj[key]
                // this.emoteById(this.$store.state.postx.currentPost.allocated_to.id, obj[key].icon_id)
            .name} (${obj[key].count})`)
        }
    },
    watch: {
        currentTab() {
            this.firstFetch()
        },
    },
    created() {
        this.$axios.get(
            // `reacts/${this.$route.params.slug}`,
            `posts/${this.$route.query.comment==1?'comment/':''}${this.$route.params.slug}`,
            this.$store.state.authHeader
        )
            .then(res => {
                this.reactsAggregate = res.data.reactions
            })
    }
}
</script>

<style>
.react-ls > span {
    width: 100%;
}
</style>