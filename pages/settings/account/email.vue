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
import { formValidate } from '@/mixins/form_OLD'
export default {
    meta: {
        useAppBar: true,
        disableHamburger: true,
        appBarTitle: "Change email"
    },
    components: {ActivityView, AppBarCustomBtn},
    mixins: [formValidate],
    data:() => ({
        formData: {
            email: '',
            old_password: '',
        },
    }),
    computed: {
        editableFields() {
            return [
                {type: 'text', label: "Email", vmodel: 'email', validateInfo: "A valid email please"},
                {type: 'password', label: "Your password", vmodel: 'old_password', validateInfo: "Double check your password please"},
            ]
        },
        rules() {
            const reEmail = /^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            return {
                email: reEmail.test(this.formData.email.toLowerCase()),
            }
        },
    },
    created() {
        this.$axios.get('accounts/__self/update-email',
            this.$store.state.auth.head
        )
            .then(res => {
                this.formData.email = res.data.email
            })
    },
    methods: {
        performUpdate() {
            const data = {
                old_password: this.formData.old_password,
                email: this.formData.email,
            }
            this.$axios.put('accounts/__self/update-email',
                data,
                this.$store.state.auth.head
            )
                .then(res => {
                    this.$router.go()
                })
                .catch(error => {
                    this.serverErrRes(error.response.data)
                })
        }
    },
}
</script>
