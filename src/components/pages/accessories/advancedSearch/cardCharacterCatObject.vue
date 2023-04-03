<template>
    <div>
        <div v-for="result in resultsCharactour" :key=result.id class="p-1 my-2">
                                <div class="card m-auto text-end  border-none shados">
                                    <div class="d-sm-flex d-block align-items-start p-2">
                                        <div class="text-center-m-c">
                                            <a   :href="'/شخصيات/'+decodeURI(JSON.parse(result.data_object).slug)+'/'"  @click="logSuccessSearch(1,JSON.parse(result.data_object).id)" >
                                                <div class="position-relative p-1 rounded-btn">
                                                    <app-image v-if="result.gender ==2 "
                                                lazy-src="/web-asset/img/noResul.jpg"
                                                class="rounded-btn"
                                                data-background-image="/web-asset/img/noResulf.jpg"
                                                src="/web-asset/img/noResul.jpg"
                                                :lazy-srcset="result.image"
                                                style="width:200px !important; max-width:unset;"
                                                />
                                                <app-image v-if="result.gender ==1 "
                                                lazy-src="/web-asset/img/noResul.jpg"
                                                class="rounded-btn "
                                                data-background-image="/web-asset/img/noResul.jpg"
                                                src="/web-asset/img/noResul.jpg"
                                                :lazy-srcset="result.image"
                                                style="width:200px !important; max-width:unset;"

                                                />
                                                <app-image v-if="result.gender ==null "
                                                lazy-src="/web-asset/img/noResul.jpg"
                                                class="rounded-btn"
                                                data-background-image="/web-asset/img/noResul.jpg"
                                                src="/web-asset/img/noResul.jpg"
                                                :lazy-srcset="result.image"
                                                style="width:200px !important; max-width:unset;"
                                                />
                                    
                                                    <div class="position-absolute custom-p translate-middle" :class="JSON.parse(result.data_object).vip_person ? '' :  'd-none-s'">
                                                        <h5><span class="badge rounded-pill p-0 bg-prim-c"
                                                                > <primarySvg />
                                                            </span></h5>
                                                    </div>
                                                </div>
                                            </a>
                                        </div>
                      
                                        <div class="card-body pt-2 pb-0 text-center-m">
                                                <a  @click="logSuccessSearch(1,JSON.parse(result.data_object).id)" :href="'/شخصيات/'+decodeURI(JSON.parse(result.data_object).slug)+'/'"
                                                    class="card-title text-decoration-none text-gray-90  fw-bold fs-3"  >
                                                    {{ JSON.parse(result.data_object).name }}</a>
                                                    <div class="float-start-c">
                                                        <followCharacter :id="JSON.parse(result.data_object).id" />
                                                    </div>
                                                <p class="text-gray-900 text-decoration-none pt-3  fs-5" style="min-height: 63px;">
                                                    {{ JSON.parse(result.data_object).brief_description  | truncate(100, '..')}} 
                                                </p>
                                                <p class="text-gray-80 text-decoration-none pt-w fs-5">
                                                    <span>{{ JSON.parse(result.data_object).current_country_of_residence }} </span>
                                                </p>
                                                <div>
                                                <span v-for="cat in JSON.parse(result.data_object).categories" :key="cat">
                                                <button  v-if="cat != '[]'"
                                                    class="btn btn-light fs-6 fw-bold bg-white text-muted m-2 px-3 border py-2 rounded-btn px-4 fs-16 disabled">
                                                    {{ cat.toString() }}
                                                </button>
                                                </span>
                                                <span v-for="sub in JSON.parse(result.data_object).sub_categories" :key="sub">
                                                    <button v-if="sub != '[]'"
                                                        class="btn btn-light fs-6 fw-bold bg-white text-muted m-2 px-3 border py-2 rounded-btn px-4 fs-16 disabled">
                                                        {{ sub }}
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
    import followCharacter from './followCharacter.vue'
    import primarySvg from '../svg/primarySvg.vue'
    import appImage from '../appImage.vue'
    export default {
    components:{followCharacter,primarySvg,appImage},
    props:['resultsCharactour'],
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