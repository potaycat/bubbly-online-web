<template>
    <nav :class="['app-bar', $store.state.scrollinUp ? null: 'top-lev-contract']">
        <div id="top-nav-bar">
            <!-- <button class="push" @click="$router.push(`/user/${$store.state.auth.my_profile.username}`)"> -->
            <img class="top-nav__btn push pfp" :src="pfp"  @click="$router.push(`/user/${$store.state.auth.my_profile.username}`)"/>
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
        destiName() {
            switch (this.$store.state.topLevelDestination) {
                case 1:
                    return "Post Feed"
                case 2:
                    return "Communities"
                case 3:
                    return "Messaging"
                case 4:
                    return "Notification"
                case 5:
                    return "Explore"
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
    color: rgb(72, 133, 237);
}
</style>
