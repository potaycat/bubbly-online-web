<template>
    <div>
        <ActivityView />
        <Auth action="Login" />
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
};
</script>
