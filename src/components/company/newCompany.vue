 <template>
<section class="characters-you-follow  bg-white p-5" style="direction: ltr;">
                <div class="container text-center">
                <h1 class="display-2  fs-1 py-2 fw-bold"> المؤسسات الجديدة</h1>
                <h1 class="display-4 fs-4 pt-1 pb-2 text-black-80 "> جمعنا لك افضل التصنيفات ... والشخصيات بداخل كل تصنيف </h1>
                </div>
  <div class="container ">
                    <div  class="row justify-content-center m-auto">
                        <div v-for="(bestCompany, i) in bestCompanyLastMonth" :index="i" :key="i"  class="col-lg-2 col-md-3  col-sm-4 col-6 m-auto m-lg-2 m-md-2 mt-1">
                            <div class="card h-100 bg-transparent border-card-company">
                            <div  class="bs-img-size d-flex align-items-center justify-content-center">
                            <img v-if="bestCompany.image" class="rounded w-75" :src="bestCompany.image" alt="Companylogo">
                            <img v-if="!bestCompany.image" class="rounded w-75" :src="'web-asset/img/c'+i+'.png'"   alt="Companylogo">
                            </div>
                            <div class="card-body text-center">
                                <h5 class="card-title fs-6 ">{{bestCompany.nameAR}}</h5>
                                <p class="card-text text-warning">{{bestCompany.category}}</p>
                                <router-link class="stretched-link" :to="{ name: 'companyDetail', params: { id:decodeURI(bestCompany.slug)+'/' }}"></router-link>
                            </div>
                            </div>
                        </div>
                    </div>
                    <div class="row" v-if="bestCompanyLastMonth.length">
                        <div class="col text-center">
                            <router-link class="text-decoration-none text-primary fw-bold fs-5"  to="/companies=new">تصفح المزيد </router-link>
                        </div>
                    </div>
                </div>
</section>
 </template>
<script>
export default {
       data() {
        return {
                bestCompanyLastMonth:{}
        }
    },
     methods: {
    getCompany()
            {
           this.http.post('/company/filter',{
          "order":["recently_added"],
          "country":[this.$store.state.countryFilter.toLowerCase()]
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
            