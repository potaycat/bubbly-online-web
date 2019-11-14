export const disableHamburger = {
    created() {
        this.$store.commit('detailBanner/openInfo', null)
    },
    destroyed() {
        this.$store.commit('detailBanner/openInfo', false)
    }
}