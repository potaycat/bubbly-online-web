<template>
    <div ref="feed">
        <transition-group name="zoom_in_fade">
            <ChatItem v-for="(room, index) in fetchedData"
                :key="room.id"
                :room="room"
                :roomLs="fetchedData"
                :indexPlus1="index+1"
                
                :community="community"
                :isAdmin="isAdmin"
                @mutated="firstFetch"
            />
        </transition-group>
        <StatusIndicator :isFetching="loading4More" :listLen="fetchedData.length"
            headsup="It's empty. Too empty"/>
            
        <FAB @clicked="makeNewChat"
            v-if="isAdmin"
            icon= "add"
            actionName= "Create new public chat"
        />
    </div>
</template>

<script>
import { feedingFrenzy, refreshFrenzy } from '@/mixins/feedingFrenzy'
import ChatItem from './ChatItem'
import FAB from '@/components/misc/FAB'

export default {
    components: { ChatItem, FAB },
    mixins: [feedingFrenzy, refreshFrenzy],
    props: ['community', 'isAdmin'],
    data() {return {
        feedUrl: `communities/${this.community.id}/public-rooms/`,
    }},
    methods: {
        makeNewChat() {
            this.$store.dispatch("cpntCtrl/inputDiag/openDiag", {
                title: "New public chat room",
                input_desc: "Enter description"
            })
            .then(input => {
                this.$axios.post(`moderation/${this.community.id}/chat`,
                    { description: input }, this.$store.state.auth.head
                )
                .then(res => {
                    this.firstFetch()
                })
            })
        },
    }
};
</script>