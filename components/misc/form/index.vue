<template>
    <div class="form__group" v-if="fld.type=='text'||fld.type=='password'">
        <input :id="fld.vmodel" :type="fld.type" class="form__field" placeholder="_" :value="value" @input="updateValue">
        <label :for="fld.vmodel" class="form__label">{{ fld.label }}</label>
        <p v-if="notValidated" class="form__invalid">
            {{ fld.validateInfo }}
        </p>
        <p v-if="invalidMsg" class="form__invalid">{{ invalidMsg }}</p>
    </div>

    <div class="form__togglr-wrapper" v-else-if="fld.type=='toggler'">
        <div class="material-toggle" @click="updateBoolVal">
            <input :id="fld.vmodel" type="checkbox" class="switch" ref="boolFld" v-model="bool">
            <label :for="fld.vmodel" class=""></label>
        </div>
        <strong>{{ fld.label }}</strong>
    </div>

    <div class="form__color-picker-wrapper" v-else-if="fld.type=='color'">
        <strong>{{ fld.label }}</strong>
        <input type="color" :value="value" @input="updateValue">
        <div v-if="notValidated" class="form__invalid">
            {{ fld.validateInfo }}
        </div>
        <p v-if="invalidMsg" class="form__invalid">{{ invalidMsg }}</p>
    </div>
</template>

<script>
export default {
    // TODO refactor
    props: ['fld', 'value', 'notValidated', 'invalidMsg'],
    data() { return {
        bool: this.value // why??
    }},
    methods: {
        updateValue(evt) {
            this.$emit('input', evt.target.value.trim())
        },
        updateBoolVal() {
            this.bool = !this.bool
            this.$emit('input', this.bool)
        },
    }
}
</script>

<style>
/* @import url("./material-form"); */
@import url("./material-toggler");
@import url("./color-picker");
</style>