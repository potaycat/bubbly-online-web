// 
// <Dropdown v-if="moring" @pick="onDropDownPick" :touchPos="touchPos"
// :options="[
//     isSelf ? {value:'edit', name:'Edit'} : 
//         {value:'flag', name:'Flag'},
//     isSelf ? {value:'delete', name:'Delete post'} : null,
//     isMod(post.allocated_to.id) ? {value:'mod_delete', name:'[Mod] Remove post'} : null,
// ].filter(x=>x)"
// />
//

import Dropdown from '@/components/actions/Dropdown'
export const _comp_dropdown = {
    components: {Dropdown},
    data() {
        return {
            touchPos: null, // {x: 0, y: 0}
        }
    },
    methods: {
        onDropDownPick(emmtdVal) {
            if (this.diagHndlFun && emmtdVal) this.diagHndlFun(emmtdVal)
            this.openDiag = null
            this.diagHndlFun = null
        },
        performDrop(evt) {
            this.touchPos = {x: evt.clientX, y: evt.clientY}
        }
    }
}