<template>
    <div id="notiFeed" class="the_big_frame">
        <div class="common_ls_cntainr --top-lev-app-bar cards-wrapper" ref="feed">
            <transition-group name="fade" style="width:100%">
                <NotiItem v-for="notification in fetchedData"
                    :key="notification.id"
                    :noti="notification"
                />
            </transition-group>
            <StatusIndicator :isFetching="loading4More" :listLen="fetchedData.length"
                headsup="No new notifications"/>
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
    components: { NotiItem, FAB },
    mixins: [feedingFrenzy, maintainScrllPos, scrlDirection],
    data() {
        return {
            feedUrl: 'notifications/all/',
        }
    },
    methods: {
        clearAll() {
            this.$axios.delete('notifications/all/',
                this.$store.state.auth.head
            )
                .then(res => {
                    this.fetchedData = []
                })
        },
    }
}
</script>
