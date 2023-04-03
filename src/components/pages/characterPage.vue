<template>
  <div>
    <div style="background-image: url('web-asset/img/path104.png');">
    <div style="background-color: rgb(255 255 255 / 80%);">
    <breadcrumb :data=breadcrumbLsit />
    <h2 class="text-center">دليل الشخصيات</h2>
    <h3 class="text-black-80 text-center fs-5 py-3">ابحث عن الشخصيات في جميع الوطن العربي</h3>
    <discover :isHome=true />
    <trend-search></trend-search>
    
    </div>
    </div>
    <charactourYouFollowHome v-if="user" />
    <featuredCharactersList />
    <newCompany/>
  </div>
</template>
<script>
import breadcrumb from '../pages/accessories/breadcrumb.vue'
import discover from '../home/discover.vue'
import trendSearch from '../home/trendSearch.vue'
import charactourYouFollowHome from '../home/charactourYouFollowHome.vue'
import featuredCharactersList from '../home/featuredCharactersList.vue'

export default {
  components: 
        {
        discover,
        breadcrumb,
        trendSearch,
        charactourYouFollowHome,
        featuredCharactersList

        },
    data() {
        
        return {
          user:this.$store.state.user,
               'breadcrumbLsit' :[
        {
          name:'الرئيسية',
          link:'/'
        },
        {
          name:'دليل الشخصيات',
          link:'/companiesGuide'
        },
                        ],
        }
    }
};
</script>