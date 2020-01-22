<template>
    <div class="the_big_frame">
    <div class="post-editor-ctnr --dtail-app-bar">
        <AppBarCustomBtn
            :customCmds="[
                {action: 'togglePreview', icon: 'remove_red_eye'},
                {action: 'done', icon: 'send'},
            ]"
            @togglePreview="previewing=true"
            @done="validateThen(done)"
        />
        <CmtyPicker v-if="!editMode&&!isComment" :pinboard="isPinboard" :attention="notValidated('cmty')"/>
        <div v-if="!editMode">
            <input v-if="!(isComment||isPinboard)"
                class="pstedit__title"
                v-model="title"
                placeholder="Title"
            />
            <section class="pstedit__toolbar box-shadow-3 shiny-white-bg">
                <label class="toolbar__btn --file-btn glow">
                    <i class="material-icons-round">add_photo_alternate</i>
                    <input type="file" accept="image/*" multiple @change="onFileChange" ref="img_input" style="display:none">
                </label>
                <div :class="['toolbar__btn --nsfw-on-btn glow',isNsfw?'--nsfw-btn--on':'--nsfw-btn--off']"
                    @click="isNsfw=!isNsfw">NSFW</div>
            </section>
        </div>

        <textarea :class="['pstedit__body', editMode?'pstedit__body--edit-mode':null]"
            v-model="body"
            placeholder="Text body"
        />

        <transition-group name="zoom_in_fade">
            <div v-for="(attch, index) in previews" :key="attch.file.name"
                class="attch-prvw__itm"
            >
                <div class="attch-prvw__x box-shadow-1 push" @click="previews.splice(index, 1)">x</div>
                <img :src="attch.blobUrl">
            </div>
        </transition-group>

        <transition name="zoom_in_fade">
            <div v-if="previewing" class="pstedit__preview total_darkness" @click="previewing=false">
                <h3 class="pstedit__prvw__title">{{title}} [Preview]</h3>
                <BubblyMarkdownParse :text="body" :attachments="attchs2prvw" class="pstedit__prvw__md"/>
                <p class="clck-anywhr">Click anywhere to close preview</p>
            </div>
        </transition>
        <div v-if="uploading" class="total_darkness"><Spinner color="#fff" /></div>
    </div>
    </div>
</template>

<script>
import CmtyPicker from './CmtyPicker'
import { editMode } from './editMode'
import { comment, pinboard } from './typed'

import AppBarCustomBtn from '@/components/misc/AppBarCustomBtn'
import BubblyMarkdownParse from '../mdParse'
import Spinner from '@/components/misc/Spinner'
import { formValidate } from '@/mixins/form_OLD'

export default {
    components: {
        BubblyMarkdownParse,
        AppBarCustomBtn,
        CmtyPicker,
        Spinner,
    },
    mixins: [editMode,comment,pinboard, formValidate],
    data:() => ({
        title: "",
        body: "",
        isNsfw: false,

        previews: [],
        uploading: false,
        previewing: false,
    }),
    computed: {
        rules() {
            let toValidate = {}
            toValidate.body = this.body.length || this.previews.length
            if (!this.editMode) {
                toValidate.cmty = this.$route.query.to
                if (!this.isPinboard) {
                    toValidate.title = true
                }
            }
            return toValidate
        },
        attchs2prvw() {
            let arr = []
            this.previews.forEach((attch, index) => {
                arr.push({
                    type: 2,
                    content: attch.blobUrl,
                    order: index+1
                })
            })
            return arr
        },
    },
    watch: {
        uploading(now, bef) {
            if (now==false && bef==true) {
                Object.assign(this.$data, this.$options.data.apply(this)) // reset data()
            }
        },
    },
    activated() {
        const init = this.$route.query.init; if (init) {
            this.body = init
        }
    },
    methods: {
        onFileChange(evt) {
            const input = this.$refs.img_input
            const mapped = this.previews.map(item => item.file.name)
            Array.from(input.files).forEach(file => {
                if (!file.type.startsWith("image/"))
                    return
                if (mapped.some(name => name==file.name))
                    return
                this.previews.push({
                    blobUrl: URL.createObjectURL(file),
                    file: file
                })
            })
            input.value= null
            this.$nextTick(() => {
                const ctnr = document.querySelector(".post-editor-ctnr")
                    ctnr.scrollTop = ctnr.scrollHeight
            })
        },

        done() {
            this.uploading = true
            if (this.editMode) this.performPatch()
            else if (this.isComment) this.performComment()
            else if (this.isPinboard) this.performPinToBoard()
            else this.performPost()
        },
        performPost() {
            const fileArr = this.previews.map(obj => obj.file)
            this.batchCompressUpload(fileArr, uploadedUrls => {
                let attchArr = []
                uploadedUrls.forEach((url, index) => {
                    attchArr.push({
                        type: 2,
                        content: url,
                        order: index+1
                    })
                })
                const data = {
                    attachments: attchArr,
                    text: this.body,
                    title: this.title,
                    is_nsfw: this.isNsfw,
                }
                Object.keys(data).forEach((key)=> !data[key] &&delete data[key])
                this.$axios.post(
                    `communities/${this.$route.query.to}/posts/create`, data,
                    this.$store.state.auth.head
                )
                    .then(res => {
                        this.uploading = false
                        this.$router.push(`/post/${res.data.id}`)
                    })
            })
        }
    }
}
</script>

<style>
.post-editor-ctnr {
    display: flex;
    flex-direction: column;
    overflow: auto;
    width: 100%;
}

.pstedit__title, .pstedit__body {
    padding: 10px;
    border: none;
    outline: none;
    border-bottom: solid 1px #ddd;
}
.pstedit__title {
    width: 100%;
    font-weight: bold;
    /* font-size: 18px; */
}
.pstedit__body {
    resize: none;
    min-height: calc(100vh - 250px);
}
.pstedit__body--edit-mode {
    /* height: calc(100vh - 130px); */
}

.attch-prvw__itm {
    width: 100%;
    padding: 10px 15px;
    position: relative;
}
.attch-prvw__itm > img {
    width: 100%;
}
.attch-prvw__x {
    position: absolute;
    border-radius: 100px;
    background: red;
    width: 20px;
    height: 20px;
    font-size: 13px;
    color: #fff;
    text-align: center;
    top: 5px;
    left: 7px;
}

.pstedit__preview {
    flex-direction: column;
}
.pstedit__prvw__md {
    background: #fff;
    padding: 10px;
    overflow-y: scroll;
    height: 100%;
    width: 100%;
}

.pstedit__prvw__title {
    width: 100%;
    padding: 12px;
    background: #fff;
    border-bottom: solid 1px #ddd;
}
.clck-anywhr {
    background: #fff;
    width: 100%;
    padding: 5px;
    text-align: center;
    color: var(--primary-color);
}


.post-editor-ctnr .pstedit__toolbar {
    position: absolute;
    height: 42px;
    bottom: 0;
    z-index: 9;
    width: 100%;
    display: flex;
}
.toolbar__btn {
    color: var(--primary-color);
    height: 100%;
    min-width: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
}
.--file-btn + .toolbar__btn {
    margin-left: 60px;
}
.--nsfw-btn--off {
    color: var(--primary-color-reduced-opacity);
    text-decoration: line-through;
}
.--nsfw-btn--on {
    color: red;
    font-weight: bold;
}
</style>