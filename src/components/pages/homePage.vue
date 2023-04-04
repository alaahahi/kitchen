<template>
  <div class="container-fluid">
    <trend-search ></trend-search>
    <video-about></video-about>
   

  </div>
</template>
<script>

import trendSearch from '../home/trendSearch.vue'
import videoAbout from '../home/videoAbout.vue'

export default {
  metaInfo: {
    title: ' مطبخي  | الجديد في عالم المطابخ',
  },
  components: {

    trendSearch,
    videoAbout

  },
  data() {
    return {

    }
  },


}
</script>
<style scoped>
.j-fixed-top {
  position: fixed;
  top: 63px !important;
  right: 0;
  left: 0;
  z-index: 250;
  background-color: #F7F9FB;
  width: 100%;
  padding: 16px 113px 16px 113px;
}
</style>