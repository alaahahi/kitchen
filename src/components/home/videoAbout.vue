 <template>
<section class=" container-fluid ">
            <div class="m-auto w-size" :class="categorys ? 'd-none': 'd-block'">
                <p class="text-gray-80  py-2  fs-3 fw-bold pt-2 text-center">{{ $t('aboutUs')}} </p>
                <div class="nav justify-content-center  p-0 position-relative">
                  <iframe class="rounded-btn-img" width="800" height="450" src="https://www.youtube-nocookie.com/embed/R1HJ94wAuG8?start=212&autoplay=1&mute=1" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
                  <div class="position-absolute w-100" style="height: 450px;"></div>
                </div>
            </div>
            <div class="m-auto w-size" :class="categorys ? 'd-block': 'd-none'">
               

                <p class="text-gray-80  py-2  fs-3 fw-bold pt-2 text-center">{{ $t('aboutUs')}} </p>
                <div class="nav justify-content-center  p-0">
      
                <VueSkeletonLoader type="rect" :width="800" :height="500" color="#F6F6F6" animation="wave" :rounded=true radius=2 class="m-2" />
      
          
                </div>
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
    await this.http.get('/category/homeCategory',{"country":[this.$store.state.langFilter.toLowerCase()]})
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
