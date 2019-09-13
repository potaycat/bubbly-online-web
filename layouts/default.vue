<template>
  <div class="default-template">
    <TopBarMain />

      <Nuxt />
    
    <BottomNav />
  </div>
</template>

<script>
import TopBarMain from '@/components/bars/TopMain'
import BottomNav from '@/components/bars/BottomNav'

export default {
  components: {
    TopBarMain,
    BottomNav,
  },
  created() {
    this.$store.dispatch('jwtlogin/loadProfile');
  }
}
</script>


<style>
.default-template {
  /* background-color: #ECEFF1; */
  overscroll-behavior: contain; /* auto refresh no! */
}

</style>