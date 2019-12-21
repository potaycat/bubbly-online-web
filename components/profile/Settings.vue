<template>
    <div class="the_big_frame">
    <div class="common_ls_cntainr --dtail-app-bar">
        <FloatingSaveButton v-if="hasUnsaved" :wait="Requesting" :color="formData.fave_color" @clicked="validateAnd(finised)"/>

        <div class="prfl-edit__cover-pic">
            <img :src="formData.coverInput.preview || profile.cover_photo">
            <label class="prfl-edit__upload-btn glow">
                <i class="material-icons-round">add_photo_alternate</i>
                <input type="file" accept="image/*" @change="onCoverChange" ref="cover_input" style="display:none">
            </label>
        </div>
        <div class="prfl-edit__pfp pfp">
            <img :src="formData.pfpInput.preview || profile.profile_pic">
            <label class="prfl-edit__upload-btn glow">
                <i class="material-icons-round">add_photo_alternate</i>
                <input type="file" accept="image/*" @change="onPfpChange" ref="pfp_input" style="display:none">
            </label>
        </div>
        
        <section class="form__fields-wrapper">
            <Form v-for="field in $options.editableFields" :key="field.vmodel"
                :fld="field"
                v-model="formData[field.vmodel]"
                :notValidated="notValidated(field.vmodel)"
            />
        </section>
    </div>
    </div>
</template>

<script>
import { disableHamburger } from '@/mixins/appBarStuff'
import { appBarTitle } from '@/mixins/appBarStuff'
import { formValidate } from '@/mixins/formValidate'
import FloatingSaveButton from '@/components/community/management/FloatingSaveButton'
export default {
    components: {FloatingSaveButton},
    mixins: [disableHamburger, appBarTitle, formValidate],
    data() {
        return {
            formData: {
                alias: this.$store.state.auth.my_profile.alias,
                fave_color: '#'+this.$store.state.auth.my_profile.fave_color,
                bio: this.$store.state.auth.my_profile.bio,
                location: this.$store.state.auth.my_profile.location,

                pfpInput: {},
                coverInput: {},
            },
            appBarDisplayTitle: "Profile edit"
        }
    },
    //consts {
        editableFields: [
            {type: 'text', label: "Alias", vmodel: 'alias', validateInfo: "Name should be between 3 and 40 characters"},
            {type: 'text', label: "Short Bio", vmodel: 'bio', validateInfo: "More concise please"},
            {type: 'text', label: "Location", vmodel: 'location', validateInfo: "More concise please"},
            {type: 'color', label: "Favorite Color: ", vmodel: 'fave_color', validateInfo: "Try a color that doesn't too much resemble white"},
        ],
    //}
    computed: {
        profile() {
            return this.$store.state.auth.my_profile
        },
        validated() {
            const form = this.formData
            return {
                alias: 3 < form.alias.length && form.alias.length <= 40,
                bio: form.bio.length < 240,
                location: form.location.length < 90,
                fave_color: form.fave_color != '#ffffff'
            }
        },
    },
    methods: {
        onCoverChange() {
            const file = this.$refs.cover_input.files[0]
            if (file && file.type.startsWith("image/")) {
                this.formData.coverInput = {
                    file: file,
                    preview: URL.createObjectURL(file)
                }
            }
        },
        onPfpChange() {
            const file = this.$refs.pfp_input.files[0]
            if (file && file.type.startsWith("image/")) {
                this.formData.pfpInput = {
                    file: file,
                    preview: URL.createObjectURL(file)
                }
            }
        },

        finised() {
            const form = this.formData
            const pics = [form.pfpInput.file, form.coverInput.file].filter(x => x)
            this.batchCompressUpload(pics, uploadedUrls => {
                const imgs = {}
                if (form.pfpInput.file) imgs.profile_pic = uploadedUrls.shift()
                if (form.coverInput.file) imgs.cover_photo = uploadedUrls.shift()
                const data = {
                    alias: form.alias,
                    fave_color: form.fave_color.substr(1), // removes '#'
                    bio: form.bio,
                    location: form.location,
                    ...imgs
                }
                this.performUpdateProfile(data)
            })
        },
        performUpdateProfile(data) {
            this.$axios.patch(`accounts/${this.profile.username}`,
                data,
                this.$store.state.authHeader
            )
                .then(res => {
                    this.$store.commit('auth/storeAuthUser', {
                        ...this.$store.state.auth.my_profile,
                        ...res.data 
                    })
                    this.$router.go()
                })
        }
    },
}
</script>

<style>
.prfl-edit__cover-pic {
    position: relative;
    overflow: hidden;
}.prfl-edit__cover-pic, .prfl-edit__cover-pic > img {
    width: 100%;
    min-height: 200px;
    max-height: 200px;
}

.prfl-edit__pfp {
    position: relative;
    overflow: hidden;
    margin: -30px auto 0 15px;
    border: solid 4px #fff;
}.prfl-edit__pfp, .prfl-edit__pfp > img {
    width: 100px;
    min-height: 100px;
    max-height: 100px;
}

.prfl-edit__upload-btn {
    position: absolute;
    background: rgba(0, 0, 0, 0.3);
    width: 100%;
    height: 100%;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>
