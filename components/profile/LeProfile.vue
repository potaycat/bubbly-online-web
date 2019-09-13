<template>
    <div>
        <ProfileInfo
            :pfp = "profile.profile_pic"
            :cover = "profile.cover_photo"
            :alias = "profile.alias"
            :username = "profile.username"
            :short_bio = "profile.bio"
        />
        <ActiveBlock
            :memberships = "membershipsRes"
        />
        <Relationships
            :followers = "followersRes"
            :following = "followingRes"
        />
    </div>
</template>

<script>
import ProfileInfo from '@/components/profile/ProfileInfo'
import ActiveBlock from '@/components/profile/active_in/ActiveBlock'
import Relationships from '@/components/profile/Relationships'
export default {
    components: {
        ProfileInfo,
        ActiveBlock,
        Relationships,
    },

    async asyncData  ({ $axios, params }) {
        let profileRes = await $axios.$get(`/acc/profile/${params.name}?format=json`)
        let membershipsRes = await $axios.$get(`/memberships/of_member?format=json&user=${profileRes.id}`)
        
        let followingRes = await $axios.$get(`/follow/edby?user=${profileRes.id}&format=json`)
        let followersRes = await $axios.$get(`/follow/u?ser=${profileRes.id}&format=json`)
        return {
            profile: profileRes,
            membershipsRes,
            followingRes,
            followersRes,
        }
    }
}
</script>

<style>
</style>
