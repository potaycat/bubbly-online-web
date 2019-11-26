<template>
    <div class="post-editor-ctnr --dtail-app-bar">
        <AppBarCustomBtn
            :customCmds="[
                {action: 'togglePreview', icon: 'remove_red_eye'},
                {action: 'post', icon: 'send'},
            ]"
            @togglePreview="previewing=true"
            @post="post"
        />
        
        <div class="extra-content-bar box-shadow-3 shiny-white-bg">
            <label class="pstedit__file-input bttm-bar__btn glow">
                <i class="material-icons-round">add_photo_alternate</i>
                <input type="file" multiple @change="onFileChange" ref="file_input" style="display:none">
            </label>
        </div>

        <input class="pstedit__title"
            v-model="title"
            placeholder="Title"
        />
        <textarea class="pstedit__body"
            v-model="body"
            placeholder="Body"
        />

        <transition-group name="zoom_in_fade">
            <div v-for="attch in previews" :key="attch.name"
                class="attch-prvw__itm"
            >
                <div class="attch-prvw__x box-shadow-1 push" @click="previews.splice(index, 1)">x</div>
                <img :src="attch.blobUrl">
            </div>
        </transition-group>

        <transition name="zoom_in_fade">
            <div v-if="previewing" class="pstedit__preview total_darkness" @click="previewing=false">
                <h3 class="pstedit__prvw__title">{{title}} [Preview]</h3>
                <BubblyMarkdownParse :text="body" :attachments="attachmentsList" class="pstedit__prvw__md"/>
                <p class="clck-anywhr">Click anywhere to close preview</p>
            </div>
        </transition>
    </div>
</template>

<script>
import { textareaAutoResize } from '@/mixins/commonLogicSeparation'
import BubblyMarkdownParse from '../mdParse'
import AppBarCustomBtn from '@/components/misc/AppBarCustomBtn'
export default {
    components: {
        BubblyMarkdownParse,
        AppBarCustomBtn,
    },
    mixins: [textareaAutoResize],
    props: ['community'],
    data() {return {
        title: "",
        body: "",
        previews: [],

        uploading: false,
        previewing: false
    }},
    computed: {
        attachmentsList() {
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
    activated() {
        // this.$store.commit('appBar/loadText', "Compose a post")
    },
    methods: {
        onFileChange(evt) {
            const input = this.$refs.file_input
            const mapped = this.previews.map(item => { return item.name })
            Array.from(input.files).forEach(file => {
                if ( !mapped.some(itemName => { return itemName == file.name }) ) {
                    this.previews.push({
                        name: file.name,
                        blobUrl: URL.createObjectURL(file),
                        file: file
                    })
                }
            })
            input.value= null
            this.$nextTick(() => {
                window.scrollTo(0, document.body.scrollHeight)
            })
        },
        post() {
            this.uploading = true

            const attachmentsList = [
                {
                    type: 2,
                    content: "",
                    order: 1
                },
                {
                    type: 2,
                    content: "",
                    order: 2
                },
                {
                    type: 2,
                    content: "",
                    order: 3
                },
                {
                    type: 2,
                    content: "",
                    order: 4
                },
                {
                    type: 2,
                    content: "",
                    order: 5
                },
            ]

            const data = {
                attachments: attachmentsList,
                text: this.body,
                title: this.title
            }
            this.$axios.post(
                `communities/${this.community.id}/posts/create`, data,
                this.$store.state.authHeader
            )
                .then(res => {
                    this.uploading = false
                    this.$router.push(`/post/${res.data.id}`)
                })
            
        }
    }
}
</script>

<style>
.post-editor-ctnr {
    display: flex;
    flex-direction: column;
    padding-top: 52px;
}

.pstedit__title, .pstedit__body {
    padding: 10px;
    border: none;
    outline: none;
}
.pstedit__title {
    border-bottom: solid 1px #eee;
    font-weight: bold;
    /* font-size: 18px; */
}
.pstedit__body {
    resize: none;
    overflow-y: hidden;
    height: calc(100vh - 200px);
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
    color: rgba(72, 133, 237, 0.95);
}


.post-editor-ctnr .extra-content-bar {
    position: fixed;
    bottom: 0;
    z-index: 9;
    width: 100%;
    height: 40px;
    display: flex;
}
.bttm-bar__btn {
    height: 100%;
    width: 50px;
}

.pstedit__file-input {
    /* background: #999; */
    color: rgb(72, 133, 237);
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>