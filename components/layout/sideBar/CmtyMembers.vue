<template>
    <div>
        <Users ref="members" class="side-bar__item"
            title="Members"
            :toFetch="`communities/${$route.params.id}/members/`"
        />
    </div>
</template>

<script>
import Users from './feed/Users'
export default {
    components: { Users },
    activated() {
        this.$refs.members.simulateDisableKeepAlive()
    }
}
</script>
