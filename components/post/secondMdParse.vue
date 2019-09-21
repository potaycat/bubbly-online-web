<template>
    <div>
        <div v-if="!isAttch">
            <p :class="textFormatting">{{ text }}</p>
        </div>
        <div class="attch" v-else-if="attachment.type==2">
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
        isAttch() {
            let b = this.block
            if (b.slice(-1)=="]" && b.toLowerCase().indexOf("[attachment_")==0) {
                const no = Number( b.slice(12,-1) )
                if (no && no<=this.attachments.length) {
                    return no
                }
            }
            return null
        },
        textFormatting() {
            let styles = ''
            const open = this.block.indexOf("[")
            const close = this.block.indexOf("]")
            if (open==0 && close!=1 && open<close) {
                styles = this.block.slice(1,close).toLowerCase().split('').join(' ')
            }
            return styles
        },
        text() {
            if (this.textFormatting) {
                return this.block.slice(this.block.indexOf("]")+1);
            }
            return this.block
        },
        attachment() {
            const i = this.attachments.findIndex(x => x.ordering == this.isAttch)
            if (i != -1) {
                this.$emit('attchGotten', i)
                return this.attachments[i]
            }
        }
    },
}
</script>

<style>
.attch {
    margin-bottom: -5px;
}

.b { font-weight: bold }
.i { font-style: italic }
.u { text-decoration: underline }
.s { text-decoration: line-through }
.o { text-decoration: overline }
.c { text-align: center }
.e { text-align: end }
.g { color: gray }
.r { color: red }
.p { color: hotpink }
.x { color: blue }
.h { font-size: 27px }
.t { font-size: 11px }
.n { font-family: "Comic Sans MS", cursive, sans-serif }
.m { font-family: "Courier New", Courier, monospace }
.v { background: lightgray; }
</style>