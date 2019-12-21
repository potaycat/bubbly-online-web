<template>
<transition name="fade" appear>
    <div class="mbrshp-block lift"
        :style="`background-image:url(${community.cover_img})`"
        @click="goToCommunity"
    >
        <img class="cmnty_ico" :src="community.icon_img"/>
        <div class="mbrshp__cmnty-txt">
            <p class="mbrshp__cmnty-name">{{ community.name }}</p>
            <div class="mbrshp__subtxt">
                <p v-if="community.moto">{{ community.moto }}</p>
            </div>
        </div>
        <div v-if="role=='Member'" :class="['mbrshp__role', role]">
            <strong>{{membership_info.reputation_point}}</strong> reputation
        </div>
        <p v-else-if="role" :class="['mbrshp__role', role]">
            {{ role }}
        </p>
        <Button v-else-if="community.visibility!='closed' && this.membership_info.role!='banned'" class="mbrshp__join-btn"
            :colorScnd="`#${community.theme_color}`" text="Join" @click.native.stop="makeJoin" fill />
    </div>
</transition>
</template>

<script>
import Button from '@/components/misc/Button'
import { performJoin } from '@/mixins/performFollow'
export default {
    components: { Button },
    mixins: [performJoin],
    props: ['community'],
    computed: {
        membership_info() {
            return this.community.membership_info || this.community
        },
        role() {
            const role = this.membership_info.role
            return role == 'administrator' ? 'Admin' :
                role == 'moderator' ? 'Mod' :
                role == 'member' ? 'Member' : null
        },
    },
    methods: {
        goToCommunity(){
            this.$router.push(`/communities/${this.community.id}`)
        },
    },
}
</script>

<style>
.mbrshp-block {
    box-shadow: inset 0px -120px 50px -40px #000000aa;
    /* background: linear-gradient(rgba(0,0,0, 0.5),rgba(0,0,0, 0.5)),; */
    display: flex;
    align-items: center;
    padding: 0 15px;
    min-height: 100px;
    width: 100%;
    background-position: center; 
    background-size: cover;
}

.mbrshp-block .cmnty_ico {
    width: 45px;
    height: 45px;
}

.mbrshp-block .mbrshp__cmnty-txt {
    color: #fff;
    display: flex;
    flex-direction: column;
    margin-left: 12px;
}
.mbrshp__cmnty-txt .mbrshp__cmnty-name {
    /* font-weight: bold; */
    font-size: 20px;
    max-height: 59px;
    overflow: hidden;
    /* font-weight: bold; */
}
.mbrshp__cmnty-txt .mbrshp__subtxt {
    font-size: 12px;
    color: #ccc;
    margin-right: 10px;
}
.mbrshp__subtxt > p {
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
}

.mbrshp__join-btn, .mbrshp__role {
    margin-left: auto;
}
.mbrshp__role {
    padding: 3px 9px;
    border-radius: 100px;
    font-weight: bold;
    font-size: 13px;
}
.mbrshp__role.Admin {
    background: rebeccapurple;
    color: white;
}
.mbrshp__role.Mod {
    background: darkcyan;
    color: white;
}
.mbrshp__role.Member {
    background: mediumseagreen;
    color: white;
    font-weight: normal;
    font-size: 11px;
}
</style>
