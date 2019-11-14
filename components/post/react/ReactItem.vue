<template>
    <div :class="'lift push _react '+size" style="display:inline-flex">
        <img v-if="!react.react" src="@/assets/thumb_up.png">
        <img v-else :src="imgSrc">
        <div> {{ react.count }} </div>
    </div>
</template>

<script>
export default {
    props: [
        'community',
        'react',
        'size',
    ],
    computed: {
        imgSrc() {
            return this.react.react__img_ref ? this.react.react__img_ref :
                this.$store.state.reactIcons.icons[this.community][this.react.react].img_ref
        },
    },
}
</script>

<style>
._react {
    display: flex;
    font-size: 12px;
    background: #f0f0f0;
    border-radius: 5px;
    padding: 2px;
    margin: 0 5px;
}
._react > img {
    width: 21px;
    height: 21px;
    margin: auto 2px;
}
._react div {
    color: #aaa;
    font-weight: bold;
    margin: auto 3px;
}

._react.react-icon--big {
    margin: 5px 3px;
    padding: 3px;
    border-radius: 6px;
}
._react.react-icon--big > img {
    width: 26px;
    height: 26px;
}
._react.react-icon--big > div {
    font-size: 14px;
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



.my_react {
    box-shadow: 0 4px 8px #bbb;
    background: #f1f1f1;
    /* border: 1px solid #888; */
}
.my_react div {
    color: rgb(72, 133, 237);
}

</style>
