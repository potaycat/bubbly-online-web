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
            
        <FAB @clicked="confirmNewChat"
            v-if="isAdmin"
            icon= "add"
            actionName= "Create new public chat"
        />
        <InputDialog v-if="openDiag" :toDisplay="openDiag"/>
    </div>
</template>

<script>
import { feedingFrenzy, refreshFrenzy } from '@/mixins/feedingFrenzy'
import ChatItem from './ChatItem'
import FAB from '@/components/misc/FAB'
import { inputDiag } from '@/mixins/cmpnentsCtrl/inputDiag'

export default {
    components: { ChatItem, FAB },
    mixins: [feedingFrenzy, refreshFrenzy, inputDiag],
    props: ['community', 'isAdmin'],
    data() {return {
        feedUrl: `communities/${this.community.id}/public-rooms/`,
    }},
    methods: {
        confirmNewChat() {
            this.openDiag = {
                title: "New public chat room",
                input_desc: "Enter description"
            }
            this.diagHndlFun = this.performNewChat
        },
        performNewChat(val) {
            this.$axios.post(
                `moderation/${this.community.id}/chat`,
                {description: val},
                this.$store.state.auth.head
            )
                .then(res => {
                    this.firstFetch()
                })
        }
    }
};
</script>