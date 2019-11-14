// <InputDialog v-if="openDiag"
//     :toDisplay = "openDiag"
//     @clicked="onDiagClose"
// />

import InputDialog from '@/components/actions/InputDialog'
export const inputDiag = {
    components: {InputDialog},
    data() {
        return {
            openDiag: null,
            diagHndlFun: null,
        }
    },
    methods: {
        // confirmMethod() {
        //     this.openDiag = {
        //         title: "Hmm?",
        //     }
        //     this.diagHndlFun = this.performMethod
        // },
        // performMethod() {
        //     console.log("OK")
        // },
        onDiagClose(emmtdVal) {
            if (this.diagHndlFun && emmtdVal) this.diagHndlFun(emmtdVal)
            this.openDiag = null
            this.diagHndlFun = null
        },
    }
}