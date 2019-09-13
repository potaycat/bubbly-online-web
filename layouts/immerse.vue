<template>
  <div>
    <TopBarDetail />

      <Nuxt />
    
  </div>
</template>

<script>
import TopBarDetail from '@/components/bars/DetailBanner'
import BottomNav from '@/components/bars/BottomNav'

export default {
  components: {
    TopBarDetail,
    BottomNav,
  },
}
</script>


<style>
.default-template {
}

</style>