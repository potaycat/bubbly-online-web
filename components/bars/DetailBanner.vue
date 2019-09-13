<template>
    <div>
        <nav class="banner detail"
        v-bind:style="[$store.state.detailBanner.text ? {'box-shadow':'0 0 15px #ccc'} :null]">
            <button
                class="btn _detail_bar_back"
                @click="bacc()"
            >
                <i class="material-icons-round">arrow_back</i>
            </button>

            <transition appear name="slide_up"><span id="title">
                {{ $store.state.detailBanner.text }}
            </span></transition>
                
            <button v-if="!$store.state.detailBanner.moring"
                class="btn _detail_bar_info"
                @click="openInfo()"
            >
                <i class="material-icons-round">more_vert</i><!-- info more_vert -->
            </button>
            <!--img id="pfp" :src="p.profile_pic" /-->
        </nav>
        <div style="min-height:56px"/>
    </div>
</template>

<script>
export default {
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
._detail_bar_back {
    color: rgb(72, 133, 237);
    padding: 10px 15px;
}
._detail_bar_info {
    color: rgb(72, 133, 237);
    padding: 10px 15px;
    margin-left: auto;

}
.detail #title {
    margin-top: 16px;
    font-size: 16px;
    font-weight:600;
    overflow: hidden;
    /* max-width: calc(100% - 120px); */
    white-space: nowrap;
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
