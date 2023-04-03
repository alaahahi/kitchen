<template>
<section class="characters-you-follow">
                <div class="container text-center ">
                <h1 class=" py-4"> تصنيفات تاريخية</h1>
                <h4 class="display-4 fs-4 py-4 text-black-80 ">إخترنالك افضل التصنيفات التاريخيه...شخصيات تاريخيه مختلفة </h4>
                </div>
                 <div class="text-center" :class="{ 'd-bloak': loading}">
                 <p  :class="{ 'spinner-border text-primary spinner-border-xl': loading}"></p>
                 </div>
                 <div >
                <div class="w-100 text-center"  >
                <div class="carousel-indicators " v-for="(slide, i) in categorys" :index="i" :key="i" style="display: inline;">
                <button type="button" class="rounded-circle"  aria-label="categorys" data-bs-target="#carouselExampleCaptions"  @click="goToSlide(i)" :class="{'activeBtn' : dot0}"></button>
                </div>
                </div>
              <template v-if="categorys">
                <carousel-3d  ref="mycarousel" :count="5" :border=0 :autoplay="true" :autoplay-timeout="3000" :height="400" :space="400" :perspective="0" >
                <slide   v-for="(slide, i) in categorys" :index="i" :key="i" class="text-center rounded-btn" >
                    <template slot-scope="{ index, isCurrent, leftIndex, rightIndex }">
                        <figure>
                        <img   :data-index="index" :class="{ current: isCurrent, onLeft: (leftIndex >= 0), onRight: (rightIndex >= 0) }" :src="'web-asset/img/discoverPage/g'+i%2+'.png'" >
                            <figcaption>
                            <h4  class="title display-6 my-5">{{slide.name}}</h4>
                            <h5 class="research"><span>{{i * 7 }}</span>  نتيجة 
                            </h5>
                            </figcaption>
                        </figure>
                    </template>
                </slide>
                </carousel-3d>  
              </template>
     
              </div>
       
         
</section>
</template>
<script>
import { Carousel3d, Slide } from 'vue-carousel-3d';

export default {
    props:['categorys'],
    components: {
    Carousel3d,
    Slide
  },
    data() {
        return {
            loading:true,
            slides:[
                {
                classification:"سياسة",
                researchResults:323,
                src:"asset/img/discoverPage/c.png"
                },
                {
                classification:"كتاب وأدباء",
                researchResults:80,
                src:"asset/img/discoverPage/c1.png"
                },
                {
                classification:"عالم الرياضه",
                researchResults:50,
                src:"asset/img/discoverPage/c2.png"
                },
                {
                classification:"عالم الفن",
                researchResults:89,
                src:"asset/img/discoverPage/c3.png"
                },
                 {
                classification:"إقتصاد",
                researchResults:123,
                src:"asset/img/discoverPage/c4.png"
                }
                ],
                dot0:false,
                dot1:false,
                dot2:false,
                categorys:[]
        }
    },
     methods:{
       goToSlide(index) {
      this.$refs.mycarousel.goSlide(index)
      },
      showslide(v) 
      {
        if(v == 0 ){
          this.dot0=true
          this.dot1=false
          this.dot2=false
        }
        if(v == 1 ){
          this.dot0=false
          this.dot1=true
          this.dot2=false
        }
        if(v == 2 ){
          this.dot0=false
          this.dot1=false
          this.dot2=true
        }
      },
          getCategory()
            {

        this.http.get('/category?skip=10')
        .then(async (response)=>{
        this.categorys = response.data.items.slice(1,6)
        this.loading=false
                     })
            }
 
    },
    
        created() {
         this.getCategory()
        },
};
</script>
<style>

.carousel-3d-container figure {
  margin:0;
}

.carousel-3d-container figcaption {
  position: absolute;
 background: linear-gradient(to bottom, transparent 0%, black 100%);
  color: #fff;
  bottom: 0;
  position: absolute;
  bottom: 0;
  padding: 15px;
  font-size: 12px;
  min-width: 100%;
  height: 50%;
  box-sizing: border-box}
.carousel-indicators{
  position: relative;
  margin: 0;
 
}
.carousel-indicators [data-bs-target]{
 background-color: #C4C4C4;
     width: 10px;
    height: 10px;
    margin: 0 5px  ;
}
.carousel-indicators [data-bs-target].activeBtn{
 background-color: #EBBF69;
   transform: scale(1.5);
}
</style>
