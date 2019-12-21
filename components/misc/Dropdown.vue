<template>
<transition name="fade">
    <div class="total_darkness is-fixed no-bg" @click.self="close">
        <transition name="zoom_in_fade" appear>
            <div ref='drpdwn' class="drpdwn shiny-white-bg box-shadow-2">
                <option v-for="option in options"
                    :key="option.action"
                    class="drpdwn__option glow"
                    :value="option.action"
                    @click="close();$parent[option.action]()"
                >
                    {{ option.label }}
                    <!-- TODO refactor like AppBarCustomCmd -->
                </option>
            </div>
        </transition>
    </div>
</transition>
</template>

<script>
export default {
    props: [
        'options', // [{action, icon, title}]
        'position', // {x: "_px", y: "_px"}
    ],
    mounted() {
        const drpdwn = this.$refs.drpdwn
        const pos = this.position || {}
        drpdwn.style.top = `${pos.y || 20}px`
        drpdwn.style.right = `${pos.x ? window.innerWidth-pos.x : window.innerWidth/3-110}px`
    },
    methods: {
        close() {
            this.$parent.onDropDownPick()
        },
    }
}
</script>

<style>
.drpdwn {
    position: fixed;
    border-radius: 10px;
    overflow: hidden;
    user-select: none;
}
.drpdwn__option {
    border: 0;
    border-bottom: 1px solid #eee;
    padding: 12px 20px;
}
</style>
