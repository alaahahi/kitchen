<template>
            <div class="card mx-auto mx-sm-0 me-md-auto my-3  shadow-sm bg-primary-30" :class="!getAds ? 'p-3':''" v-if="!userSubscriptionIsGoldSub()">
                <div>
      <div class="text-center">
         <div class="badge rounded-pill bg-prim  fs-6 ps-3 py-2"><i class=" fa-solid fa-crown"></i>
            عضوية ذهبية
         </div>
      </div>
      <div class="text-center mt-2">
      <div class="badge rounded-pill bg-white px-3 fs-6 p-2"><img src="/web-asset/img/logo.png" alt="logo ManHOM" class="logo-manhom-s lazyload"></div>
   </div>
   </div>
   <div class="card-body text-center">
      <h3 class="card-title text-center">استفد من مزايا
          </h3>
      <h3 class="card-title text-center">
            العضوية الذهبية</h3>
 
     
   </div>
         
                        <router-link :to="{path:'/subscriptions'}"  class="btn btn-primary w-100 text-center">تعرف على مزايا العضوية</router-link>
                

                    </div>
                    
</template>
<script>
    export default {
        props:['page','getAds'],
        data() {
            return {
                ads:"",
                userSubscriptionAll: this.$store.state.subscription ? this.$store.state.subscription : '',

            }},
            methods: {
                userSubscriptionIsGoldSub() {   
                try {
                    if (this.userSubscriptionAll) {
                    return this.userSubscriptionAll.plan.package.is_paid == 1 ? true : false
                    }
                    return false
                    } catch (error) {
                    return false
                    }
                },
            getadds(v){
                  this.httpIm
                    .get("ads_by_page?webpage_id="+v)
                    .then(async (response) => {
                       this.ads = response.data.ads[0]
                    }).catch(err => {
                       
                    });
        }},
    }
    </script>