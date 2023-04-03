 <template>
<section class="trend container-fluid ">
            <div class="m-auto w-size bg-c-trend py-5" :class="!categorys ? 'd-none': 'd-block'">
                <p class="text-gray-80  py-2 d-block d-lg-none fs-6 fw-bold pt-2 text-center">تصنيفات مقترحة</p>
                <ul class="nav justify-content-center  p-0">
                <p class="text-gray-80 pb-4 pt-1 m-2 d-none d-lg-block fs-16  fw-bold pt-2">تصنيفات مقترحة</p>
                <li class="nav-item">
                    <span  v-for="(category,index) in categorys" :key=index>
                        <a  :href="getslug(category.slug,category.type)" class="btn p-2 m-2  text-gray-80  button-gray rounded-btn"  type="button"><i class="ms-2 fa-solid fa-arrow-trend-up"></i>{{category.name}}</a>
                    </span>
                </li>
                <li class="nav-item">
                <a href="/categories" class="btn fw-bold  text-gray-80 p-2 m-2 btn-light border bg-white px-4 rounded-btn" type="button">تصفح الكل</a>
                </li>
                </ul>
            </div>
            <div class="m-auto w-size bg-c-trend py-5" :class="!categorys ? 'd-block': 'd-none'">
                <p class="text-gray-80  py-2 d-block d-lg-none fs-16 fw-bold pt-2 text-center">تصنيفات مقترحة</p>
                <ul class="nav justify-content-center  p-0">
                <p class="text-gray-80 pb-4 pt-1 m-2 d-none d-lg-block fs-16  fw-bold pt-2">تصنيفات مقترحة</p>
                <li class="nav-item">
                <VueSkeletonLoader type="rect" :width="122" :height="40" color="#F6F6F6" animation="wave" :rounded=true radius=2 class="m-2" />
                </li><li class="nav-item">
                <VueSkeletonLoader type="rect" :width="122" :height="40" color="#F6F6F6" animation="wave" :rounded=true radius=2 class="m-2" />
                </li><li class="nav-item">
                <VueSkeletonLoader type="rect" :width="122" :height="40" color="#F6F6F6" animation="wave" :rounded=true radius=2 class="m-2" />
                </li><li class="nav-item">
                <VueSkeletonLoader type="rect" :width="122" :height="40" color="#F6F6F6" animation="wave" :rounded=true radius=2 class="m-2" />
                </li>
                <li class="nav-item">
               <span>
                <VueSkeletonLoader type="rect" :width="122" :height="40" color="#F6F6F6" animation="wave" :rounded=true radius=2 class="m-2" />
                </span>
               
                </li>
                </ul>
            </div>
                            
    

            </section>
 </template>
<script>
import VueSkeletonLoader from 'skeleton-loader-vue';
export default {
    props:['categorys'],
     components: { VueSkeletonLoader },
  data() {
        return {
         loading:true,   
        
        }
    },
          methods: {
            getslug(slug,type){
      try {
        if(type == 'company'){
          return '/company_category/' + slug + '/'
        }
        if(type == 'character'){
          return '/people_category/' + slug + '/'
        }
      } catch (error) {
        
      }

    },
  async   getCategory()
            {
    await this.http.get('/category/homeCategory',{"country":[this.$store.state.countryFilter.toLowerCase()]})
        .then(async (response)=>{
        this.categorys = response.data.slice(0,4)
        this.loading=false
                     })
            }
        },
        created() {
            //this.getCategory()
        }
};
</script>
<style scoped>

@media screen and (max-width: 992px) {
nav-item >p {
    display: block;
}

.bg-c-trend{
    border-radius: 10px;
    padding: 5px;
}    
}
@media screen and (max-width: 480px) {
    
}
.facebook-card{
    width: 200px;
    height: 200px;
}
</style>
