<template>
    <div>
        <ActivityView />
        <Auth action="Register" />
    </div>
</template>

<script>
import ActivityView from '@/components/layout/ActivityView'
import Auth from '@/components/auth/'
import { disableHamburger } from '@/mixins/appBarStuff'
export default {
    layout: 'blank',
    components: {
        ActivityView,
        Auth,
    },
    mixins: [disableHamburger],
    beforeCreate() {
        if (this.$route.query.step) {
            this.$router.replace('register')
        }
    }
};
</script>
