<template>
    <div>
        <FloatingSaveButton v-if="hasUnsaved" :wait="Requesting" :color="formData.theme_color" @clicked="validateThen(finised)"/>
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
            <Form v-for="field in formTemplate" :key="field.id"
                :fld="field"
                v-model="formData[field.id]"
                :invalidMsg="invalidFields[field.id]"
            />
        </section>
        <p v-if="formData.isRequireCode && formData.invite_code" class="form-code-inform">
            Keep this invite link somewhere safe:<br>
            <a>{{inviteUrl}}</a><span class="glow form-code-inform__copy" @click="copyInviteLink">Copy</span>
        </p>
    </div>
</template>

<script>
import FloatingSaveButton from './FloatingSaveButton'
import { formValidate } from '@/mixins/form'
export default {
    components: {FloatingSaveButton},
    mixins: [formValidate],
    props: ['community', 'isAdmin'],
    data() {
        const cmty = this.community
        return {
            dynFormTemplate: [
                { type: 'text', label: "Name", id: 'name', rules: this.$options.commonRules.cmtyNameRules },
                { type: 'text', label: "Tag line", id: 'moto', rules: [
                    {
                        check:(val) => { return val.length < 240 },
                        onFailWarn: "Please be more concise"
                    },
                ]},
                { type: 'color', label: "Theme color:", id: 'theme_color', rules: this.$options.commonRules.themeColorRules},
                { type: 'toggler', label: "Visible to public", id: 'isPublic' },
                { type: 'toggler', label: "Invite code required to join", id: 'isRequireCode' },
            ],
            formData: {
                name: cmty.name,
                moto: cmty.moto || '',
                theme_color: '#'+cmty.theme_color,

                isPublic: ['public','closed'].includes(cmty.visibility),
                isRequireCode: ['closed','secret'].includes(cmty.visibility),
                invite_code: "",

                pfpInput: {},
                coverInput: {},
            },
        }
    },
    computed: {
        formTemplate() {
            return this.formData.isRequireCode ?
                [
                    ...this.dynFormTemplate,
                    {type: 'text', label: "New invite code (blank to keep old code)", id: 'invite_code', rules:
                        this.$options.commonRules.inviteCodeRules}
                ] : this.dynFormTemplate
        },
        inviteUrl() {
            return encodeURI(
                `${window.location.origin}/communities/${this.community.id}/join/${this.formData.invite_code}`
            )
        }
    },
    methods: {
        copyInviteLink() {
            navigator.clipboard.writeText(this.inviteUrl)
            .then(() => {
                this.$store.dispatch('cpntCtrl/toast/toastAlert', {message: "Copied to clipboard"})
            })
        },
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
                    name: form.name,
                    moto: form.moto,
                    theme_color: form.theme_color.substr(1), // removes '#'
                    is_secret: !form.isPublic
                }
                
                if (form.pfpInput.file) data.icon_img = uploadedUrls.shift()
                if (form.coverInput.file) data.cover_img = uploadedUrls.shift()
                if (form.isRequireCode) {
                    if (form.invite_code) {
                        data.invite_code = form.invite_code
                    }
                } else {
                    data.invite_code = ""
                }
                
                this.$axios.patch(`/communities/${this.community.id}`,
                    data,
                    this.$store.state.auth.head
                )
                    .then(res => {
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

.form-code-inform {
    margin: 5px 20px;
    color: #666;
}
.form-code-inform > a {
    user-select: text;
    word-break: break-all;
    background: #eee;
}
.form-code-inform__copy {
    color: var(--primary-color);
    margin-left: 10px;
}
</style>
