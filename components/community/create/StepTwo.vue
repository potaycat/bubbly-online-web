<template>
    <div class="cmnty-step-2-ctnr">
        <h3 style="margin-top:20px">Choose a display image</h3>
        <div class="prfl-edit__pfp cmnty_ico">
            <img :src="icon || require('@/assets/group.png')">
            <label class="prfl-edit__upload-btn glow">
                <i class="material-icons-round">add_photo_alternate</i>
                <input type="file" @change="onPicChange" ref="pfp_input" style="display:none">
            </label>
        </div>
        <div class="cmnty-step-2__color">
            Color Pick
        </div>
    </div>
</template>

<script>
export default {
    data:() => ({
        icon: null,
    }),
    methods: {
        onPicChange() {
            const file = this.$refs.pfp_input.files[0]
            if (file) {
                this.icon = URL.createObjectURL(file)
            }
        },
    },
}
</script>

<style>
.cmnty-step-2-ctnr {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.prfl-edit__pfp {
    position: relative;
    overflow: hidden;
    border: solid 5px #ddd;
}.prfl-edit__pfp, .prfl-edit__pfp > img {
    height: 150px;
    width: 150px;
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

.prfl-edit__pfp, .cmnty-step-2__color {
    margin: 20px;
}
</style>
