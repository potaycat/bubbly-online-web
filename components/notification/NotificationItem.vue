<template>
    <li class="noti-item">
        <div class="cont">
            <div class="pics">
                <n-link class="actor" :to="'/user/' + actor.username">
                    <img id="pfp" :src="actor.profile_pic"/>
                </n-link>
                <img id="action_icon" src="http://redriverunited.org/wp-content/uploads/2014/01/1.png"/>
            </div>
            <p id="noti-text">Lorem Ipsum is simply dummy text of the printing and typesetting </p>
        </div>
    </li>
</template>

<script>
export default {
    props: [
        'id',
        'action',
        'actor',
    ]
}
</script>

<style scoped>
.noti-item {
    list-style: none;

    background: rgb(252, 252, 252);

    border: 0;
    border-top: 1px;
    border-style: solid;
    border-color: #ccc;
    border-radius: 0 0 15px 15px;

    width: 100%;
    height: auto;
    margin: 0;

}
.noti-item .cont {
    display: flex;
    align-items: center;
    margin: 0 5px;
}
.pics {
    display: flex;
    margin: 0 -10px 0 6px;
}
.pics #pfp {
    border-radius: 50%;
    width: 45px;
    height: 45px;
    margin: 5px 0 0 5px;
}
.pics #action_icon{
  box-shadow: 0 3px 6px rgba(0,0,0,0.35);
    border-radius: 50%;
    width: 20px;
    height: 20px;

    position: relative;
    top: 35px;
    right: 18px;
    margin-right: -0px;
}

#noti-text {
    padding: 12px;
    color: black;
}

</style>
