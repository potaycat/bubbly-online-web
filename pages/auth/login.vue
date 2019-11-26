<template>
    <section class="section">
        <h2 class="title">login!</h2>

        <form method="post" @submit.prevent="getdatjwt">

            <div class="form__group">
                <input id="username_fld" v-model="username" class="form__field" placeholder="_">
                <label for="username_fld" class="form__label">Username</label>
            </div>

            <div class="form__group">
                <input id="pw_fld" v-model="password" class="form__field" placeholder="_">
                <label for="pw_fld" class="form__label">Password</label>
            </div>
            
            <div class="control">
                <button type="submit" class="glow">
                    Login
                </button>
            </div>
        </form>
    </section>
</template>

<script>
export default {
    layout: 'blank',
    data() {
        return {
            username: "",
            password: "",
            error: null
        };
    },
    methods: {
        getdatjwt() {
            try {
                this.$store.dispatch("auth/login", {
                    username: this.username,
                    password: this.password
                });
            } catch (e) {
                this.error = e.response.data.message;
            }
        }
    }
};
</script>