<template>
    <div style="width:100%;padding:0 8px">
        <div class="cmnty-ancmnt" v-for="anoucemnt in fetchedData"
            :key="anoucemnt.id"
        >
            <BubblyMarkdownParse :text="anoucemnt.text" :attachments="anoucemnt.attachments" />
        </div>
        <Spinner v-if="loading4More" />
    </div>
</template>

<script>
import { feedingFrenzy, maintainScrllPos } from '@/mixins/feedingFrenzy'
import BubblyMarkdownParse from '@/components/post/mdParse/'

export default {
    components: {
        BubblyMarkdownParse,
    },
    mixins: [feedingFrenzy, maintainScrllPos],
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