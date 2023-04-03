<template>
  <div>
                        <div  v-for="(charactour,index) in ChangeShow()" :key=index class="rounded-btn-img m-auto my-4 text-center text-md-end shadow-card rounded-btn pb-4 pt-4 p-3 pt-md-3">
                            <div class="row">
                            <div class="col-md-4 d-flex align-items-center">
                                <div class="position-relative p-1 rounded-btn-img m-auto" :class="charactour.vip_person ? ' bg-prim':'' ">
                                 <a  :href="'/شخصيات/'+decodeURI(charactour.slug)+'/'" >
                                <img v-if="charactour.image" class="img-fluid  w-100 rounded-btn-img" style="width: -webkit-fill-available;"  :src=charactour.image  alt="charactour" >
                                <img v-if="!charactour.image" class="img-fluid  w-100 rounded-btn-img" style="width: -webkit-fill-available;"   src="/web-asset/img/noResul.jpg" alt="charactour" >
                                 </a>
                                <div class="position-absolute top-100 start-50 translate-middle">
                                <h5><span style="font-size: 10;" class="badge rounded-pill p-1 bg-prim" :class="charactour.vip_person ? 'd-block':'d-none' "><img src="/web-asset/img/noun_premium.png" alt="carousel" class="ps-1" style="width:15px">عضوية ذهبية
                                </span></h5>
                                </div>
                                </div>
                            </div>
                             <div class="col-md-8 ">
                            <div class="card-body ps-1 p-0">
                             <h3 class="mt-3 mt-md-0"><a  :href="'/شخصيات/'+decodeURI(charactour.slug)+'/'"  class="card-title text-decoration-none text-gray-80 fw-bold" style="font-size:22px ;">{{charactour.character_name_ar}}</a></h3>
                             <p class="text-decoration-none lh-base fs-16 pt-1 m-0" style="color:#4F4F4F !important ;">{{fixContent(charactour.content)| truncate(40,'..')}}</p>
                            </div>
                             </div>
                             </div>
                        </div>
                        <div class="text-center" v-if="getlength(charactours) > 3">
                        <button   style="min-width: 114px;" @click="readMore =! readMore;ChangeShow()" class="btn rounded-5 btn-size m-1 py-2 px-3 btn-light bg-white border text-primary fw-bold ">
                                <span v-if="readMore">عرض أقل  <i class='fa-solid fa-angle-up me-2 pt-1'></i></span>
                                <span v-else >عرض الكل <i class='fa-solid fa-angle-down me-2 pt-1'></i></span>
                        </button>
                        </div>
  </div>
</template>

<script>


export default {
    props: ['charactours','more'],
        data() {
        return {
            readMore :false
        }
    },
    methods:{
    ChangeShow(){
    if(!this.readMore){
    try {
    if(this.charactours.length > this.more/2){
    return this.charactours.slice(0,this.more/2)
    }
    } catch (error) {
    return this.charactours
    }
     return this.charactours
    }
    if(this.readMore){
         try {
    return this.charactours.slice(0,this.more)   }
    catch (error) {
         return this.charactours
     }

    }
    },
    getlength(v){
        try {
        return  v.length
        } catch (error) {
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

</style>
