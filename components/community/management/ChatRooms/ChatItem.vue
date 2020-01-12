<template>
    <div>
        <div class="mnge__p-chat-item">
            <p class="mnge__p-chat-item__order">{{indexPlus1}}</p>
            <img class="pfp" :src="room.bg_img">
            <div class="mnge__p-chat__text-inf glow" @click="$store.dispatch('chatx/toChat', room)">
                <strong>{{ displayName }}</strong>
                <p>{{ room.description }}</p>
            </div>
            <i class="material-icons-round nopaque" @click="performDrop">more_vert</i>
        </div>
        <Dropdown v-if="touchPos"
            :position="{y:touchPos.y, x:touchPos.x}"
            :options="[
                {action:'confirm_changeDesc', label:'Change Description'},
                {action:'confirm_swap', label:'Swap Ordering'},
                ...isAdmin ? [
                    {action:'confirm_delete', label:'Delete'}
                ] : []
            ]"
        />
        <InputDialog v-if="openDiag" :toDisplay="openDiag"/>
    </div>
</template>

<script>
import { dropdown } from '@/mixins/cmpnentsCtrl/dropdown'
import { inputDiag } from '@/mixins/cmpnentsCtrl/inputDiag'
export default {
    props: ['room', 'indexPlus1', 'roomLs',
        'community', 'isAdmin'],
    mixins: [dropdown, inputDiag],
    computed: {
        displayName() {
            return this.room.name || "Room #"+this.indexPlus1
        }
    },
    methods: {
        confirm_changeDesc() {
            this.openDiag = {
                title: `${this.displayName}`,
                input_desc: "New description"
            }
            this.diagHndlFun = this.perform_changeDesc
        },
        confirm_swap() {
            this.openDiag = {
                title: `${this.displayName}`,
                input_desc: "New order (numerical only)"
            }
            this.diagHndlFun = this.perform_swap
        },
        confirm_delete() {
            this.openDiag = {
                title: `Delete ${this.displayName}?`,
            }
            this.diagHndlFun = this.perform_delete
        },

        perform_changeDesc(val) {
            this.$axios.patch(`moderation/${this.community.id}/chat/${this.room.id}`,
                {
                    description: val
                },
                this.$store.state.auth.head
            )
                .then(res => {
                    this.$emit('mutated')
                    this.loading = false
                })
        },
        perform_swap(indexPlus1) {
            if (indexPlus1 > this.roomLs.length) {
                return
            }
            const toSwap = this.roomLs[indexPlus1-1].id
            this.$axios.put(`moderation/${this.community.id}/chat/swap`,
                {
                    first: toSwap,
                    second: this.room.id,
                },
                this.$store.state.auth.head
            )
                .then(res => {
                    this.$emit('mutated')
                    this.loading = false
                })
        },
        perform_delete() {
            this.$axios.delete(`moderation/${this.community.id}/chat/${this.room.id}`,
                this.$store.state.auth.head
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
.mnge__p-chat-item {
    display: flex;
    align-items: center;
    padding: 10px;
    border-bottom: solid 1px #ddd;
}
.mnge__p-chat-item > img {
    height: 50px;
    width: 50px;
}
.mnge__p-chat-item > .mnge__p-chat__text-inf {
    margin: 0 auto 0 10px;
}
.mnge__p-chat-item__order {
    background: #eee;
    border-radius: 100px;
    min-width: 25px;
    text-align: center;
    font-size: 14px;
    margin-right: 7px;
}

</style>