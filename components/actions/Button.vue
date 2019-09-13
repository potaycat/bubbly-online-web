<template>
    <!-- <button v-bind:class="{'fillMyButton':fill,  'myButton':!fill}">{{ text }}</button> -->
    <div
        :class="['myButton', fill ? null : 'no-shadow']"
        :style="
            `background: linear-gradient(65deg, #${color[0]} 0%, #${
                color[1]
            } 100%)`
        "
        @click="$emit('clicked')"
    >
        <div
            :class="['btn-content', fill ? null : 'dont-fill']"
            :style="`padding: ${size[0]} ${size[1]}`"
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
        size: {
            type: Array,
            default: ["6px", "45px"]
        },
        color: {
            type: Array,
            default: ["2c3e50", "fd746c"]
        }
    }
};
</script>

<style>
.myButton {
    -moz-border-radius: 100px;
    -webkit-border-radius: 100px;
    border-radius: 100px;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
    padding: 1px;
    cursor: pointer;
}
.myButton :active {
    background: #00000077;
}
.no-shadow {
    box-shadow: none;
}

.btn-content {
    transition: 0.2s;
    color: #fff;
    font-weight: bold;
    text-align: center;
    border-radius: 100px;
}
.dont-fill {
    color: unset;
    background: #fff;
    mix-blend-mode: screen;
}
</style>
