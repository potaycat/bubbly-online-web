<template>
    <nav class="app-bar detail-view"
        :style="[$store.state.detailBanner.text ? {'box-shadow':'0 0 15px #ccc'} :null]">
        
        <i @click="bacc()" class="material-icons-round push
            dtail-bar__btn
            dtail-bar__elemnt"
            >arrow_back</i>

        <transition appear name="slide_up">
            <img v-if="$store.state.detailBanner.picSrc"
                :src="$store.state.detailBanner.picSrc"
                :class="['dtail-bar__icon', 'dtail-bar__elemnt', picStyle]" 
            >
        </transition>
        <transition appear name="slide_up">
            <span v-if="$store.state.detailBanner.text" class="dtail-bar__title dtail-bar__elemnt">
                {{ $store.state.detailBanner.text }}
            </span>
        </transition>

        <i v-if="!moring && moring!=null" @click="openInfo()"
            class="material-icons-round push
                dtail-bar__btn
                dtail-bar__elemnt"
            >more_vert</i>
        <!-- info more_vert -->
    </nav>
</template>

<script>
export default {
    computed: {
        moring() {return this.$store.state.detailBanner.moring},
        picStyle() {
            switch (this.$store.state.detailBanner.picStyle) {
                case 'circle':
                    return 'pfp'
                case 'square':
                    return 'cmnty-ico'
                default:
                    return ''
            }
        },
    },
    created() {
        this.$store.commit('detailBanner/loadText', null)
        this.$store.commit('detailBanner/loadPic', {})
    },
    methods: {
        openInfo() {
            this.$store.commit('detailBanner/openInfo', true)
        },
        bacc() {
            if (this.moring) {
                this.$store.commit('detailBanner/openInfo', false)
            } else {
                // this.$store.commit('detailBanner/loadText', null);
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
    margin: 0 10px;
    color: rgb(72, 133, 237);
}
.dtail-bar__icon {
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
