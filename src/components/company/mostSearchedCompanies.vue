 <template>
<section class="characters-you-follow p-5">
                <div class="container text-center">
                <h1 class="display-2  fs-1 py-2 fw-bold">الأكثر زيارةَ</h1>
                <h1 class="display-4 fs-4 pt-1 pb-2 text-black-80 "> جمعنا لك افضل التصنيفات ... والشخصيات بداخل كل تصنيف </h1>
                </div>
             <div class="container ">
                    <div  class="row ">
                          <hooper  :settings="hooperSettings">
                        <slide v-for="(bestCompany, i) in bestCompanyLastMonth" :index="i" :key="i" class="mx-1" >
                            <div class="card bg-white border-card-company">
                            <div  class="bs-img-size d-flex align-items-center justify-content-center">
                            <img v-if="bestCompany.image" class="rounded w-75" :src="bestCompany.image" alt="Companylogo">
                            <img v-if="!bestCompany.image" class="rounded w-75" :src="'web-asset/img/c'+i+'.png'"   alt="Companylogo">
                        
                            </div>
                            <div class="card-body text-center">
                                <h5 class="card-title fs-6 fw-bold">{{bestCompany.nameAR}}</h5>
                                <router-link class="stretched-link" :to="{ name: 'companyDetail', params: { id:decodeURI(bestCompany.slug)+'/' }}"></router-link>
                            </div>
                            </div>
                        </slide>
                         <hooper-navigation slot="hooper-addons"></hooper-navigation>
                        </hooper>
                    </div>
                    
                    <div class="row" v-if="bestCompanyLastMonth.length">
                    
                        <div class="col text-center">
                            <router-link class="btn btn-primary px-3 fw-bold"  to="/companies=mostSearched"> تصفح المزيد 
                               <i class="fa-solid fa-angle-left me-2"></i>
                            </router-link>
                        </div>
                    </div>
                </div>
</section>
 </template>
<script>
import {Hooper,Slide,Navigation as HooperNavigation } from 'hooper';
  import 'hooper/dist/hooper.css';
export default {
          components: 
        {
       Hooper,
    Slide,
    HooperNavigation
      },
       data() {
        return {
              hooperSettings: {
        itemsToSlide:1,
        rtl:true,
        touchDrag:true,
        mouseDrag:false, 
        wheelControl:false,
        itemsToShow: 2,
        breakpoints: {
          800: {
            centerMode: false,
            itemsToShow: 4
          },
          1000: {
            itemsToShow: 6,
          }
        }
      },
                bestCompanyLastMonth:{}
        }
    },
     methods: {
    getCompany()
            {
        this.http.post('/company/filter',{
          "order":["most_searched"],
          "country":[this.$store.state.langFilter.toLowerCase()]
        })
        .then(async (response)=>{
        this.bestCompanyLastMonth = response.data.items
                     })
            }
        },
        created() {
            this.getCompany()
        }
};
</script>
<style scoped>
.bs-img-size{
    min-height: 200px;
    border: 1px #aba7a733 solid;
    border-radius: 10px;
}
.border-card-company{
    border: none ;
}
</style>
            