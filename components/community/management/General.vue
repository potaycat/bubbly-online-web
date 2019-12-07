<template>
    <div>
        <FloatingSaveButton v-if="hasUnsaved" @clicked="finised"/>
        <div class="prfl-edit__cover-pic">
            <img :src="fields.coverInput || community.cover_img">
            <label class="prfl-edit__upload-btn glow">
                <i class="material-icons-round">add_photo_alternate</i>
                <input type="file" @change="onCoverChange" ref="cover_input" style="display:none">
            </label>
        </div>
        <div class="prfl-edit__pfp cmnty_ico">
            <img :src="fields.pfpInput || community.icon_img">
            <label class="prfl-edit__upload-btn glow">
                <i class="material-icons-round">add_photo_alternate</i>
                <input type="file" @change="onPfpChange" ref="pfp_input" style="display:none">
            </label>
        </div>
        
        <section class="prfl-edit__fields-wrapper">
            <div class="form__group" v-for="field in editableFields" :key="field.label">
                <input :id="field.vmodel" v-model="fields.formData[field.vmodel]" class="form__field" placeholder="_">
                <label :for="field.vmodel" class="form__label">{{ field.label }}</label>
            </div>
            <div class="cmnty-create__vsblty-togglr" v-for="field in $options.editableBooleanFields" :key="field.label">
                <div class="material-toggle">
                    <input :id="field.vmodel" v-model="fields.booleans[field.vmodel]" type="checkbox" class="switch" />
                    <label :for="field.vmodel" class=""></label>
                </div>
                <strong>{{field.label}}</strong>
            </div>
        </section>
    </div>
</template>

<script>
import FloatingSaveButton from './FloatingSaveButton'
export default {
    components: {FloatingSaveButton},
    props: ['community', 'isAdmin'],
    data() {
        return {
            fields: {
                formData: {
                    name: this.community.name,
                    moto: this.community.moto,
                    theme_color: this.community.theme_color,
                    invite_code: "",
                },
                booleans: {
                    requireCode: !['public'].includes(this.community.visibility),
                    isPublic: ['public','closed'].includes(this.community.visibility),
                },
                pfpInput: null,
                coverInput: null,
            },

            hasUnsaved: false,
        }
    },
    //consts {
        editableFields: [
            {label: "Name", vmodel: 'name'},
            {label: "Tag line", vmodel: 'moto'},
            {label: "Color", vmodel: 'theme_color'},
        ],
        editableBooleanFields: [
            {label: "Invite code required to join", vmodel: 'requireCode'},
            {label: "Visible to public", vmodel: 'isPublic'},
        ],
    //},
    computed: {
        editableFields() {
            return [
                ...this.$options.editableFields,
                this.fields.booleans.requireCode?{label: "Create New Invite Code", vmodel: 'invite_code'}:null
            ].filter(x => x)
        }
    },
    watch: {
        fields: {
            deep: true,
            handler() {
                this.hasUnsaved = true
            }
        }
    },
    methods: {
        onCoverChange() {
            const file = this.$refs.cover_input.files[0]
            if (file) {
                this.fields.coverInput = URL.createObjectURL(file)
            }
        },
        onPfpChange() {
            const file = this.$refs.pfp_input.files[0]
            if (file) {
                this.fields.pfpInput = URL.createObjectURL(file)
            }
        },
        
        finised() {
            const data = {
                name: this.fields.formData.name,
                moto: this.fields.formData.moto,
                theme_color: this.fields.formData.theme_color,
                is_secret: !this.fields.booleans.isPublic,
            }
            if (this.fields.booleans.requireCode) {
                if (this.fields.formData.invite_code) {
                    data['invite_code'] = this.fields.formData.invite_code
                }
            } else {
                data['invite_code'] = ""
            }
            console.log(data);
            

            this.$axios.patch(`/communities/${this.community.id}`,
                data,
                this.$store.state.authHeader
            )
                .then(res => {
                    this.hasUnsaved = false
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

.prfl-edit__fields-wrapper {
    width: 100%;
    padding: 0 20px;
}
.prfl-edit__fields-wrapper .form__group {
    margin-top: 15px;
}


.cmnty-create__vsblty-togglr {
    display: flex;
    margin: 30px 3px;
}
</style>
