<template>
    <div class="container">
        <h1 v-if="error.statusCode === 404">
            Page not found
        </h1>
        <h1 v-else>
            Something failed to work
        </h1>
        <p>Sorry for the inconvenience</p>
        <div>
            <NuxtLink to="/auth/login" style="color:#0000ff">
                Login
            </NuxtLink>
            <NuxtLink to="/" style="margin-left:10px;color:#0000ff">
                Home
            </NuxtLink>
        </div>
    </div>
</template>

<script>
export default {
    props: ["error"]
};
</script>

<style scoped>
.container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
}
</style>
