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
        <InputDiag />
    </div>
</template>

<script>
// I leave init codes here
import TopLvlNavigator from "@/components/layout/bars/TopLvlNavigator"
import SideBar from "@/components/layout/sideBar/"
import InputDiag from '@/components/misc/InputDiagGX'
export default {
    components: { TopLvlNavigator, SideBar, InputDiag },
    data:() => ({
        transitionName: null,

        history: [],
        currentHistory: ''
    }),
    computed: {
        wideEnough() {
            return window.innerWidth > 1000 // not reactive
        },
        userDef() {
            return this.$store.state.auth.my_profile.fave_color || 'ee981e'
        },
        accentColor() {
            return this.userDef
        }
    },
    watch: {
        '$route': {
            // basically another middleware
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

                if (to.name == 'chat' && from &&
                    ['communities-id', 'user-username', 'communities-id-manage'].includes(from.name)
                ) {
                    this.transitionName = 'fade'
                    this.$store.commit('chatx/LOAD_THREAD', null)
                }
            }
        }
    },
    created() {
        if (this.$store.getters['auth/loggedIn']) {
            if (!Object.entries(this.$store.state.reactionx.localEmotes).length) {
                this.$store.dispatch('reactionx/getMyEmotes')
            }
            this.$store.dispatch('communityx/getJoinedCmties')
            this.$store.dispatch('getBadgeCount')
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
    
    @media (hover: hover) {
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
}
/* TODO refactor */
@media only screen and (min-width: 1200px) {
    .whole-layout {
        display: flex;
        justify-content: center;
    }
    .layout__content {
        margin: unset;
        margin: 0 55px;
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