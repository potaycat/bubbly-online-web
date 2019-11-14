<template>
    <nav :class="['banner', $store.state.scrollinUp ? null: 'top-lev-contract']">
        <div id="top-nav-bar">
            <!-- <button class="push" @click="$router.push(`/user/${$store.state.auth.my_profile.username}`)"> -->
            <img class="top-nav__btn push pfp" :src="pfp"  @click="$router.push(`/user/${$store.state.auth.my_profile.username}`)"/>
            <!-- </button> -->
            <p>{{ destiName }}</p>
            <button class="top-nav__btn push" @click="$router.push('/settings')">
                <i class="material-icons-round">settings</i>
            </button>
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
.banner {
    background: #fff;
    transition: .5s;
    /* margin-top: -56px; */
}

#top-nav-bar {
    display: flex;
    height: 56px;
}
#top-nav-bar .pfp {
    height: 33px;
    min-width: 33px;
    max-width: 33px;
}
#top-nav-bar > p {
    margin: auto;
    margin-left: 1px;
    font-weight: bold;
    font-size: 18px;
}
#top-nav-bar .top-nav__btn {
    margin: auto 15px;
    color: rgb(72, 133, 237);
}
</style>
