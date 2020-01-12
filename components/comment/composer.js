/*
<ComposerAttch
    :attachmentList="attachmentList"
    @remove="attachmentList=[]"
    :uploading="uploading"
/>
<SendBox v-if="openComposer"
    immediateFocus=1
    @textOutbox="outBoxing"
    @picPick="addPic"
/>
*/

import SendBox from '@/components/chat/room/sendBox/'
import ComposerAttch from './ComposerAttch'
export const sendingHandler = {
    components: {SendBox, ComposerAttch},
    data:() => ({
        openComposer: false,
        attachmentList: [], // list<File>
        uploading: false
    }),
    computed: {
        content() { return this.onPost || this.comment }  
    },
    methods: {
        launchReplyComposer() {
            this.openComposer = false
            this.$nextTick(() => {
                this.openComposer = true
            })

        },
        outBoxing(input) {
            if (this.uploading) return
            this.uploading = true
            this.batchCompressUpload(this.attachmentList, uploadedUrls => {
                let url = ""
                let data = {}
                if (this.content.slug) { // is post, otherwise comment
                    url = `posts/${this.content.id}/comments/create`
                } else {
                    url = `posts/${this.content.on}/comments/create`
                    data.reply_to = this.content.id
                }
                if (uploadedUrls.length) data.attachments = [{
                    type: 2,
                    content: uploadedUrls[0],
                    order: 1
                }]
                if (input) data.text = input
                if (!uploadedUrls.length && !input) return
                this.$axios.post(url, data, this.$store.state.auth.head)
                    .then(res => {
                        this.uploading = false
                        this.attachmentList = []
                        this.fetchedData.unshift({
                            ...res.data,
                            author: this.$store.state.auth.my_profile,
                            my_react: null,
                            reactions: [],
                            reply_count: 0,
                        })
                    })
            })
        },
        addPic(evt) {
            if (this.uploading) return
            const file = evt.target.files[0]
            this.attachmentList = [file]
        }
    },
}