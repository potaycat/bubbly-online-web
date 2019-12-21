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
                @emote404="emote404=true"
            />
        </transition-group>
        <div class="reacts-ls__actions">
            <i v-if="!diableAdd" :class="['react-toggle-btn push material-icons-round', size]"
                @click="$emit('toggleAdd', $event)"
            >insert_emoticon</i>
            <span v-if="size=='react-icon--smol'" class="cmt__reply-btn glow" @click="$emit('reply')"
                >Reply</span>
        </div>
    </div>
</template>

<script>
import ReactItem from './ReactItem'
// TODO refactor
export default {
    data:() =>({
        emote404: false,
    }),
    watch: {
        emote404(boolVal) {
            if (boolVal) {
                this.$store.dispatch("reactionx/getCmtyEmotes", this.communityId)
            }
        }
    },
    components: { ReactItem },
    props: [
        'reacts',
        'myReact',
        'communityId',
        'size',
        'diableAdd',
    ],
    methods: {
        handleReaction(emoteId) {
            if (this.myReact == emoteId) {
                this.$emit('deleteReact', emoteId)
            } else {
                console.log(emoteId);
                
                this.$emit('emoteChose', emoteId)
            }
        }
    }
}
</script>

<style scoped>
.reacts-ls-ctn {
    display: flex;
    flex-wrap: wrap;
    overflow: auto;
}
.reacts-ls__empty {
    font-size: 12px;
    color: #bbb;
}


.react-toggle-btn {
    font-size: 20px;
}
.react-toggle-btn.react-icon--smol{
    font-size: 18px;
}
.react-toggle-btn.react-icon--big{
    font-size: 24px;
}

.reacts-ls__actions {    
    margin-left: 6px;
    margin-right: 100px;
    display: flex;
    align-items: center;
    color: var(--primary-color);
    opacity: 0.7;
}
.cmt__reply-btn {
    font-size: 12px;
    margin-left: 8px;
    font-weight: bold;

}
</style>
