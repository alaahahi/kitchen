<template>
    <div>
          <section class="Discover">
          <discover :isHome=true />
          </section>
          <historicalClassification/>
          <investmentCharacters/>
          <selectedCategories/>
          <company-you-follow/>
              <companiesRecommend/>
    </div>
</template>
<script>
import discover from '../home/discover.vue'
import trend from '../home/trend.vue'
import companyYouFollow from '../home/bestCompany.vue'
import historicalClassification from '../discover/historicalClassification.vue'
import investmentCharacters from '../discover/investmentCharacters.vue'
import selectedCategories from '../discover/selectedCategories.vue'
import companiesRecommend from '../company/companiesRecommend.vue'
import 'hooper/dist/hooper.css';
export default {
  components: 
        {
        selectedCategories,
        investmentCharacters,
        historicalClassification,
        discover,
        trend,
        companyYouFollow,
        companiesRecommend
        
      },
    data() {
        
        return {
            message: 'Discover page'
        }
    }
};
</script>
