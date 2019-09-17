<template>
        <transition appear name="zoom_fade">
    <div class="total_darkness">
        <div id="add_container">
            <div class="_btn_ctn">
                <button class="btn" @click="$emit('close_diag')"><div>Cancel</div></button>
                <button class="btn" style="margin-left:auto" @click="hahayes()">
                    <div v-if="room_id">Add</div>
                    <div v-else>Enter room</div>
                </button>
            </div>
            
            <div class="_peep_added">
                <div v-if="selected_peeps.length" style="background:none;font-weight:bold">Selected people: </div>

                    <transition-group name="list-complete">
                        <!-- MAKE THIS STOP CRASHING -->
                <div v-for="person in selected_peeps"
                    :key="person.id"
                    class="slt"
                    v-bind:id="[deleting == person.id ? 'deleting' :null]"
                    @click="toRemove(person)"
                >
                    <img v-if="deleting != person.id" class="pfp" :src="person.profile_pic">
                    <img v-else class="pfp" src="~assets/ex.png">
                    <p>{{ person.alias }}</p>
                </div></transition-group>

                <i v-if="!selected_peeps.length" style="color:#00000077" class="material-icons-round">search</i>
                <div style="background:none"><input
                    type="text"
                    :placeholder="searcgphrase"
                    autocomplete="off"
                    v-model="srch"
                    @input="deleting=null"
                    @click="deleting=null"
                    @keyup.backspace="[!srch&&selected_peeps.length ? toRemove(selected_peeps[selected_peeps.length - 1]) :null]"
                ></div>
            </div>
            <div class="sub_tab" style="position: absolute;width:95%" @click="is_following=!is_following">
                <button v-bind:id="[is_following ? 'focusing' :null]">FOLLOWINGS</button>
                <button v-bind:id="[!is_following ? 'focusing' :null]">FOLLOWERS</button>
            </div>
            <div class="_peep_list glow">
                <!-- <transition-group name="fade_in"> -->
                <div v-for="person in peeps"
                    :key="person.id"
                    class="fll"
                    @click="toRemove(person, true)"
                >
                    <img class="pfp" :src="person.profile_pic">
                    <p>{{ person.alias }}</p>
                    <div v-bind:id="[isChoosed(person.id) ? 'checked' :null]" class="checkbox"/>
                </div>
                <!-- </transition-group> -->
            </div>
        </div>
    </div>
        </transition>
</template>

<script>
export default {
    props: [
        'room_id',
    ],
    data() {
        return {
            loading4More: false,
            reachedEnd: false,
            peeps: [],
            
            srch: "",
            selected_peeps: [],
            deleting: null,
            is_following: true, // else is follower

            searcgphrase: null,
            url: null,
            prepo: null,
        }
    },
    watch: {
        is_following: {
            immediate: true,
            handler(yes) {
                if (yes) {
                    this.searcgphrase = "Search my followings"
                    this.url = "/follow/edby?user="
                    this.prepo = "to_user"
                }
                else {
                    this.searcgphrase = "Search my followers"
                    this.url = "/follow/u?ser="
                    this.prepo = "from_user"
                }
                this.peeps = []
                this.fetch('') // crash if executed too fast
            },
        },
    },
    methods: {
        fetch(last_user) {
            if (!this.loading4More) {
                console.log(this.peeps);
                
                this.loading4More = true
                    console.log("22222222");
                this.$axios.get(this.url +this.$store.state.jwtlogin.my_profile.id+'&format=json&last='+last_user)
                .then(res => {
                    console.log(this.peeps);
                    if (this.loading4More) {
                        if (res.data.length < 20) this.reachedEnd = true
                        
                        let len = res.data.length; while (len--) { // xịn xò
                            this.peeps.push(res.data[len][this.prepo])
                        }
                        console.log("3333333333");
                        this.loading4More = false
                    }
                })
            }
        },
        toRemove(whom, bypass) {
            let index = this.selected_peeps.findIndex(x => x.id == whom.id)
            
            if (index == -1) {
                this.selected_peeps.push(whom) //(JSON.parse(JSON.stringify(whom))) // deep copy
            }
            else {
                if (this.deleting == whom.id || bypass) {
                    this.selected_peeps.splice(index, 1)
                    this.deleting = null
                }
                else {
                    this.deleting = whom.id
                }
            }
        },
        isChoosed(id) {
            return this.selected_peeps.some(e => e.id == id)
        },

        hahayes() {
            if (!this.room_id) this.room_id=null
            let parti = []
            let len = this.selected_peeps.length;
            if (len) {
                while (len--) {
                    parti.push({
                        identity: this.selected_peeps[len].id
                    })
                }
                let data = {
                    ai_dee: this.room_id,
                    participants: parti,
                }

                this.$axios.post('chat/add/',
                    data, this.$store.state.pheader)
                .then(res => {
                    this.$emit('close_diag')
                    // console.log(res);
                    if (!this.room_id) {
                        this.$router.push('/chat/t/'+res.data.id)
                    }
                })
            }
        }
    },
    mounted() {
        // INFINITE SCROLL
        let container = document.querySelector("._peep_list")
        
        container.addEventListener('scroll', () => {
            if (container.scrollTop + container.clientHeight <= container.scrollHeight-200) { // SCROLL TO BOTTOM
                if (!this.reachedEnd && !this.loading4More) {
                    this.fetch(this.peeps[this.peeps.length - 1].id)
                    // this.reachedEnd = true
                }
            }
        }, {
            capture: true,
            passive: true})
        // End of infinite scroll

    },
}
</script>

<style>
#add_container {
    z-index: 999;
    margin: auto;
    /* background: #ffffffdd; */
    background: linear-gradient(160deg, #fff 0, #ffffffee 50%, #fff 100%);
    border-radius: 20px;
  box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
    width: 95%;
    height: 95%;
}
#add_container ._btn_ctn {
    display: flex;
    padding: 13px;
}

._peep_added {
    /* box-shadow: 
        inset 0px 11px 8px -10px #00000015,
        inset 0px -11px 8px -10px #00000015;  */

    padding: 10px;
    max-height: 120px;
    overflow-x: auto;
    /* transition: .2s; */
}
._peep_added div {
    font-size: 14px;
    display: inline-block;
    max-width: 100%;
    overflow: hidden;
    background: #eee;
    border-radius: 20px;
    padding: 3px;
}
._peep_added #deleting {
    background: #00000055;
}

#add_container input {
    /* width: 150px; */
    font-size: 15px;
    border: none;
    background: none;
    outline: none;
}

._peep_list {
    padding: 60px 0 20px 0;
    border-radius: 0 0 20px 20px;
    overflow-y: scroll;
    height: calc(100% - 143px);
    /* background: #999; */
}
._peep_list .fll{
    /* border-radius: 10px; */
    display: flex;
    padding: 5px 20px;
}
.fll .pfp {
    height: 40px;
    width: 40px;
}
.fll p {
    pointer-events: none;
    margin: auto;
    margin-left: 20px;
    font-weight: bold;
    font-size: 14px;
}
._peep_list .checkbox{
    border-radius: 100px;
    width: 20px;
    height: 20px;
    margin: 10px;
    border: 2px solid #00000077;
}
._peep_list #checked {
    border: none;
    background: rgba(72, 133, 237, 0.95);
    background-image: url("~assets/ding.png");
    background-size: cover;
}

._peep_added .slt{
    display: inline-flex;
    margin: 0 2px;
}
._peep_added .pfp {
    height: 25px;
    width: 25px;
}
.slt p {
    margin: 2px 4px 0 5px;
}



.sub_tab{
  display: flex;
  padding: 15px 30px;
  background: linear-gradient(180deg, #fff 0%, #ffffffdd 60%, #ffffff00 100%);
  z-index: 9999;
  width: 100%;
}
.sub_tab button{
  margin: auto;
  border-radius: 100px; /* breaks transitions, be careful */
  padding: 5.5px;
  width: 999px;
  font-weight: bold;
  font-size: 11px;
  
  background: #00000000;
  color: #00000055;
}
.sub_tab #focusing {
  background: #ddd;
  color: #000;
}
.sub_tab :active {
  background: #eee;
}

</style>
