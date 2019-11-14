<template>
    <div id="postFeed" class="the_big_frame">
        <div class="la_content cards-wrapper" ref="feed">
            <div style="min-height:65px"/>
            <transition-group name="fade">
                <NotiItem v-for="notification in fetchedData"
                    :key="notification.id"
                    :noti="notification"
                />
            </transition-group>

            <p v-if="!fetchedData.length&&!loading4More"
                class="noti__no-new">No new notifications</p>
        </div>
        <FAB @clicked="clearAll"
            icon= "clear_all"
            actionName= "Clear all"
        />
    </div>
</template>

<script>
import { feedingFrenzy, scrlDirection } from '@/mixins/feedingFrenzy'

import NotiItem from './list/NotiItem'

import FAB from '@/components/actions/FAB'

export default {
    components: {
        NotiItem,
        FAB,
    },
    mixins: [feedingFrenzy, scrlDirection],
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
                    this.$router.go()
                })
        },
    }
}
</script>
