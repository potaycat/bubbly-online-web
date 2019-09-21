<template>
    <div>
        <nav class="banner detail"
        v-bind:style="[$store.state.detailBanner.text ? {'box-shadow':'0 0 15px #ccc'} :null]">
            <div
                class="_detail_bar_back db-item"
                @click="bacc()"
            >
                <i class="material-icons-round">arrow_back</i>
            </div>

            <transition appear name="slide_up">
                <img v-if="$store.state.detailBanner.picSrc"
                    :src="$store.state.detailBanner.picSrc"
                    :class="['db-icon', 'db-item', picStyle]" 
                >
            </transition>

            <transition appear name="slide_up">
                <span v-if="$store.state.detailBanner.text" class="db-title db-item">
                    {{ $store.state.detailBanner.text }}
                </span>
            </transition>
                
            <div v-if="!$store.state.detailBanner.moring"
                class="_detail_bar_info db-item"
                @click="openInfo()"
            >
                <i class="material-icons-round">more_vert</i><!-- info more_vert -->
            </div>
        </nav>
        <div style="min-height:56px"/>
    </div>
</template>

<script>
export default {
    computed: {
        picStyle() {
            console.log(this.$store.state.detailBanner.picStyle);
            
            switch (this.$store.state.detailBanner.picStyle) {
                case 'circle':
                    return 'pfp'
                case 'square':
                    return 'comu_icon'
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
            if (this.$store.state.detailBanner.moring) {
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
.detail {
    word-spacing: 0;
  /* background-color: rgba(7, 5, 5, 0.9); */
    background: linear-gradient(180deg, #fff 0, rgba(255,255,255,0.88) 100%);
    z-index: 9;
    overflow: hidden;
    display: flex;
}
.db-item {
    margin: auto 5px;
}
.db-item .material-icons-round{
    padding-top: 3px;
}
._detail_bar_back {
    color: rgb(72, 133, 237);
    padding-left: 5px;
}
.db-icon {
    height: 30px;
    width: 30px;
}
.detail .db-title {
    font-size: 16px;
    font-weight:600;
    overflow: hidden;
    /* max-width: calc(100% - 120px); */
    white-space: nowrap;
}
._detail_bar_info {
    color: rgb(72, 133, 237);
    margin-left: auto;
    padding-left: 5px;
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
