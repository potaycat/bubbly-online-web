<template>
  <section class="section">
    <div class="container">
      <div class="columns">
        <div class="column is-4 is-offset-4">
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
                >
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
                >
              </div>
            </div>
            <div class="control">
              <button type="submit" class="button is-dark is-fullwidth">Login</Button>
            </div>
          </form>

        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  components: {
  },

    created() {
        this.$store.commit('changeDestination', 99)
    },
  data() {
    return {
      username: '',
      password: '',
      error: null,
    }
  },

  computed: {
    toke() {
      return this.$store.state.jwtlogin.jwt
    },
  },
  watch: {
    toke(newTok) {
      window.location.reload()
      this.$router.go()
    },
  },

  methods: {
    getdatjwt() {
      try {
        this.$store.dispatch('jwtlogin/login', {
          username: this.username,
          password: this.password
        })
        
        // setTimeout((index) => {
        //   this.$router.push('chat/direct/long')
        // }, 2000);
      } catch (e) {
        this.error = e.response.data.message
      }
    }
  }
}
</script>