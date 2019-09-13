export const subTabs = {
    computed: {
        activeSubTab() {
            return this.$store.state.activeSubTab
        },
    },
    created() {
        this.$store.commit('loadSubTabs', this.subTTL)
    },
    destroyed() {
        this.$store.commit('loadSubTabs', "")
    }
}