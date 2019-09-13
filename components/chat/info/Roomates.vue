<template>
        <transition appear name="slide_down">
    <div class="mate_containter">
            <div class="_actions glow">
                <div>Actions</div>
                <button v-if="isAdmin" @click="toggleMemAdd()">Add members</button>
                <button v-if="isAdmin">Promote Admin</button>
                <button>Sort by:</button>
                <button>Search</button>
            </div>
            <div v-for="gr in peeps" :key="gr[0].identity.id" class="_peep_ctn glow">
                <div v-for="mate in gr" :key="mate.identity.id" class="_chat_member">
                        <transition name="fade_in">
                    <img class="pfp_l" :src="mate.identity.profile_pic"></transition>
                    <p>{{ mate.identity.alias }}</p>
                </div>
            </div>
        <NewCh v-if="addingMem" :room_id="room_id" 
            @close_diag="toggleMemAdd"/>
    </div>
        </transition>
</template>

<script>
import NewCh from '../NewCh'
export default {
    components: {
        NewCh,
    },
    props: [
        'room_id',
        'isAdmin'
    ],
    data() {
        return {
            peeps: [],
            addingMem: false,
        }
    },
    computed: {
    },
    created() {
        this.$axios.get('chat/roommates/?format=json&room_id='+this.room_id, 
            this.$store.state.pheader )
        .then(res => {
            // for (let i = 0; i < 20; i++) { 
                this.peeps.push(...res.data) 
            // }
            this.peeps = this.groupArr(this.peeps, 4)
        })
        
    },
    methods: {
        toggleMemAdd() {
            this.addingMem = ! this.addingMem
        },
        groupArr(data, n) { //stolen https://stackoverflow.com/questions/38048497/group-array-values-in-group-of-3-objects-in-each-array-using-underscore-js
            let group = [];
            for (let i = 0, j = 0; i < data.length; i++) {
                if (i >= n && i % n === 0) j++;
                group[j] = group[j] || [];
                group[j].push(data[i])
            }
            return group;
        },
    }
}
</script>

<style>
.mate_containter{
  scroll-snap-type: mandatory;
  scroll-snap-points-x: repeat(300px);

    display: flex;
    flex-direction: row;
    box-shadow: 
        inset 0px 11px 8px -10px #00000077,
        inset 0px -11px 8px -10px #00000077; 
    background: #00000019;
    /* pointer-events: none; */
    width: 100%;
    height: 390px;
    overflow-y: hidden;
}
.mate_containter ._peep_ctn{ /* REMOVE/FIX THIS */
    scroll-snap-align: start;
    /* background: #00000019; */
} .mate_containter .glow :active{
    /* border-radius: 50px; */
}

._actions{
    box-shadow: 0px 0px 10px #00000055;
    width: 90px;
}
._actions div {
    pointer-events: none;
    text-align: center;
    font-size: 12px;
    color: #ffffffaa;
    font-weight: normal;
    padding: 15px 20px;
}
._actions button{
    color: #fff;
    text-shadow: 0px 0px 17px #333;
    font-weight: normal;

    width: 100%;
    height: 75px;
}
.mate_containter ._chat_member{
    color: #fff;
    text-shadow: 0px 0px 17px #333;
    height: 95px;
    width: 95px;
    display: flex;
    flex-direction: column;
}

._chat_member .pfp_l {
    pointer-events: none;
    border-radius: 100px;
    width: 50px;
    height: 50px;
    margin: auto;
}
._chat_member p {
    pointer-events: none;
    margin: auto;
    margin-top: 0;
    font-weight: bold;
    text-align: center;
    font-size: 11px;
    overflow: hidden;
}
</style>
