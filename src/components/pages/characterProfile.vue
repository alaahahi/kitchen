<template>
  <div>
    <div   :class="{ 'w-100 h-100 bg-white position-fixed': loading}" style="margin-top: -13px;z-index:1 ;">

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
              charactour:{},
              id:this.$route.params.id,
              breadcrumbLsit:"",
              loading:true,
              title:"من هم؟  | بوابة الشخصيات والمؤسسات",
              news:{},
              newsProfile:{},
        }

    },
            metaInfo() {
                 return {
      title: this.title
                 }
    },
    methods: {
              getNews(id)
            {
if(this.$store.state.token){
  this.http.get('/charactour/getNewsFromLableb?id='+id,{headers: { Authorization: `Bearer ${this.$store.state.token}` } ,        })
        .then(async (response)=>{
          try {
               this.news = response.data.slice(0,4)  

          } catch (error) {
           //console.log(error)
          }
                     })
}else{
  this.http.get('/charactour/getNews?id='+id)
        .then(async (response)=>{
          try {
               this.news = response.data.slice(0,2)   

          } catch (error) {
           //console.log(error)
          }
                     })
}

            },
            getNewsProfile(id)
            {
        this.http.get('/charactour/getNewsFromLablebWrittenByCharacter?id='+id)
        .then(async (response)=>{
                    try {
             this.newsProfile = response.data.response.results


          } catch (error) {
           //console.log(error)
          }
                     })
            },
     getCharactour()
            {

          this.http.get('/charactour/show/'+this.id+'?user_id='+this.$store.state.user.id)
        .then( (response)=>{
        this.charactour = response.data

         this.title= (this.charactour.gender == 2 ? ' من هي':' من هو')+' '+this.charactour.character_name_ar +'؟ | ملف الشخصية | من هم؟ '
                 this.getNews(response.data.IDM ? response.data.IDM : response.data.id )
        this.getNewsProfile(response.data.id)
       // document.title =  'من هو '+this.charactour.character_name_ar +'؟ | ملف الشخصية | من هم؟ '
        this.breadcrumbLsit=[
              {
                name:'الرئيسية',
                link:'/'
              },
              {
                name:  this.charactour.character_name_ar,
                link:''
              },
              ]
               this.loading=false
                     })
            }

        },
        created() 
        {

            this.getCharactour()
         

        },
};
</script>
