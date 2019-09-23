<template>
    <div>
        <ProfileInfo
            :profile="profile"
        />
        <!-- <ActiveBlock
            :memberships = "membershipsRes"
        />
        <Relationships
            :followers = "followersRes"
            :following = "followingRes"
        /> -->
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
    props: [
        'profile',
    ],
}
</script>

<style>
</style>
