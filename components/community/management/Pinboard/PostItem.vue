<template>
    <div>
        <div class="mnge__pp-ctnr box-shadow-2">
            <p class="mnge__pp__order">{{indexPlus1}}</p>
            <div class="mnge__pp__text " >
                <p>{{ previewText }}</p>
                <div class="mnge__pp__attch-prview-ctnr">
                    <img v-for="attch in post.attachments.slice(0,3)"
                        :key="attch.order"
                        v-if="attch.type==2"
                        :src="attch.content"
                        alt="post image"
                    >
                </div>
                <div class="mnge__pp__author">
                    Author: <strong>{{post.author.alias}}</strong>
                </div>
            </div>
            <i class="material-icons-round glow" @click="performDrop">more_vert</i>
        </div>
        <Dropdown v-if="touchPos"
            :position="{y:touchPos.y, x:touchPos.x}"
            :options="[
                post.author.username == $store.state.auth.my_profile.username ?
                    {action:'goto_edit', label:'Edit'} : null,
                {action:'confirm_swap', label:'Swap Ordering'},
                {action:'confirm_del', label:'Delete'},
            ].filter(x => x)"
        />
        <InputDialog v-if="openDiag" :toDisplay="openDiag"/>
    </div>
</template>

<script>
import { dropdown } from '@/mixins/cmpnentsCtrl/dropdown'
import { inputDiag } from '@/mixins/cmpnentsCtrl/inputDiag'
export default {
    props: ['post', 'indexPlus1', 'postLs',
        'community', 'isAdmin'],
    mixins: [dropdown, inputDiag],
    computed: {
        previewText() {
            if (this.post.text.length < 175) {
                return this.post.text
            }
            return this.post.text.slice(0, 175) + "..."
        }
    },
    methods: {
        goto_edit() {
            this.$store.dispatch('postx/goAndEdit', this.post)
        },
        confirm_swap() {
            this.openDiag = {
                title: `Pinned post #${this.indexPlus1}`,
                input_desc: "New order (numerical only)"
            }
            this.diagHndlFun = this.perform_swap
        },
        confirm_del() {
            this.openDiag = {
                title: `Delete pinned post #${this.indexPlus1}?`,
            }
            this.diagHndlFun = this.perform_delete
        },

        perform_delete(val) {
            this.$axios.delete(`moderation/${this.community.id}/posts/${this.post.id}`,
                this.$store.state.authHeader
            )
                .then(res => {
                    this.$emit('mutated')
                    this.loading = false
                })
        },
        perform_swap(indexPlus1) {
            if (indexPlus1 > this.postLs.length) {
                return
            }
            const toSwap = this.postLs[indexPlus1-1].id
            this.$axios.put(`moderation/${this.community.id}/anouncements/swap`,
                {
                    first: toSwap,
                    second: this.post.id,
                },
                this.$store.state.authHeader
            )
                .then(res => {
                    this.$emit('mutated')
                    this.loading = false
                })
        },
    },
}
</script>

<style>
.mnge__pp-ctnr {
    display: flex;
    padding: 10px;
    margin: 10px 0;
}
.mnge__pp__order {
    background: #eee;
    border-radius: 100px;
    min-width: 25px;
    text-align: center;
    font-size: 14px;
    margin-right: 7px;
}
.mnge__p-chat-item > img {
    height: 50px;
    width: 50px;
}
.mnge__pp__text {
    font-size: 14px;
    width: 100%;
    overflow: hidden;
}
.mnge__pp__attch-prview-ctnr {
    display: flex;
    margin: 5px 0;
}
.mnge__pp__attch-prview-ctnr > img {
    height: 120px;
    margin-right: 3px;
}
.mnge__pp__author {
    font-size: 12px;
}

.mnge__pp__order, .mnge__pp-ctnr > i {
    margin-bottom: auto;
}
</style>