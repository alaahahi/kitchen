<template>
  <div>
    <trend-search ></trend-search>
    <video-about></video-about>
    <ourServices></ourServices>
    <katchen></katchen>
    <testimonial></testimonial>
  </div>
</template>
<script>

import trendSearch from '../home/trendSearch.vue'
import videoAbout from '../home/videoAbout.vue'
import ourServices from '../home/ourServices.vue'
import katchen from '../home/katchen.vue'
import testimonial from '../home/testimonial.vue'


export default {
  metaInfo: {
    title: ' مطبخي  | الجديد في عالم المطابخ',
  },
  components: {

    trendSearch,
    videoAbout,
    ourServices,
    katchen,
    testimonial

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