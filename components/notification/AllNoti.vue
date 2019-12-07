<template>
    <div id="notiFeed" class="the_big_frame">
        <div class="common_ls_cntainr --top-lev-app-bar cards-wrapper" ref="feed">
            <transition-group name="fade">
                <NotiItem v-for="notification in fetchedData"
                    :key="notification.id"
                    :noti="notification"
                />
            </transition-group>
            <Spinner v-if="loading4More" />
            <h3 class="empty-fetchedLs" v-if="empty">No new notifications</h3>
        </div>
        <FAB @clicked="clearAll"
            icon= "clear_all"
            actionName= "Clear all"
        />
    </div>
</template>

<script>
import { feedingFrenzy, maintainScrllPos, scrlDirection } from '@/mixins/feedingFrenzy'

import NotiItem from './list/NotiItem'

import FAB from '@/components/misc/FAB'

export default {
    components: {
        NotiItem,
        FAB,
    },
    mixins: [feedingFrenzy, maintainScrllPos, scrlDirection],
    data() {
        return {
            feedUrl: 'notifications/all/',
        }
    },
    methods: {
        clearAll() {
            this.$axios.delete('notifications/all/',
                this.$store.state.authHeader
            )
                .then(res => {
                    this.fetchedData = []
                })
        },
    }
}
</script>
