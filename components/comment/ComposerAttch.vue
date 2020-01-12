<template>
    <!-- maybe integrate this component to "SendBox" itself? -->
    <transition name="fade">
    <div v-if="toPreview.length"
        :class="['cmt-composer__attch-prevw__ctn box-shadow-2', uploading?'--cmt-uploading':null]">
        <div v-if="uploading" class="total_darkness">
            <Spinner color="#fff"/>
        </div>
        <div v-for="attch in toPreview" :key="attch" class="cmt-attch-prevw">
            <div class="cmt-attch-prevw__rm-btn push box-shadow-2"
                @click="$emit('remove')">×</div>
            <img :src="attch">
        </div>
    </div>
    </transition>
</template>

<script>
import Spinner from '@/components/misc/Spinner'
export default {
    components: { Spinner },
    props: ['attachmentList', 'uploading'],
    computed: {
        toPreview() {
            return this.attachmentList.map(file => URL.createObjectURL(file))
        }
    }
}
</script>

<style>
.cmt-composer__attch-prevw__ctn {
    position: absolute;
    bottom: 55px;
    background: #eee;
    border-radius: 20px;
    margin-left: 6px;
    width: calc(100% - 12px);
    height: 150px;
    padding: 8px 20px;
    overflow: auto;
    display: flex;
    transition: .6s;
}
.--cmt-uploading {
    z-index: 999999;
    bottom: 9px;
    height: 60px;
    overflow: hidden;
}
.cmt-attch-prevw {
    height: 100%;
    margin-right: 20px;
}
.cmt-attch-prevw > img {
    height: 100%;
}
.cmt-attch-prevw__rm-btn {
    position: absolute;
    width: 18px;
    height: 18px;
    border-radius: 20px;
    text-align: center;
    color: white;
    background: red;
    font-family: monospace;
}
</style>