<template>
    <!-- this is wierd. TODO refactor -->
    <transition name="fade">
        <div class="side-chat-room-ctnr">
            <ActivityView />
            <Room v-if="clean"
                :key="$route.query.room"
                @cleansed="clean=true"
            />
        </div>
    </transition>
</template>

<script>
import ActivityView from '@/components/layout/ActivityView'
import Room from './room/'
export default {
    components: { ActivityView, Room },
    data:() => ({
        clean: true
    }),
    beforeCreate() {
        if (window.innerWidth < 750) {
            this.$router.replace(`/chat/t/${this.$route.query.room}`)
        }
    }, 
    watch: {
        '$route.query.room'() {
            // https://github.com/vuejs/vue/issues/6518 bruh
            this.clean = false
        },
    },
}
</script>

<style>
.side-chat-room-ctnr {
    position: fixed;
    top: 0;
    right: 0;
    left: calc(15% + 270px);
    max-width: 650px;
    z-index: 9999;
}
@media only screen and (min-width: 1200px) {
    .side-chat-room-ctnr {
        left: calc(50% + 59px);
    }
}
</style>
