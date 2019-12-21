<template>
    <div class="create-procedure-form">
        <h2 class="create-form__title">Create account</h2>
        <transition-group :name="slide_drction" >
            <div class="form__fields-wrapper create-form-wrapper" :key="step">
                <p class="register-headsup" v-if="step==1">You will use this credential to log in. We recomend using a password manager (the
                    one that asks if you want to save your password in a following step)</p>
                <Form v-for="field in editingFields[step]" :key="field.vmodel"
                    :fld="field"
                    v-model="formData[field.vmodel]"
                    :notValidated="notValidated(field.vmodel)"
                />
                <Button :wait="Requesting" class="create-form__btn" fill :text="step==2?'Finish!':'Next'"
                    @clicked="resetErr();validateAnd(step==2?performRegister:goToNextStep)"/>
            </div>
        </transition-group>
        <p v-if="step==0" @click="$router.replace('login')" class="auth-form__redirct glow">Have an account? <strong>Login</strong></p>
    </div>
</template>

<script>
import Button from '@/components/misc/Button'
import { formValidate } from '@/mixins/formValidate'
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
            formData: {
                email: "",

                username: "",
                password: "",
                cnfrmPassword: "",

                alias: "",
                color: initRndm(''),
            },
            slide_drction: "slide_left",
            error: {
                email: [null],
                username: [null]
            }
        }
    },
    computed: {
        validated() {
            const reIsNumber = /^-{0,1}\d+$/
            const reEmail = /^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            const form = this.formData
            if (this.step == 0) {
                return {
                    email: reEmail.test(form.email.toLowerCase()) && !this.error.email[0]
                }
            }
            if (this.step == 1) {
                return {
                    username: /^[\x00-\x7F]*$/.test(form.username) && form.username.length > 5  && !this.error.username[0],
                    password: /^[\x00-\x7F]*$/.test(form.password) && form.password.length >= 6 && form.password.length <= 30,
                    cnfrmPassword: form.cnfrmPassword == form.password
                }
            }
            if (this.step == 2) {
                return {
                    alias: form.alias.length > 2,
                    color: form.color != '#ffffff'
                }
            }
        },
        step() {
            return Number(this.$route.query.step) || 0
        },
        editingFields() {
            return [
                [
                    {type: 'text', label: "Email", vmodel: 'email',
                        validateInfo: this.error.email[0] || "A valid email please" },
                ],
                [
                    {type: 'text', label: "Username", vmodel: 'username',
                        validateInfo: this.error.username[0] || "An username should contains 6 to 30 ASCII characters and without spaces"},
                    {type: 'password', label: "Password", vmodel: 'password', validateInfo: `
                        Password must be 6 to 30 ASCII characters
                    `},
                    {type: 'password', label: "Confirm password", vmodel: 'cnfrmPassword', validateInfo: "Password does not match"},
                ],
                [
                    {type: 'text', label: "Display name", vmodel: 'alias', validateInfo: "Try another name please"},
                    {type: 'color', label: "Favorite color: ", vmodel: 'color', validateInfo: "Try a color that doesn't too much resemble white"},
                ]
            ]
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
        resetErr() { this.error = {email:[null],username:[null]} },
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
                        this.submitedOnce = true
                        this.error.email = ["Email has been used"]
                        this.error.username = ["Username has been taken. Please try another one"]
                    } else {
                        this.submitedOnce = false
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
                fave_color: form.color.replace("#","")
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
</style>