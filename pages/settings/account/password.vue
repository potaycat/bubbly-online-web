<template>
    <div class="the_big_frame">
    <div class="common_ls_cntainr --dtail-app-bar settings-ctnr">
        <ActivityView />
        <AppBarCustomBtn
            :customCmds="[
                {action: 'update', icon: 'done'},
            ]"
            @update="validateThen(performUpdate)"
        />
        <section class="form__fields-wrapper">
            <Form v-for="field in editableFields" :key="field.vmodel"
                :fld="field"
                v-model="formData[field.vmodel]"
                :notValidated="notValidated(field.vmodel)"
            />
        </section>
        <p>{{error}}</p>
    </div>
    </div>
</template>

<script>
import ActivityView from '@/components/layout/ActivityView'
import AppBarCustomBtn from '@/components/misc/AppBarCustomBtn'
import { formValidate } from '@/mixins/formValidate'
export default {
    meta: {
        useAppBar: true,
        disableHamburger: true,
        appBarTitle: "Change password"
    },
    components: {ActivityView, AppBarCustomBtn},
    mixins: [formValidate],
    data:() => ({
        formData: {
            old_password: '',
            password: '',
            confirm_pw: '',
        },
    }),
    computed: {
        editableFields() {
            return [
                {type: 'password', label: "Old password", vmodel: 'old_password', validateInfo: "Double check your password please"},
                {type: 'password', label: "New password", vmodel: 'password', validateInfo: `
                    Password must be 6 to 30 ASCII characters
                `},
                {type: 'password', label: "Confirm password", vmodel: 'confirm_pw', validateInfo: "Password does not match"},
            ]
        },
        rules() {
            return {
                password: /^[\x00-\x7F]*$/.test(this.formData.password) && this.formData.password.length >= 6 && this.formData.password.length <= 30,
                confirm_pw: this.formData.password == this.formData.confirm_pw
            }
        },
    },
    methods: {
        performUpdate() {
            const data = {
                old_password: this.formData.old_password,
                new_password: this.formData.password,
            }
            this.$axios.put('accounts/__self/update-pw',
                data,
                this.$store.state.auth.head
            )
                .then(res => {
                    this.$router.back()
                })
                .catch(error => {
                    this.serverErrRes(error.response.data)
                })
        }
    },
}
</script>
