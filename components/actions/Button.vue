<template>
    <!-- <button v-bind:class="{'fillMyButton':fill,  'my-button':!fill}">{{ text }}</button> -->
    <div
        :class="['my-button box-shadow-2 lift', fill?null:'my-btn--no-shdw', lite?'my-btn--no-shdw':null ]"
        :style="`background: linear-gradient(65deg, #${color[0]} 0%, #${
            color[1]} 100%)`"
        @click="$emit('clicked')"
    >
        <div
            :class="['my-btn__content', fill?null:'my-btn--no-fill', lite?'my-btn--lite':null]"
            :style="`padding: ${padding[0]} ${padding[1]}`"
        >
            {{ text }}
        </div>
    </div>
</template>

<script>
export default {
    props: {
        text: { type: String },
        fill: { type: Boolean },
        lite: { type: Boolean },
        padding: {
            type: Array,
            default:() => ['3px', '20px']
        },
        color: {
            type: Array,
            default: ()=> ['2c3e50', 'fd746c']
        }
    }
};
</script>

<style>
.my-button {
    border-radius: 100px;
    padding: 0.6pt;
    cursor: pointer;
}
.my-btn--no-shdw {
    box-shadow: none;
}

.my-btn__content {
    transition: 0.2s;
    color: #fff;
    font-weight: bold;
    text-align: center;
    border-radius: 100px;
}
.my-btn--no-fill {
    color: unset;
    mix-blend-mode: screen;
    background: #fff;
}
.my-btn--lite {
    font-size: 14px;
}
</style>
