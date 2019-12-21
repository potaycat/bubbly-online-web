<template>
    <div class="create-procedure-form">
        <h2 class="create-form__title">Create your community</h2>
        <transition-group :name="slide_drction" >
            <div class="form__fields-wrapper create-form-wrapper" :key="step">
                <Form v-for="field in editingFields[step]" :key="field.vmodel"
                    :fld="field"
                    v-model="formData[field.vmodel]"
                    :notValidated="notValidated(field.vmodel)"
                />
                <Button :wait="Requesting" class="create-form__btn" :colorScnd="formData.color" fill
                    :text="step==1?'Create!':'Next'" @clicked="validateAnd(step==1?performCreate:goToNextStep)"/>
                <p>{{error}}</p>
            </div>
        </transition-group>
    </div>
</template>

<script>
import Button from '@/components/misc/Button'
import { formValidate } from '@/mixins/formValidate'
import { disableHamburger } from '@/mixins/appBarStuff'
export default {
    components: { Button },
    mixins: [formValidate, disableHamburger],
    data() {
        const initRndm = c => {
            while (c.length!=7) {
                c = '#'+(Math.random()*0xFFFFFF<<0).toString(16)
            } return c
        }
        return {
            formData: {
                name: "",
                moto: "",
                color: initRndm(''),
                
                custom_id: "",
                isVisible2Public: true,
                inviteCode: "",
            },
            slide_drction: "slide_left",
        }
    },
    computed: {
        validated() {
            switch (this.step) {
                case 0:
                    return {
                        name: this.formData.name.length > 2 && this.formData.name.length < 100,
                        moto: this.formData.moto.length < 255,
                        color: this.formData.color != '#ffffff'
                    }
                case 1:
                    return {
                        custom_id: /^[\x00-\x7F]*$/.test(this.formData.custom_id),
                        inviteCode: this.formData.inviteCode.length <= 8
                    }
                default:
                    return {}
            }
        },
        step() {
            return Number(this.$route.query.step) || 0
        },
        editingFields() {
            return [
                [
                    {type: 'text', label: "Name", vmodel: 'name', validateInfo: "Try another name please"},
                    {type: 'text', label: "Tag line (optional)", vmodel: 'moto', validateInfo: `
                        Please be concise. There are tools to tell the story of your community later on ;)
                    `},
                    {type: 'color', label: "Theme color: ", vmodel: 'color', validateInfo: "Try a color that doesn't too much resemble white"},
                ],
                [
                    {type: 'text', label: "Custom ID (optional)", vmodel: 'custom_id', validateInfo: "Lowercase, numbers and underscores only"},
                    {type: 'toggler', label: "Visible to public", vmodel: 'isVisible2Public'},
                    {type: 'text', label: "Require invitation code (optional)", vmodel: 'inviteCode', validateInfo: `
                        Code should be less than or equal to 8 characters
                    `},
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
        goToNextStep() {
            this.Requesting = false
            this.submitedOnce = false
            this.$router.push({query: { step: this.step+1 }}) 
        },
        performCreate() {
            let data = {
                id: this.formData.custom_id,
                name: this.formData.name,
                moto: this.formData.moto,
                theme_color: this.formData.color.replace("#",""),
                cover_img: "",
                background_img: "",
                is_secret: !this.formData.isVisible2Public,
                invite_code: this.formData.inviteCode,
            }
            Object.keys(data).forEach(key => !data[key] && delete data[key])

            this.$axios.post('communities/create', data,
                this.$store.state.authHeader
            ).then(res => {
                this.Requesting = false
                this.$router.replace(`/communities/${res.data.id}`)
            }).catch(error => {
                this.serverErrRes(error.response.data)
            })
        }
    }
};
</script>
