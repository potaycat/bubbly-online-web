export const disableHamburger = {
    activated() {
        this.$store.commit('appBar/burgerState', null)
    },
    beforeCreate() {
        this.$store.commit('appBar/burgerState', null)
    },
    deactivated() {
        this.$store.commit('appBar/burgerState', false)
    }
}

export const appBarTitle = {
    data:() => ({
        // appBarDisplayTitle: "used appbar mixin",
    }),
    activated() {
        this.$store.commit('appBar/loadText', this.appBarDisplayTitle)
    },
    created() {
        this.$store.commit('appBar/loadText', this.appBarDisplayTitle)
    },
    deactivated() {
        this.$store.commit('appBar/loadText', null)
    }
}