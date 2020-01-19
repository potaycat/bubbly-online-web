<template>
<transition name="fade" appear>
    <div style="position:relative;width:100%">
        <div class="user-block glow"
            @click="goToProfile"
        >
            <img class="pfp" :src="profile.profile_pic"/>
            <p v-if="role" :class="['usr-blck__role', role]">{{ role }}</p>
            <div class="usr-blck__txt">
                <p class="usr-blck__alias">
                    {{ profile.alias }}
                </p>
                <p v-if="profile.bio" class="usr-blck__bio">{{ profile.bio }}</p>
                <p v-if="profile.reputation_point!=undefined" class="usr-blck__rep">
                    <strong>{{profile.reputation_point}}</strong> reputation
                </p>
            </div>
        </div>
        
        <div v-if="!disableFollowBtn && profile.username!=$store.state.auth.my_profile.username">
            <Button v-if="profile.you_follow" class="usr-blck__btn" :colorScnd="`#${profile.fave_color}`"
                text="Following" @clicked="confirmUnfollow" :padding="['2px', '10px']" fill lite/>
            <Button v-else class="usr-blck__btn" :colorScnd="`#${profile.fave_color}`"
                text="Follow" @clicked="makeFollow" :padding="['2px', '10px']" lite/>
        </div>
        <InputDialog v-if="openDiag" :toDisplay="openDiag"/>
    </div>
</transition>
</template>

<script>
import Button from '@/components/misc/Button'
import { performFollow } from '@/mixins/performFollow'

export default {
    components: {Button},
    mixins: [performFollow],
    props: ['profile', 'disableFollowBtn'],
    computed: {
        role() {
            const role = this.profile.role
            return role == 'administrator' ? 'Admin' :
                role == 'moderator' ? 'Mod' :
                role == 'member' ? 'Member' : null
        }
    },
    methods: {
        onUnfollowHandle() {this.profile.you_follow = false},
        onPerformFollow() {this.profile.you_follow = true},
        onFollowFailHandle(e) {
            console.error("CATCHED follow fail: "+e)
            this.profile.you_follow = false
        },

        goToProfile(){
            this.$router.push(`/user/${this.profile.username}`)
        },
    },
}
</script>

<style>
.user-block {
    display: flex;
    padding: 10px 15px;
    max-height: 120px;
    width: 100%;
    overflow: hidden;
    border-bottom: solid 1px #e3e3e3;
    position: relative;
}
.user-block .pfp {
    height: 54px;
    min-width: 54px;
    max-width: 54px;
}

.usr-blck__txt {
    margin-left: 15px;
    width: 100%;
}

.usr-blck__txt .usr-blck__alias {
    font-weight: bold;
    display: flex;
    align-items: center;
    padding-bottom: 3px;
}
.usr-blck__btn {
    position: absolute;
    right: 10px;
    top: 8px;
}

.usr-blck__txt .usr-blck__bio {
    font-size: 14px;
    
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;  
}



.usr-blck__role {
    position: absolute;
    top: 53px;
    padding: 1px 5px;
    border-radius: 100px;
    font-weight: bold;
    font-size: 11px;
}
.usr-blck__role.Admin {
    background: rebeccapurple;
    color: white;
}
.usr-blck__role.Mod {
    background: darkcyan;
    color: white;
}
.usr-blck__role.Member {
    display: none
}

.usr-blck__rep {
    font-size: 13px;
    color: #777;
}
</style>
