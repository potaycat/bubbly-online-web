//
// <ReactAdd v-if="reacting"   
//     :community="allocated_to"
//     :position="reacting"
//     @closeAdd="reacting=null"
// />
//

import React from '@/components/post/react/'
import ReactAdd from '@/components/post/react/ReactAdd'
export const _comp_reactAdd = {
    components: {React, ReactAdd},
    data() {
        return {
            reacting: null,
            reactionLs: null
        }
    },
    computed: {
        reactionsLsSorted() {
            return this.reactionLs.sort((a,b) => (a.count>b.count) ? -1 : ((b.count>a.count) ? 1 : 0))
            // for ascending order, swap 1 with -1
        },
    },
    created() {
        this.reactionLs = this.post.reactions
    },
    mounted() {
        document.querySelector(".la_content").addEventListener('scroll',()=>{
             this.reacting = null
        })
    },
    methods: {
        launchAddBox(posEvt) {
            this.reacting = {
                x: posEvt.clientX-10,
                y: window.innerHeight-posEvt.clientY+30
            }
        },
        performReact(iconId) {
            if (iconId) {
                this.post.my_react = iconId
                this.$axios.post(`reacts/${this.post.id}`, {icon: iconId},
                    this.$store.state.authHeader
                )
                    .then(res => {
                        this.reactionLs = res.data.reactions
                    })
                    .catch((error) => {
                        this.post.my_react = null
                        console.log(error)
                        this.$forceUpdate()
                    })
            }
            this.reacting = null
        },
        deleteReaction() {
            const mine = this.post.my_react
            this.post.my_react = null
            
            this.$axios.delete(`reacts/${this.post.id}`,
                this.$store.state.authHeader
            )
                .then(res => {
                    const reactLs = this.reactionLs
                    if (reactLs) {
                        const reIndex = reactLs.findIndex(react => react.icon_id == mine)
                        reactLs[reIndex].count -= 1
                        if (reactLs[reIndex].count==0) reactLs.splice(reIndex, 1)
                    } else {
                        this.post.total_reacts -= 1
                    }
                })
            this.reacting = null
        }
    }
}