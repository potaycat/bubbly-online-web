<template>
<transition appear name="zoom_fade">
    <div class="total_darkness is-fixed">
        <div id="add-container" class="box-shadow-4">
            <div class="add__btn-ctnr">
                <button class="add__btn" @click="$parent.openAddDiag=false">Cancel</button>
                <button class="add__btn" style="margin-left:auto" @click="hahayes()">
                    <div v-if="roomId">Add</div>
                    <div v-else>Enter room</div>
                </button>
            </div>
            
            <div class="_added-peep no-bg">
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
                    placeholder="Search"
                    autocomplete="off"
                    @input="deleting=null;debounceSearch($event)"
                    @click="deleting=null"
                    @keyup.delete="!kw&&selected_peeps.length ? toRemove(selected_peeps[selected_peeps.length-1]) :null"
                >
            </div>
            
            <Tabs
                contractless=1
                class="add-diag__tabs"
                :tabs="['FOLLOWINGS', 'FOLLOWERS']"
                :currentTab="currentTab"
                @switchTo="newTab"
            />
            
            <div id="_peep-ls-ctn" ref="feed">
                <div class="_peep-list">
                    <transition-group name="fade">
                        <div v-for="person in fetchedData"
                            :key="person.username"
                            class="peep-ls__item glow"
                            @click="toRemove(person, true)"
                        >
                            <img class="pfp" :src="person.profile_pic">
                            <p>{{ person.alias }}</p>
                            <div :class="['checkbox', isChosen(person.username)?'checked':null]"/>
                        </div>
                    </transition-group>
                </div>
                <StatusIndicator :isFetching="loading4More" :listLen="fetchedData.length"
                    headsup="Empty"/>
            </div>
        </div>
    </div>
</transition>
</template>

<script>
import { tabs } from '@/mixins/cmpnentsCtrl/tabs'
import { feedingFrenzy } from '@/mixins/feedingFrenzy'
export default {
    mixins: [tabs, feedingFrenzy],
    props: ['roomId'],
    data:() => ({
        kw: "",
        selected_peeps: [],
        deleting: null,
    }),
    // nonReactive: {
        offsetProp: 'username',
        debounce: null,
    // },
    computed: {
        feedUrl() {
            return `accounts/${this.$store.state.auth.my_profile.username
                }/circles/?minimal=1&search=${this.kw}&${
                    this.currentTab ? 'get_followers=1&' : ''
                }`
        }
    },
    watch: {
        feedUrl() {
            this.firstFetch()
        },
    },
    methods: {
        debounceSearch(evt) {
            clearTimeout(this.$options.debounce)
            this.$options.debounce = setTimeout(() => {
                this.kw = evt.target.value
            }, 600)
        },

        toRemove(whom, bypass) {
            const index = this.selected_peeps.findIndex(x => x.username == whom.username)
            if (index == -1) {
                this.selected_peeps.push(whom)
            } else {
                if (this.deleting == whom.username || bypass) {
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
                    `chat/${this.roomId || '__new_or_direct'}/add`,
                    {participants: parti},
                    this.$store.state.authHeader
                )
                    .then(res => {
                        if (this.roomId) {
                            this.$emit('added')
                        } else {
                            this.$store.dispatch("chatx/toChat", res.data)
                        }
                        this.$parent.openAddDiag = false
                    })
            }
        }
    },
}
</script>

<style>
#add-container {
    background: #fff;
    z-index: 999;
    border-radius: 20px;
    height: 95%;
    width: 600px;
    position: relative;
}
#add-container .add__btn-ctnr {
    display: flex;
    padding: 14px 10px;
}
.add__btn {
    color: var(--primary-color);
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

._added-peep > input {
    font-size: 15px;
    border: none;
    outline: none;
    background: none;
    flex-grow: 1;
    padding: 5px;
}

#_peep-ls-ctn {
    height: calc(100% - 74px);
    border-radius: 0 0 20px 20px;
    overflow: hidden;
}
._peep-list {
    overflow: auto;
    padding-top: 50px;
}
._peep-list .peep-ls__item{
    /* border-radius: 10px; */
    display: flex;
    align-items: center;
    padding: 5px 20px;
}
.peep-ls__item .pfp {
    height: 40px;
    width: 40px;
}
.peep-ls__item p {
    margin: 0 auto;
    margin-left: 20px;
    font-weight: bold;
    font-size: 14px;
}
._peep-list .checkbox {
    transition: .5s;
    border-radius: 100px;
    width: 20px;
    height: 20px;
    margin-right: 10px;
    border: 2px solid #00000077;
}
._peep-list .checked {
    background: var(--primary-color);
    border: none;
    background-image: url("~assets/ding.png");
    background-size: cover;
}

.add-diag__tabs {
    position: absolute;
    width: 100%;
    /* margin: 0 2.5%; */
    background: linear-gradient(180deg, #fff 0%, #ffffffdd 60%, #ffffff00 100%);
}
</style>
