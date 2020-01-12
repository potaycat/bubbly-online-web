<template>
    <div class="create-procedure-form">
        <h2 class="create-form__title">Create your community</h2>
        <transition-group :name="slide_drction" >
            <div class="form__fields-wrapper create-form-wrapper" :key="step">
                <Form v-for="field in formTemplate" :key="field.id"
                    :fld="field"
                    v-model="formData[field.id]"
                    :invalidMsg="invalidFields[field.id]"
                />
                <Button :wait="Requesting" class="create-form__btn" :colorScnd="formData.color" fill
                    :text="step==1?'Create!':'Next'" @clicked="validateThen(step==1?performCreate:goToNextStep)"/>
            </div>
        </transition-group>
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
                    { type: 'text', label: "Name", id: 'name', rules: this.$options.commonRules.cmtyNameRules },
                    { type: 'text', label: "Tag line (optional)", id: 'moto', rules: [
                        {
                            check:(val) => { return val.length < 240 },
                            onFailWarn: "Please be concise. There are tools to tell the story of your community later on ;)"
                        },
                    ]},
                    { type: 'color', label: "Theme color:", id: 'color', rules: this.$options.commonRules.themeColorRules},
                ],
                [
                    { type: 'text', label: "Custom ID (optional)", id: 'id', rules: [
                        {
                            check:(val) => { return /^[\x00-\x7F]*$/.test(val) },
                            onFailWarn: "  "
                        },
                    ]},
                    { type: 'toggler', label: "Visible to public", id: 'isVisible2Public' },
                    { type: 'text', label: "Require invitation code (optional)", id: 'invite_code', rules:
                        this.$options.commonRules.inviteCodeRules },
                ],
            ],
            formData: {
                name: "",
                moto: "",
                color: initRndm(''),
                
                id: "",
                isVisible2Public: true,
                invite_code: "",
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
            this.Requesting = false
            this.submitedOnce = false
            this.$router.push({query: { step: this.step+1 }}) 
        },
        performCreate() {
            const frm = this.formData
            let data = {
                id: frm.id,
                name: frm.name,
                moto: frm.moto,
                theme_color: frm.color.replace("#",""),
                cover_img: "",
                background_img: "",
                is_secret: !frm.isVisible2Public,
                invite_code: frm.invite_code,
            }
            Object.keys(data).forEach(key => !data[key] && delete data[key])

            this.$axios.post('communities/create', data,
                this.$store.state.auth.head
            ).then(res => {
                this.Requesting = false
                this.$router.replace(`/communities/${res.data.id}`)
            }).catch(error => {
                this.fromSubmissionRejected(error.response.data)
            })
        }
    }
};
</script>
