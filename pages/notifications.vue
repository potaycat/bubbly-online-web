<template>
    <div>
        <button @click="bruh()">Bruhh</button>
        <span class="span-noti-category">
            <Button class="noti-category" text = "All" fill="true" />
            <Button class="noti-category" text = "Filtered" />
        </span>
        <NotificationBlock :notifications ="res" />
    </div>
</template>

<script>
import NotificationBlock from '@/components/notification/NotificationBlock'
import Button from '@/components/actions/Button'
export default {
    /*layout: 'desktop',*/
    components: {
        NotificationBlock,
        Button,
    },
    async asyncData ({ $axios, }) {
        // return $axios.$get("/notification/view_my_noti?format=json", {
        //     headers: {
            
        //     Authorization: "JWT " + this.$store.state.jwtlogin.jwt
        //     }
        // })
        // .then(res => {
        //     return { res }
        // })
    },
    methods: {
        bruh(data) {
            console.log(this.$store.state.jwtlogin.jwt);
        }
    },
    created() {
        this.$store.commit('changeDestination', 4);
    },
}
</script>

<style>
.span-noti-category {
    display: flex;
    margin: 16px 0;
}
.noti-category{
    margin: auto;
}

</style>