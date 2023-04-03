<template>
    <div class="col-lg-8">
    <div  style="z-index:1 ;" :class="{ 'w-75 h-75 bg-white position-fixed': loading}">
    <div class="position-absolute top-50 start-50  bg-white"  :class="{ 'spinner-border text-primary spinner-border-xl': loading}"></div>
    </div>
    <div >
        <h2 class="py-3 text-primary"> أهلاً {{user.firstname}}</h2>
        <h3 class="py-1 mt-1 d-inline" >شخصيات  تتابعها</h3>
        <h4  v-if="!characters.length" class="text-gray-60 py-5 text-center">لايوجد شخصيات تتابعها حتى الآن،تصفح<router-link :to="{ name: 'allCharacterPage'}"  class="text-primary">  جميع الشخصيات</router-link></h4>
        <div class="float-start" v-if="characters.length">
           <button aria-label="slideNext" class="btn btn-light rounded-circle btn-size m-1 shadow" @click.prevent="slideNext"> <i class='fa-solid fa-arrow-right'></i></button>
           <button aria-label="slidePrev" class="btn btn-primary rounded-circle btn-size m-1 shadow" @click.prevent="slidePrev"> <i class='fa-solid fa-arrow-left'></i></button>
        </div>
        <div class="clearfix"></div>
        <section class="best-company-groups bg-white mt-3" v-if="characters">
                <hooper ref="carousel" :settings="hooperSettings">
                    <slide v-for="(charactour,index) in characters" :key=index class="ps-4" >
                          <div class="w-100 shadow-c rounded-btn-img text-center text-md-end border rounded-btn pt-3 px-2 ps-4 my-2 pb-2" :class="hide == index ? 'd-none':''">
                           <div class="row  text-center text-md-end ">
                            <div class="col-md-3 ps-1 pe-3 g-0">
                                <img class="img-fluid   w-100 m-auto " style="border-radius:0.5rem;" :src=charactour.image>
                            </div>
                             <div class="col-md-9 g-0" style="min-height:106px ;">
                            <div >
                            <h4 class="card-title mb-0   p-0 fw-bold pt-1 fs-5">{{charactour.character_name_ar}}</h4>
                            <h2 class="fs-16 pt-2   mb-0 text-decoration-none pt-2" style="    min-height:38px;">{{charactour.content| truncate(25, '..')}}</h2>
                             <div> <a  :href="'/شخصيات/'+decodeURI(charactour.slug)+'/'"  class="btn btn-primary   rounded-btn"> الملف الشخصي </a>

                              <a class="fw-bold pe-2 fs-5link-primary text-decoration-none"  @click.prevent="postUnFollowcharactour(charactour.id,index)" href="">إلغاء المتابعة </a></div>
                            </div>
                             </div>
                             </div>
                             </div>

                    </slide>
                </hooper>
              
            </section>
    </div>

        <div class="mt-4" >
        <h3 class="py-1 d-inline">مؤسسات تتابعها</h3>
        <h4  v-if="!companies.length" class="text-gray-60 py-5  text-center">لايوجد مؤسسات تتابعها حتى الآن، تصفح<router-link  :to="{ name: 'allCompanyPage' }" class="text-primary"> جميع المؤسسات</router-link></h4>
        <div class="float-start"   v-if="companies.length" >
           <button aria-label="slideNext" class="btn btn-light rounded-circle btn-size m-1 shadow" @click.prevent="slideNextC"> <i class='fa-solid fa-arrow-right'></i></button>
           <button aria-label="slidePrev" class="btn btn-primary rounded-circle btn-size m-1 shadow" @click.prevent="slidePrevC"> <i class='fa-solid fa-arrow-left'></i></button>
        </div>
        <div class="clearfix"></div>
        <section class="best-company-groups bg-white mt-3" v-if="companies" >
          
                <hooper ref="carouselC" :settings="hooperSettings">
                    <slide v-for="(company,index) in companies" :key=index class="ps-4" >
                          <div class="w-100 shadow-c rounded-btn-img text-center text-md-end border rounded-btn pt-3 px-2 ps-4 my-2 pb-2" >
                           <div class="row  text-center text-md-end ">
                            <div class="col-md-3 ps-1 pe-3 g-0">
                                <img class="img-fluid   w-100 m-auto " style="border-radius:0.5rem;" :src=company.image>
                            </div>
                             <div class="col-md-9 g-0" style="min-height:106px ;">
                            <div >
                            <h4 class="card-title mb-0   p-0 fw-bold pt-1 fs-5">{{company.nameAR}}</h4>
                            <h2 class="fs-16  pt-2  mb-0 text-decoration-none pt-2" style="    min-height:38px;">{{company.information| truncate(25, '..')}}</h2>
                             <div> <a  :href="'/شركات/'+decodeURI(company.slug)+'/'" class="btn btn-primary   rounded-btn"> الملف الشخصي </a>
                              <a class="fw-bold pe-2 fs-5link-primary text-decoration-none"  @click.prevent="postUnFollowCompany(company.id);" href="">إلغاء المتابعة </a></div>
                            </div>
                             </div>
                             </div>
                             </div>

                    </slide>
                </hooper>

            </section>
    </div>

  </div>
</template>

<script>
import {Hooper,Slide,Navigation as HooperNavigation } from 'hooper';
  import 'hooper/dist/hooper.css';
export default {
  metaInfo: {
      title: 'متابعتي  | من هم؟'
    },
         components:
        {
       Hooper,
    Slide,
    HooperNavigation
      },
    data() {
        return {
        hide:-1,
        loading:true,
        user:this.$store.state.user,
        characters:[],
        companies:[],
        slideNo:0,
        hooperSettings: {
        touchDrag: true,
        itemsToSlide:1,
        rtl:true,
        mouseDrag:false,
        wheelControl:false,
        itemsToShow:1,
        breakpoints: {
          800: {
            centerMode: false,
            itemsToShow: 2
          },
          1400: {
            itemsToShow: 3,
          }
        }
      },
        }
    },
         filters: {
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
                }},
      methods: {
    checkRel(v){
      if(v) return 0
      try {
        return v.length
      } catch (error) {
        return 0
      }
    },
    slidePrev() {
  
      this.$refs.carousel.slidePrev();
      
    },
    slideNext() {

      this.$refs.carousel.slideNext();
    },
    slidePrevC() {

      this.$refs.carouselC.slidePrev();
      
    },
    slideNextC() {

      this.$refs.carouselC.slideNext();
    },
    getCharactourfollowUser()
            {
         this.http.post('/getFollowCharacters',{'user_id':this.$store.state.user.id},)
         .then(async (response)=>{
        this.characters = response.data.characters 
        this.companies = response.data.companies 
        this.loading=false
                     })
            },
    postUnFollowcharactour(v,i)
                {
            this.http.post('/unfollowCharacter',
            {
            "character_id":v,
            "user_id":this.$store.state.user.id
                            },
                            { headers: { Authorization: `Bearer ${this.$store.state.token}` }} ,)
            .then(async (response)=>{
              this.getCharactourfollowUser()
                       this.$toast.warning(" تم إلغاء المتابعة بنجاح", );
                        }).catch((error) => {
                   
                            this.$toast.warning("لم يتم إلغاء المتابعة لان الشخصية مرتبطة بالحساب الخاص بك" );
                        
                        })
                },

      postUnFollowCompany(v)
            {

        this.http.post('/unfollowCompany',{
                company_id:v,
                user_id:this.$store.state.user.id
                            },
                            { headers: { Authorization: `Bearer ${this.$store.state.token}` }} ,
        )
        .then(async (response)=>{
          this.$toast.warning(" تم إلغاء المتابعة بنجاح", );
          this.getCharactourfollowUser()

                  
                        }).catch((error) => {
                            return ""
                        })
            },

        },
        created() {
      this.getCharactourfollowUser()
        }
}
</script>

<style>

</style>
