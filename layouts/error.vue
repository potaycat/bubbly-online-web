<template>
    <div class="container">
        <h1 v-if="error.statusCode === 404">
            Page not found
        </h1>
        <h1 v-else>
            An error occurred
        </h1>
        <NuxtLink to="/" style="color:#0000ff">
            click to go home
        </NuxtLink>
    </div>
</template>

<script>
export default {
    props: ["error"]
};
</script>

<style scoped>
</style>
