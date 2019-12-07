<template>
    <component :is="action" />
</template>
<script>
import Login from "./Login.vue";
import Register from "./Register.vue";
export default {
    name: "app",
    components: {Login, Register},
    props: ['action']
};
</script>

<style>
.auth-form {
    padding: 60px 15px;
}
.auth-form__title {
    background: linear-gradient(60deg, rgb(238,152,30) 0%, rgb(235,56,147) 100%);
    background-clip: text;
    -webkit-text-fill-color: transparent;

    display: inline-block;
    margin-bottom: 10px;
}
.auth-form .form__group {
    margin-top: 10px;
}
.auth-form .form-btn {
    margin-top: 20px;
}

.auth-form__toggle {
    margin-top: 40px;
}
</style>