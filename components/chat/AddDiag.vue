<template>
<transition appear name="zoom_fade">
    <div class="total_darkness">
        <div id="add-container" class="box-shadow-4">
            <div class="add__btn-ctnr">
                <button class="add__btn" @click="$router.back()">Cancel</button>
                <button class="add__btn" style="margin-left:auto" @click="hahayes()">
                    <div v-if="room_id">Add</div>
                    <div v-else>Enter room</div>
                </button>
            </div>
            
            <div class="_added-peep">
                <strong v-if="selected_peeps.length" style="margin:4px 5px">Selected: </strong>
                <div v-for="person in selected_peeps"
                    :key="person.username"
                    class="_slctd"
                    :id="[deleting == person.username ? '_added__del' : null]"
                    @click="toRemove(person)"
                >
                    <img v-if="deleting != person.username" class="pfp" :src="person.profile_pic">
                    <img v-else class="pfp" src="~assets/ex.png">
                    <p>{{ person.alias }}</p>
                </div>

                <i v-if="!selected_peeps.length" style="color:#00000077" class="material-icons-round">search</i>
                <input
                    :placeholder="searcgphrase"
                    v-model="srch"
                    autocomplete="off"
                    @input="deleting=null"
                    @click="deleting=null"
                    @keyup.delete="!srch&&selected_peeps.length ? toRemove(selected_peeps[selected_peeps.length-1]) :null"
                >
            </div>
            
            <Tabs
                fixed=1
                style="position: absolute; width: 95%;
                    background: linear-gradient(180deg, #fff 0%, #ffffffdd 60%, #ffffff00 100%)"
                :tabs="['FOLLOWINGS', 'FOLLOWERS']"
                :currentTab="currentTab"
                @switchTo="newTab"
            />
            
            <div id="_peep-ls-ctn" ref="feed"><div class="_peep-list">
                <transition-group name="fade">
                    <div v-for="person in fetchedData"
                        :key="person.username"
                        class="peep-ls__item glow"
                        @click="toRemove(person, true)"
                    >
                        <img class="pfp" :src="person.profile_pic">
                        <p>{{ person.alias }}</p>
                        <div :id="[isChosen(person.username) ? 'checked' :null]" class="checkbox"/>
                    </div>
                </transition-group>
            </div></div>
        </div>
    </div>
</transition>
</template>

<script>
import { tabs } from '@/mixins/tabs'
import { feedingFrenzy } from '@/mixins/feedingFrenzy'
export default {
    mixins: [tabs, feedingFrenzy],
    props: ['room_id'],
    data() {
        return {
            srch: "",
            selected_peeps: [],
            deleting: null,

            searcgphrase: "Search my followings",
            feedUrl: `accounts/${this.$store.state.auth.my_profile.username}/circles/?minimal=1&`,
        }
    },
    watch: {
        currentTab(get_flwer) {
            const usr = this.$store.state.auth.my_profile.username
            if (get_flwer) {
                this.searcgphrase = "Search my followers"
                this.feedUrl = `accounts/${usr}/circles/?minimal=1&get_followers=1&`
            } else {
                this.searcgphrase = "Search my followings"
                this.feedUrl = `accounts/${usr}/circles/?minimal=1&`
            }
            this.fetchedData = []
            this.fetch()
        },
    },
    methods: {
        toRemove(whom, bypass) {
            let index = this.selected_peeps.findIndex(x => x.username == whom.username)
            if (index == -1) {
                this.selected_peeps.push(whom) //(JSON.parse(JSON.stringify(whom))) // deep copy
            } else {
                if (this.deleting == whom.usernameid || bypass) {
                    this.selected_peeps.splice(index, 1)
                    this.deleting = null
                } else {
                    this.deleting = whom.username
                }
            }
        },
        isChosen(id) {
            return this.selected_peeps.some(e => e.username == id)
        },

        hahayes() {
            let parti = []
            let len = this.selected_peeps.length;
            if (len) {
                while (len--) {
                    parti.push({
                        identity: this.selected_peeps[len].username
                    })
                }
                this.$axios.post(
                    `chat/${this.room_id?this.room_id:'__new_or_direct'}/add`,
                    {participants: parti},
                    this.$store.state.authHeader
                )
                    .then(res => {
                        if (this.room_id) {
                            this.$router.back()
                            this.$emit('added')
                        } else {
                            // this.$router.back() // TODO not working
                            this.$router.push(`/chat/t/${res.data.id}`)
                        }
                    })
            }
        }
    },
}
</script>

<style>
#add-container {
    z-index: 999;
    margin: auto;
    background: linear-gradient(160deg, #fff 0, #ffffffee 50%, #fff 100%);
    border-radius: 20px;
    width: 95%;
    height: 95%;
}
#add-container .add__btn-ctnr {
    display: flex;
    padding: 14px 10px;
}
.add__btn {
    color: rgb(72, 133, 237);
    font-weight: bold;
}
.add__btn:active {
    opacity: 0.7;
}

._added-peep {
    padding: 0 10px;
    max-height: 120px;
    overflow: auto;
    display: flex;
    flex-wrap: wrap;
}
._added-peep ._slctd {
    font-size: 14px;
    display: inline-flex;
    overflow: hidden;
    background: #eee;
    border-radius: 20px;
    padding: 3px;
    margin: 3px 4px;
}
._slctd .pfp {
    height: 22px;
    width: 22px;
}
._slctd p {
    margin: 0 5px;
}
._added-peep #_added__del {
    background: #00000055;
}

._added-peep input {
    font-size: 15px;
    background: none;
    border: none;
    outline: none;
    flex-grow: 1;
    padding: 5px;
}

#_peep-ls-ctn {
    height: calc(100% - 94px);
    border-radius: 0 0 20px 20px;
    overflow: hidden;
}
._peep-list {
    height: 100%;
    overflow: auto;
    padding-top: 50px;
}
._peep-list .peep-ls__item{
    /* border-radius: 10px; */
    display: flex;
    padding: 5px 20px;
}
.peep-ls__item .pfp {
    height: 40px;
    width: 40px;
}
.peep-ls__item p {
    margin: auto;
    margin-left: 20px;
    font-weight: bold;
    font-size: 14px;
}
._peep-list .checkbox {
    transition: .5s;
    border-radius: 100px;
    width: 20px;
    height: 20px;
    margin: 10px;
    border: 2px solid #00000077;
}
._peep-list #checked {
    border: none;
    background: rgba(72, 133, 237, 0.95);
    background-image: url("~assets/ding.png");
    background-size: cover;
}

</style>
