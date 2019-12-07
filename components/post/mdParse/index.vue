<template>
    <div>
        <FormatBlock v-for="(b, index) in blocks"
            :key="index"
            class="content-block"
            :block="b"
            :attachments="attachments"
            @attachmentGot="usedAttchs.push($event)"
        />
        <div v-for="attachment in unusedAttchs"
            :key="`atch_${attachment.order}`"
            class="unused-attchs"
        >
            <img v-if="attachment.type==2"
                :src="attachment.content"
            />
        </div>
    </div>
</template>

<script>
import FormatBlock from './FormatBlock'
export default {
    props: [
        'text',
        'attachments'
    ],
    components: {FormatBlock},
    data() {
        return {
            usedAttchs: []
        }
    },
    computed: {
        blocks() {
            return this.text.split(/\r?\n/)
        },
        unusedAttchs() {
            return this.attachments.filter(obj => !this.usedAttchs.includes(obj.order))
        }
    },
}
</script>

<style>
.content-block > div > *{
    margin-bottom: 6px;
    width: 100%;
    user-select: text;
}
.content-block .attch {
    margin-bottom: -5px;
}

.unused-attchs > img{
    width: 100%;
}
</style>