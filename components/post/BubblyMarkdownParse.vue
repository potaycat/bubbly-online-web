<template>
    <div>
        <p v-for="(p, index) in postText"
            :key="index"
            class="text-content"
        >
            {{ p }}
        </p>
    </div>
</template>

<script>
export default {
    props: [
        'content',
    ],
    computed: {
        postText() {
            const txt = this.content.text.split(/\r?\n/)
            return txt
        }
    },
}
</script>

<style>
.text-content {
    padding-bottom: 10px;
}
</style>