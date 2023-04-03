<template>
  <div>
    <div style="background-image: url('web-asset/img/path104.png');">
    <div style="background-color: rgb(255 255 255 / 80%);">
    <breadcrumb :data=breadcrumbLsit />
      <h2 class="text-center">دليل المؤسسات</h2>
    <h3 class="text-black-80 text-center fs-5 py-3">ابحث عن المؤسسات في جميع الوطن العربي</h3>
    <discover :isHome=true />
    <mostSearchedCompanies />
    </div>
    </div>
    <best-company-last-month/>
    <companiesRecommend />
    <newCompany/>
  </div>
</template>
<script>
import breadcrumb from '../pages/accessories/breadcrumb.vue'
import bestCompanyLastMonth from '../company/bestCompanyLastMonth.vue'
import companiesRecommend from '../company/companiesRecommend.vue'
import mostSearchedCompanies from '../company/mostSearchedCompanies.vue'
import newCompany from '../company/newCompany.vue'
import discover from '../home/discover.vue'
export default {
  components: 
        {
        mostSearchedCompanies,
        newCompany,
        companiesRecommend,
        bestCompanyLastMonth,
        discover,
        breadcrumb
        },
    data() {
        
        return {
               'breadcrumbLsit' :[
        {
          name:'الرئيسية',
          link:'/'
        },
        {
          name:'دليل المؤسسات',
          link:'/companiesGuide'
        },
                        ],
        }
    }
};
</script>