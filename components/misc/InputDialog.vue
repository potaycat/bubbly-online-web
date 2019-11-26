<template>
<transition appear name="zoom_fade">
    <div class="total_darkness" @click.self="inputted(false)">
        <div id="diag-box" class="shiny-white-bg box-shadow-4">
            <p class="diag__title">
                {{ toDisplay.title }}
            </p>
            <div class="diag__content">
                {{ toDisplay.description }}
            </div>

            <div class="diag__content" v-if="toDisplay.input_desc">
                <div class="form__group">
                    <input  id="uip" v-model="user_input" class="form__field" v-on:keyup.enter="inputted(user_input)" placeholder="_">
                    <label for="uip" class="form__label">{{ toDisplay.input_desc }}</label>
                </div>
            </div>

            <div v-if="toDisplay.alert" class="diag__btn-ls">
                <button class="glow" @click="inputted(false)">OK</button>
            </div>
            <div v-else class="diag__btn-ls">
                <button class="glow" @click="inputted(user_input)"
                >OK</button>
                <button class="glow" @click="inputted(false)"
                >CANCEL</button>
            </div>
        </div>
    </div>
</transition>
</template>

<script>
export default {
    props: [
        'toDisplay',
    ],
    data() {
        return {
            user_input: true,
        }
    },
    methods: {
        inputted(val) {
            if (val!=="") {
                this.$emit('clicked', val)
            }
        },
    },
    mounted() {
        if (this.toDisplay.input_desc) { this.user_input="" }
    },
}
</script>

<style>
.total_darkness #diag-box {
    z-index: 999;
    border-radius: 15px;
    width: 320px;
}

#diag-box .diag__title{
    font-weight: bold;
    font-size: 18px;
    margin: 18px 18px 15px 18px;
}
#diag-box .diag__content{
    margin: 0 18px;
}
#diag-box .diag__btn-ls{
  direction: rtl;
    margin: 18px 9px 9px 18px;
}
.diag__btn-ls button{
    font-weight: bold;
    font-size: 15px;
    padding: 12px;
    color: rgb(72, 133, 237);
    border-style: none;
    border-radius: 3px;
    margin: 0 8px 0 0;
}

</style>
