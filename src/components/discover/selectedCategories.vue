<template>
  <section class="trend-search">
                <div class="container text-center mt-5">
                <h1 class="fs-1 py-5">تصنيفات مختاره</h1>
                <h1 class="display-4 fs-4 py-4 text-black-80 ">جمعنا لك افضل التصنيفات ... والشخصيات بداخل كل تصنيف</h1>
                </div>
                <div class="text-center" :class="{ 'd-bloak': loading}">
                 <p  :class="{ 'spinner-border text-primary spinner-border-xl': loading}"></p>
                 </div>
                <div class="container" >
                <hooper  :settings="hooperSettings">
                    <slide v-for="(categorys,index) in category" :key=index >
                    <router-link :to='"categoriesInfo="+categorys.id' class="card "  v-if="categorys" style="width:12rem;">
                    <img v-if="category.image" class="rounded p-2" :src=category.image alt="carousel">
                    <img v-if="!category.image" class="rounded p-2" :src="'web-asset/img/discoverPage/g'+index%2+'.png'" alt="carousel">
                    <div class="card-body text-center">
                        <h5 class="card-title text-decoration-none fw-bold">{{categorys.name}}</h5>

                    </div>
                    </router-link>
                    </slide>
                    <hooper-navigation slot="hooper-addons"></hooper-navigation>
                 </hooper>
                </div>
</section>
</template>
<script>
import {Hooper,Slide,Navigation as HooperNavigation } from 'hooper';
export default {
        components: 
        {
       Hooper,
    Slide,
    HooperNavigation
      },
    data() {
    
        return {
        loading:true,
              hooperSettings: {
         touchDrag: true,
        itemsToSlide:1,
        rtl:true,
        mouseDrag:false, 
        wheelControl:false,
        itemsToShow: 2,
        breakpoints: {
          800: {
            centerMode: false,
            itemsToShow: 4
          },
          1000: {
            itemsToShow: 6,
          }
        }
      },
        category:{},
        }
    },
    methods: {
    getcategory()
            {
        this.http.get('/category')
        .then(async (response)=>{
        this.category = response.data.items
        this.loading=false
                     })
            }
        },
        created() {
            this.getcategory()
        }
};

</script>
<style>
.slick-next:before{
    color:#000 ;
}
.slick-prev:before{
    color:#000 ;
}
.slick-slide img{
    width: 100%;
}
</style>