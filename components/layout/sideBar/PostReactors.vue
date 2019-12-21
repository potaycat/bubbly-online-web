<template>
    <div>
        <Users ref="reactors" class="side-bar__item"
            title="People reacted to this post"
            :toFetch="`posts/${$route.params.slug}/reacts/`"
        />
    </div>
</template>

<script>
import Users from './feed/Users'
export default {
    components: { Users },
    activated() {
        this.$refs.reactors.simulateDisableKeepAlive()
    }
}
</script>
