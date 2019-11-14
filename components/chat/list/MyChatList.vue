<template>
    <div id="mienCLs">
        <div class="the_big_frame">
            <div class="la_content" ref="feed">
                <div style="min-height:105px;width:100%"/>
                <ConvoItem v-for="room in fetchedData"
                    :key="room.id"
                    :room="room"
                />
                <div style="min-height: 120px"/>
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
import { feedingFrenzy, scrlDirection } from '@/mixins/feedingFrenzy'
import FAB from '@/components/actions/FAB'
import AddDiag from '../AddDiag'
import ConvoItem from './ConvoItem'

export default {
    components: {FAB, AddDiag, ConvoItem},
    mixins: [
        feedingFrenzy,
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
