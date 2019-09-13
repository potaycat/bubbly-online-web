<template>
    <div id="postFeed">
        <div class="the_big_frame"><div class="la_content">
            <div style="min-height:115px"/>
            <PostCard v-for="post in fetchedData"
                :key ="post.content_id"
                :post ="post"
            />
            <!-- <PseudoPostCard /> -->
            <div style="min-height: 120px"/>  <!-- delete this -->
            
        </div>
        <FAB @clicked="toggleMemAdd()"
            icon= "add"
            actionName= "Write a post"
        />
        </div>
    </div>
</template>

<script>
import { feedingFrenzy } from '@/mixins/feedingFrenzy'

import PostCard from './PostCard'
import Spinner from '@/components/Spinner'


import FAB from '@/components/actions/FAB'

export default {
    components: {
        PostCard,
        Spinner,
        FAB,
    },
    mixins: [
        feedingFrenzy,
    ],
    data() {
        return {
            cache: 'st_feed',
            bruh: false
        }
    },
    created() {
        setInterval(() => {
            this.bruh = ! this.bruh
        }, 1000);
    },
    methods: {
        urlConstruct(offset) {
            return 'posts/feed'
        },
    },
}
</script>

<style>
</style>
