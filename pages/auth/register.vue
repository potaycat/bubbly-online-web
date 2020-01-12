<template>
    <div>
        <ActivityView />
        <Auth action="Register" />
    </div>
</template>

<script>
import ActivityView from '@/components/layout/ActivityView'
import Auth from '@/components/auth/'
export default {
    layout: 'blank',
    meta: {
        useAppBar: true,
        disableHamburger: true,
    },
    components: {
        ActivityView,
        Auth,
    },
    beforeCreate() {
        if (this.$route.query.step) {
            this.$router.replace('register')
        }
    }
};
</script>
