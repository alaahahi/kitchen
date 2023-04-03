<template>
  <div>
    <moreCompanies v-if="type== 'new'" :data=companiesDataNew />
    <moreCompanies v-if="type== 'best'" :data=companiesDataBest />
    <moreCompanies v-if="type== 'mostSearched'" :data=companiesDataMostSearched />
    <moreCompanies v-if="type== 'recommended'" :data=companiesDataRecommended />
    <moreCompanies v-if="type== 'bestGroup'" :data=companiesDataBestGroup />
  </div>
</template>

<script>
import moreCompanies from '../company/moreCompanies.vue'
export default {
    props:['user'],
  components: {
    moreCompanies
  },
  data() {
    return {
      companiesDataNew:{
        'firstTitle':'المؤسسات المضافة حديثا',
        'secoundTitle':'ابحث عن المؤسسات في جميع الوطن العربي',
        'thirdTitle':'المؤسسات المضافة حديثا',
        'fourthTitle':'المؤسسات المضافة حديثا على من هم',
        'filters':[ "recently_added"],
        'breadcrumbLsit' :[
        {
          name:'الرئيسية',
          link:'/'
        },
        {
          name:'دليل المؤسسات',
          link:'/companiesGuide'
        },
        {
          name:'المؤسسات المضافة حديثا',
          link:'/companies=new'
        },
                        ],
        'user':this.user
      },
      companiesDataBest:{
        'firstTitle':'أفضل المؤسسات',
        'secoundTitle':'ابحث عن المؤسسات في جميع الوطن العربي',
        'thirdTitle':'أفضل المؤسسات',
        'fourthTitle':'المؤسسات الأفضل على من هم',
        'filters':[ "fetcherd"],
        'breadcrumbLsit' :[
        {
          name:'الرئيسية',
          link:'/'
        },
        {
          name:'دليل المؤسسات',
          link:'/companiesGuide'
        },
        {
          name:'المؤسسات أفضل',
          link:'/companies=best'
        },
                        ],
        'user':this.user
      },
      companiesDataMostSearched:{
        'firstTitle':'المؤسسات الأكثر زيارةَ',
        'secoundTitle':'ابحث عن المؤسسات في جميع الوطن العربي',
        'thirdTitle':'المؤسسات الأكثر زيارةَ',
        'fourthTitle':'المؤسسات  الأكثر زيارةَ على من هم',
        'filters':[ "most_searched"],
        'breadcrumbLsit' :[
        {
          name:'الرئيسية',
          link:'/'
        },
        {
          name:'المؤسسات الأكثر زيارةَ',
          link:'/companies=mostSearched'
        },
        ],
        'user':this.user
      },
      companiesDataRecommended:{
        'firstTitle':'المؤسسات التي نرشحها لك',
        'secoundTitle':'ابحث عن المؤسسات في جميع الوطن العربي',
        'thirdTitle':'المؤسسات التي نرشحها لك',
        'fourthTitle':'المؤسسات  الأكثر زيارةَ على من هم',
        'filters':[ "most_searched"],
        'breadcrumbLsit' :[
        {
          name:'الرئيسية',
          link:'/'
        },
        {
          name:'المؤسسات التي نرشحها لك',
          link:'/companies=recommended'
        },
        ],
        'user':this.user
      },
      companiesDataBestGroup:{
        'firstTitle':'إكتشف أفضل المؤسسات والمجموعات',
        'secoundTitle':'ابحث عن المؤسسات في جميع الوطن العربي',
        'thirdTitle':'إكتشف أفضل المؤسسات والمجموعات',
        'fourthTitle':'المؤسسات  الأكثر زيارةَ على من هم',
        'filters':[ "most_visited"],
        'breadcrumbLsit' :[
        {
          name:'الرئيسية',
          link:'/'
        },
        {
          name:'إكتشف أفضل المؤسسات والمجموعات',
          link:'/companies=bestGroup'
        },
        ],
        'user':this.user
      },
      type:this.$route.params.type

    };
  },
};
</script>
