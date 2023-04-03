<template>
  <div class="bg-white">
    <div  style="z-index:1 ;" :class="{ 'w-100 h-100 bg-white position-fixed fixsize': loading}">
    <div class="position-absolute top-50 start-50  bg-white"  :class="{ 'spinner-border text-primary spinner-border-xl': loading}"></div>
    </div>
    <breadcrumb :data=breadcrumbLsit />
   

  </div>
</template>
<script>
import breadcrumb from '../pages/accessories/breadcrumb.vue'
export default { 
  components: 
        {
        breadcrumb
        },
    data() {
        
        return {
                    id:this.$route.params.id,
                    company:{},
                    breadcrumbLsit:"",
                    loading:false,
                    load : localStorage.getItem('reloadedCompany'),
                    title:"من هم؟  | بوابة الشخصيات والمؤسسات",
        }
    },
                metaInfo() {
                 return {
      title: this.title
                 }
    },
    methods: {
    getCompany()
            {
              this.loading=true
          this.http.get('/company/show/'+this.id+'?user_id='+this.$store.state.user.id,{ headers: { token:this.$store.state.token} })
        .then(async (response)=>{
        this.company = response.data
                this.title =   this.company.nameAR +'؟ | ملف المؤسسة | من هم؟ ' 
                this.breadcrumbLsit=[
              {
                name:'الرئيسية',
                link:'/'
              },
              {
                name:'دليل المؤسسات',
                link:'/companiesGuide'
              },
              {
                name:  this.company.nameAR,
                link:''
              },
              ]
               this.loading=false
                     })
            }
        },
        created() {
          if (localStorage.getItem('reloadedCompany')) {
        // The page was just reloadedCompany. Clear the value from local storage
        // so that it will reload the next time this page is visited.
        localStorage.removeItem('reloadedCompany');
        this.getCompany()

    } else {
        // Set a flag so that we know not to reload the page twice.
        localStorage.setItem('reloadedCompany', '1');
        location.reload();
    }
      
        },
};
</script>
<style scoped>
.fixsize{
  margin-top: -18px;
}
</style>