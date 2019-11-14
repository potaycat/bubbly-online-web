<template>
    <div class="noti-item-ctnr card box-shadow-2 glow"
        @click="goToTarget"
    >
        <i class="material-icons-round">
            {{ isReact ? "emoji_emotions" :
                isFollow ? "person_add" : "" }}
        </i>
        <img class="pfp" :src="noti.actor.profile_pic" @click.stop="$router.push(`/user/${noti.actor.username}`)">
        <div class="noti-item__txt">
            <p><strong>{{noti.actor.alias}}</strong> {{displayText}} dscdcscsd
            </p>
            <p class="noti-item__timestmp">{{ noti.timestamp | timeAgo }}</p>
            <!-- <div style="word-break: break-all;">{{noti}}</div> -->
        </div>
    </div>
</template>

<script>
export default {
    props: ['noti'],
    computed: {
        isReact() {
            return this.noti.verb.includes('reacted with')
        },
        isFollow() {
            return this.noti.verb.includes('followed you')
        },
        displayText() {
            const n = this.noti
            let strBuild = ""
            strBuild += n.verb
            if (this.isReact) {
                strBuild += ` ${n.action_object.name} on ${
                    n.target.type}: "${n.target.text}"`
            }

            return strBuild
        }
    },
    methods: {
        goToTarget() {
            if (this.isFollow) this.$router.push(`/user/${this.noti.actor.username}`)
            else if (this.isReact) {
                if (this.noti.target.type == 'post') {
                    this.$router.push(`/post/${this.noti.target.id}`)
                }
            }
        }
    }
}
</script>

<style>
.noti-item-ctnr {
    margin: 5px 0;
    padding: 10px;
    display: flex;
    width: 100%;
}
.noti-item-ctnr .pfp {
    height: 50px;
    min-width: 50px;
    max-width: 50px;
}
.noti-item__txt {
    font-size: 15px;
    margin-left: 10px;
}
.noti-item__timestmp {
    font-size: 13px;
    margin-top: 4px;
    color: #555;
}
.noti-item-ctnr .material-icons-round {
    background: linear-gradient(90deg, rgba(0,94,89,1) 1%, rgba(0,212,255,1) 100%);
    background-clip: text;
    -webkit-text-fill-color: transparent;

    font-size: 28px;
    margin: 10px 6px 0 0;
}
</style>
