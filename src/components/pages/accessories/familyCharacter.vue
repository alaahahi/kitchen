<template>
<div>
     <div class="m-3 rounded-btn-img p-0" v-if="charactour.endNode.character_name_ar != character_name_ar ">
                        <a  :href="'/شخصيات/'+decodeURI(charactour.endNode.slug)+'/'">
                    <div  class="position-relative p-1 rounded-btn-img" :class="charactour.endNode.vip_person ?'bg-prim':''" >
                    <img v-if="charactour.endNode.image " class=" rounded-btn-img w-100" :src=charactour.endNode.image alt="carousel" style=" min-height: 160px;">
                    <img v-if="!charactour.endNode.image" class="rounded-btn-img w-100"  src="/web-asset/img/noun_premium.png" alt="carousel">
                    <div class="position-absolute top-100 start-50 translate-middle">
                        <h4><span class="badge rounded-pill p-2  bg-prim fs-5" :class="charactour.endNode.vip_person ? 'd-block':'d-none' "><img src="/web-asset/img/noun_premium.png" alt="carousel" class="ps-1" style="width:20px">عضوية ذهبية
                        </span></h4>
                     </div>
                    </div>

                </a>
                    <div class="text-center pt-4" style="min-height: 135px;">
                        <h3 class="card-title  fw-bold fs-4">{{charactour.endNode.character_name_ar}}</h3>
                        <h4 class=" text-muted  fs-5">{{family}}</h4>
                    </div>
    </div>
    <div class="m-3 rounded-btn-img p-0"  v-if="charactour.endNode.character_name_ar == character_name_ar ">
                    <a  :href="'/شخصيات/'+decodeURI(charactour.startNode.slug)+'/'">
                    <div  class="position-relative p-1 rounded-btn-img" :class="charactour.startNode.vip_person ?'bg-prim':''" >
                    <img v-if="charactour.startNode.image " class=" rounded-btn-img w-100" :src=charactour.startNode.image alt="carousel" style=" min-height: 160px;">
                    <img v-if="!charactour.startNode.image" class="rounded-btn-img w-100"  src="/web-asset/img/noun_premium.png" alt="carousel">
                    <div class="position-absolute top-100 start-50 translate-middle">
                        <h4><span class="badge rounded-pill p-2 fs-5 bg-prim" :class="charactour.startNode.vip_person ? 'd-block':'d-none' "><img src="/web-asset/img/noun_premium.png" alt="carousel" class="ps-1" style="width:20px">عضوية ذهبية
                        </span></h4>
                     </div>
                    </div>

                </a>
                    <div class="text-center pt-4" style="min-height: 135px;">
                        <h3 class="card-title  fw-bold fs-4" >{{charactour.startNode.character_name_ar}}</h3>
                        <h4 class=" text-muted  fs-5">{{family}}</h4>
                    </div>
    </div>
</div>
</template>


<script>
export default {
    props: ['charactour','family','character_name_ar'],
}
</script>

<style>

</style>
