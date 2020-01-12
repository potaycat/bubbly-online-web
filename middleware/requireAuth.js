export default ({ route, app }) => {
    const meta = route.meta[0]
    if (meta.requiresAuth) {
        app.store.dispatch("auth/logInToDoThat")
    }
}
