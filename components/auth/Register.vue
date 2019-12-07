<template>
    <div class="auth-form">
        <h2 class="auth-form__title">Create account</h2>
        <transition-group name="slide_left" >
            <form v-if="step == 0" :key="step">
                <div class="form__group">
                    <input id="email_fld" v-model="email" class="form__field" placeholder="_">
                    <label for="email_fld" class="form__label">Email</label>
                    <p :style="notValidated('email')?null:'opacity:0'" class="form__invalid">
                        A valid email please
                    </p>
                </div>
                <Button class="form-btn" text="Next" @clicked="validateAnd(goToNextStep)" fill/>
            </form>

            <form v-else-if="step == 1" :key="step">
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
                    <p class="form__invalid">Error!</p>
                </div>
                <div class="form__group">
                    <input id="cnfrm_pw_fld" v-model="cnfrmPassword" class="form__field" placeholder="_">
                    <label for="cnfrm_pw_fld" class="form__label">Re-type Password</label>
                    <p class="form__invalid">Error!</p>
                </div>
                <Button class="form-btn" text="Next" @clicked="validateAnd(goToNextStep)" fill/>
            </form>

            <form v-else-if="step == 2" :key="step">
                <div class="form__group">
                    <input id="alias_fld" v-model="alias" class="form__field" placeholder="_">
                    <label for="alias_fld" class="form__label">Display name</label>
                    <p :style="notValidated('alias')?null:'opacity:0'" class="form__invalid">
                        At least 6 character please
                    </p>
                </div>
                <Button class="form-btn" text="Finish!" @clicked="validateAnd(performRegister)" fill/>
            </form>
        </transition-group>
        <p v-if="step==0" @click="$router.replace('login')" class="auth-form__toggle glow">Have an account? <strong>Login</strong></p>
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
        email: "",
        username: "",
        password: "",
        cnfrmPassword: "",
        alias: ""
    }),
    computed: {
        validated() {
            const reIsNumber = /^-{0,1}\d+$/
            const reEmail = /^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            if (this.step == 0) {
                return {
                    email: reEmail.test(this.email.toLowerCase())
                }
            }
            if (this.step == 1) {
                return {
                    username: this.username.length > 5,
                    password: this.password.length > 3,
                    cnfrmPassword: this.cnfrmPassword == this.password
                }
            }
            if (this.step == 2) {
                return {
                    alias: this.alias,
                }
            }
        },
        step() {
            return Number(this.$route.query.step) || 0
        }
    },
    methods: {
        goToNextStep() {
            if (this.step == 0) {
                this.username = this.email.match(/^([^@]*)@/)[1]
            } else if (this.step == 1) {
                this.alias = this.username
            }
            this.submitedOnce = false
            this.$router.push({query: { step: this.step+1 }}) 
        },
        performRegister() {
            const data = {
                superuser: false,
                username: this.username,
                alias: this.alias,
                email: this.email,
                password: this.password
            }
            this.$axios.post('accounts/register', data)
                .then(res => {
                    console.log(res.data);
                    
                    // this.$store.dispatch("auth/login", {
                    //     username: this.username,
                    //     password: this.password
                    // })
                })
        }
    }
};
</script>

<style>
.register > span, .register > span > form {
    width: 100%;
}
</style>