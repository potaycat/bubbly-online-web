<template>
    <div class="auth-form">
        <h2 class="auth-form__title">Welcome Back!</h2>
        <div class="form__group">
            <input id="username_fld" v-model="username" class="form__field" placeholder="_">
            <label for="username_fld" class="form__label">Username</label>
            <p :style="notValidated('username')?null:'opacity:0'" class="form__invalid">
                At least 6 character please
            </p>
        </div>
        <div class="form__group">
            <input id="pw_fld" v-model="password" class="form__field" placeholder="_">
            <label for="pw_fld" class="form__label">Password</label>
            <p :style="notValidated('password')?null:'opacity:0'" class="form__invalid">
                At least 6 character please
            </p>
        </div>
        <Button class="form-btn" :padding="['5px', '0']"
            text="Login" @clicked="validateAnd(getDatToken)" fill />
        <p @click="$router.replace('register')" class="auth-form__toggle glow">New to Bubbly? <strong>Register</strong></p>
    </div>
</template>

<script>
import Button from '@/components/misc/Button'
import { formValidate } from '@/mixins/formValidate'
export default {
    components: {
        Button,
    },
    mixins: [formValidate],
    data: () => ({
        username: "",
        password: "",
        error: null
    }),
    computed: {
        validated() {
            return {
                username: this.username.length > 1,
                password: this.password.length > 3,
            }
        },
        step() {
            return this.$route.query.step || 0
        }
    },
    methods: {
        getDatToken() {
            try {
                this.$store.dispatch("auth/login", {
                    username: this.username,
                    password: this.password
                })
            } catch (e) {
                this.error = e.response.data.message;
            }
        }
    }
};
</script>

<style>
</style>