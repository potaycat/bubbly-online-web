<template>
    <div class="create-procedure-form">
        <p v-if="$store.state.auth.loggedInTo && step==0" class="requiresAuth-headsup">
            🙌 An account is required to do that. After logging in, you will be taken back to where you left off</p>
        <h2 class="create-form__title">Create account</h2>
        <transition-group :name="slide_drction" >
            <div class="form__fields-wrapper create-form-wrapper" :key="step">
                <p class="register-headsup" v-if="step==1">You will use this credential to log in. We recomend using a password manager (the
                    one that asks if you want to save your password in a following step)</p>
                <Form v-for="field in formTemplate" :key="field.id"
                    :fld="field"
                    v-model="formData[field.id]"
                    :invalidMsg="invalidFields[field.id]"
                />
                <Button :wait="Requesting" class="create-form__btn" fill :text="step==2?'Finish!':'Next'"
                    @clicked="validateThen(step==2?performRegister:goToNextStep)"/>
            </div>
        </transition-group>
        <p v-if="step==0" @click="$router.replace('login')" class="auth-form__redirct hoverline">Have an account? <strong>Login</strong></p>
    </div>
</template>

<script>
import Button from '@/components/misc/Button'
import { formValidate } from '@/mixins/form'
export default {
    components: { Button },
    mixins: [formValidate],
    data() {
        const initRndm = c => {
            while (c.length!=7) {
                c = '#'+(Math.random()*0xFFFFFF<<0).toString(16)
            } return c
        }
        return {
            formTemplateByStep: [
                [
                    { type: 'text', label: "Email", id: 'email', rules: [
                        this.$options.commonRules.lengthNotEmptyRule,
                        this.$options.commonRules.emailRule
                    ]},
                ],
                [
                    { type: 'text', label: "Username", id: 'username', rules: [this.$options.commonRules.lengthNotEmptyRule] },
                    { type: 'password', label: "Password", id: 'password', rules: this.$options.commonRules.passwordRules },
                    { type: 'password', label: "Confirm password", id: 'cnfrmPassword', rules: [
                        {
                            check:(val) => { return val == this.formData.password },
                            onFailWarn: "Password does not match"
                        },
                    ]},
                ],
                [
                    { type: 'text', label: "Display name", id: 'alias', rules: [this.$options.commonRules.lengthNotEmptyRule] },
                    { type: 'color', label: "Favorite color: ", id: 'color', rules: this.$options.commonRules.themeColorRules },
                ],
            ],
            formData: {
                email: "",

                username: "",
                password: "",
                cnfrmPassword: "",

                alias: "",
                color: initRndm(''),
            },
            slide_drction: "slide_left",
        }
    },
    computed: {
        step() {
            return Number(this.$route.query.step) || 0
        },
        formTemplate() {
            return this.formTemplateByStep[this.step]
        }
    },
    watch: {
        step(newVal, oldVal) {
            if (newVal > oldVal) {
                this.slide_drction = 'slide_left'
            } else this.slide_drction = 'slide_right'
        }
    },
    methods: {
        goToNextStep() {
            // TODO refactor
            let params = null
            if (this.step == 0) {
                params = {email: this.formData.email}
                this.formData.username = this.formData.email.match(/^([^@]*)@/)[1]
            } else if (this.step == 1) {
                params = {username: this.formData.username}
                this.formData.alias = this.formData.username
            }
            this.$axios.get("/accounts/existance-check", {
                params: params
            })
                .then(res => {
                    this.Requesting = false
                    if (res.data.presence) {
                        this.invalidFields = {
                            email: "Email has been used",
                            username: "Username has been taken. Please try another one"
                        }
                    } else {
                        this.$router.push({query: { step: this.step+1 }})
                    }
                })
        },
        performRegister() {
            const form = this.formData
            const data = {
                superuser: false,
                username: form.username,
                alias: form.alias,
                email: form.email,
                password: form.password,
                fave_color: form.color.replace("#", "")
            }
            this.$axios.post('accounts/register', data)
                .then(res => {
                    this.$store.dispatch("auth/login", {
                        username: form.username,
                        password: form.password
                    })
                })
        }
    }
};
</script>

<style>
.register-headsup {
    font-size: 13px;
    color: #888;
    margin-bottom: 20px;
}
.requiresAuth-headsup {
    font-size: 14px;
    color: rgb(73, 73, 73);
    margin-bottom: 25px;
}
</style>