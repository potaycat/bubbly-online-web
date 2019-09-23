<template>
    <div>
        <transition name="fade" appear >
            <div class="p-info card">
                <img id="cover" :src="profile.cover_photo" />
                <img class="pfp" :src="profile.profile_pic" />
                <section class="p-info-container">
                    <div id="p-actions">
                        <Button id="top" text="Follow" :size="['5px', '42px']" />
                        <Button id="bottom" text="Chat" @clicked="confirmChat=!confirmChat" :size="['5px', '42px']" fill/>
                    </div>
                    <div id="p-actions" v-if="false">
                        <Button id="top" text="Edit profile" :size="['5px', '42px']"/>
                    </div>
                    <div id="name">
                        What a heella long name dont you think question mark
                    </div>
                    <p id="bio" class="littler-info">{{ profile.bio }}</p>
                    <p class="littler-info">{{ profile.location }}</p>
                    <p class="littler-info">{{ profile.location }}</p>
                </section>
            </div>
        </transition>
        
        <InputDialog v-if="confirmChat"
            @clicked="toChat"
            :leDisplay ="{
                title: `Chat with ${profile.alias}?`,
                description: 'This will create a new private room if there are not any yet'
            }"
        />
    </div>
</template>

<script>
import Button from '@/components/actions/Button'
import InputDialog from '@/components/actions/InputDialog'
export default {
    props: [
		'profile',
    ],
    components: {
        Button,
        InputDialog
    },
    data() {
        return {
            confirmChat: false,
        }
    },
    methods: {
        toChat(confirmed) {
            this.confirmChat=!this.confirmChat
            if (confirmed) {
                const data = {
                    ai_dee: null,
                    participants: [{identity: this.profile.id}],
                }
                this.$axios.post('chat/add/',
                data, this.$store.state.pheader)
                    .then(res => {
                        this.$router.push('/chat/t/'+res.data.id)
                    })
            }
        },
    },
}
</script>

<style scoped>
.p-info {
    max-width: 950px;
    min-width: 300px;
    margin: 0 8px;
}

.p-info #cover {
    border-radius: 15px 15px 0 0;
    /*box-shadow: inset 0 0 10px #000;*/
    /* top: 0; */
    right: 0;
    width: 100%;
    height: 200px;
    z-index: -1;
}
.p-info-container {
    padding: 0 16px;
}
.p-info .pfp {
    border: 3px solid rgb(253, 247, 247);
    position: relative;
    left: 11px;
    margin-top: -20px;
    width: 100px;
    height: 100px;
}
.p-info #p-actions {
    margin: -80px 0 7px 107px;
    font-size: 14px;
    display: flex;
    /* flex-direction: column; */
    flex-wrap: wrap;
    height: 72px;
}
.p-info #p-actions *{
    margin: auto 0;
}
#p-actions #top{
    margin-left: auto;
}
#p-actions #bottom{
    margin-left: 11px;
}

.p-info #name {
    margin-bottom: 10px;
    font-weight: bold;
    font-size: 23px;
}
.p-info #bio {
    padding: 3px 0;
}
.p-info .littler-info {
    margin: 5px 0;
    /* text-align: center; */
}
</style>
