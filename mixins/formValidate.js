import Form from '@/components/misc/form/'
export const formValidate = {
    components: {Form},
    data:() => ({
        submitedOnce: false,
        error: null, // server return

        formData: {},
        hasUnsaved: false,
        Requesting: false,
    }),
    computed: {
        validated() {
            return {}
        },
        formValidated() {
            const obj = this.validated
            return Object.keys(obj).every(k => obj[k])
        }
    },
    watch: {
        formData: {
            deep: true,
            handler() {
                this.hasUnsaved = true
            }
        }
    },
    methods: {
        notValidated(field) {
            return !this.validated[field] && this.submitedOnce
        },
        validateAnd(performAction, payload) {
            this.Requesting = true
            // TODO payload not working
            if (this.formValidated) {
                // performAction.apply(this, arguments)
                performAction(payload)
            } else {
                this.submitedOnce = true
                this.Requesting = false
            }
        },
        serverErrRes(data) {
            this.error = data
        }
    }
}
