<template>
    <div class="err__container the_big_frame">
        <h1 v-if="error.statusCode === 404">
            Page not found
        </h1>
        <h1 v-else>
            Something failed to work
        </h1>
        <p>Sorry for the inconvenience</p>
        <div class="err__links-ctnr">
            <nuxt-link to="/home" class="err__links hoverline">
                Home
            </nuxt-link>
            <a @click="$router.go()" class="err__links hoverline">
                Refresh
            </a>
        </div>
    </div>
</template>

<script>
export default {
    props: ["error"]
};
</script>

<style scoped>
.err__container {
    flex-direction: column;
    align-items: center;
    justify-content: center;
}
.err__links-ctnr {
    margin-top: 10px;
}
.err__links {
    margin-left: 10px;
    color: var(--primary-color);
    display: inline;
}
</style>
