<template>
    <div class="prfl-edit-ctnr --dtail-app-bar">
        <AppBarCustomBtn
            :customCmds="[
                {action: 'finised', icon: 'done'},
            ]"
            @finised="finised"
        />

        <div class="prfl-edit__cover-pic">
            <img :src="coverInput || profile.cover_photo">
            <label class="prfl-edit__upload-btn glow">
                <i class="material-icons-round">add_photo_alternate</i>
                <input type="file" @change="onCoverChange" ref="cover_input" style="display:none">
            </label>
        </div>
        <div class="prfl-edit__pfp pfp">
            <img :src="pfpInput || profile.profile_pic">
            <label class="prfl-edit__upload-btn glow">
                <i class="material-icons-round">add_photo_alternate</i>
                <input type="file" @change="onPfpChange" ref="pfp_input" style="display:none">
            </label>
        </div>
        
        <section class="prfl-edit__fields-wrapper">
            <div class="form__group" v-for="field in $options.editableFields" :key="field.label">
                <input :id="field.vmodel" v-model="formData[field.vmodel]" class="form__field" placeholder="_">
                <label :for="field.vmodel" class="form__label">{{ field.label }}</label>
            </div>
        </section>
    </div>
</template>

<script>
import AppBarCustomBtn from '@/components/misc/AppBarCustomBtn'
import { appBarTitle } from '@/mixins/appBarStuff'
export default {
    components: {AppBarCustomBtn},
    mixins: [appBarTitle],
    data() {
        return {
            formData: {
                alias: this.$store.state.auth.my_profile.alias,
                fave_color: this.$store.state.auth.my_profile.fave_color,
                bio: this.$store.state.auth.my_profile.bio,
                location: this.$store.state.auth.my_profile.location,
            },
            pfpInput: null,
            coverInput: null,
            appBarDisplayTitle: "Profile edit"
        }
    },
    //consts {
        editableFields: [
            {label: "Alias", vmodel: 'alias'},
            {label: "Favorite Color", vmodel: 'fave_color'},
            {label: "Short Bio", vmodel: 'bio'},
            {label: "Location", vmodel: 'location'},
        ],
    //}
    computed: {
        moring() {return this.$store.state.appBar.moring},
        profile() {
            return this.$store.state.auth.my_profile
        }
    },
    methods: {
        onCoverChange() {
            const file = this.$refs.cover_input.files[0]
            if (file) {
                this.coverInput = URL.createObjectURL(file)
            }
        },
        onPfpChange() {
            const file = this.$refs.pfp_input.files[0]
            if (file) {
                this.pfpInput = URL.createObjectURL(file)
            }
        },
        
        finised() {
            const data = {
                alias: this.formData.alias,
                fave_color: this.formData.fave_color,
                bio: this.formData.bio,
                location: this.formData.location,
            }
            // Object.keys(data).forEach((key) => !data[key] && delete data[key])

            this.$axios.patch(`accounts/${this.profile.username}`,
                data,
                this.$store.state.authHeader
            )
                .then(res => {
                    this.$router.back()
                })
        }
    },
}
</script>

<style>
.prfl-edit-ctnr {
}

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
    padding: 0 20px;
}
.prfl-edit__fields-wrapper .form__group {
    margin-top: 15px;
}
</style>
