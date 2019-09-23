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
    async asyncData ({ $axios, params }) {
        const profileRes = await $axios.$get(`/acc/profile/${params.username}?format=json`)
        // let membershipsRes = await $axios.$get(`/memberships/of_member?format=json&user=${profileRes.id}`)
        
        // let followingRes = await $axios.$get(`/follow/edby?user=${profileRes.id}&format=json`)
        // let followersRes = await $axios.$get(`/follow/u?ser=${profileRes.id}&format=json`)
        return {
            profile: profileRes,
            // membershipsRes,
            // followingRes,
            // followersRes,
        }
    },
    created() {
        this.$store.commit('detailBanner/loadText', null)
        this.$store.commit('detailBanner/loadPic', {})
    },
}
</script>

<style>
</style>
