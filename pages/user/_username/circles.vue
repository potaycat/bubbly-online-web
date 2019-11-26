<template>
    <div>
        <ActivityView />
        <Circles />
    </div>
</template>

<script>
import ActivityView from '@/components/layout/ActivityView'
import Circles from '@/components/profile/Circles'
export default {
    layout: 'lethalActivity',
    components: {ActivityView, Circles},
    created() {
        if (!this.$store.state.appBar.text) {
            this.$axios.get(`/accounts/${this.$route.params.username}`, 
                this.$store.state.authHeader)
                .then(res => {
                    this.$store.commit('appBar/loadText', res.data.alias)
                    this.$store.commit('appBar/loadPic', {
                        src: res.data.profile_pic,
                        style:'circle'
                    })
                })
        }
    },
}
</script>
