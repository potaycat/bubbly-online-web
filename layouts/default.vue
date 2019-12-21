<template>
    <div class="whole-layout">
        <style>
            :root {
                --primary-color: #{{userDef}};
                --primary-color-reduced-opacity: #{{userDef}}69;
                --primary-color-low-opacity: #{{userDef}}22;
                --secondary-color: #{{accentColor}};
            }
        </style>
        <TopLvlNavigator />
        <transition :name="transitionName">
            <Nuxt class="layout__content" keep-alive />
        </transition>
        <SideBar v-if="wideEnough" />
    </div>
</template>

<script>
import TopLvlNavigator from "@/components/layout/bars/TopLvlNavigator"
import SideBar from "@/components/layout/sideBar/"
export default {
    components: {TopLvlNavigator, SideBar},
    data:() => ({
        transitionName: null,
        wideEnough: window.innerWidth > 1000,

        history: [],
        currentHistory: ''
    }),
    computed: {
        userDef() {
            return this.$store.state.auth.my_profile.fave_color || 'ee55a4'
        },
        accentColor() {
            return this.userDef
        }
    },
    watch: {
        '$route': {
            immediate: true,
            handler(to, from) {
                // needs more work
                const key = window.history.state.key,
                    index = this.history.indexOf(key)
                if (index == -1) {
                    this.history.push(key)
                    this.transitionName = 'page_zoom' // foward
                } else {
                    if (this.history[index-1] == this.currentHistory) {
                        this.transitionName = 'page_zoom' // foward
                    } else {
                        this.transitionName = 'page_zoom_out' // back
                    }
                }
                this.currentHistory = key

                if (to.name == 'chat' && from && ['communities-id', 'communities-id-manage'].includes(from.name)) {
                    this.transitionName = 'fade'
                    this.$store.commit('chatx/loadChat', null)
                }
            }
        }
    },
    created() {
        if (Object.entries(this.$store.state.auth.my_profile).length == 0) {
            this.$router.push('/')
        } else {
            if (Object.entries(this.$store.state.reactionx.localEmotes).length == 0) {
                this.$store.dispatch("reactionx/getMyEmotes")
            }
            if (!this.$store.state.communityx.joined) {
                this.$store.dispatch("communityx/getJoinedCmnties")
            }
            this.myOneSignalInit()
        }
    },
}
</script>

<style>
@media only screen and (min-width: 500px) {
    .layout__content {
        margin-left: 15%;
        width: 550px;
        right: 0;
    }
    .layout__content > div {
        position: relative;
    }
    
    ::-webkit-scrollbar {
        width: 8px;
        background-color: #f5f5f5;
        transition: .2s;
        border-radius: 10px;
    }
    ::-webkit-scrollbar-thumb {
        border-radius: 10px;
        background-color: #ddd;
    }::-webkit-scrollbar-thumb:hover {
        background-color: #ccc;
    }::-webkit-scrollbar-thumb:active {
        background-color: #bbb;
    }
}
/* TODO refactor */
@media only screen and (min-width: 1200px) {
    .whole-layout {
        display: flex;
        justify-content: center;
    }
    .layout__content {
        margin: unset;
    }
}

.--has-text-primary {
    color: var(--primary-color);
}
.--has-bg-primary {
    background: var(--primary-color);
}


.page_zoom-enter-active {
    transition: transform .3s, opacity .6s ease;
}
.page_zoom-enter {
    opacity: 0;
    transform: scale(.97);
}

.page_zoom_out-enter-active {
    transition: transform .4s, opacity .6s ease;
}
.page_zoom_out-enter {
    opacity: 0;
    transform: scale(1.0);
}
</style>