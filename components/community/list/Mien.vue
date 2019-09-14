<template>
    <div id="mienCs">
        <div class="the_big_frame"> <div class="la_content">
            <div style="min-height:69px"/>
                <transition-group name="list-complete" class="lift">
            <nuxt-link v-for="community in fetchedData"
                :key="community.id"
                class="_c_block bg"
                :style="'background-image:url('+community.cover_img+')'"
                :to="`/community/${community.id}`"
            >
                <img class="comu_icon" :src="community.icon_img"/>
                <div class="_txt">
                    <p class="_c_name">{{ community.name }}</p>
                    <div class="_rep_count">Reputation point: 0</div>
                    <!-- <p class="_pop">1350 members</p> -->
                    <!--p class="_description">{{ community.intro }} </p-->
                </div>
            </nuxt-link>
                </transition-group>
            <div style="min-height: 69px"/>

            <!-- <div class="FAB">
                <button @click="toggleMemAdd()">
                    <i style="pointer-events: none" class="material-icons-round">create</i>
                    <transition name="wipe_zoom"><span v-if="$store.state.scrollinUp">&nbsp New message</span></transition>
                </button>
            </div> -->

        </div></div>
        <FAB @clicked="toggleMemAdd()"
            icon= "add_circle_outline"
            actionName= "Create your community"
        />
    </div>
</template>

<script>
import { feedingFrenzy } from '@/mixins/feedingFrenzy'
import FAB from '@/components/actions/FAB'

export default {
    components: {
        FAB
    },
    mixins: [
        feedingFrenzy,
    ],
    data() {
        return {
            addingMem: false,
            cache: 'st_cmnt',
        }
    },
    methods: {
        toCommunity(c){
            // this.$store.commit('detailBanner/loadText', this.getRoomTitle(room)); // optimize!
            // this.$store.commit('chat/loadChat', room)
            this.$router.push('/chat/t/' + room.id)
        },

        urlConstruct(offset) {
            return 'communities/'
        },
        toggleMemAdd() {
            console.log(this.$store.state.jwtlogin.jwt);
            this.addingMem = ! this.addingMem
        },
    },
}
</script>

<style>
#mienCs .lift{
    width: 100%;
}
._c_block {
    box-shadow: inset 0px -120px 50px -40px #000000aa;
    /* background: linear-gradient(rgba(0,0,0, 0.5),rgba(0,0,0, 0.5)),; */
    display: flex;
    padding: 10px;
    height: 100px;
}

._c_block .comu_icon {
    width: 45px;
    height: 45px;

    margin: auto 10px;
}

._c_block ._txt {
    color: #fff;
    pointer-events: none;
    display: flex;
    flex-direction: column;
    margin: auto 5px;
}
._txt ._c_name {
    /* font-weight: bold; */
    font-size: 20px;
    max-height: 59px;
    overflow: hidden;
}
._txt ._rep_count {
    font-size: 13px;
    color: #eee
}
</style>
