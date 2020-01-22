<template>
<transition appear name="zoom_fade">
    <div class="total_darkness is-fixed" @click.self="onClose(null)" v-if="diag">
        <div id="diag-box" class="shiny-white-bg box-shadow-4">
            <p class="diag__title">{{ diag.title }}</p>
            <div class="diag__content">{{ diag.description }}</div>

            <div class="diag__content" v-if="diag.input_desc">
                <div class="form__group">
                    <input id="uip" class="form__field" autocomplete="off" placeholder="_" v-model="userInput">
                    <label for="uip" class="form__label">{{ diag.input_desc }}</label>
                </div>
            </div>

            <div v-if="diag.alert" class="diag__btn-ls">
                <button class="glow" @click="onClose('OK')">OK</button>
            </div>
            <div v-else class="diag__btn-ls">
                <button class="glow" @click="if(userInput)onClose(userInput)"
                >OK</button>
                <button class="glow" @click="onClose(null)"
                >CANCEL</button>
            </div>
        </div>
    </div>
</transition>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
    data:() => ({
        userInput: "",
    }),
    computed: mapState({
        diag: state => state.cpntCtrl.inputDiag.diag,
    }),
    watch: {
        diag(d) {
            if (!d) return
            if (d.input_desc)
                this.userInput = ""
            else
                this.userInput = "OK"
        }
    },
    methods: mapActions({
        onClose: 'cpntCtrl/inputDiag/onClose'
    }),
}
</script>

<style>
.total_darkness #diag-box {
    border-radius: 15px;
    width: 320px;
}

#diag-box .diag__title {
    font-weight: bold;
    font-size: 18px;
    margin: 18px 18px 15px 18px;
}
#diag-box .diag__content {
    margin: 0 18px;
}
#diag-box .diag__btn-ls {
    direction: rtl;
    margin: 18px 9px 9px 18px;
}
.diag__btn-ls button {
    font-weight: bold;
    font-size: 15px;
    padding: 12px;
    color: var(--primary-color);
    border-style: none;
    border-radius: 3px;
    margin: 0 8px 0 0;
}
</style>
