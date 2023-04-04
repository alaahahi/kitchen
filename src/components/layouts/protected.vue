<template>
<div oncontextmenu="return false"   >


        <headers class="mb-5" />
          <router-view  :key='$route.fullPath'></router-view>
        <footers  class="mt-5" />

</div>
</template>
<script>
import headers from '../home/header.vue'
import footers from '../home/footers.vue'
export default {
    components: {
        headers,
        footers
      },
data() {

return {
  user:this.$store.state.user,

  
}
},
};

</script>
<style scoped>
.mbs-5{
  padding-bottom: 2.7rem;
}
</style>