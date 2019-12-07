<template>
    <div class="auth-form">
        <h2 class="auth-form__title">Create your community</h2>
        <transition-group name="slide_left" >
            <form v-if="step == 0" :key="step">
                <div class="form__group">
                    <input id="name_fld" v-model="name" class="form__field" placeholder="_">
                    <label for="name_fld" class="form__label">Name</label>
                    <p :style="notValidated('name')?null:'opacity:0'" class="form__invalid">
                        Lowercase, numbers and underscores only
                    </p>
                </div>
                <div class="form__group">
                    <input id="moto_fld" v-model="moto" class="form__field" placeholder="_">
                    <label for="moto_fld" class="form__label">Short description (optional)</label>
                    <p class="form__invalid">&nbsp;</p>
                </div>
                <Button class="form-btn" text="Next" @clicked="validateAnd(goToNextStep)" fill/>
            </form>

            <form v-else-if="step == 1" :key="step">
                <StepTwo />
                <p>{{color}}</p>
                <Button class="form-btn" text="Next" @clicked="validateAnd(goToNextStep)" fill/>
            </form>

            <form v-else-if="step == 2" :key="step">
                <div class="cmnty-create__vsblty-togglr">
                    <div class="material-toggle">
                        <input v-model="isVisible2Public" type="checkbox" id="toggle" class="switch" />
                        <label for="toggle" class=""></label>
                    </div>
                    <strong>{{isVisible2Public?"Visible to public":"Visible to community members only"}}</strong>
                </div>

                <div class="form__group">
                    <input id="code_fld" v-model="inviteCode" class="form__field" placeholder="_">
                    <label for="code_fld" class="form__label">Require invitation code (optional)</label>
                    <p class="form__invalid">&nbsp;</p>
                </div>
                <div class="form__group">
                    <input id="id_fld" v-model="id" class="form__field" placeholder="_">
                    <label for="id_fld" class="form__label">Custom ID (optional)</label>
                    <p class="form__invalid">&nbsp;</p>
                </div>
                <Button class="form-btn" text="Finish!" @clicked="validateAnd(performCreate)" fill/>
            </form>
        </transition-group>
    </div>
</template>

<script>
import Button from '@/components/misc/Button'
import { formValidate } from '@/mixins/formValidate'
import StepTwo from './StepTwo'
import { disableHamburger } from '@/mixins/appBarStuff'
export default {
    components: {
        Button,
        StepTwo,
    },
    mixins: [formValidate, disableHamburger],
    data: () => ({
        name: "",
        moto: "",

        pic: "",
        color: "",
        
        isVisible2Public: true,
        inviteCode: "",
        id: ""
    }),
    created() {
        let color = ""
        while (color.length!=7) {
            color = '#'+(Math.random()*0xFFFFFF<<0).toString(16)
        }
        this.color = color
    },
    computed: {
        validated() {
            const reIsNumber = /^-{0,1}\d+$/
            const reEmail = /^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            if (this.step == 0) {
                return {
                    name: this.name.length > 2
                }
            }
            if (this.step == 1) {
                return {
                }
            }
            if (this.step == 2) {
                return {
                }
            }
        },
        step() {
            return Number(this.$route.query.step) || 0
        }
    },
    methods: {
        goToNextStep() {
            this.submitedOnce = false
            this.$router.push({query: { step: this.step+1 }}) 
        },
        performCreate() {
            const data = {
                id: this.id,
                name: this.name,
                moto: this.moto,
                icon_img: this.pic,
                theme_color: this.color.replace("#",""),
                cover_img: "",
                background_img: "",
                is_secret: !this.isVisible2Public,
                invite_code: this.inviteCode,
            }
            Object.keys(data).forEach((key)=>(data[key]==false)&&delete data[key]) // falsy only

            this.$axios.post('communities/create', data,
                this.$store.state.authHeader
            ).then(res => {
                this.$router.push(`/community/${res.data.id}`)
            })
        }
    }
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
.register > span, .register > span > form {
    width: 100%;
}

.cmnty-create__vsblty-togglr {
    display: flex;
    margin: 25px 3px;
}
</style>