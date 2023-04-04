<template>
 <section class="top-ten container-fluid " v-if="charactours.length >0">
                <div>
                <div class="row  pt-5 pb-4">
                <div class="col-md-6 m-auto textCenter">
                    <div class="container">
                    <!--  <h1 class="w-75">أفضل<span class="fixbg" style="background-image: url('web-asset/img/path1984.png');" > 10 شخصيات</span> مؤثرة <br> هذا الأسبوع</h1>  -->
                        <h1  class="text-center text-md-end fw-bold lh-lg"  v-resize-text="{ratio:1.5, minFontSize: '12px', maxFontSize: '40px'}">آخر التغييرات
                            الإدارية <br>هذا الأسبوع</h1>
                 <!--         <p class="text-muted fs-5 w-75">تم إختيار بعنايه افضل شخصيات مؤثره في هذا الأسبوع  وقدموا مثالاً مشرفا للشباب كي يقتدوا بهم</p>-->
                 <div class="w-100 text-end d-none d-md-block mt-5">
                  <router-link :to="{ name: 'allCharacterPage'}" class="btn  btn-primary my-2" >تصفح المزيد
                            <i class='fa-solid fa-angle-left fa-lg pe-2'></i>
                 </router-link >
                </div>
                </div>
                </div>
                <div class="col-md-6 m-auto" style="direction:ltr;" >
                <div :class="loading ? 'd-none': 'd-block'">
                <hooper ref="carousel" :settings="hooperSettings"  v-if="checkRelLength(charactours)">
                <slide v-for="charactour in charactours" :key=charactour.id  class="rounded-5 col-md-3 mt-4 h-100">
                <div  class="card  position-relative bg-category h-100 m-2">
                <div  class="position-relative p-1 rounded-btn-img" style="z-index: -1;">
                
                <!-- <img 
                v-if="charactour.image" 
                class="rounded-btn-img w-100" 
                :src=charactour.image 
                alt="carousel" 
                style="min-height: 360px;"> -->
                <appImage 
                    v-if="charactour.image  " 
                    class="rounded-btn-img w-100"
                    alt="carousel" 
                    :lazySrc="charactour.image"
                    :lazySrcset="charactour.image"
                    style="height: unset;"
                    />
  
                    <!-- style="min-height: 410px;" -->
                
                
                <!-- <img 
                v-if="!charactour.image" 
                class="rounded-btn-img w-100"  
                src="/web-asset/img/noResul.jpg" 
                alt="carousel" > -->
                <appImage 
                    v-if="!charactour.image" 
                    class="rounded-btn-img w-100"
                    alt="carousel" 
                    :lazySrc="'/web-asset/img/noResul.jpg'"
                    :lazySrcset="'/web-asset/img/noResul.jpg'"
                    style="height: unset;"
                    />

                <span v-if="charactour.categories[0]"  class=" position-absolute badge rounded-pill bg-info p-2 px-3 fs-6 p-c-t"><i class="ms-1 fa-solid"  :class=geticon(charactour.categories) ></i>
                            {{charactour.categories | formatCharactour}} </span>
                <div class="position-absolute top-100 start-50 translate-middle">
                <h5><span class="badge rounded-pill bg-info p-2">{{charactour.category}}</span></h5>
                </div>

                </div>
                <a  :href="'/شخصيات/'+decodeURI(charactour.slug)+'/'" class="card-body text-decoration-none  text-end position-absolute bottom-0 end-0 text-white" style="min-height: 100px;">
                    <h2 class="card-title fs-3 fw-bold text-white">{{charactour.character_name_ar}}</h2>
                    <h5 class=" fs-5 text-white ">{{fixContent(charactour.content)| truncate(40,'..')}}</h5>
                </a >
                </div>
                </slide>
                 </hooper>
                 </div>
                 <div :class="loading ? 'd-block': 'd-none'">
                <hooper  :settings="hooperSettings">
                    <slide v-for="(charactour,index) in 10" :key=index >
                    <div class="m-1">
                          <VueSkeletonLoader type="rect" width="95%" height="500px" color="#F6F6F6" animation="wave" :rounded=true radius=15 class="m-2" />
                    </div>
                    </slide>

                    <hooper-navigation slot="hooper-addons"></hooper-navigation>
                 </hooper>
                 </div>
                <div class="w-100 text-center d-block d-md-none">
                     <router-link :to="{ name: 'allCharacterPage'}" class="btn  btn-primary my-2">
                      عرض الكل
                    </router-link >
                </div>
                </div>

                </div>
                <div class="row" v-if="charactours.length">
                      <div class="col-md-6 me-auto">
                      </div>
                    <div class="col-md-6 text-center  d-flex">
                    <div class="position-relative mt-5 pt-3 w-75">
                    <div class="carousel-indicators">
                        <button type="button" data-bs-target="#carouselExampleIndicators"  class="w-25 rounded-btn" :class="slideNo < lengthslide & slideNo >0  ?'activeBtn' :'bg-secondary' " v-if="charactours.length >0"></button>
                        <button type="button" data-bs-target="#carouselExampleIndicators"  class="w-25 rounded-btn" :class="slideNo < (lengthslide *2) & slideNo >=lengthslide  ?'activeBtn' :'bg-secondary' "  v-if="charactours.length > 1"></button>
                        <button type="button" data-bs-target="#carouselExampleIndicators"  class="w-25 rounded-btn" :class="slideNo <= (lengthslide *3) & slideNo >=(lengthslide *2)  ?'activeBtn' :'bg-secondary' " v-if="charactours.length > 2"></button>
                    </div>
                    </div>

                    <button aria-label="slideNext" class="btn rounded-circle btn-size m-1 shadow" @click.prevent="slidePrev"  :class="slideNo == 0 ? 'btn-light':'btn-primary'"> <i class='fa-solid fa-arrow-right'></i></button>
                    <button aria-label="slidePrev" class="btn rounded-circle btn-size m-1 shadow" @click.prevent="slideNext" :class="slideNo == charactours.length ? 'btn-light':'btn-primary'"> <i class='fa-solid fa-arrow-left'></i></button>
                    </div>
                </div>
                </div>
            </section>
</template>
<script>
import {Hooper,Slide,Navigation as HooperNavigation } from 'hooper';
import 'hooper/dist/hooper.css';
import VueSkeletonLoader from 'skeleton-loader-vue';
import appImage from '../pages/accessories/appImage.vue'
import appPicture from '../pages/accessories/appPicture.vue'

export default {
        components:
        {
        Hooper,
        Slide,
        HooperNavigation,
        VueSkeletonLoader,
        appImage,
        appPicture
      },
    data() {
        return {
            loading:true,
            disabled:true,
            slideNo:0,
            lengthslide:0,
            charactours:[],
            carouselData: 0,
            hooperSettings: {
            touchDrag: true,
            itemsToSlide:1,
            mouseDrag:false,
            wheelControl:false,
            itemsToShow: 1,
            infiniteScroll:false,
              rtl:true,
                breakpoints: {
                768: {
                    centerMode: false,
                    itemsToShow: 1
                },
                992: {
                    itemsToShow: 1.7,
                }
                }
            },
        }
    },
    methods: {
        checkRelLength(v){
        if(!v) return 0
              try{
        if(v)
        {
        return v.length
        }
        }catch(error) {
            console.log(error)
          return 0
        }

    },
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
              slidePrev() {
      if(this.charactours.length >= this.slideNo && this.slideNo > 0){
       this.slideNo--
      this.$refs.carousel.slidePrev();
      }
    },
    slideNext() {
      if(this.slideNo < this.charactours.length  && this.slideNo >= 0){
        this.slideNo++
      this.$refs.carousel.slideNext();
    }},
    getCharactour()
       {
        this.http.post('/charactour/filter',
         {
         administrativeUpdate:"1",
         "code":this.$store.state.langFilter.toLowerCase() ? this.$store.state.langFilter.toLowerCase() :'ar'
         }
        )
        .then(async (response)=>
                    {
                    this.charactours = response.data.items
                    this.loading=false
                    this.lengthslide = (response.data.items.length / 3)
                    if(response.data.items.length > 6){
                        this.disabled=false
                    }
                     })
            },
            move(){
                      this.Carousel.slideTo(2);

            },
            geticon(value){
                    if (!value) return ''
                    if (value) {
                        try {
                            value =value[0].icon
                        } catch (error) {
                           return ''
                        }
                    return value
                    }
            }
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
                },
            formatCharactour: function (value) {
                    if (!value) return ''
                    if (value) {
                        try {
                            value =value[0].name
                        } catch (error) {
                           return ''
                        }
                    return value
                }
                },
                formatCharactourId: function (value) {
                    if (!value) return ''
                    if (value) {
                        try {
                            value = "categoriesInfo="+value[0].id
                        } catch (error) {
                           return ''
                        }
                    return value
                }
                },
        },
        created()
        {
            this.getCharactour()
        }
};
</script>
<style scoped>
.container{
  width: 90%;
}
@media screen and (max-width: 768px) {
.textCenter{
    text-align: center;
}
}
.fixbg {
    background-repeat: no-repeat;
    background-position: center;
    background-size: 101% 100%;
}
.btn-size {
    width: 40px;
    height: 40px;
}
.activeBtn{
 background-color: #4B91F1  !important;
}
.carousel-indicators [data-bs-target] {
opacity: 1 !important;
}
.p-c-t {
    top: 15px;
    left: 15px;
}
.carousel-indicators [data-bs-target] {
    cursor: auto !important;
}
</style>
