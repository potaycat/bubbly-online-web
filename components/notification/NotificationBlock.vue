<template>
    <section class="n-block" v-if="notifications.length">
        <section id="header">
            <p id="ac">CLEAR ALL</p>
        </section>
        <NotificationItem v-for ="noti in notifications"
                :key ="noti.id"
                :action ="noti.action"
                :actor ="noti.actor"
        />
    </section>
    <section id="no-noti" v-else>No new notifications :O</section>
</template>

<script>
import NotificationItem from './NotificationItem'
export default {
    props: [
		'notifications',
    ],
    components: {
        NotificationItem,
    },
}
</script>

<style>
.n-block {
    background-color: white;
    max-width: 700px;
    min-width: 300px;
    box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);
    
    border-radius: 15px;
    border: 1px;
    border-bottom: 0;
    border-style: solid;
    border-color: #ccc;

    margin: 12px 8px 0 8px;
    display: flex;
    flex-direction: column;
    
}
.n-block #header {
    /*box-shadow: 0px 4px 3px rgba(0,0,0,0.16);*/

    background: rgb(252, 252, 252);

    border: 0;
    border-radius: 15px 15px 0 0;

    width: 100%;
    height: auto;
    margin: 0;
}
.n-block #header #ac{
    font-size: 14px;
    color: #999;
    /*padding: 10px 22px 10px 0;
    text-align: right;*/
    padding: 8px;
    text-align: center;
}
#no-noti {
    font-size: 20px;
    font-weight: bold;
    color: #555;
    padding: 50px 20px;
    text-align: center;
    vertical-align: center;
}


</style>
