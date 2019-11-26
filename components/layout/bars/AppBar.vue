<template>
    <nav class="app-bar detail-view"
        :style="$store.state.appBar.text ? {'box-shadow':'0 0 15px #ccc'} :null">
        
        <button @click="bacc" class="dtail-bar__btn push">
            <i class="material-icons-round">arrow_back</i>
        </button>

        <transition appear name="slide_up">
            <img v-if="$store.state.appBar.picSrc"
                :src="$store.state.appBar.picSrc"
                :class="['dtail-bar__pic', picStyle]" 
            >
        </transition>
        <transition appear name="slide_up">
            <span v-if="$store.state.appBar.text" class="dtail-bar__title">
                {{ $store.state.appBar.text }}
            </span>
        </transition>

        <button v-if="!moring && moring!=null" @click="openInfo"
            class="dtail-bar__btn push"
        >
            <i class="material-icons-round">more_vert</i>
        </button>
        <!-- info more_vert -->
    </nav>
</template>

<script>
export default {
    computed: {
        moring() {return this.$store.state.appBar.moring},
        picStyle() {
            switch (this.$store.state.appBar.picStyle) {
                case 'circle':
                    return 'pfp'
                case 'square':
                    return 'cmnty-ico'
                default:
                    return ''
            }
        },
    },
    activated() {
        this.$store.commit('appBar/reset')
    },
    methods: {
        openInfo() {
            this.$store.commit('appBar/burgerState', true)
        },
        bacc() {
            if (this.moring) {
            } else {
                this.$router.back()
            }
        }
    }
}
</script>

<style>
.detail-view {
    word-spacing: 0;
    background: linear-gradient(180deg, #fff 0, rgba(255,255,255,0.88) 100%);
    overflow: hidden;
    height: 56px;
    display: flex;
    align-items: center;
    justify-content: space-between;
}
.dtail-bar__btn {
    color: rgb(72, 133, 237);
    height: 100%;
    min-width: 45px;
    max-width: 45px;
}

.dtail-bar__pic {
    height: 30px;
    width: 30px;
    margin-right: 10px;
}
.detail-view .dtail-bar__title {
    font-size: 16px;
    font-weight: 600;
    overflow: hidden;
    white-space: nowrap;
    margin-right: auto;
}

.slide_up-enter-active,
.slide_up-leave-active {
  transition: .3s;
}
.slide_up-enter,
.slide_up-leave-to {
  transform: translate(3px, 60px);
  /* opacity: 0; */
}
</style>
