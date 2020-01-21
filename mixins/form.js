import Form from '@/components/misc/form/'
export const formValidate = {
    components: { Form },
    // options {
    commonRules: {
        lengthNotEmptyRule: {
            check:(val) => { return val.length > 0 },
            onFailWarn: "Field can't be empty"
        },
        emailRule: {
            check:(val) => {
                const reEmail = /^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                return reEmail.test(val.toLowerCase())
            },
            onFailWarn: "A valid email please"
        },
        aliasRules: [
            {
                check:(val) => { return val.length >= 2 && val.length <= 40 },
                onFailWarn: "Name should be between 2 and 40 characters"
            },
        ],
        passwordRules: [
            {
                check:(val) => { return val.length >= 8 && val.length <= 24 },
                onFailWarn: "Password length must in between 8 and 24 characters"
            },
            {
                check:(val) => { return /^[\x00-\x7F]*$/.test(val) },
                onFailWarn: "Password shouldn't contain accented letters"
            },
            // {
            //     check:(val) => { return /\d/.test(val) },
            //     onFailWarn: "Password should contain numbers"
            // },
            // {
            //     check:(val) => { return /^[A-Za-z]+$/.test(val) },
            //     onFailWarn: "Password must contain letters"
            // },
        ],
        confirmPwRules: [
            {
                check:(val) => { return val == this.formData.password },
                onFailWarn: "Password does not match"
            },
        ],
        themeColorRules: [
            {
                check:(val) => {
                    // https://stackoverflow.com/questions/12043187/how-to-check-if-hex-color-is-too-black
                    const c = val.substr(1),
                        rgb = parseInt(c, 16),
                        r = (rgb >> 16) & 0xff,
                        g = (rgb >> 8) & 0xff,
                        b = (rgb >> 0) & 0xff,
                        luma = 0.2126*r + 0.7152*g + 0.0722*b // Rec. 709
                    return luma < 240
                },
                onFailWarn: "Try a different color that isn't too bright"
            },
        ],
        cmtyNameRules: [
            {
                check:(val) => { return val.length >= 2 && val.length <= 40 },
                onFailWarn: "Name should be between 2 and 40 characters"
            },
        ],
        inviteCodeRules: [
            {
                check:(val) => { return val.length <= 16 },
                onFailWarn: "No more than 16 characters"
            },
            {
                check:(val) => { return /^[\x00-\x7F]*$/.test(val) },
                onFailWarn: "No accented letters"
            },
        ],
    },
    // },
    data:() => ({
        formData: {},
        hasUnsaved: false,
        invalidFields: {},
        Requesting: false
    }),
    watch: {
        formData: {
            deep: true,
            handler() {
                this.hasUnsaved = true
            }
        }
    },
    methods: {
        validateThen(performAction) {
            this.Requesting = true
            this.invalidFields = {}
            ;(this.$options.formTemplate || this.formTemplate).forEach(field => {
                (field.rules || []).forEach(rule => {
                    if (!rule.check(this.formData[field.id])) {
                        this.$set(this.invalidFields, field.id, rule.onFailWarn)
                    }
                })
            })
            if (Object.entries(this.invalidFields).length === 0) {
                performAction.apply(this, arguments)
            } else {
                this.Requesting = false
            }
        },

        fromSubmissionResolved(data) {
            this.Requesting = false
        },
        fromSubmissionRejected(data) {
            this.Requesting = false
            for (const field in data) {
                this.$set(this.invalidFields, field, data[field][0])
            }
        }
    }
}
