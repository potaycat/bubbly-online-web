<template>
    <div id="postFeed" class="the_big_frame">
        <div class="la_content cards-wrapper" ref="feed">
            <div style="min-height:105px"/>

            <PostCard v-for="post in fetchedData"
                :key ="post.id"
                :post ="post"
            />
                <!-- <PseudoPostCard /> -->
            <div style="min-height: 120px"/>
        </div>
        <FAB @clicked="toggleMemAdd()"
            icon= "add"
            actionName= "Write a post"
        />
    </div>
</template>

<script>
import { feedingFrenzy, scrlDirection } from '@/mixins/feedingFrenzy'

import PostCard from './PostCard'

import FAB from '@/components/actions/FAB'

export default {
    components: {
        PostCard,
        FAB,
    },
    mixins: [feedingFrenzy, scrlDirection],
    data() {
        return {
            feedUrl: 'posts/feed/',
        }
    },
}
</script>
