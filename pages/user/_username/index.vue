<template>
    <div>
        <ActivityView />
        <LeProfile v-if="profile" :profile="profile"/>
    </div>
</template>

<script>
import ActivityView from '@/components/layout/ActivityView'
import LeProfile from '@/components/profile/'
export default {
    meta: {
        useAppBar: true,
    },
    components: {ActivityView, LeProfile},
    data:() => ({
        profile: null,
    }),
    activated() {
        this.$axios.get(`/accounts/${this.$route.params.username}`, 
            this.$store.state.auth.head
        )
            .then(res => {
                this.profile = res.data
                if (this.isSelf)
                    this.$store.commit('auth/STORE_AUTH_USR', {
                        ...this.$store.state.auth.my_profile, ...res.data
                    })
            })
            .catch(error => {
                this.$router.replace('/auth/register')
            })
    },
}
</script>
