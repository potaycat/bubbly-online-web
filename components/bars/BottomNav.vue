<template>
    <div>
        <nav class="_bottomnav lift">
            <i v-bind:style="glow(1)"
                @click="switcharoo(1)"
                class="material-icons-round">home</i>
            <i v-bind:style="glow(5)"
                @click="switcharoo(5)"
                class="material-icons-round">search</i>
            <i v-bind:style="glow(2)"
                @click="switcharoo(2)"
                class="material-icons-round">group_work</i>
            <i v-bind:style="glow(3)"
                @click="switcharoo(3)"
                class="material-icons-round">chat_bubble</i>
            <i v-bind:style="glow(4)"
                @click="switcharoo(4)"
                class="material-icons-round">notifications</i>
        </nav>
        <div style="min-height:60px"/>
    </div>
</template>

<script>
export default {
    methods: {
        glow(numnum) {
            if (numnum == this.$store.state.activeTab)
                return "color:rgb(72, 133, 237)"
            return "color:#d3d3d3"
        },
        switcharoo(numnum) {
            // this.$store.commit('changeTab', numnum)
            switch (numnum) {
                case 1:
                    this.$router.push('/homefeed')
                    break
                case 2:
                    this.$router.push('/community')
                    break
                case 3:
                    this.$router.push('/chat')
                    break
                case 4:
                    this.$router.push('/notifications')
                    break
                case 5:
                    this.$router.push('/explore')
                    break
            }
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