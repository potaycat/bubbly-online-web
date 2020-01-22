<template>
<transition appear name="zoom_fade">
    <div class="total_darkness is-fixed" @click.self="inputted(false)">
        <div id="diag-box" class="shiny-white-bg box-shadow-4">
            <p class="diag__title">
                {{ toDisplay.title }}
            </p>
            <div class="diag__content">
                {{ toDisplay.description }}
            </div>

            <div class="diag__content" v-if="toDisplay.input_desc">
                <div class="form__group">
                    <input id="uip" class="form__field" autocomplete="off" placeholder="_"
                        v-model="user_input" @keyup.enter="inputted(user_input)">
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
    props: ['toDisplay'],
    data:() => ({
        user_input: true,
    }),
    methods: {
        inputted(val) {
            if (val!=="") {
                this.$parent.onDiagClose(val)
            }
        },
    },
    created() {
        if (this.toDisplay.input_desc) this.user_input=""
    },
}
</script>
