 <template>
<section class="characters-you-follow  bg-white p-2" style="direction: ltr;">
                <div class="container text-center">
                <h1 class="display-2  fs-1 py-2 fw-bold">مؤسسات نرشحها لك</h1>
                <h1 class="display-4 fs-4 py-3 text-black-80 ">جمعنا لك افضل التصنيفات ... والشخصيات بداخل كل تصنيف</h1>
                </div>
                 <div class="text-center" :class="{ 'd-bloak': loading}">
                 <p  :class="{ 'spinner-border text-primary spinner-border-xl': loading}"></p>
                 </div>
                <div class="container ">
                    
                    <div  class="row d-flex justify-content-around">
                        <div v-for="(bestCompany, i) in bestCompanyLastMonth" :index="i" :key="i" class="col-md-2 col-sm-4 col-xs-2">
                            <div class="card h-100 bg-transparent border-card-company">
                            <div  class="bs-img-size  text-center ">
                            <img class="rounded-circle m-3" :src="bestCompany.image">
                             <div class="card-body text-center">
                                <h5 class="card-title fs-6">{{bestCompany.nameAR}}</h5>
                                <p class="text-black-80 ">{{bestCompany.category}}</p>
                                <router-link class="stretched-link" :to="{ name: 'companyDetail', params: { id:decodeURI(bestCompany.slug)+'/'}}"></router-link>
                                 <button v-if="bestCompany.isFollowing == false && user"  class="btn btn-outline-primary btn-sm" @click.prevent="postFollowCompany(decodeURI(bestCompany.slug)+'/')" >متابعة</button>
                                <button v-if="bestCompany.isFollowing == true && user" class="btn btn-outline-primary btn-sm" @click.prevent="postUnFollowCompany(decodeURI(bestCompany.slug)+'/')">إلغاء المتابعة</button>
                            </div>
                            </div>
                    
                            </div>
                        </div>
                    </div>
                    <div class="row p-4" v-if="bestCompanyLastMonth.length">
                        <div class="col text-center">
                            <router-link class="text-decoration-none text-primary fw-bold fs-5"  to="/companies=recommended">تصفح المزيد </router-link>
                        </div>
                    </div>
                </div>
</section>
 </template>
<script>
export default {
   
    data() {
        return {
                bestCompanyLastMonth:{},
                user:this.$store.state.user,
                loading:true
        }
    },
     methods: {
     postFollowCompany(v)
            {
        this.http.post('/company/followComapny',
                   {
                company_id:v,
                user_id:this.user.id,
                            },
        )
        .then(async (response)=>{
  
                     })
            },
    postUnFollowCompany(v)
            {
        this.http.post('/company/deleteFowllerComapny/delete',
                   {
                company_id:v,
                user_id:this.user.id,
                            },
        )
        .then(async (response)=>{

                     })
            },
    getCompany()
            {
        this.http.get('/company?skip=10')
        .then(async (response)=>{
        this.bestCompanyLastMonth = response.data.items.slice(4,9)
        this.loading =false
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
.rounded-circle{
  vertical-align: middle;
  width: 70px;
  height:70px;
  border-radius: 50%;
}
</style>
            