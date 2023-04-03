<template>
    <div>
        <div  style="background-image: url('web-asset/img/path104.png')">
        <div style="background-color: rgb(255 255 255 / 80%);">
            <breadcrumb :data=breadcrumbLsit />
          <h3 class="text-center fw-bold py-2">الشخصيات</h3>
          <h5 class="text-center  pt-3 text-black-80">ابحث عن الشخصيات أو المؤسسات في جميع الوطن العربي</h5>
          <section class="Discover my-5">
          <discover :isHome=true />
          </section>
          <h3 class="text-center fw-bold py-2">جميع الشخصيات في من هم</h3>
          </div>
          </div>
          <div class="container">
            <div class="row">
               <div v-for="(charactour,index) in character" :key=index class="col-md-3 mt-4" style="height: auto;">
                <a  :href="'/شخصيات/'+decodeURI(charactour.slug)+'/'"  class="card  position-relative bg-category h-100">
                 <img v-if="!charactour.image"   src="/web-asset/img/noResult.jpg"  alt="charactour image"> 
           
  
                  <img v-if="charactour.image" class=" rounded-btn-img w-100" 
                            :src=charactour.image
                           >
          
                    <div class="card-body text-end position-absolute bottom-0 end-0 text-white">
                      <h2 class="card-title fs-5 fw-bold">{{charactour.character_name_ar}}</h2>
                      <h5 class="text-decoration-none fs-5 text-white ">{{fixContent(charactour.content)| truncate(30,'..')}}</h5>
                    </div>
                  </a>
                </div>
              <div class="text-center my-4">
              <button @click="getCategorymore()" class="btn btn-primary py-2"  :class="disabled ? 'disabled' : '' "><i class="fa-solid fa-rotate" :class="{ 'fa-spin': loadingMore} " ></i> عرض الكل </button>
              </div>
              </div>
              </div>
              <div >
              </div>
              <a href="#" class="float bg-primary">
              <i class="fa-solid fa-chevron-up fa-xl my-float"></i>
              </a>
    </div>
</template>
<script>
import discover from '../home/discover.vue'
import breadcrumb from '../pages/accessories/breadcrumb.vue'


export default {
  components:
        {
        breadcrumb,
        discover,
 
      },
    data() {

        return {
          disabled:true,
          character:[],
          characterSelected:[],
          more:0,
          disabledSelected:true,
          loadingMore:false,
          allcategory:{},
         allcharacterelected:{},
      'breadcrumbLsit' :[
        {
          name:'الرئيسية',
          link:'/'
        },
        {
          name:'جميع الشخصيات',
          link:{ path: '/%D8%AC%D9%85%D9%8A%D8%B9-%D8%A7%D9%84%D8%B4%D8%AE%D8%B5%D9%8A%D8%A7%D8%AA'}
        },
                        ],

        }
    },
     methods: {
        fixContent(value){
        try{
        if(value)
        {
            if(  ((value.split(".\r"))[0]).length > ((value.split(".<"))[0]).length){
                return  (value.split(".<"))[0]
            }
            else  return (value.split(".\r"))[0]
        }
        }catch(error) {
          return ''
        }
    },
    getCategory()
            {
        this.loadingMore=true
         this.http.get('/charactour')
        .then(async (response)=>{
        this.character=response.data.items
          this.loadingMore=false
        if(response.data.items.length > 6){
            this.disabled=false
        }
        })
        },
      getCategorymore(){
        this.loadingMore=true
        this.more=this.more+10
           this.http.get('/charactour?skip='+this.more)
        .then(async (response)=>{
        //this.allcategory=response.data
        this.character= [...this.character, ...response.data.items]
        this.loadingMore=false
        })
        },

        },
        filters:{
           formatPositions: function (value) {
                    if (!value) return ''
                    if (value) {
                        try {
                           value= (JSON.parse(value)[0]).postion.trim().replace(/u([0-9A-F]{0,4})/g,'&#x$1')
                        } catch (error) {
                            return ""
                        }
                    return value
                    }
                }
        },

        created() {
            this.getCategory()
           // this.getcharacterelected()
        }
};
</script>
