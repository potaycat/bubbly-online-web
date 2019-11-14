<template>
<transition name="fade_in" appear>
    <div class="mbrshp-block bg lift"
        :style="`background-image:url(${community.cover_img})`"
        @click="goToCommunity"
    >
        <img class="cmnty-ico" :src="community.icon_img"/>
        <div class="mbrshp__cmnty-txt">
            <p class="mbrshp__cmnty-name">{{ community.name }}</p>
            <div class="mbrshp__reput">
                <strong>{{community.reputation_point}}</strong> reputation
            </div>
            <!-- <p class="_pop">1350 members</p> -->
            <!--p class="_description">{{ community.intro }} </p-->
        </div>
        <div :class="['mbrshp__role', role]">
            {{ role }}
        </div>
    </div>
</transition>
</template>

<script>
export default {
    props: ['community'],
    computed: {
        role() {
            const role = this.community.role
            return role == 'administrator' ? 'Admin' :
                role == 'moderator' ? 'Mod' :
                role == 'member' ? 'Member' : null
        }
    },
    methods: {
        goToCommunity(){
            // this.$store.commit('detailBanner/loadText', this.getRoomTitle(room)); // TODO fix
            // this.$store.commit('chat/loadChat', room)
            this.$router.push(`/community/${this.community.id}`)
        },
    },
}
</script>

<style>
.mbrshp-block {
    box-shadow: inset 0px -120px 50px -40px #000000aa;
    /* background: linear-gradient(rgba(0,0,0, 0.5),rgba(0,0,0, 0.5)),; */
    display: flex;
    padding: 0 15px;
    min-height: 100px;
    width: 100%;
}

.mbrshp-block .cmnty-ico {
    width: 45px;
    height: 45px;

    margin: auto 0;
}

.mbrshp-block .mbrshp__cmnty-txt {
    color: #fff;
    display: flex;
    flex-direction: column;
    margin: auto auto auto 10px;
}
.mbrshp__cmnty-txt .mbrshp__cmnty-name {
    /* font-weight: bold; */
    font-size: 20px;
    max-height: 59px;
    overflow: hidden;
}
.mbrshp__cmnty-txt .mbrshp__reput {
    font-size: 13px;
    color: #ccc
}

.mbrshp__role {
    margin: auto 0;
    padding: 3px 9px;
    border-radius: 100px;
    font-weight: bold;
    font-size: 14px;
}
.Admin {
    background: rebeccapurple;
    color: white;
}
.Mod {
    background: darkcyan;
    color: white;
}
.Member {
    display: none;
}
</style>
