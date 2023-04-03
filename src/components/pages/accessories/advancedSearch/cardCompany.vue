<template>
    <div>
        <div v-for="result in resultsCompany" :key=result.id class="p-1 my-2">
                            <div class="card m-auto  text-end border-none shados">
                                <div class="row px-1 ">
                                    <div class="col-sm-3 sm-flex d-block align-items-center text-center-m col-12">
                                        <a  :href="'/شركات/'+decodeURI(result.slug)+'/'"  @click="logSuccessSearch(2,result.id)" >
                                        <div class="position-relative rounded-btn p-2" >
                                            <img v-if="result.image && result.image != 'image'"
                                                class="img-fluid rounded-btn" :src=result.image>
                                            <img v-if="!result.image" class="img-fluid rounded-btn"
                                                src="/web-asset/img/noResultC.png">
                                            <div class="position-absolute custom-p translate-middle" :class="result.vip_person ? '' :  'd-none-s'">
                                                <h5><span class="badge rounded-pill p-0  bg-prim-c"
                                                      ><primarySvg />
                                                    </span></h5>
                                            </div>
                                        </div>
                                    </a>
                                    </div>
                                    <div class="col-sm-9 col-12 pe-sm-0">
                                        <div class="card-body text-center-m   pe-sm-0">
                                            <a  :href="'/شركات/'+decodeURI(result.slug)+'/'"
                                                class="card-title text-decoration-none text-gray-90  fw-bold fs-3"  @click="logSuccessSearch(2,result.id)" >
                                                {{ result.name }}
                                        </a>
                                        <div class="float-start-c">
                                        <followCompany :id="result.id" />
                                        </div>
                                        </div>
                             
                                            <p class=" text-center-m  fs-5" v-for="cat in result.countries" :key="cat">
                                           
                                           {{ cat.toString() }}
                                
                                       </p>
                                            <p class=" text-center-m  text-gray-900 text-muted text-decoration-none pt-1   fs-16" style="min-height: 63px;">
                                                {{ result.content  | truncate(100, '..')}} 
                                            </p>
                                            <div class="justify-content-start">
                                            <span v-for="cat in result.categories" :key="cat">
                                            <button  v-if="cat != '[]'"
                                                class="btn btn-light fs-6 fw-bold bg-white text-muted m-2 px-3 border py-2 rounded-btn px-4 fs-16 disabled">
                                                {{ cat.toString() }}
                                            </button>
                                            </span>
                                            </div>
                                        
                                    </div>
                                </div>
                            </div>
                            </div>
    </div>
    </template>
    
    <script>
import followCompany from './followCompany.vue'
import primarySvg from '../svg/primarySvg.vue'

export default {
components:{followCompany,primarySvg},
    props:['resultsCompany'],
    data() {
            return {}
        },
    methods: {
        logSuccessSearch(type,id) {
            this.http.post('/log_success_search?type=' + type + '&id=' + id+'&item_order='+order+'&q='+q ).then(async (response) => {})
                    .then(async (response) => {
                    })

            },
        }

    }
    </script>
    <style>
    .btn-outline-primary:hover{
       color: #0d6efd;
    background-color: #fff;
    border-color: #0d6efd;
    }
    .btn-outline-primary:active{
       color: #0d6efd;
    background-color: #fff;
    border-color: #0d6efd;
    }
    .btn-outline-primary:focus{
       color: #0d6efd !important;
    background-color: #fff !important;
    border-color: #0d6efd;
    }
    </style>