<template>
<section class="trend-search bg-white">
                <div class="container text-center pb-5">
                <h1 class="fs-1 py-5 text-end">تصنيفات الشخصيات</h1>
            <div class="row">
              <div class="col-md-9 text-end">
                            <button v-for="(category,index) in categorys" :key=index  @click.prevent="getCharactour( parseInt(category.id),index)" class="btn btn-outline-golde  px-md-4 ms-md-3" :class="active == index? 'btn-outline-primary':'' ">
                              <span :class="{ 'spinner-border spinner-border-sm': loading == index}"></span>
                              {{category.name}}
                            </button>
              </div>
              <div class="col-md-3 text-start">
                 <router-link to="/categories" class="btn btn-outline-golde-m"  :class="disabled ? 'disabled' : '' ">تصفح المزيد 
                             <i class='fa-solid fa-angle-left fa-lg pe-2'></i>
                        </router-link>
              </div>
            </div>
     
                
                
                </div>
                <div class="container" style="direction:ltr">
                    <hooper  :settings="hooperSettings">
                    <slide v-for="(charactour,index) in charactours" :key=index >
                    <div class="card shadow m-3 rounded-btn-img p-1">
                    <div  class="position-relative p-1 rounded-btn-img">
                    <img v-if="charactour.image" class=" rounded-btn-img w-100" :src=charactour.image alt="carousel">
                    <img v-if="!charactour.image" class="rounded-btn-img w-100"  src="/web-asset/img/noResult.jpg" alt="carousel">
                    <div class="position-absolute custom-p translate-middle" :class="charactour.vip_person ? '' : 'd-none-s'">
                            <h5>
                                <span class="badge rounded-pill p-0 bg-prim-c">
                                <primarySvg />
                                </span>
                            </h5>
                        </div>
                    </div>
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
  import 'hooper/dist/hooper.css';
  import primarySvg from '../pages/accessories/svg/primarySvg.vue'

export default {
        components: 
        {
       Hooper,
    Slide,
    HooperNavigation,
    primarySvg
      },
    data() {
        return {
          disabled:true,
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
      charactours:{},
      categorys:{},
      active:undefined,
      loading:undefined
        }
    },
      methods: {
    getCharactour(v,i)
            {
        this.active=i
        this.loading =i
        this.http.post('/charactour/filter',
         { 
            "categories":[v],
        
         }
        )
        .then(async (response)=>
                    {
        this.charactours = response.data.items
          
          this.loading = undefined
                     })
            },
            getCategory()
            {

        this.http.get('/categories')
        .then(async (response)=>{
        this.categorys = response.data.slice(1,6)
        this.getCharactour(parseInt(response.data.id),0)
                if(response.data.length > 6){
            this.disabled=false
        }
                     })
            }
        },
        created() 
        {
            this.getCategory()
        }
};
</script>
<style scoped>

.btn-goled-active {
        border-color: #4B91F1;
}
.btn-outline-golde{

    background-color:#5e5b5517;
    margin: 2px;
    color:#4B91F1 ;
}
.btn-outline-golde:hover, .btn-outline-golde:focus, .btn-outline-golde:active, .btn-outline-golde.active, .open>.dropdown-toggle.btn-outline-golde {
    color:#4B91F1 ;
       background-color:#d4b37017;
}
ul {
        padding-inline-start: 0px;

}
.btn-outline-golde-m{
 
   font-weight: bold;
    margin: 2px;
    color:#3737e9 ;
}
.btn-outline-golde-m:hover, .btn-outline-golde:focus, .btn-outline-golde:active, .btn-outline-golde.active, .open>.dropdown-toggle.btn-outline-golde {
    color:#4B91F1 ;
     border-color: #4B91F1;
}
.btn:focus {
  outline: none;
  box-shadow: none;
}
.container{
  width: 90%;
}
@media screen and (max-width: 768px) {
.gold{
    transform: scale(1);
}    
}
</style>