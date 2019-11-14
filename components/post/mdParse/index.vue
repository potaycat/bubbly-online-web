<template>
    <div>
        <FormatBlock v-for="(b, index) in blocks"
            :key="index"
            class="content-block"
            :block="b"
            :attachments="attachments"
            @attchGotten="attchGotten"
        />
        <div v-for="attachment in unusedAttchs"
            :key="attachment.order"
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
    components: {
        FormatBlock
    },
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
            return this.attachments.filter((d, i) => this.usedAttchs.indexOf(i) == -1)
        }
    },
    methods: {
        attchGotten(index) {
            this.usedAttchs.push(index)
        }
    }
}
</script>

<style>
.content-block div *{
    margin-bottom: 6px;
    width: 100%;
}

.unused-attchs {
    margin: 15px -15px 0 -15px;

}
.unused-attchs *{
    width: 100%;
}
</style>