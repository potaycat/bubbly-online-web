<template>
        <transition appear name="zoom_fade">
    <div class="total_darkness">
        <div style="width:100%;height:100%;position:fixed;top:0;z-index:-99" @click="inputted(false)"/>
        <div class="ip_box">
            <p class="diag_title">
                {{ leDisplay.title }}
            </p>
            <div class="diag_content">
                {{ leDisplay.description }}
            </div>
<div class="diag_content" v-if="leDisplay.input_desc">
    <div class="form__group">
        <input v-model="user_input" id="naim" class="form__field" v-on:keyup.enter="inputted(user_input)" placeholder="_">
        <label for="naim" class="form__label">{{ leDisplay.input_desc }}</label>
    </div>
</div>

            <div v-if="leDisplay.alert" class="btn_list glow">
                <button @click="inputted(false)">OK</button>
            </div>
            <div v-else class="btn_list glow">
                <button @click="inputted(user_input)"
                >OK</button>
                <button @click="inputted(false)"
                >CANCEL</button>
            </div>

        </div>
    </div>
        </transition>
</template>

<script>
export default {
    props: [
        'leDisplay',
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
        if (this.leDisplay.input_desc) { this.user_input="" }
    },
}
</script>

<style>
.total_darkness .ip_box {
    z-index: 999;
    margin: auto;
    /* background: #ffffffdd; */
    background: linear-gradient(160deg, #fff 0, #ffffffee 50%, #fff 100%);
    border-radius: 15px;
  box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
    width: 320px;
}

.ip_box .diag_title{
    font-weight: bold;
    font-size: 18px;
    margin: 18px 18px 15px 18px;
}
.ip_box .diag_content{
    margin: 0 18px;
}
.ip_box .btn_list{
  direction: rtl;
    margin: 18px 9px 9px 18px;
}
.btn_list button{
    font-weight: bold;
    font-size: 15px;
    padding: 12px;
    color: rgb(72, 133, 237);
    border-style: none;
    border-radius: 3px;
    margin: 0 8px 0 0;
}



/* FANCY Material input box i copied online */
.form__group {
  position: relative;
  padding: 15px 0 0;
  margin-top: 10px;
}
.form__field {
  font-family: inherit;
  width: 100%;
  border: 0;
  border-bottom: 1px solid #d2d2d2;
  outline: 0;
  font-size: 16px;
  color: #212121;
  padding: 7px 0;
  background: transparent;
  transition: border-color 0.2s;
}
.form__field::placeholder {
  color: transparent;
}
.form__field:placeholder-shown ~ .form__label {
  font-size: 16px;
  cursor: text;
  top: 20px;
}
label,
.form__field:focus ~ .form__label {
  position: absolute;
  top: 0;
  display: block;
  transition: 0.2s;
  font-size: 12px;
  color: #9b9b9b;
}
.form__field:focus ~ .form__label {
  color: rgb(72, 133, 237);
}
.form__field:focus {
  padding-bottom: 6px;
  border-bottom: 2px solid rgb(72, 133, 237);
}
/* END OF FANCY Material input box i copied online */

</style>
