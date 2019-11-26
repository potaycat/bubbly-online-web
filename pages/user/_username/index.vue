<template>
    <div>
        <ActivityView />
        <LeProfile :profile="profile"/>
    </div>
</template>

<script>
import ActivityView from '@/components/layout/ActivityView'
import LeProfile from '@/components/profile/'
export default {
    components: {ActivityView, LeProfile},
    async asyncData ({ $axios, params, store }) {
        const profileRes = await $axios.$get(`/accounts/${params.username}`, store.state.authHeader)
        // let membershipsRes = await $axios.$get(`/memberships/of_member?format=json&user=${profileRes.id}`)
        return {
            profile: profileRes,
            // membershipsRes,
        }
    },
    created() {        
        this.$store.commit('appBar/reset')
    },
}
</script>
