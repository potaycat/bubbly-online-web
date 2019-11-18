<template>
    <div class="reacts-ls-ctn">
        <div v-if="!reacts.length&&!size" class="reacts-ls__empty">
            👇 Be the first to react
        </div>
        <transition-group name="fade" appear>
            <ReactItem v-for="react in reacts"
                :key="react.icon_id"
                :react="react"
                :isMine="myReact==react.icon_id"
                :communityId="communityId"
                :size="size"
                @click.native="handleReaction(react.icon_id)"
            />
        </transition-group>
        <i v-if="!diableAdd" :class="['react-toggle-btn push material-icons-round', size]"
            @click="$emit('toggleAdd', $event)"
        >insert_emoticon</i>
    </div>
</template>

<script>
import ReactItem from './ReactItem'
import ReactAdd from './ReactAdd'
export default {
    components: {
        ReactItem,
        ReactAdd,
    },
    props: [
        'reacts',
        'myReact',
        'communityId',
        'size',
        'diableAdd',
    ],
    methods: {
        handleReaction(iconId) {
            if (this.myReact == iconId) {
                this.$emit('deleteReact', iconId)
            } else {
                this.$emit('quickReact', iconId)
            }
        }
    }
}
</script>

<style scoped>
.reacts-ls-ctn {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    overflow: auto;
}
.reacts-ls__empty {
    font-size: 12px;
    color: #bbb;
}


.react-toggle-btn {
    font-size: 20px;
    color: rgba(72, 133, 237, 0.8);
    margin-right: 100px;
    margin-left: 3px;
}
.react-toggle-btn.react-icon--smol{
    margin-top: 2px;
    font-size: 18.5px;
}
.react-toggle-btn.react-icon--big{
    margin-top: 4px;
    font-size: 24px;
}
</style>
