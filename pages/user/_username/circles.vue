<template>
    <div>
        <Circles />
    </div>
</template>

<script>
import Circles from '@/components/profile/Circles'
export default {
    layout: "immerse",
    components: {
        Circles,
    },
    created() {
        if (!this.$store.state.detailBanner.text) {
            this.$axios.get(`/accounts/${this.$route.params.username}`, 
                this.$store.state.authHeader)
                .then(res => {
                    this.$store.commit('detailBanner/loadText', res.data.alias)
                    this.$store.commit('detailBanner/loadPic', {
                        src: res.data.profile_pic,
                        style:'circle'
                    })
                })
        }
    },
}
</script>
