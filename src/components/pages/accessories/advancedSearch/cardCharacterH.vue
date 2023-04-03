<template>
<div>
    <div v-for="result in resultsCharactour" :key=result.id class="p-1 my-2">
                            <div class="card m-auto text-end border-none  shados">
                                <div class="d-sm-flex d-block align-items-start p-2">
                                    <div class="text-center-m-c" >
                                        <a  :href="'/شخصيات/'+decodeURI(JSON.parse(result.data_object).slug)+'/'"  @click="logSuccessSearch(1,result.content_id)" >
                                            <div class="position-relative p-1 rounded-btn" >
                                                <img v-if="JSON.parse(result.data_object).image" class=" rounded-btn" :src=JSON.parse(result.data_object).image
                                                    alt="JSON.parse(result.data_object) image">
                                                <img v-if="!JSON.parse(result.data_object).image" class=" rounded-btn"
                                                    src="/web-asset/img/noResul.jpg" alt="carousel">
                                                <div class="position-absolute custom-p translate-middle" :class="(JSON.parse(result.data_object).vip_person) ==1  ?  '' : 'd-none-s'">
                                                    <h5><span class="badge rounded-pill p-0   bg-prim-c"
                                                          >
                                                                <primarySvg  />
                                                        </span></h5>
                                                </div>
                                            </div>
                                        </a>
                                    </div>
                  
                                    <div class="card-body pt-2 pb-0 text-center-m"> 
                                            <a  :href="'/شخصيات/'+decodeURI(JSON.parse(result.data_object).slug)+'/'"
                                                class="card-title text-decoration-none text-gray-90  fw-bold fs-3"  @click="logSuccessSearch(1,result.content_id)" >
                                                {{  JSON.parse(result.data_object).name }}</a>
                                            <div class="float-start-c">
                                                <followCharacter :id="result.content_id" />
                                            </div>
                                            <p class="text-gray-900 text-decoration-none pt-3 mb-0  fs-5" style="min-height: 63px;">
                                                {{ JSON.parse(result.data_object).brief_description   | truncate(100, '..')}} 
                                            </p>
                                            <p class="text-gray-80 text-decoration-none  pt-w fs-5">
                                                <span>{{  JSON.parse(result.data_object).nationality }} </span>
                                            </p>
                                            <div class="justify-content-start">
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

export default {
components:{followCharacter,primarySvg},
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

.shados{
    box-shadow: 0px 0px 24px rgba(32, 33, 31, 0.06);
border-radius: 12px;
}

</style>