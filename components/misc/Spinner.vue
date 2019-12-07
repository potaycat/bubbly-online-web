<template>
    <div class="lds-ring"><div></div><div></div><div></div><div></div></div>
</template>

<script>
export default {
    props: {
        // // Basic type check (`null` and `undefined` values will pass any type validation)
        // propA: Number,
        // // Multiple possible types
        // propB: [String, Number],
        // // Required string
        // propC: {
        //   type: String,
        //   required: true
        // },
        // // Number with a default value
        color: {
            type: String,
            default: '#999'
        },
    },
    mounted() {
        const rings = document.querySelectorAll('.lds-ring div')
        rings.forEach(ring => {
            ring.style['border-color'] = 
                `${this.color} transparent transparent transparent`
        })
    }
}
</script>

<style>
.lds-ring, .lds-ring div {
    width: 25px;
    height: 25px;
    align-self: center;
}
.lds-ring {
    display: inline-block;
    position: relative;
}
.lds-ring div {
    box-sizing: border-box;
    display: block;
    position: absolute;
    border: 3px solid;
    border-radius: 50%;
    animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
    /* border-color: #000 transparent transparent transparent; */
}
.lds-ring div:nth-child(1) {
    animation-delay: -0.45s;
}
.lds-ring div:nth-child(2) {
    animation-delay: -0.3s;
}
.lds-ring div:nth-child(3) {
    animation-delay: -0.15s;
}
@keyframes lds-ring {
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
}

</style>