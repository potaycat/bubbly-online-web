<template>
    <div>
        <ActivityView />
        <section class="doc-content --dtail-app-bar">
            <h3></h3>
            <p>
                Vui lòng tuân thủ luật pháp Việt Nam và sử dụng trang web tương
                ứng với lẽ thường
            </p>
        </section>
    </div>
</template>

<script>
import ActivityView from '@/components/layout/ActivityView'
export default {
    meta: {
        useAppBar: true,
        disableHamburger: true,
        appBarTitle: "Điều khoản"
    },
    components: {ActivityView}
}
</script>
