<template>
    <div class="join-prcdr total_darkness no-bg">
        <div v-if="error">
            <h2>Failed to proceed D:</h2><br>
            <p>Make sure the code is correct</p>
        </div>
        <div v-else class="join-prcdr-prompt-ctnr">
            <h2>Proceed to join with your provided link/code?</h2><br>
            <p>Community ID: {{$route.params.id}}</p>
            <p>Invite Code: {{$route.params.code}}</p>
            <Button class="join-prcdr__btn" @clicked="performJoin" text="Proceed" :padding="['15px', '60px']" />
        </div>
    </div>
</template>

<script>
import { disableHamburger } from '@/mixins/appBarStuff'
import Button from "@/components/misc/Button"
export default {
    data: () => ({
        error: null
    }),
    components: {Button},
    mixins: [disableHamburger],
    methods: {
        performJoin() {
            this.$axios.post(`communities/${this.$route.params.id}/members/__self`,
                {invite_code: this.$route.params.code},
                this.$store.state.authHeader
            )
                .then(res => {
                    this.$router.replace(`/communities/${this.$route.params.id}`)
                })
                .catch(error => {
                    this.error = error.response.data
                })
        }
    }
}   
</script>

<style>
.join-prcdr {
    z-index: 1;
    animation: colorchange 50s;
}@keyframes colorchange {
    0%, 100% {background: rgba(0, 0, 255, 0.1);}
    50%  {background: rgba(0, 255, 0, 0.1);}
    25%  {background: rgba(255, 0, 0, 0.1);}
    75%  {background: rgba(255, 255, 0, 0.1);}
}

.join-prcdr-prompt-ctnr {
    border-radius: 20px;
    max-width: 360px;

    display: flex;
    flex-direction: column;
    align-items: center;
}
.join-prcdr-prompt-ctnr > h2 {
    text-align: center;
}
.join-prcdr__btn {
    margin-top: 60px;
}
</style>