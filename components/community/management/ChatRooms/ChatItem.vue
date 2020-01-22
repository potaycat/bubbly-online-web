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
                {action:'changeDscrption', label:'Change Description'},
                {action:'swapRoom', label:'Swap Ordering'},
                ...isAdmin ? [
                    {action:'deleteRoom', label:'Delete'}
                ] : []
            ]"
        />
    </div>
</template>

<script>
import { dropdown } from '@/mixins/cmpnentsCtrl/dropdown'
export default {
    props: ['room', 'indexPlus1', 'roomLs',
        'community', 'isAdmin'],
    mixins: [ dropdown ],
    computed: {
        displayName() {
            return this.room.name || "Room #"+this.indexPlus1
        }
    },
    methods: {
        mutated() {
            this.$emit('mutated')
            this.loading = false
        },
        changeDscrption() {
            this.$store.dispatch("cpntCtrl/inputDiag/openDiag", {
                title: `${this.displayName}`,
                input_desc: "New description"
            })
            .then(input => {
                this.$axios.patch(`moderation/${this.community.id}/chat/${this.room.id}`,
                    { description: input }, this.$store.state.auth.head
                )
                .then(res => {
                    this.mutated()
                })
            })
        },
        swapRoom() {
            this.$store.dispatch("cpntCtrl/inputDiag/openDiag", {
                title: `${this.displayName}`,
                input_desc: "New order (numerical only)"
            })
            .then(input => {
                const indexPlus1 = Number(input)
                if (!indexPlus1 || indexPlus1 > this.roomLs.length)
                    return
                const toSwap = this.roomLs[indexPlus1-1].id
                this.$axios.put(`moderation/${this.community.id}/chat/swap`,
                    {
                        first: toSwap,
                        second: this.room.id,
                    },
                    this.$store.state.auth.head
                )
                .then(res => {
                    this.mutated()
                })
            })
        },
        deleteRoom() {
            this.$store.dispatch("cpntCtrl/inputDiag/openDiag", {
                title: `Delete ${this.displayName}?`,
            })
            .then(() => {
                this.$axios.delete(`moderation/${this.community.id}/chat/${this.room.id}`,
                    this.$store.state.auth.head
                )
                .then(res => {
                    this.mutated()
                })
            })
        },
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