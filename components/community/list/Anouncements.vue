<template>
    <div class="common_ls_wrapper" style="padding:0 8px">
        <div class="cmnty-ancmnt" v-for="anoucemnt in fetchedData"
            :key="anoucemnt.id"
        >
            <BubblyMarkdownParse :text="anoucemnt.text" :attachments="anoucemnt.attachments" />
        </div>
        <h3 class="empty-fetchedLs" v-if="empty">No pinned posts</h3>
        <Spinner v-if="loading4More" />
        <FAB @clicked="$router.push(`/post/compose?to=${community.id}&type=pinboard`)"
            v-if="community.membership_info && 
                ['moderator','administrator'].includes(community.membership_info.role)"
            icon= "post_add"
            actionName= "Add to pinboard"
            style="top:calc(100vh - 80px)"
        />
    </div>
</template>

<script>
import { feedingFrenzy, refreshFrenzy, maintainScrllPos } from '@/mixins/feedingFrenzy'
import BubblyMarkdownParse from '@/components/post/mdParse/'
import FAB from '@/components/misc/FAB'

export default {
    components: {BubblyMarkdownParse, FAB},
    mixins: [feedingFrenzy, refreshFrenzy, maintainScrllPos],
    props: ['community'],
    data() {
        return {
            feedUrl: `communities/${this.community.id}/anouncements/`,
        }
    },
    computed: {
        scrollCtnr() {
            return this.$parent.$refs.feed
        },
    },
};
</script>

<style>
.cmnty-ancmnt {
    /* border: solid 1px red; */
    margin-bottom: 20px;
}

.unused-attchs {
    margin: 10px -8px 0 -8px;
}
</style>