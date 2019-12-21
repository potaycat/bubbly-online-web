<template>
    <div style="width:100%">
        <transition name="fade" appear >
            <div class="prfl-info card box-shadow-3">
                <img id="prfl-inf__cover" :src="profile.cover_photo" />
                <img class="pfp" :src="profile.profile_pic" />
                <section class="prfl-info-container">
                    <p v-if="profile.you_block">You blocked this person</p>
                    <p v-else-if="profile.you_block">This person blocked you</p>
                    <div v-else-if="isSelf" id="prfl-inf__cmd">
                        <Button class="prfl-inf__cmd__btn" style="width:auto" :colorScnd="`#${profile.fave_color}`"
                            text="Edit Profile" @clicked="$router.push('/settings/profile')" :padding="['5px', '20px']"/>
                    </div>
                    <div v-else id="prfl-inf__cmd">
                        <Button class="prfl-inf__cmd__btn" :colorScnd="`#${profile.fave_color}`"
                            text="Chat" @clicked="confirmToPrivate" :padding="['5px', '0']" />
                        <Button v-if="profile.you_follow" class="prfl-inf__cmd__btn" :colorScnd="`#${profile.fave_color}`"
                            text="Following" @clicked="confirmUnfollow" :padding="['5px', '0']" fill/>
                        <Button v-else class="prfl-inf__cmd__btn" :colorScnd="`#${profile.fave_color}`"
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
        <Dropdown v-if="moring" 
            :options="[
                profile.you_follow ? {action:'confirmUnfollow', label:'Unfollow'} :
                    {action:'makeFollow', label:'Follow'},
                {action:'copyUserUrl', label:'Copy profile URL'},
                profile.you_block ? {action:'makeUnblock', label:'Unblock'} :
                    {action:'confirmBlock', label:'Block'},
                {action:'confirm_userReport', label:'Report'},
            ]"
        />
        <InputDialog v-if="openDiag" :toDisplay="openDiag"/>
    </div>
</template>

<script>
import Button from '@/components/misc/Button'
import Dropdown from '@/components/misc/Dropdown'
import { performFollow, performBlock, performToPrivate } from '@/mixins/performFollow'

export default {
    components: {
        Button,
        Dropdown
    },
    mixins: [performFollow, performBlock, performToPrivate],
    props: ['profile'],
    computed: {
        moring() {return this.$store.state.appBar.moring},
        isSelf() {
            return this.profile.username == this.$store.state.auth.my_profile.username
        }
    },
    methods: {
        onDropDownPick() {
            this.$store.commit('appBar/burgerState', false)
        },
        onUnfollowHandle() {this.$emit('unfollowed')},
        onPerformFollow() {this.$emit('followed')},
        onFollowFailHandle(e) {this.$emit('unfollowed')},
        onBlockHandle() {this.$emit('blocked')},
        onUnblockHandle() {this.$emit('unblocked')},

        copyUserUrl() {
            navigator.clipboard.writeText(`${window.location.origin}/user/${this.profile.username}`)
                .then()
                .catch(err => {
                    console.error('CATCHED: ', err);
                })
        },
        viewFollowings() {
            this.$router.push(`/user/${this.profile.username}/circles?get=followings`)
        },
        viewFollowers() {
            this.$router.push(`/user/${this.profile.username}/circles?get=followers`)
        },
    },
}
</script>

<style>
.prfl-info {
    max-width: 950px;
    margin: 0 8px;
}

.prfl-info #prfl-inf__cover {
    border-radius: 15px 15px 0 0;
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
.prfl-info .loc > i {
    font-size: 16px;
    margin: auto 5px auto 0;
}

.prfl-inf__follows {
    padding: 5px 0;
}
.prfl-inf__follows > span {
    color:#999;
    font-size: 15px;
}
.prfl-inf__follows > span:nth-child(2) {
    margin-left: 12px;
}
.prfl-inf__follows > span > strong {
    color:#000;
}
</style>
