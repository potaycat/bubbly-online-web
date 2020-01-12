// <InputDialog v-if="openDiag"
//     :toDisplay="openDiag"
// />

import InputDialog from '@/components/misc/InputDialog'
export const inputDiag = {
    components: {InputDialog},
    data:() => ({
        openDiag: null
    }),
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
            const diagHndlFun = this.openDiag.hndlFun || this.diagHndlFun
            if (diagHndlFun && emmtdVal) diagHndlFun(emmtdVal)
            this.openDiag = null
        },
    }
}