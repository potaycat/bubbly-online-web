<template>
<transition appear name="slide_down">
    <div class="rmate-ctnr" ref="feed">
            <div class="rmate__actions">
                <p>Options</p>
                <button v-if="isAdmin" class="glow" @click="openAddDiag">Add members</button>
                <button v-if="isAdmin" class="glow" @click="openAddDiag">Promote Admin</button>
                <!-- <button class="glow">Sort by:</button> -->
                <button class="glow" @click="">Order by:<br>Time</button>
            </div>

        <transition-group name="fade_in">
            <div v-for="mate in fetchedData" :key="mate.username" class="_rmates push">
                <img class="pfp" :src="mate.profile_pic">
                <p>{{ mate.alias }}</p>
            </div>
        </transition-group>

        <AddDiag v-if="$route.query.chat_add=='open'" :room_id="room_id" 
            @added="refreshMates" style="height:calc(100% - 35px);top:45px"/>
    </div>
</transition>
</template>

<script>
import AddDiag from '../../AddDiag'
import { feedingFrenzy } from '@/mixins/feedingFrenzy'
export default {
    components: {
        AddDiag,
    },
    mixins: [feedingFrenzy],
    props: [
        'room_id',
        'isAdmin'
    ],
    data() {
        return {
            feedUrl: `chat/${this.room_id}/roommates/`,
        }
    },
    methods: {
        openAddDiag() {
            this.$router.push({query: {chat_add: 'open'}})
        },
        refreshMates() {
            this.fetchedData = []
            this.fetch()
        },
    }
}
</script>

<style scoped>
.rmate-ctnr, .rmate-ctnr span {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    width: 100%;
}
.rmate-ctnr{
    box-shadow: 
        inset 0px 11px 8px -10px #00000077,
        inset 0px -11px 8px -10px #00000077; 
    background: #00000019;
    height: 390px;
    position: relative;
}
.rmate-ctnr span {
    padding-top: 3px;
    overflow: auto;
    padding-left: 85px;
}

.rmate__actions{
    background: #00000033;
    box-shadow: 0px 0px 10px #00000055;
    width: 70px;
    position: absolute;
    border-bottom-right-radius: 10px;
}
.rmate__actions p {
    text-align: center;
    font-size: 12px;
    color: #ffffffaa;
    font-weight: normal;
    padding: 15px 0;
}
.rmate__actions button{
    color: #fff;
    text-shadow: 0px 0px 17px #333;
    font-weight: normal;
    width: 100%;
    padding: 12px 0;
}


.rmate-ctnr ._rmates{
    color: #fff;
    text-shadow: 0px 0px 17px #333;
    height: 95px;
    width: 95px;
    display: flex;
    flex-direction: column;
}
._rmates .pfp {
    width: 50px;
    height: 50px;
    margin: auto;
    margin-bottom: 0;
}
._rmates p {
    margin: auto;
    margin-top: 3px;
    font-weight: bold;
    font-size: 11px;
    overflow: hidden;
}


.slide_down-enter-active,
.slide_down-leave-active {
    transition: .4s;
}
.slide_down-enter,
.slide_down-leave-to {
    margin-bottom: -390px;
    opacity: 0;
}
</style>
