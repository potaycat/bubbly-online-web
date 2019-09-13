<template>
    <i v-if="!addReact" @click="toggle()" :id="size" class="_addo material-icons-round">insert_emoticon</i>
    <i v-else>
        <div id="_rea_add_bg" @click="toggle()"/>
            <transition name="fade" appear>
        <div @click="toggle()" class="_react_adding lift" :style="'top:'+why+'px'">
            <!-- <i class="material-icons-round" style="margin:auto">cancel</i> -->
            <img src="@/assets/thumb_up.png">
                <!-- <transition-group appear name="fade_in" class="glow"> -->
            <img v-for="icon in iconList"
                :key="icon.id"
                :src="icon.img_ref"
            >
                <!-- </transition-group> -->
        </div>
            </transition>
    </i>
</template>

<script>
export default {
    props: [
        'size',
        'community',
    ],
    data() {
        return {
            addReact: false,
            why: null,
            iconList: [],
        }
    },
    methods: {
        toggle() {
            if (!this.addReact) {
                this.$axios.get('react/list_icon?format=json&community='+this.community,
                    this.$store.state.pheader)
                .then(res => {
                    this.iconList = res.data
                })
            }
            this.why = event.clientY
            this.addReact = !this.addReact
        },
    },
}
</script>

<style>
._addo {
    cursor: pointer;
    color: #aaa;
    display: inline;
    border-radius: 10px;
}
#_norm_addo{
    font-size: 20px;
    margin: 3px;
    margin-bottom: 0;
}
#_smol_addo{
    font-size: 19px;
}
#_big_addo{
    font-size: 24px;
}

#_rea_add_bg{
    position: fixed;
    top: 0; left: 0;
    width: 100vw;
    height: 100vh;
}

._react_adding {
    position: absolute;
    /* padding: 20px; */
    background: linear-gradient(160deg, #fff 0, #ffffffdd 50%, #fff 100%);
    border-radius: 20px;
    max-width: 30%;
    /* height: 50px; */
    box-shadow: 0 5px 20px #999;
    display: flex;
    transition: .3s;
}
._react_adding img {
    display: inline-block;
    /* overflow: auto; */
    width: 35px;
    height: 35px;
    margin: auto 10px;
}

</style>
