<template>
    <div>
        <nav class="_bottomnav">
            <i :style="glow(1)"
                @click="switcharoo('/homefeed')"
                class="push lift material-icons-round">home</i>
            <i :style="glow(5)"
                @click="switcharoo('/explore')"
                class="push lift material-icons-round">search</i>
            <i :style="glow(2)"
                @click="switcharoo('/community')"
                class="push lift material-icons-round">group_work</i>
            <i :style="glow(3)"
                @click="switcharoo('/chat')"
                class="push lift material-icons-round">chat_bubble</i>
            <i :style="glow(4)"
                @click="switcharoo('/notifications')"
                class="push lift material-icons-round">notifications</i>
        </nav>
        <div style="min-height:60px"/>
    </div>
</template>

<script>
export default {
    methods: {
        glow(numnum) {
            if (numnum == this.$store.state.topLevelDestination)
                return "color:rgb(72, 133, 237)"
            return "color:#ddd"
        },
        switcharoo(destin) {
            this.$router.push(destin)
        },
    },

}
</script>

<style>
._bottomnav {
    background-color: #fff;
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 52px;
    display: flex;
    box-shadow: 0 0 20px rgba(0,0,0,0.15);
}

._bottomnav i {
    margin: auto;
    padding: 12px;
    font-size: 27px;
    border-radius: 20px;
}
</style>