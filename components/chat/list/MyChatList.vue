<template>
    <div id="myRoomLs">
        <div class="the_big_frame">
            <div class="common_ls_cntainr --top-lev-app-bar --with-tabs" ref="feed">
                <transition-group name="fade" style="width:100%">
                    <ConvoItem v-for="room in fetchedData"
                        :key="room.id"
                        :room="room"
                    />
                </transition-group>
                <StatusIndicator :isFetching="loading4More" :listLen="fetchedData.length"/>
            </div>
            
            <FAB @clicked="openAddDiag=true"
                icon= "create"
                actionName= "New message"
            />
        </div>
        <AddDiag v-if="openAddDiag"/>
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
    data:() => ({
        feedUrl: 'chat/my-rooms/?limit=20&',
        openAddDiag: false
    }),
    computed: {
        currentChat() {
            return this.$store.state.chatx.currentChat
        }
    },
    
    watch: {
        currentChat: {
            deep: true,
            immediate: true,
            handler(obj) {
                const index = this.fetchedData.findIndex(t => t.id == obj.id)
                if (index != -1) {
                    this.fetchedData[index] = {
                        ...this.fetchedData[index],
                        ...obj
                    }
                    this.$forceUpdate()
                }
            }
        },
        '$route.query.room'(newVal, oldVal) {
            if (oldVal) {
                this.autoRefresh()
            }
        },
    },
    mounted() {
        setInterval(() => {
            this.autoRefresh()
        }, 42069)
    },
    methods: {
        autoRefresh() {
            if (this.scrollCtnr.scrollTop<10 && this.$route.name=='chat') {
                this.firstFetch()
            }
        },
    }
}
</script>
