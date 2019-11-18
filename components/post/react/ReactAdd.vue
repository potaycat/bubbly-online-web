<template>
<transition name="fade">
    <div class="total_darkness total_lightness react-add" ref="dimmed"
        @mousedown.self="$emit('performReact', null)"
        @mouseleave="$emit('performReact', null)"
        @touchstart.self="$emit('performReact', null)"
    >
            <transition name="zoom_in_fade" appear>
        <div class="react-add-ctnr shiny-white-bg box-shadow-4" ref="drpdwn">
            <div v-for="icon in icons" :key="icon.id" class="add__ico-item" oncontextmenu="return false"
                @mouseup="$emit('performReact', icon.id)"
                @touchend="$emit('performReact', icon.id)"
            >
                <img :src="icon.img_src">
            </div>
        </div>
            </transition>
    </div>
</transition>
</template>

<script>
import { mapGetters } from "vuex"
export default {
    props: [
        'community',
        'position', // {x: int, y: int}
    ],
    computed: {
        ...mapGetters({
            iconsByCmnty: 'reactIcons/iconsByCmnty',
        }),
        icons() {
            return this.iconsByCmnty(this.community.id)
        }
    },
    mounted() {
        const drpdwn = this.$refs.drpdwn
        const pos = this.position ? this.position : {}
        drpdwn.style.bottom = `${pos.y ? pos.y : 20}px`
        drpdwn.style.left = `${
            pos.x ?
                document.body.clientWidth-pos.x<280 ? document.body.clientWidth-280 : pos.x
                    : 15}px`
                    
        const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
        if (isMobile) {
        }
        
    },
    methods: {
        over(evt, id){
            console.log(evt)
            console.log(id  )
        }
    },
}
</script>

<style>
.react-add {
    pointer-events: none;
}
.react-add-ctnr {
    pointer-events: auto;
    display: flex;
    flex-wrap: wrap;
    max-width: 280px;
    max-height: 180px;
    overflow: auto;

    position: fixed;
    padding: 12px 7px;
    border-radius: 15px;
}

.add__ico-item, .add__ico-item > img {
    height: 30px;
    width: 30px;
}
.add__ico-item {
    transition: .2s;
    margin: 4px
}
.add__ico-item:hover {
    transform: scale(1.6)
}
</style>
