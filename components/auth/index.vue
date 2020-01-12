<template>
    <component :is="action" />
</template>
<script>
import Login from "./Login.vue"
import Register from "./Register.vue"
export default {
    name: "generic-auth-page",
    components: {Login, Register},
    props: ['action'],
};
</script>
