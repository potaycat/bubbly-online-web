<template>
    <section class="section">
        <h2 class="title has-text-centered">login!</h2>

        <form method="post" @submit.prevent="getdatjwt">
            <div class="field">
                <label class="label">Username</label>
                <div class="control">
                    <input
                        type="text"
                        class="input"
                        name="username"
                        v-model="username"
                        required
                    />
                </div>
            </div>
            <div class="field">
                <label class="label">Password</label>
                <div class="control">
                    <input
                        type="password"
                        class="input"
                        name="password"
                        v-model="password"
                        required
                    />
                </div>
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
    layout: 'immerse',
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

                // setTimeout((index) => {
                //   this.$router.push('chat/direct/long')
                // }, 2000);
            } catch (e) {
                this.error = e.response.data.message;
            }
        }
    }
};
</script>