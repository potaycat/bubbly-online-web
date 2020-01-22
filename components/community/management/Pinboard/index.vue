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
            
        <FAB @clicked="$router.push(`/post/compose?to=${community.id}&type=pinboard`)"
            v-if="isAdmin"
            icon= "add"
            actionName= "Create new pinned post"
        />
    </div>
</template>

<script>
import { feedingFrenzy, refreshFrenzy } from '@/mixins/feedingFrenzy'
import PostItem from './PostItem'
import FAB from '@/components/misc/FAB'

export default {
    components: { PostItem, FAB },
    mixins: [ feedingFrenzy, refreshFrenzy ],
    props: ['community', 'isAdmin'],
    data() {return {
        feedUrl: `communities/${this.community.id}/anouncements/`,
    }},
};
</script>