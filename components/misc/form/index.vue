<template>
    <div class="form__group" v-if="fld.type=='text'||fld.type=='password'">
        <input :id="fld.vmodel" :type="fld.type" class="form__field" placeholder="_" :value="value" @input="updateValue">
        <label :for="fld.vmodel" class="form__label">{{ fld.label }}</label>
        <p :style="notValidated?null:'display:none'" class="form__invalid">
            {{ fld.validateInfo }}
        </p>
    </div>

    <div class="form__togglr-wrapper" v-else-if="fld.type=='toggler'">
        <div class="material-toggle">
            <input :id="fld.vmodel" type="checkbox" class="switch" ref="boolFld" v-model="value"/>
            <label :for="fld.vmodel" class=""></label>
        </div>
        <strong>{{ fld.label }}</strong>
    </div>

    <div class="form__color-picker-wrapper" v-else-if="fld.type=='color'">
        <p>{{ fld.label }}</p>
        <input type="color" :value="value" @input="updateValue">
        <div :style="notValidated?null:'display:none'" class="form__invalid">
            {{ fld.validateInfo }}
        </div>
    </div>
</template>

<script>
export default {
    props: ['fld', 'value', 'notValidated'],
    watch: {
        value(val) { // javascript sucks at this point
            if (this.fld.type == 'toggler') {
                this.$refs.boolFld.value = val
                this.$emit('input', val)
            }
        }
    },
    methods: {
        updateValue(evt) {
            this.$emit('input', evt.target.value)
        }
    }
}
</script>

<style>
/* @import url("./material-form"); */
@import url("./material-toggler");
@import url("./color-picker");
</style>