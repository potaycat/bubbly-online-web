<template>
    <nav :class="['app-bar', $store.state.scrollinUp ? null: 'top-lev-contract']">
        <div id="top-nav-bar">
            <!-- <button class="push" @click="$router.push(`/user/${$store.state.auth.my_profile.username}`)"> -->
            <img v-if="smolScreen" class="top-nav__btn push pfp" :src="pfp"
                @click="$router.push(`/user/${$store.state.auth.my_profile.username}`)"/>
            <!-- </button> -->
            <p>{{ destiName }}</p>
            <i @click="$router.push('/settings')" class="top-nav__btn material-icons-round push"
                >settings</i>
        </div>
    </nav>
</template>

<script>
export default {
    computed: {
        smolScreen() {
            return window.innerWidth < 500
        },
        destiName() {
            switch (this.$route.name) {
                case 'home':
                    return "Post Feed"
                case 'communities':
                    return "Joined Communities"
                case 'chat':
                    return "Chat"
                case 'notifications':
                    return "Notifications"
                case 'explore':
                    return "🔍👉"
                default:
                    return ""
            }
        },

        pfp() {
            let pfp = this.$store.state.auth.my_profile
            if (pfp) return pfp.profile_pic
            return null
        }
    },
}
</script>

<style>
.app-bar {
    background: #fff;
    transition: .5s;
}
#top-nav-bar {
    height: 56px;
    display: flex;
    align-items: center;
    justify-content: space-between;
}
#top-nav-bar .pfp {
    height: 33px;
    width: 33px;
}
#top-nav-bar > p {
    margin-right: auto;
    font-weight: bold;
    font-size: 18px;
}
#top-nav-bar .top-nav__btn {
    margin: 0 15px;
    color: var(--primary-color);
}
</style>
