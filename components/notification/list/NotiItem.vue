<template>
    <div class="noti-item-ctnr card box-shadow-2 glow" @click="goToTarget">
        <i class="material-icons-round">
            {{ isReact ? "emoji_emotions" :
                isFollow ? "person_add" :
                isComment ? "comment" : "" }}
        </i>
        <img class="pfp" :src="noti.actor.profile_pic" @click.stop="$router.push(`/user/${noti.actor.username}`)">
        <div class="noti-item__txt">
            <p><strong>{{noti.actor.alias}}</strong> {{displayText}}</p>
            <p class="noti-item__timestmp">{{ noti.timestamp | timeAgo }}</p>
            <!-- <div style="word-break: break-all;">{{noti}}</div> -->
        </div>
    </div>
</template>

<script>
export default {
    props: ['noti'],
    computed: {
        isReact() { return this.noti.verb.includes('reacted') },
        isFollow() { return this.noti.verb.includes('followed you') },
        isComment() { return this.noti.verb.includes('commented') },
        displayText() {
            const n = this.noti
            let strBuild = ""
            strBuild += n.verb

            if (this.isFollow) {
                
            } else {
                const targetPreview = n.target.title||n.target.text||n.target.preview
                if (this.isReact) {
                    strBuild += ` :${n.action_object.name}: on ${
                        n.target.type} "${targetPreview}"`
                } else if (this.isComment) {
                    strBuild += ` "${n.action_object.preview}" on ${
                        n.target.type} "${targetPreview}"`
                }
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
                } else if (this.noti.target.type == 'comment') {
                    this.$router.push(`/comment/${this.noti.target.id}`)
                }
            }
            else if (this.isComment) {
                if (this.noti.target.type == 'post') {
                    this.$router.push(`/post/${this.noti.target.id}`)
                } else if (this.noti.target.type == 'comment') {
                    this.$router.push(`/comment/${this.noti.target.id}`)
                }
            }
        }
    }
}
</script>

<style>
.noti-item-ctnr {
    margin: 5px 0;
    padding: 7px 12px;
    display: flex;
    width: 100%;
}
.noti-item-ctnr .pfp {
    height: 48px;
    min-width: 48px;
    max-width: 48px;
    margin-left: 7px;
}
.noti-item__txt {
    font-size: 14px;
    margin-left: 10px;
    word-break: break-word;
}
.noti-item__timestmp {
    font-size: 12px;
    margin-top: 5px;
    color: #555;
}
.noti-item-ctnr .material-icons-round {
    background: linear-gradient(var(--primary-color) 20%,var(--primary-color-low-opacity) 100%);
    background-clip: text;
    -webkit-text-fill-color: transparent;

    font-size: 28px;
    margin-top: 10px;
}
</style>
