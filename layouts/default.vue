<template>
    <div class="whole-layout">
        <TopLvlNavigator />
        <transition :name="transitionName">
            <Nuxt class="layout__content" keep-alive />
        </transition>
    </div>
</template>

<script>
import TopLvlNavigator from "@/components/layout/bars/TopLvlNavigator"
export default {
    components: {TopLvlNavigator},
    data:() => ({
        transitionName: null
    }),
    watch: {
        '$route' (to, from) {
            console.log(to);
            console.log(from);
            
            const toDepth = to.path.split('/').length
            const fromDepth = from.path.split('/').length
            this.transitionName = toDepth < fromDepth ? 'page_zoom' : 'page_zoom'
        }
    }
}
</script>

<style>
@media only screen and (min-width: 500px) {
    .whole-layout {
    }
    .layout__content {
        margin-left: 65px;
        max-width: 640px;
        /* padding-right: 20%; */
        right: 0;
        /* box-shadow: 0 0 20px rgba(0,0,0,0.15); */
    }
    .layout__content > div {
        position: relative;
    }
}
@media only screen and (min-width: 1100px) {
    .layout__content {
        margin-left: 20%;
        margin-right: auto;
        min-width: 650px;
    }
}


.page_zoom-enter-active {
    transition: transform .4s, opacity .5s;
}
.page_zoom-enter {
    opacity: 0;
    transform: scale(.98);
}

.page_zoom_out-enter-active {
    transition: transform .4s, opacity .6s;
    position: fixed;
}
.page_zoom_out-enter {
    opacity: 0;
    transform: scale(1.05);
}
</style>