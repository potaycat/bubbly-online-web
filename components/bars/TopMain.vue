<template>
    <nav class="banner"
        v-bind:style="[$store.state.scrollinUp ? null: {'margin-top':'-56px'}]">
        <div id="generic_banner">
            <n-link to="">
                <img class="pfp" :src="pfp" />
            </n-link>
            <p>{{ tabName }}</p>
            <n-link to="/settings"><button
                class="btn"
                @click="bacc()">
                <i class="material-icons-round">settings</i>
            </button></n-link>
        </div>

        <transition name="fade">
            <div v-if="tabList" class="sub_tab">
                <button v-for="(tab, index) in tabList"
                    :key="index"
                    @click="$store.commit('changeSubTab', index)"
                    v-bind:id="[activeSubTab==index ? 'focusing' :null]"
                >{{ tab }}</button>
            </div>
        </transition>

    </nav>
</template>

<script>

export default {
    computed: {
        tabList() {
            return this.$store.state.subTabs
        },
        activeSubTab() {
            return this.$store.state.activeSubTab
        },
        tabName() {
            switch (this.$store.state.activeTab) {
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
    methods: {
    },
    created() {
        this.$store.dispatch('jwtlogin/loadProfile')
        this.$store.commit('detailBanner/loadText', null)
    },
}
</script>

<style>
.banner {
    background: #fff;
    transition: .5s;
    /* margin-top: -56px; */
}

#generic_banner {
    display: flex;
    height: 56px;
}
#generic_banner .pfp {
    width: 33px;
    height: 33px;
    margin: 13px 15px;
}
#generic_banner p {
    margin: auto;
    margin-left: 5px;
    font-weight: bold;
    font-size: 18px;
}
#generic_banner .btn {
    margin: 15px 11px;
}
</style>
