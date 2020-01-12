<template>
    <div class="create-procedure-form">
        <h2 class="create-form__title">Welcome Back!</h2>
        <Form v-for="field in formTemplate" :key="field.id"
            :fld="field"
            v-model="formData[field.id]"
            :invalidMsg="invalidFields[field.id]"
        />
        <p>{{ error }}</p>
        <Button :wait="Requesting" class="create-form__btn" :padding="['5px', '0']"
            text="Login" @clicked="validateThen(logTheIn)" fill/>
        <p @click="$router.replace('register')" class="auth-form__redirct hoverline">New to Bubbly? <strong>Register</strong></p>
        <p @click="" class="auth-form__redirct hoverline">Forgot your password? <strong>Memory assist</strong></p>
    </div>
</template>

<script>
import Button from '@/components/misc/Button'
import { formValidate } from '@/mixins/form'
export default {
    components: { Button },
    mixins: [formValidate],
    data() {
        return {
            formTemplate: [
                { type: 'text', label: "Username", id: 'username', rules: [this.$options.commonRules.lengthNotEmptyRule] },
                { type: 'password', label: 'Password', id: 'password', rules: [this.$options.commonRules.lengthNotEmptyRule] },
            ],
            formData: {
                username: "",
                password: "",
            },
            error: null,
        }
    },
    methods: {
        logTheIn() {
            this.error = null
            this.$store.dispatch("auth/login", {
                username: this.formData.username,
                password: this.formData.password
            })
            .catch(err => {
                this.fromSubmissionRejected(err.response.data)
                this.error = err.response.data
            })
        }
    }
};
</script>
