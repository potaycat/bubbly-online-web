<template>
    <div ref="feed">
        <transition-group name="zoom_in_fade">
            <EmoteItem v-for="emote in fetchedData"
                :key="emote.id"
                :emote="emote"
                
                :community="community"
                :isAdmin="isAdmin"
                @mutated="firstFetch"
            />
        </transition-group>
        <Spinner v-if="loading4More" />
        <FAB @clicked="confirmNewEmote"
            v-if="isAdmin"
            icon= "add"
            actionName= "Upload new emote"
            inActvtView=1
        />
        <input type="file" ref="upload_em" style="display:none">
    </div>
</template>

<script>
import { feedingFrenzy } from '@/mixins/feedingFrenzy'
import EmoteItem from './EmoteItem'
import FAB from '@/components/misc/FAB'

export default {
    components: { EmoteItem, FAB },
    mixins: [feedingFrenzy],
    props: ['community', 'isAdmin'],
    data() {return {
        feedUrl: `communities/${this.community.id}/icons/`,
    }},
    methods: {
        confirmNewEmote() {
            this.$refs.upload_em.click()
        }
    }
};
</script>