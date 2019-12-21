<template>
    <div class="create-procedure-form">
        <h2 class="create-form__title">Welcome Back!</h2>
        <Form v-for="field in loginFields" :key="field.vmodel"
            :fld="field"
            v-model="formData[field.vmodel]"
        />
        <p>{{serverErr}}</p>
        <Button :wait="Requesting" class="create-form__btn" :padding="['5px', '0']"
            text="Login" @clicked="validateAnd(logTheIn)" fill/>
        <p @click="$router.replace('register')" class="auth-form__redirct glow">New to Bubbly? <strong>Register</strong></p>
        <p @click="" class="auth-form__redirct glow">Forgot your password? <strong>Memory assist</strong></p>
    </div>
</template>

<script>
import Button from '@/components/misc/Button'
import { formValidate } from '@/mixins/formValidate'
export default {
    components: { Button },
    mixins: [formValidate],
    data:() => ({
        formData: {
            username: "",
            password: "",
        },
    }),
    computed: {
        serverErr() {
            return this.$store.state.auth.error
        },
        validated() {
            return {
                username: this.formData.username.length > 3,
                password: this.formData.password.length > 5,
            }
        },
        loginFields() {
            return [
                {type: 'text', label: "Username", vmodel: 'username'},
                {type: 'password', label: "Password", vmodel: 'password', validateInfo: "Incorrect login credential"},
            ]
        },
    },
    methods: {
        logTheIn() {
            this.$store.dispatch("auth/login", {
                username: this.formData.username,
                password: this.formData.password
            })
        }
    }
};
</script>
