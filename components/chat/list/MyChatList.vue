<template>
    <div id="myRoomLs">
        <div class="the_big_frame">
            <div class="common_ls_cntainr --top-lev-app-bar --with-tabs" ref="feed">
                <ConvoItem v-for="room in fetchedData"
                    :key="room.id"
                    :room="room"
                />
                <h3 class="empty-fetchedLs" v-if="empty">No conversations. Try joining some public chats or get to know people through private chats</h3>
                <Spinner v-if="loading4More" />
            </div>
            
            <FAB @clicked="openAddDiag"
                icon= "create"
                actionName= "New message"
            />
        </div>
        <AddDiag v-if="$route.query.chat_add=='open'"/>
    </div>
</template>

<script>
import { feedingFrenzy, refreshFrenzy, maintainScrllPos, scrlDirection } from '@/mixins/feedingFrenzy'
import FAB from '@/components/misc/FAB'
import AddDiag from '../AddDiag'
import ConvoItem from './ConvoItem'

export default {
    components: {FAB, AddDiag, ConvoItem},
    mixins: [
        feedingFrenzy, refreshFrenzy, maintainScrllPos,
        scrlDirection,
    ],
    data() {
        return {
            feedUrl: 'chat/my-rooms/',
        }
    },
    methods: {
        openAddDiag() {
            this.$router.push({query: {chat_add: 'open'}})
        },
    },
}
</script>
