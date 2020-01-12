<template>
    <div class="the_big_frame">
    <div class="common_ls_cntainr --dtail-app-bar">
        <FloatingSaveButton v-if="hasUnsaved" :wait="Requesting" :color="formData.fave_color" @clicked="validateThen(finised)"/>

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
            <Form v-for="field in formTemplate" :key="field.id"
                :fld="field"
                v-model="formData[field.id]"
                :invalidMsg="invalidFields[field.id]"
            />
        </section>
    </div>
    </div>
</template>

<script>
import { formValidate } from '@/mixins/form'
import FloatingSaveButton from '@/components/community/management/FloatingSaveButton'
export default {
    components: {FloatingSaveButton},
    mixins: [formValidate],
    data() {
        const profile = this.$store.state.auth.my_profile
        return {
            profile: profile,
            formTemplate: [
                { type: 'text', label: "Alias", id: 'alias', rules: this.$options.commonRules.aliasRules },
                { type: 'text', label: "Short Bio", id: 'bio', rules: [
                    {
                        check:(val) => { return val.length < 240 },
                        onFailWarn: "Please be more concise"
                    },
                ]},
                { type: 'text', label: "Location", id: 'location', rules: [
                    {
                        check:(val) => { return val.length < 90 },
                        onFailWarn: "Please be more concise"
                    },
                ]},
                { type: 'color', label: "Favorite Color:", id: 'fave_color', rules: this.$options.commonRules.themeColorRules}
            ],
            formData: {
                alias: profile.alias,
                fave_color: '#'+profile.fave_color,
                bio: profile.bio,
                location: profile.location,

                pfpInput: {},
                coverInput: {},
            },
        }
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
                const data = {
                    alias: form.alias,
                    fave_color: form.fave_color.substr(1), // removes '#'
                    bio: form.bio,
                    location: form.location
                }
                if (form.pfpInput.file) data.profile_pic = uploadedUrls.shift()
                if (form.coverInput.file) data.cover_photo = uploadedUrls.shift()
                
                this.$axios.patch(`accounts/${this.profile.username}`,
                    data,
                    this.$store.state.auth.head
                )
                    .then(res => {
                        this.$store.commit('auth/STORE_AUTH_USR', {
                            ...this.profile,
                            ...res.data 
                        })
                        this.$router.go()
                    })
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
