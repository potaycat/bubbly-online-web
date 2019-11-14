<template>
    <div>
        <Members />
    </div>
</template>

<script>
import Members from '@/components/community/list/Members'
export default {
    layout: "immerse",
    components: {
        Members,
    },
    created() {
        if (!this.$store.state.detailBanner.text) {
            this.$axios.get(`/communities/${this.$route.params.id}`, 
                this.$store.state.authHeader)
                .then(res => {
                    this.$store.commit('detailBanner/loadText', `Members of ${res.data.name}`)
                    this.$store.commit('detailBanner/loadPic', {
                        src: res.data.icon_img,
                        style:'square'
                    })
                })
        }
    },
}
</script>
