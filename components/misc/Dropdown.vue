<template>
<transition name="fade">
    <div class="total_darkness" style="background:none" @click.self="$emit('pick', null)">
        <transition name="zoom_in_fade" appear>
            <div ref='drpdwn' class="drpdwn shiny-white-bg box-shadow-2">
                <option v-for="option in options"
                    :key="option.value"
                    class="drpdwn__option glow"
                    :value="option.value"
                    @click="$emit('pick', option.value)"
                >
                    {{ option.name }}
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
        'options', // [{value, icon, title}]
        'position', // {x: "_px", y: "_px"}
    ],
    mounted() {
        const drpdwn = this.$refs.drpdwn
        const pos = this.position || {}
        drpdwn.style.top = `${pos.y || 20}px`
        drpdwn.style.right = `${pos.x || 15}px`
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
