<template>
    <div>
        <Nuxt keep-alive />
        <TopLvlNavigator />
    </div>
</template>

<script>
import TopLvlNavigator from "@/components/layout/bars/TopLvlNavigator"
export default {
    components: {
        TopLvlNavigator
    }
}
</script>

<style>
</style>