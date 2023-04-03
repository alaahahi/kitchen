<template>
  <div>
        <div  v-for="(company,index) in ChangeShow()" :key=index class="card  text-end shadow-card border-none rounded-btn-img p-3 my-3">
                           <div class="row">
                            <div class="col-md-4 d-flex align-items-center pt-2 px-2 ps-2 g-0 justify-content-center">
                                <div class="position-relative p-3 d-flex align-items-center  border rounded-btn-img"  :class="company.vip_person ? ' bg-prim':'' " style="min-height: 100px;">
                                 <a  :href="'/شركات/'+decodeURI(company.slug)+'/'">
                                <img v-if="company.image" class="img-fluid rounded-btn-img   " :src=company.image  alt="Companylogo">
                                <img v-if="!company.image" class="img-fluid rounded-btn-img" src="/web-asset/img/noResultC.png"   alt="Companylogo">
                                 </a>
                                <div class="position-absolute top-100 start-50 translate-middle">
                                <h5><span style="font-size: 10;" class="badge rounded-pill p-1 bg-prim" :class="company.vip_person ? 'd-block':'d-none' "><img src="/web-asset/img/noun_premium.png" alt="carousel" class="ps-1" style="width:15px">عضوية ذهبية
                                </span></h5>
                                </div>
                            </div>
                                </div>
                             <div class="col-md-8"  style="min-height:106px ;">
                            <div class="text-center-m">
                            <h3 class="card-title mb-0 p-0 fw-bold pt-3 fs-5">{{company.nameAR}}</h3>
                            <p class="text-muted fs-16 py-2 m-0">
                            <span class=" text-muted" v-if="company.country"> <i style="margin: 0px 4px;" class="fa-solid fa-map-pin  "></i>  {{company.country}}</span>
                            </p>
                             <a  :href="'/شركات/'+decodeURI(company.slug)+'/'" class="btn btn-primary   rounded-btn"> تفاصيل المؤسسة  </a>
                            </div>
                             </div>
        </div>

  </div>
                      <div class="text-center" v-if="getlength(companys) > 3">
                        <button   style="min-width: 114px;" @click="readMore =! readMore;ChangeShow()" class="btn rounded-5 btn-size m-1 py-2 px-3 btn-light bg-white border text-primary fw-bold ">
                                <span v-if="readMore">عرض أقل  <i class='fa-solid fa-angle-up me-2 pt-1'></i></span>
                                <span v-else >عرض الكل <i class='fa-solid fa-angle-down me-2 pt-1'></i></span>
                        </button>
                        </div>
  </div>

</template>

<script>

export default {
    props: ['companys'],
        data() {
        return {
            readMore :false
        }
    },
        methods:{
    ChangeShow(){
    if(!this.readMore){
    try {
        if(this.companys.length > 3){
       return this.companys.slice(0,3)   
       }  
    } catch (error) {
        console.log(error)
        return this.companys
    }
        return this.companys
    }
    if(this.readMore){
    return this.companys
    }
    },
        getlength(v){
        try {
        return  v.length 
        } catch (error) {
        return 0    
        }
    },
},
    filters:  {
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
                }}
}

</script>
<style scoped>
.rounded-5 {
    border-radius: 1.5rem;
}
.shadow-card{
box-shadow: 0 0.1rem 2rem rgb(0 0 0 / 8%) !important;
}
@media screen and (max-width: 521px) {
.text-center-m{
    text-align: center;
} 
}
</style>
