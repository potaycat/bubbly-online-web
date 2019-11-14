<template>
<transition name="zoom_in_fade" appear>
    <div id="drpdwn" class="total_darkness" @click.self="$emit('pick', null)">
        <div class="drpdwn-ctnr box-shadow-2">
            <option v-for="option in options"
                :key="option.value"
                class="drpdwn__option glow"
                :value="option.value"
                @click="$emit('pick', option.value)"
            >
                {{ option.name }}
            </option>
        </div>
    </div>
</transition>
</template>

<script>
export default {
    props: [
        'options',
        // [{value, title}]
    ],
}
</script>

<style>
#drpdwn {
    background: none;
    z-index: 999;
}
.drpdwn-ctnr {
    margin: auto;
    /* background: #ffffffdd; */
    background: linear-gradient(160deg, #fff 0, #ffffffef 50%, #fff 100%);
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
