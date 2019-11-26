<template>
    <div>
        <Members />
    </div>
</template>

<script>
import Members from '@/components/community/list/Members'
export default {
    components: {
        Members,
    },
    created() {
        if (!this.$store.state.appBar.text) {
            this.$axios.get(`/communities/${this.$route.params.id}`, 
                this.$store.state.authHeader)
                .then(res => {
                    this.$store.commit('appBar/loadText', `Members of ${res.data.name}`)
                    this.$store.commit('appBar/loadPic', {
                        src: res.data.icon_img,
                        style:'square'
                    })
                })
        }
    },
}
</script>
