<template>
    <!-- <button v-bind:class="{'fillMyButton':fill,  'my-button':!fill}">{{ text }}</button> -->
    <div
        :class="['my-button box-shadow-2 lift', fill?null:'my-btn--no-shdw',
            lite||wait?'my-btn--no-shdw':null, wait?'my-btn--wait':null ]"
        :style="`background: linear-gradient(65deg, ${colorFrst} 0%, ${
            colorScnd} 100%)`"
        @click="$emit('clicked')"
    >
        <div
            :class="['my-btn__content', fill?null:'my-btn--no-fill', lite?'my-btn--lite':null]"
            :style="`padding: ${padding[0]} ${padding[1]}`"
        >
            <Spinner v-if="wait" style="height:20px" color="#fff"/>
            <p v-else>{{ text }}</p>
        </div>
    </div>
</template>

<script>
import Spinner from './Spinner'
export default {
    components: { Spinner },
    props: {
        text: { type: String },
        fill: { type: Boolean },
        lite: { type: Boolean },
        wait: { type: Boolean },
        padding: {
            type: Array,
            default:() => ['3px', '20px']
        },
        colorFrst: {
            type: String,
            default() {
                const userDef = this.$store.state.auth.my_profile.fave_color
                return userDef ? '#'+userDef : 'var(--primary-color)'
            }
        },
        colorScnd: {
            type: String,
            default:() => 'var(--secondary-color)'
        },
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
    color: black;
    mix-blend-mode: screen;
    background: #fff;
}
.my-btn--lite {
    font-size: 14px;
}
.my-btn--wait {
    opacity: 0.5;
    pointer-events: none;
}
</style>
