<template>
  <section class="trend-search">
                <div class="container text-center mt-5">
                <h1 class="fs-1 py-5">شخصيات مؤثرة  في عالم الإستثمار</h1>
                <h1 class="display-4 fs-4 py-4 text-black-80 ">جمعنا لك افضل التصنيفات ... والشخصيات بداخل كل تصنيف</h1>
                </div>
                <div class="text-center" :class="{ 'd-bloak': loading}">
                 <p  :class="{ 'spinner-border text-primary spinner-border-xl': loading}"></p>
                 </div>
                <div class="container">
                <hooper  :settings="hooperSettings">
                    <slide v-for="(charactour,index) in charactours" :key=index >
                    <div class="card " style="width:12rem;">
                    <img class="rounded p-2" :src=charactour.image alt="carousel">
                    <div class="card-body text-center" style="min-height: 154px;">
                        <h2 class="card-title  fw-bold fs-5">{{charactour.character_name_ar}}</h2>
                        <a  :href="'/شخصيات/'+decodeURI(charactour.slug)+'/'"  class="stretched-link text-decoration-none text-muted fw-bold">{{charactour.content | truncate(50, '...')}}</a>
                    </div>
                    </div>
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
        itemsToSlide:1,
        rtl:true,
        touchDrag:true,
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
      charactours:{},
      filter:{
      "order":["most_searched"],
      "country":[this.$store.state.langFilter.toLowerCase()]
      }
        }
    },
      methods: {
    getCharactour()
            {
        this.http.post('/charactour/filter?skip=50',this.filter)
        .then(async (response)=>{
        this.charactours = response.data.items.slice(0,10)
        this.loading=false
                     })
            }
        },
        created() {
            this.getCharactour()
        }
};
</script>
