<template>
    <component :is="action" />
</template>
<script>
import Login from "./Login.vue";
import Register from "./Register.vue";
import { disableHamburger } from '@/mixins/appBarStuff'
export default {
    name: "app",
    components: {Login, Register},
    mixins: [disableHamburger],
    props: ['action'],
    created() {
        if (Object.entries(this.$store.state.auth.my_profile).length != 0) {
            this.$router.push('/home')
        }
    },
};
</script>
