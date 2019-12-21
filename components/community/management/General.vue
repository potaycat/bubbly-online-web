<template>
    <div>
        <FloatingSaveButton v-if="hasUnsaved" :wait="Requesting" :color="formData.theme_color" @clicked="validateAnd(finised)"/>
        <div class="prfl-edit__cover-pic">
            <img :src="formData.coverInput.preview || community.cover_img">
            <label class="prfl-edit__upload-btn glow">
                <i class="material-icons-round">add_photo_alternate</i>
                <input type="file" @change="onCoverChange" ref="cover_input" style="display:none">
            </label>
        </div>
        <div class="prfl-edit__pfp cmty_ico">
            <img :src="formData.pfpInput.preview || community.icon_img">
            <label class="prfl-edit__upload-btn glow">
                <i class="material-icons-round">add_photo_alternate</i>
                <input type="file" @change="onPfpChange" ref="pfp_input" style="display:none">
            </label>
        </div>
        
        <section class="form__fields-wrapper">
            <Form v-for="field in editableFields" :key="field.vmodel"
                :fld="field"
                v-model="formData[field.vmodel]"
                :notValidated="notValidated(field.vmodel)"
            />
        </section>
    </div>
</template>

<script>
import FloatingSaveButton from './FloatingSaveButton'
import { formValidate } from '@/mixins/formValidate'
export default {
    components: {FloatingSaveButton},
    mixins: [formValidate],
    props: ['community', 'isAdmin'],
    data() {
        return {
            formData: {
                name: this.community.name,
                moto: this.community.moto || '',
                theme_color: '#'+this.community.theme_color,
                invite_code: "",

                isPublic: ['public','closed'].includes(this.community.visibility),
                requireCode: "",

                pfpInput: {},
                coverInput: {},
            },
        }
    },
    computed: {
        editableFields() {
            return [
                {type: 'text', label: "Name", vmodel: 'name', validateInfo: "Name shouldn't be longer than 30 characters"},
                {type: 'text', label: "Tag line", vmodel: 'moto', validateInfo: "Please be more concise"},
                
                {type: 'color', label: "Theme color:", vmodel: 'theme_color', validateInfo: "Try a color that doesn't too much resemble white"},
                
                {type: 'toggler', label: "Visible to public", vmodel: 'isPublic'},
                {type: 'toggler', label: "Invite code required to join", vmodel: 'requireCode'},
                this.formData.requireCode ? 
                    {type: 'text', label: "Create New Invite Code", vmodel: 'invite_code', validateInfo: "Field required with current settings"} : null,
            ].filter(x => x)
        },
        validated() {
            const form = this.formData
            return {
                name: form.name.length > 2 && form.name.length < 100,
                moto: form.moto.length < 255,
                theme_color: form.theme_color != '#ffffff',
                requireCode: form.requireCode.length <= 8
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
                const extraFlds = {}
                if (form.pfpInput.file) extraFlds.icon_img = uploadedUrls.shift()
                if (form.coverInput.file) extraFlds.cover_img = uploadedUrls.shift()
                if (form.requireCode) {
                    if (form.invite_code) {
                        extraFlds.invite_code = form.invite_code
                    }
                } else {
                    extraFlds.invite_code = ""
                }
                const data = {
                    name: form.name,
                    moto: form.moto,
                    theme_color: form.theme_color.substr(1), // removes '#'
                    is_secret: !form.isPublic,
                    ...extraFlds
                }
                this.performUpdateProfile(data)
            })
        },
        performUpdateProfile(data) {
            this.$axios.patch(`/communities/${this.community.id}`,
                data,
                this.$store.state.authHeader
            )
                .then(res => {
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
    height: 200px;
}

.prfl-edit__pfp {
    position: relative;
    overflow: hidden;
    margin-top: -30px;
    margin-left: 15px;
    border: solid 4px #fff;
}.prfl-edit__pfp, .prfl-edit__pfp > img {
    height: 100px;
    width: 100px;
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
