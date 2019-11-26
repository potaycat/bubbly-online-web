<template>
    <div>
        <div v-if="!attchId">
            <p :class="textFormatting">{{ text }}</p>
        </div>
        <div class="md-parse__attch" v-else-if="attachment.type==2">
            <img :src="attachment.content"/>
        </div>
    </div>
</template>

<script>
// I DONT KNOW REGULAR EXPRESSIONS
export default {
    props: [
        'block',
        'attachments'
    ],
    computed: {
        attchId() {
            let b = this.block
            if (b.slice(-1)=="]" && b.toLowerCase().indexOf("[attachment_")==0) {
                const attchId = Number( b.slice(12,-1) )
                if (attchId && attchId<=this.attachments.length) {
                    return attchId
                }
            }
            return null // *dynamic typing intensifies*
        },
        attachment() {
            if (this.attchId) {
                return this.attachments.find(x => x.order == this.attchId)
            } return null
        },
        textFormatting() {
            const open = this.block.indexOf("[")
            const close = this.block.indexOf("]")
            if (open==0 && open<close) {
                const styles = this.block.slice(1,close).toLowerCase().split('')
                // https://medium.com/@caymanbruce/finding-duplicate-characters-in-a-string-in-javascript-94e2cb23ab5e
                const duplicates = styles.sort().join('').match(/(.)\1+/g)
                if (duplicates == null) {
                    return styles.join(' ')
                }
            }
            return ''
        },
        text() {
            if (this.textFormatting) {
                return this.block.slice(this.block.indexOf("]")+1)
            }
            return this.block
        },
    },
    created() {
        if (this.attachment) {
            this.$emit('attachmentGot', this.attchId)
        }
    }
}
</script>

<style>
.b { font-weight: bold }
.d { font-weight: bolder }

.i { font-style: italic }
/* .q { transform: skewX(15deg) } */

.u { text-decoration: underline }
.s { text-decoration: line-through }
.o { text-decoration: overline }

.c { text-align: center }
.e { text-align: end }

.g { color: gray }
.r { color: crimson }
.p { color: hotpink }
.x { color: dodgerBlue }
.a { color: darkorange }
.l { color: limegreen }

.h { font-size: 27px }
.z { font-size: 20px }
.t { font-size: 11px }

.n { font-family: "Comic Sans MS", cursive, sans-serif }
.m { font-family: "Courier New", Courier, monospace }

.v { background: lightgray }
.w { background: slategray }
</style>