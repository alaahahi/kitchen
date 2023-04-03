<template>
  <div>
    <div class="bghome" style="background-image: url('web-asset/img/path104.png');95%">
      <div class="container-fluid" style="background-color: rgb(255 255 255 / 80%)">
        <section class="Discover row">
          <discoverTitle :liveCount1="liveCount1"  :liveCount2="liveCount2"  />
          <!-- id="discover" -->
          <discover :isHome="true"/>
        </section>
        <trend :categorys="categorys"></trend>
        <trend-search :characters="characters"></trend-search>
      </div>
    </div>
    <topTen></topTen>
    <bestCompany :companies="companies" />
    <subscriptionType />
    <charactourYouFollowHome v-if="user" />
    <!-- <featuredCharactersList /> -->
    <featuredMainCategories />
  </div>
</template>
<script>
import discover from '../home/discover.vue'
import discoverTitle from '../discover/discoverTitle.vue'
import trend from '../home/trend.vue'
import trendSearch from '../home/trendSearch.vue'
import topTen from '../home/topTen.vue'
import charactourYouFollowHome from '../home/charactourYouFollowHome.vue'
import bestCompany from '../home/bestCompany.vue'
import featuredMainCategories from '../home/featuredMainCategories.vue'
import subscriptionType from '../home/subscriptionType.vue'

export default {
  metaInfo: {
    title: 'من هم؟  | بوابة الشخصيات والمؤسسات',
  },
  components: {
    discover,
    discoverTitle,
    trend,
    charactourYouFollowHome,
    topTen,
    bestCompany,
    subscriptionType,
    trendSearch,
    featuredMainCategories,
  },
  data() {
    return {
      user: this.$store.state.user,
      windowSize: window.innerWidth,
      characters: null,
      categorys: null,
      companies: null,
      liveCount1:0,
      liveCount2:0,
      code: this.$route.meta.code
        ? this.$route.meta.code
        : this.$store.getters.countryFilter
        ? this.$store.getters.countryFilter.toLowerCase()
        : 'ae',
      scroll_fired:false,
    }
  },
  methods: {
    resizeHandler(e) {
      this.windowSize = window.innerWidth
    },
    async getMost_visited() {
      await this.http
        .get('/charactour/most_visited?code=' + this.code + '&character=1&company=1&category=1')
        .then(async (response) => {
         
          if (this.windowSize > 760) {
            this.companies = response.data.top_companies
            this.characters = response.data.top_characters
          }
          if (this.windowSize < 760) {
            this.companies = response.data.top_companies.slice(0, 9)
            this.characters = response.data.top_characters.slice(0, 5)
          }
          this.categorys = response.data.top_categories.slice(0, 4)

          this.loading = false
          if(response.data.live_counts){
          this.liveCount1=  (response.data.live_counts.toString()).substring(3);
          this.liveCount2=  (response.data.live_counts.toString()).substring(0,3);
        }
        })
    },
  },
  created() {
    this.getMost_visited()
    window.addEventListener('resize', this.resizeHandler)
    window.onscroll = function(event) {
      if (window.scrollY >= 243.75){
        let el = document.getElementById('discover');
        if (el && el.classList != null){
          if (!el.classList.contains('j-fixed-top')){
            el.className += " j-fixed-top"
          }
        }
      } else if (window.scrollY < 243.75){
        let el = document.getElementById('discover');
        if (el && el.classList != null){
          if (el.classList.contains('j-fixed-top')){
            el.classList.remove("j-fixed-top");
          }
        }
      }
    };
  },
  destroyed() {
    window.removeEventListener('resize', this.resizeHandler)
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