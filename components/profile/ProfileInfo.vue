<template>
    <div>
        <transition name="fade" appear >
            <div class="prfl-info card box-shadow-3">
                <img id="prfl-inf__cover" :src="profile.cover_photo" />
                <img class="pfp" :src="profile.profile_pic" />
                <section class="prfl-info-container">
                    <p v-if="profile.you_block">You blocked this person</p>
                    <p v-else-if="profile.you_block">This person blocked you</p>
                    <div v-else-if="isSelf" id="prfl-inf__cmd">
                        <Button class="prfl-inf__cmd__btn" style="width:auto"
                            text="Edit Profile" @clicked="" :padding="['5px', '20px']"/>
                    </div>
                    <div v-else id="prfl-inf__cmd">
                        <Button class="prfl-inf__cmd__btn"
                            text="Chat" @clicked="confirmToChat" :padding="['5px', '0']" />
                        <Button v-if="profile.you_follow" class="prfl-inf__cmd__btn"
                            text="Following" @clicked="confirmUnfollow" :padding="['5px', '0']" fill/>
                        <Button v-else class="prfl-inf__cmd__btn"
                            text="Follow" @clicked="makeFollow" :padding="['5px', '0']" />
                    </div>
                    <div id="prfl-inf__name">{{ profile.alias }}</div>
                    <p class="littler-info bio">
                        {{ profile.bio }}
                        <!-- <span :style="`color:${profile.fave_color}`">Show more</span> -->
                    </p>
                    <p v-if="profile.location" class="littler-info loc">
                        <i class="material-icons-round">language</i>
                        {{ profile.location }}
                    </p>
                    <div class="prfl-inf__follows">
                        <span class="glow" @click="viewFollowings">
                            <strong>{{ profile.following_count }}</strong> Followings
                        </span>
                        <span class="glow" @click="viewFollowers">
                            <strong>{{ profile.follower_count }}</strong> Followers
                        </span>
                    </div>
                </section>
            </div>
        </transition>
        <InputDialog v-if="openDiag"
            :toDisplay="openDiag"
            @clicked="onDiagClose"
        />
        <Dropdown v-if="moring" @pick="onDropDownPick"
            :options="[
                profile.you_block ? {value:'unblock', name:'Unblock'} :
                    {value:'block', name:'Block'},
                {value:'', name:'Let\'s'},
                {value:'', name:'Get'},
                {value:'report', name:'This'},
                {value:'copyUrl', name:'Bread OwO'},
            ].filter(x=>x)"
        />
    </div>
</template>

<script>
import Button from '@/components/actions/Button'
import Dropdown from '@/components/actions/Dropdown'
import { performFollow, performBlock } from '@/mixins/performFollow'

export default {
    components: {
        Button,
        Dropdown
    },
    mixins: [performFollow, performBlock],
    props: ['profile'],
    computed: {
        moring() {return this.$store.state.detailBanner.moring},
        isSelf() {
            return this.profile.username == this.$store.state.auth.my_profile.username
        }
    },
    created() {
        if (this.isSelf) this.$store.commit('auth/storeAuthUser', {
            ...this.$store.state.auth.my_profile, ...this.profile 
        })
    },
    methods: {
        onUnfollowHandle() {this.$emit('unfollowed')},
        onPerformFollow() {this.$emit('followed')},
        onFollowFailHandle(e) {this.$emit('unfollowed')},
        onBlockHandle() {this.$emit('blocked')},
        onUnblockHandle() {this.$emit('unblocked')},

        onDropDownPick(value) {
            this.$store.commit('detailBanner/openInfo', false)
            switch (value) {
                case 'block':
                    this.confirmBlock()
                    break
                case 'unblock':
                    this.makeUnblock()
                    break
                default:
                    break
            }
        },

        toDetailBanner() {
            this.$store.commit('detailBanner/loadText', this.profile.alias)
            this.$store.commit('detailBanner/loadPic', {
                src: this.profile.profile_pic,
                style:'circle'
            })
        },
        viewFollowings() {
            this.toDetailBanner()
            this.$router.push(`/user/${this.profile.username}/circles?get=followings`)
        },
        viewFollowers() {
            this.toDetailBanner()
            this.$router.push(`/user/${this.profile.username}/circles?get=followers`)
        },


        confirmToChat() {
            this.openDiag = {
                title: `Chat with ${this.profile.alias}?`,
                description: 'This will create a new private room if there are not any yet'
            }
            this.diagHndlFun = this.performToChat
        },
        performToChat() {
            this.$axios.post(
                `chat/__new_or_direct/add`,
                {participants: [{identity: this.profile.id}]},
                this.$store.state.authHeader
            )
                .then(res => {
                    this.$router.push('/chat/t/'+res.data.id)
                })
        },
    },
}
</script>

<style scoped>
.prfl-info {
    max-width: 950px;
    min-width: 300px;
    margin: 0 8px;
}

.prfl-info #prfl-inf__cover {
    border-radius: 15px 15px 0 0;
    /*box-shadow: inset 0 0 10px #000;*/
    /* top: 0; */
    right: 0;
    width: 100%;
    height: 200px;
    z-index: -1;
}
.prfl-info-container {
    padding: 0 16px 10px 16px;
}
.prfl-info .pfp {
    border: 3px solid rgb(253, 247, 247);
    position: relative;
    left: 11px;
    margin-top: -20px;
    width: 100px;
    height: 100px;
}
.prfl-info #prfl-inf__cmd {
    margin: -80px 0 7px 107px;
    font-size: 14px;
    display: flex;
    /* flex-direction: column; */
    flex-wrap: wrap;
    height: 72px;
}

#prfl-inf__cmd .prfl-inf__cmd__btn{
    margin: auto 0;
    margin-left: auto;
    width: 100px;
}
#prfl-inf__cmd .prfl-inf__cmd__btn:nth-child(2){
    margin-left: 11px;
}

.prfl-info #prfl-inf__name {
    margin-bottom: 10px;
    font-weight: bold;
    font-size: 23px;
}

.prfl-info .littler-info {
    margin: 5px 0;
    /* text-align: center; */
}
.prfl-info .bio {
    font-size: 14px;
    padding: 3px 0;
}
.prfl-info .loc {
    font-size: 15px;
    display: flex;
    color: #666;
}
.prfl-info .loc i {
    font-size: 16px;
    margin: auto 5px auto 0;
}

.prfl-inf__follows {
    padding: 5px 0;
}
.prfl-inf__follows >span {
    color:#999;
    font-size: 15px;
}
.prfl-inf__follows >span:nth-child(2) {
    margin-left: 12px;
}
.prfl-inf__follows >span >strong {
    color:#000;
}
</style>
