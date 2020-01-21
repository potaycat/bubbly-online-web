<template>
    <nav :class="['bottom-nav-bar', onTop||!$store.getters['auth/loggedIn']?null:'--not-top']">
        <div class="bottom-nav__btn logo" >
            <img @click="$router.push('/home')" class="push"
                :src="require(smolScreen?'static/icon.png':'assets/logo_full.png')">
        </div>
        <div v-for="icon in topLevelDestinLs" :key="icon.toRoute"
            @click="$router.push(icon.toRoute)"
            :class="['lift bottom-nav__btn',
                icon.toRoute==$route.path ? '--nav__btn--active' : null]"
        >
            <i class="material-icons-round">{{icon.icon}}</i>
            <p>{{ icon.lable }}</p>
            <div v-if="showDot[icon.dot]" class="nav__btn__dot"></div>
        </div>
        <div @click="$router.push(`/user/${$store.state.auth.my_profile.username}`)"
            :class="['lift bottom-nav__btn nav__btn__profile',
                $route.path==`/user/${$store.state.auth.my_profile.username}` ?'--nav__btn--active': null]"
        >
            <img class="pfp" :src="$store.state.auth.my_profile.profile_pic">
            <p>Profile</p>
        </div>
    </nav>
</template>

<script>
export default {
    data: () => ({
        topLevelDestinLs: [
            {
                icon: "home",
                toRoute: "/home",
                lable: "Home"
            },
            {
                icon: "search",
                toRoute: "/explore",
                lable: "Explore"
            },
            {
                icon: "group_work",
                toRoute: "/communities",
                lable: "Communities"
            },
            {
                icon: "chat_bubble",
                toRoute: "/chat",
                lable: "Chat",
                dot: 'chat'
            },
            {
                icon: "notifications",
                toRoute: "/notifications",
                lable: "Notifications",
                dot: 'notification'
            },
        ]
    }),
    computed: {
        smolScreen() {
            return window.innerWidth < 1200
        },
        onTop() {
            return ['home', 'explore', 'communities', 'chat', 'notifications'].includes(this.$route.name)
        },
        showDot() {
            const state = this.$store.state
            return {
                chat: state.hasUnreadMsg,
                notification: new Date(state.lastRead) < new Date(state.lastest)
            }
        }
    }
}
</script>

<style>
.bottom-nav-bar {
    background-color: #fff;
    position: fixed;
    bottom: 0;
    z-index: 99;
    width: 100%;
    box-shadow: 0 0 20px rgba(0,0,0,0.15);
    height: 52px;
    display: flex;
    align-items: center;
    justify-content: space-around;
    color: #aaa;
}
.bottom-nav__btn {
    padding: 12px;
    border-radius: 100px;
    display: flex;
    align-items: center;
    position: relative;
}
.bottom-nav__btn > i {
    font-size: 27px;
}
.bottom-nav__btn > p, .--not-top, .logo, .nav__btn__profile {
    display: none;
}
.--nav__btn--active {
    color: var(--primary-color);
}
.--nav__btn--active .pfp {
    border: solid 2px var(--primary-color);
}
.nav__btn__dot {
    position: absolute;
    top: 5px;
    left: 39px;
    height: 9px;
    width: 9px;
    border-radius: 50%;
    background: var(--primary-color);
    opacity: 0.95;
}

@media only screen and (min-width: 500px) {
    .--not-top, .logo, .nav__btn__profile {
        display: flex;
    }
    .logo {
        padding: 14px 0 5px 15px;
        background: none !important;
    } .logo > img {
        height: 30px;
    }
    .nav__btn__profile > .pfp {
        width: 31px;
        height: 31px;
    }


    .bottom-nav-bar {
        padding-right: 20px;
        width: 15%;
        top: 0;
        left: 0;
        height: 100vh;
        box-shadow: none;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
        font-size: 22px;
        background: none;
        overflow-y: auto;
    }
    .bottom-nav__btn > i {
        font-size: 30px;
    }
    .bottom-nav__btn {
        width: 55px;
        text-align: center;
        margin: 5px 0;

        background: linear-gradient(120deg, #777, #777 49%, white 51%);
        background-size: 230%;
        background-position: right bottom;
    }
    @media (hover: hover) {
        .bottom-nav__btn:hover {
            background-position: left bottom;
            background: #777;
            transition: .15s;
        }
    }
}
@media only screen and (min-width: 1200px) {
    .bottom-nav-bar {
        width: unset;
        align-items: flex-start;
        position: relative;
        overflow-y: auto;
    }
    .bottom-nav__btn {
        width: 200px;
    }
    .bottom-nav__btn > p {
        display: inline;
        margin-left: 15px;
        font-weight: bolder;
        font-size: 19px;
    }
}
</style>