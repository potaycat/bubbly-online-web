<template>
    <div>
        <nuxt-child keep-alive :keep-alive-props="{ exclude: ['modal'] }" />
        <LeProfile :profile="profile"/>
    </div>
</template>

<script>
import LeProfile from '@/components/LeProfile'
export default {
    layout: "immerse",
    components: {
        LeProfile,
    },
    async asyncData ({ $axios, params, store }) {
        const profileRes = await $axios.$get(`/accounts/${params.username}`, store.state.authHeader)
        // let membershipsRes = await $axios.$get(`/memberships/of_member?format=json&user=${profileRes.id}`)
        return {
            profile: profileRes,
            // membershipsRes,
        }
    },
    created() {
        this.$store.commit('detailBanner/loadText', null)
        this.$store.commit('detailBanner/loadPic', {})
    },
}
</script>
