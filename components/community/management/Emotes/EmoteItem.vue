<template>
    <div>
        <div class="mnge__emo-item ">
            <img :src="emote.img_src">
            <p>{{ emote.name }}</p>
            <span>{{ emote.active ? "Active" : "Disabled" }}</span>
            <i class="material-icons-round glow" @click="performDrop">more_vert</i>
        </div>
        <Dropdown v-if="touchPos"
            :position="{y:touchPos.y, x:touchPos.x}"
            :options="isAdmin ? [
                {action:'confirmRen', label:'Rename'},
                emote.active ? {action:'confirmDisable', label:'Disable'} : 
                    {action:'confirmEnable', label:'Re-enable'},
            ].filter(x => x) : [{action:'', label:'Only admins can change this'}]"
        />
        <InputDialog v-if="openDiag" :toDisplay="openDiag"/>
    </div>
</template>

<script>
import { dropdown } from '@/mixins/cmpnentsCtrl/dropdown'
import { inputDiag } from '@/mixins/cmpnentsCtrl/inputDiag'
export default {
    props: ['emote', 'community', 'isAdmin'],
    mixins: [dropdown, inputDiag],
    methods: {
        confirmRen() {
            this.openDiag = {
                title: `Rename "${this.emote.name}"`,
                input_desc: "New name"
            }
            this.diagHndlFun = this.performRename
        },
        performRename(input) {
            this.performPatchEmote({
                name: input
            })
        },

        confirmDisable() {
            this.openDiag = {
                title: `Disable "${this.emote.name}"?`,
                description: "It will no longer be accessible in the future unless re-enabled"
            }
            this.diagHndlFun = this.performDisable
        },
        confirmEnable() {
            this.openDiag = {
                title: `Re-enable "${this.emote.name}"?`,
            }
            this.diagHndlFun = this.performDisable
        },
        performDisable() {
            this.performPatchEmote({
                active: !this.emote.active
            })
        },

        performPatchEmote(data) {
            this.$axios.patch(`moderation/${this.community.id}/icons/${this.emote.id}`,
                data,
                this.$store.state.authHeader
            )
                .then(res => {
                    this.$emit('mutated')
                    this.loading = false
                })
        }
    },
}
</script>

<style>
.mnge__emo-item {
    display: flex;
    align-items: center;
    padding: 10px 15px;
    border-bottom: solid 1px #ddd;
}
.mnge__emo-item > img {
    height: 50px;
    width: 50px;
}
.mnge__emo-item > p {
    margin: 0 auto 0 17px;
}
.mnge__emo-item > span {
    font-size: 14px;
    padding: 2px 10px;
    background: #eee;
    border-radius: 20px;
}

</style>