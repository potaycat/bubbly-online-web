<template>
    <div>
        <nav class="_bottomnav lift">
            <i :style="glow(1)"
                @click="switcharoo('/homefeed')"
                class="material-icons-round">home</i>
            <i :style="glow(5)"
                @click="switcharoo('/explore')"
                class="material-icons-round">search</i>
            <i :style="glow(2)"
                @click="switcharoo('/community')"
                class="material-icons-round">group_work</i>
            <i :style="glow(3)"
                @click="switcharoo('/chat')"
                class="material-icons-round">chat_bubble</i>
            <i :style="glow(4)"
                @click="switcharoo('/notifications')"
                class="material-icons-round">notifications</i>
        </nav>
        <div style="min-height:60px"/>
    </div>
</template>

<script>
export default {
    methods: {
        glow(numnum) {
            if (numnum == this.$store.state.top_level_destination)
                return "color:rgb(72, 133, 237)"
            return "color:#d3d3d3"
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
}._bottomnav :active {
    border-radius: 30px;
}

._bottomnav i {
    margin: auto;
    padding: 12px;
    font-size: 27px;
}
</style>