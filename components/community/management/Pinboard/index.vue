<template>
    <div ref="feed">
        <transition-group name="zoom_in_fade">
            <PostItem v-for="(post, index) in fetchedData"
                :key="post.id"
                :post="post"
                :postLs="fetchedData"
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
            actionName= "Create new pinned post"
        />
        <InputDialog v-if="openDiag" :toDisplay="openDiag"/>
    </div>
</template>

<script>
import { feedingFrenzy, refreshFrenzy } from '@/mixins/feedingFrenzy'
import PostItem from './PostItem'
import FAB from '@/components/misc/FAB'
import { inputDiag } from '@/mixins/cmpnentsCtrl/inputDiag'

export default {
    components: { PostItem, FAB },
    mixins: [feedingFrenzy, refreshFrenzy, inputDiag],
    props: ['community', 'isAdmin'],
    data() {return {
        feedUrl: `communities/${this.community.id}/anouncements/`,
    }},
    methods: {
        confirmNewChat() {
            this.openDiag = {
                title: "New public chat room",
                input_desc: "Enter description",
                hndlFun: this.performNewChat
            }
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