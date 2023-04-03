<template>
    <div>
        <div v-for="result in resultsCompany" :key=result.id class="p-1 my-2">
                            <div class="card m-auto  text-end border shados">
                                <div class="row px-4 ">
                                    <div class="col-sm-3 d-flex align-items-center text-center-m col-4">
                                        <a  :href="'/شركات/'+decodeURI(result.slug)+'/'">
                                        <div class="position-relative p-1 rounded-btn"
                                            :class="result.vip_person ? 'bg-prim' : ''">
                                            <img v-if="result.image && result.image != 'image'"
                                                class="img-fluid rounded-btn" :src=result.image>
                                            <img v-if="!result.image" class="img-fluid rounded-btn"
                                                src="/web-asset/img/noResultC.png">
                                            <div class="position-absolute custom-p translate-middle" :class="result.vip_person ? '' :  'd-none-s'">
                                                <h5> <span class="badge rounded-pill p-0  bg-prim-c">  <primarySvg /></span>     </h5>
                                            </div>
                                        </div>
                                    </a>
                                    </div>
                                    <div class="col-sm-9 col-8">
                                        <div class="card-body text-center-m">
                                            <a  :href="'/شركات/'+decodeURI(result.slug)+'/'"
                                                class="card-title text-decoration-none text-gray-90  fw-bold fs-3">
                                                {{ result.name }}
                                        </a>

                                        </div>
                                    </div>
                                </div>
                            </div>
                            </div>
    </div>
    </template>
    
    <script>
  import primarySvg from '../svg/primarySvg.vue'

export default {
components:{primarySvg},
    props:['resultsCompany']
    }
    </script>