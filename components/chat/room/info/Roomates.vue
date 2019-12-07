<template>
<transition appear name="slide_down">
    <div class="rmate-ctnr" ref="feed">
            <div class="rmate__actions">
                <p class="rmate__actions__lable">Options</p>
                <button v-if="isAdmin" class="rmate__actions__btn glow" @click="openAddDiag">Add members</button>
                <!-- <button class="glow">Sort by:</button> -->
                <button class="rmate__actions__btn glow" @click="">Order by:<br>Time</button>
            </div>

        <transition-group name="fade_in">
            <div v-for="mate in fetchedData" :key="mate.username" class="rmate-item push"
                @click="popItUp($event);performDisplay(mate)">
                <img class="pfp" :src="mate.profile_pic">
                <p class="rmate-item__alias">{{ mate.alias }}</p>
                <div v-if="mate.is_admin" class="rmate__is-admin box-shadow-1">🛡</div>
            </div>
        </transition-group>

        <AddDiag v-if="$route.query.chat_add=='open'" :roomId="threadInfo.id" 
            @added="onDidSomething" style="height:calc(100% - 35px);top:45px"/>
        <ProfilePeak v-if="peakingAt" @close="onClose" 
            :profile="peakingAt" :touchPos="touchPos"
            :threadInfo="threadInfo"
        />
    </div>
</transition>
</template>

<script>
import AddDiag from '../../AddDiag'
import { feedingFrenzy, maintainScrllPos } from '@/mixins/feedingFrenzy'
import { profilePeak } from '@/mixins/cmpnentsCtrl/profilePeak'
export default {
    components: {
        AddDiag,
    },
    mixins: [feedingFrenzy, maintainScrllPos, profilePeak],
    props: [
        'threadInfo',
        'isAdmin'
    ],
    data() {
        return {
            feedUrl: `chat/${this.threadInfo.id}/roommates/`,
        }
    },
    methods: {
        openAddDiag() {
            this.$router.push({query: {chat_add: 'open'}})
        },
        onDidSomething() {
            this.firstFetch()
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
    height: 400px;
    position: relative;
}
.rmate-ctnr span {
    padding-top: 3px;
    overflow: auto;
    padding-left: 85px;
}

.rmate__actions{
    background: #00000055;
    z-index: 99;
    backdrop-filter: blur(5px);
    box-shadow: 0px 0px 10px #00000055;
    width: 70px;
    position: absolute;
    border-bottom-right-radius: 10px;
}
.rmate__actions .rmate__actions__lable {
    text-align: center;
    font-size: 12px;
    color: #ffffffaa;
    font-weight: normal;
    padding: 15px 0;
}
.rmate__actions .rmate__actions__btn{
    color: #fff;
    text-shadow: 0px 0px 17px #333;
    font-weight: normal;
    width: 100%;
    padding: 12px 0;
}


.rmate-ctnr .rmate-item{
    color: #fff;
    text-shadow: 0px 0px 17px #333;
    height: 95px;
    width: 95px;
    display: flex;
    flex-direction: column;
    position: relative;
}
.rmate-item .pfp {
    width: 50px;
    height: 50px;
    margin: auto;
    margin-bottom: 0;
}
.rmate-item .rmate-item__alias {
    margin: auto;
    margin-top: 3px;
    font-weight: bold;
    font-size: 11px;
    overflow: hidden;
}
.rmate__is-admin {
    position: absolute;
    top: 10px;
    left: 10px;
    padding: 1px 6px;
    border-radius: 100px;
    font-weight: bold;
    font-size: 10px;
    background: slateblue;
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
