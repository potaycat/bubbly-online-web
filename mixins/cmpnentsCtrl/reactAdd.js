// <FloatingEmotes v-if="reacting"   
//     :community="allocated_to"
//     :position="reacting"
//     @closeAdd="reacting=null"
// />

import React from '@/components/post/react/'
import FloatingEmotes from '@/components/post/react/FloatingEmotes'

export const reactAdd = {
    components: {React, FloatingEmotes},
    data:() => ({
        reacting: null,
    }),
    computed: {
        reactionsLsSorted() {
            return this.post.reactions.slice().sort((a,b) => (a.count>b.count) ? -1 : ((b.count>a.count) ? 1 : 0))
            // for ascending order, swap 1 with -1
        },
    },
    mounted() {
        try {
            document.querySelector(".common_ls_cntainr").addEventListener('scroll',()=>{
                this.closeEmoteSelector()
            })
        } catch (error) {
            console.error("CAUGHT: "+error)
        }
    },
    methods: {
        closeEmoteSelector() {
            this.reacting = null
        },
        launchAddBox(posEvt) {
            this.reacting = {
                x: posEvt.clientX-25,
                y: window.innerHeight-posEvt.clientY+20
            }
        },
        performReact(iconId) {
            const fallBack = this.post.my_react
            this.post.my_react = iconId
            this.$axios.post(`reacts/${this.post.id}`, iconId!=1? {icon: iconId} :null,
                this.$store.state.auth.head)
                .then(res => {
                    this.$set(this.post, 'reactions', res.data.reactions)
                })
                .catch((error) => {
                    this.post.my_react = fallBack
                    this.$store.dispatch("reactionx/getCmtyEmotes", this.post.allocated_to.id)
                    // console.error("CAUGHT: "+error)
                    this.$store.dispatch("auth/logInToDoThat")
                })
            this.closeEmoteSelector()
        },
        deleteReaction() {
            const mine = this.post.my_react
            this.post.my_react = null
            
            this.$axios.delete(`reacts/${this.post.id}`,
                this.$store.state.auth.head
            )
                .then(res => {
                    const reactLs = this.post.reactions
                    if (reactLs) {
                        const reIndex = reactLs.findIndex(react => react.icon_id == mine)
                        reactLs[reIndex].count -= 1
                        if (reactLs[reIndex].count==0) reactLs.splice(reIndex, 1)
                    } else {
                        this.post.total_reacts -= 1
                    }
                })
            this.closeEmoteSelector()
        }
    }
}