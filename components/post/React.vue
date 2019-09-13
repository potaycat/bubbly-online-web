<template>
    <div class="lift" style="display:inline-flex">
    <div :class="'_rea '+size">
        <img v-if="!reactId" src="@/assets/thumb_up.png">
        <img v-else :src="getIcon">
        <div> {{reactCount}} </div>
    </div></div>
</template>

<script>
export default {
    props: [
        'reactId',
        'reactCount',
        'reactData',
        'size',
    ],
    computed: {
        getIcon() {
            let index = this.reactData.findIndex(x => x.id == this.reactId)
            return this.reactData[index].img_ref
        },
    },

}
</script>

<style>
._rea {
    display: flex;
    font-size: 12px;
    background: #fafafa;
    border-radius: 5px;
    padding: 2px;
    margin: 0 2px;
}
._rea img {
    pointer-events: none;
    width: 21px;
    height: 21px;
    margin: auto 2px;
}
._rea div {
    pointer-events: none;
    color: #aaa;
    font-weight: bold;
    margin: auto 2px;
}
.my_react {
    box-shadow: 0 4px 8px #bbb;
    background: #f1f1f1;
    /* border: 1px solid #888; */
}
.my_react div {
    color: rgb(72, 133, 237);
}


._rea_big {
    margin: 5px 3px;
}
._rea_big img {
    width: 24px;
    height: 24px;
}
._rea_big div {
    color: #777;
}

._rea_smol {
    margin: 2px;
}
._rea_smol img {
    height: 18px;
    width: 18px;
}
._rea_smol div {
    font-size: 10px;
}
</style>
