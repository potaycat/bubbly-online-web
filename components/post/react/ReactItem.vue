<template>
    <div :class="['push glow _react ', size, isMine?'mine box-shadow-1':null]">
        <img v-if="imgSrc" :src="imgSrc">
        <p v-else>👍</p>
        <div> {{ react.count }} </div>
    </div>
</template>

<script>
import { mapGetters } from "vuex"
export default {
    props: [
        'communityId',
        'react',
        'size',
        'isMine',
    ],
    computed: {
        ...mapGetters({
            iconById: 'reactIcons/iconById',
        }),
        imgSrc() {
            return this.react.img_src ? this.react.img_src : this.reactIcon.img_src
        },
        reactIcon() {            
            try {
                return this.iconById(this.communityId, this.react.icon_id)
            } catch (error) {
                console.log("React not found!")
                return {}
            }
        },
    },
}
</script>

<style>
._react {
    display: inline-flex;
    align-items: center;
    font-size: 12px;
    background: #eee;
    border-radius: 5px;
    padding: 2px 4px;
    margin-right: 4px;
}

._react.mine {
    background: rgba(72, 132, 237, 0.219);
}
._react.mine > div {
    color: rgb(72, 133, 237);
}

._react > img {
    width: 20px;
    height: 20px;
    margin: 0 2.5px;
}
._react > div {
    color: #555;
    font-weight: bold;
    margin: 0 3px;
}

._react.react-icon--big {
    margin: 5px 0;
    padding: 3px 6px;
    border-radius: 6px;
    margin-right: 6px;
}
._react.react-icon--big > img {
    width: 25px;
    height: 25px;
}
._react.react-icon--big > div {
    font-size: 15px;
}

._react.react-icon--smol {
    margin: 2px 0;
    margin-right: 4px;
}
._react.react-icon--smol > img {
    height: 18px;
    width: 18px;
}
._react.react-icon--smol > div {
    font-size: 10px;
}

</style>
