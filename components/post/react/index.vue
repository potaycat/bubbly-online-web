<template>
    <div class="reacts-ls-ctn">
        <ReactItem v-for="react in reacts"
            :key="react.react"
            :react="react"
            :community="community"
            :size="size"
        />
        <i :class="['react-add push material-icons-round', size]">insert_emoticon</i>
    </div>
</template>

<script>
import ReactItem from './ReactItem'
import AddReact from './AddReact'
export default {
    components: {
        ReactItem,
        AddReact,
    },
    props: [
        'reacts',
        'community',
        'size'
    ],
    computed: {
        allocated_to() {
            return this.community ? this.community :
                this.post.allocated_to
        },
    },
    methods: {
        toPost(post) {
            this.$router.push('/post/' + post.id)
        },
    }
}
</script>

<style scoped>
.reacts-ls-ctn {
    display: flex;
    align-items: center;
}
.react-add {
    margin-left: 4px;
    font-size: 20px;
    line-height: 10px;
    color: #aaa;
}
.react-add.react-icon--smol{
    font-size: 19px;
}
.react-add.react-icon--big{
    font-size: 24px;
}
</style>
