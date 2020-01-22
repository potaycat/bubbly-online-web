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
        <StatusIndicator :isFetching="loading4More" :listLen="fetchedData.length"
            headsup="It's empty. Too empty"/>

        <FAB @clicked="chooseNewEmo"
            v-if="isAdmin"
            icon= "add"
            actionName= "Upload new emote"
        />
        <input type="file" accept="image/*" @change="confirmUpload" ref="img_input" style="display:none">
        <img v-if="$store.state.cpntCtrl.inputDiag.diag && toUploadPreview"
            :src="toUploadPreview" class="preview-b4-upload">
    </div>
</template>

<script>
import { feedingFrenzy } from '@/mixins/feedingFrenzy'
import EmoteItem from './EmoteItem'
import FAB from '@/components/misc/FAB'

export default {
    components: { EmoteItem, FAB },
    mixins: [ feedingFrenzy ],
    props: ['community', 'isAdmin'],
    data() {return {
        feedUrl: `communities/${this.community.id}/icons/`,

        toUpload: null,
        toUploadPreview: null
    }},
    methods: {
        chooseNewEmo() {
            this.$refs.img_input.click()
        },
        confirmUpload(evt) {
            const file = evt.target.files[0]
            this.$refs.img_input.value = null
            this.compress(file, output => {
                this.toUpload = output
                this.toUploadPreview = URL.createObjectURL(output)
                this.$store.dispatch("cpntCtrl/inputDiag/openDiag", {
                    title: "Confirm upload",
                    description: "You can have a maximum of 20 active emotes",
                    input_desc: "Name this emote"
                })
                .then(input => {
                    this.performUpload(this.toUpload, uploaded => {
                        this.$axios.post(`/moderation/${this.community.id}/icons`, {
                            img_src: uploaded,
                            name: input
                        }, this.$store.state.auth.head)
                        .then(res => {
                            this.firstFetch()
                        })
                    })
                })
            })
        },
    }
};
</script>

<style>
.preview-b4-upload {
    position: fixed;
    z-index: 9999999999999;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -240px);
    width: 100px;
    height: 100px;
}
</style>