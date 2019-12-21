<template>
        <!-- <transition name="fade"> -->
    <div v-if="peeps.length > 0" class="typing_holder">
        <img v-for="typer in peeps.slice(0, 7)"
            class="pfp"
            :key="typer.user.id"
            :src="typer.user.profile_pic"
        >
        <div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
    </div>
        <!-- </transition> -->
</template>

<script>
export default {
    props: [
        'peeps',
    ],
    beforeDestroy() {
    },
}
</script>

<style>
.typing_holder {
    margin: 20px 11px 0;
    display: flex;
    align-items: center;
    align-self: flex-start;
    height: 12px;
    /* background: #000; */
}
.typing_holder .pfp {
    width: 35px;
    height: 35px;
    margin-right: 10px;
}



.lds-ellipsis {
    display: flex;
    align-items: center;
    transform: scale(0.8);
    
    position: relative;
}
.lds-ellipsis div {
    position: absolute;
    width: 11px;
    height: 11px;
    border-radius: 50%;
    background: #fff;
    animation-timing-function: cubic-bezier(0, 1, 1, 0);
}
.lds-ellipsis div:nth-child(1) {
    left: 6px;
    animation: lds-ellipsis1 0.6s infinite;
}
.lds-ellipsis div:nth-child(2) {
    left: 6px;
    animation: lds-ellipsis2 0.6s infinite;
}
.lds-ellipsis div:nth-child(3) {
    left: 26px;
    animation: lds-ellipsis2 0.6s infinite;
}
.lds-ellipsis div:nth-child(4) {
    left: 45px;
    animation: lds-ellipsis3 0.6s infinite;
}
@keyframes lds-ellipsis1 {
    0% {
        transform: scale(0);
    }
    100% {
        transform: scale(1);
    }
}
@keyframes lds-ellipsis3 {
    0% {
        transform: scale(1);
    }
    100% {
        transform: scale(0);
    }
}
@keyframes lds-ellipsis2 {
    0% {
        transform: translate(0, 0);
    }
    100% {
        transform: translate(19px, 0);
    }
}
</style>
