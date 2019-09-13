<template>
    <section class="user_info">
        <img id="pic" :src="pfp"/>
        <div class="big_pic">
            <img id="cover" :src="cover"/>
            <div class="profile_actions">
                <Button class="bt" text = "Follow" />
                <n-link class="bt" :to="'/chat/direct/'+username">
                    <Button text = "Chat" fill = "true"/>
                </n-link>
            </div>
            <section class="name">
                <strong id="alias">{{ alias }}</strong>
                <span id="username">@{{ username }}</span>
                <p id="bio"><!--strong>Giới thiệu: </strong-->{{ short_bio }}</p>
            </section>
        </div>
    </section>
</template>

<script>
import Button from '@/components/actions/Button'
export default {
    props: [
		'pfp',
		'cover',
		'alias',
		'username',
		'short_bio',
    ],
    components: {
        Button
    },
}
</script>

<style scoped>
.big_pic {
    background-color: white;
    max-width: 950px;
    min-width: 300px;
    box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);
    border-radius: 15px;
    margin: -8px 8px 0 8px;
}
.big_pic #cover {
    border-radius: 15px 15px 0 0;
    /*box-shadow: inset 0 0 10px #000;*/
    top: 0;
    width: 100%;
    height: 300px;
    z-index: -1;
}
.profile_actions {
    margin: 0 0 8px 0;
    display: flex;
    justify-content: flex-end;
}

.profile_actions .bt {
    margin: 10px 15px 10px 0;
}

#pic {
    border: 3px solid #fff;
    position:relative;
    top: 355px;
    left: 20px;
    border-radius: 50%;
    width: 100px;
    height: 100px;
    margin-top: -999px;
}

.big_pic .name {
    padding: 2px 0 10px 15px;
    display: flex;
    flex-direction: column;
}
.big_pic .name #alias {
    font-size: 22px
}
.big_pic .name #username {
    color: #aaa;
}
.big_pic .name #bio {
    padding: 10px 0 8px 0;
}
</style>
