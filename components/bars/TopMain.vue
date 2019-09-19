<template>
    <nav :class="['banner', $store.state.scrollinUp ? null: 'top-lev-contract']">
        <div id="top-nav-bar">
            <n-link to="">
                <img class="pfp" :src="pfp" />
            </n-link>
            <p>{{ destiName }}</p>
            <n-link to="/settings"><button
                class="btn"
                @click="bacc()">
                <i class="material-icons-round">settings</i>
            </button></n-link>
        </div>
    </nav>
</template>

<script>
export default {
    computed: {
        destiName() {
            switch (this.$store.state.top_level_destination) {
                case 1:
                    return "Post Feed"
                case 2:
                    return "My Communities"
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
            let pfp = this.$store.state.jwtlogin.my_profile
            if (pfp) return pfp.profile_pic
            return null
        }
    },
    created() {
        this.$store.dispatch('jwtlogin/loadProfile')
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
    width: 33px;
    height: 33px;
    margin: 13px 15px;
}
#top-nav-bar p {
    margin: auto;
    margin-left: 5px;
    font-weight: bold;
    font-size: 18px;
}
#top-nav-bar .btn {
    margin: 15px 11px;
}
</style>
