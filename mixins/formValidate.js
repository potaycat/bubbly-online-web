export const formValidate = {
    data:() => ({
        submitedOnce: false
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
    methods: {
        notValidated(field) {
            return !this.validated[field] && this.submitedOnce
        },
        validateAnd(performAction, payload) {
            // TODO fix payload not working
            if (this.formValidated) {
                // performAction.apply(this, arguments)
                performAction(payload)
            } else {
                this.submitedOnce = true
            }
        }
    }
}
