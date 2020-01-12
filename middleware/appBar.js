export default ({ route, app }) => {
    const meta = route.meta[0]
    if (meta.useAppBar) {
        app.store.commit('appBar/LOAD_ICON', {}) // TODO refactor
        app.store.commit('appBar/LOAD_TITLE', meta.appBarTitle)
        if (meta.disableHamburger) {
            app.store.commit('appBar/BURGER_STATE', null)
        } else {
            app.store.commit('appBar/BURGER_STATE', false)
        }
    }
}
