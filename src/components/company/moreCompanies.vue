<template>
   <div class="container">
      <breadcrumb :data=companiesdata.breadcrumbLsit />
      <h3 class="text-center fw-bold py-2">{{companiesdata.firstTitle}}</h3>
      <h3 class="text-center text-muted pt-3">{{companiesdata.secoundTitle}}</h3>
      <discover></discover>
       <h3 class="text-center fw-bold py-2">{{companiesdata.thirdTitle}}</h3>
      <h3 class="text-center text-muted py-3">{{companiesdata.fourthTitle}}</h3>
      <div class="row d-flex justify-content-around">
        <div
          v-for="(company, i) in companies"
          :index="i"
          :key="i"
          class="col-md-2 col-sm-4 col-xs-2"
        >
          <div class="card h-100 bg-transparent border-card-company">
            <div
              class="
                bs-img-size
                d-flex
                align-items-center
                justify-content-center
              "
            >
            <a  :href="'/شركات/'+decodeURI(company.slug)+'/'" >
            
              <img class="rounded card-img-top p-3" :src="company.image" />
            </a>
            </div>
            <div class="card-body text-center" style="min-height: 125px;">
              <h5 class="card-title">{{ company.nameAR }}</h5>
               <div v-if="!user">
                <router-link :to="{ name: 'login', params: {nextUrl:'addCharacter'}}" class="btn btn-outline-primary px-4">متابعة</router-link>
                </div>
                <div v-if="user">
                <button v-if="company.isFollowing == false" @click.prevent="postFollowCompany(company.id)" class="btn btn-outline-primary px-4">متابعة</button>
                <button v-if="company.isFollowing == true " @click.prevent="postUnFollowCompany(company.id)" class="btn btn-outline-primary px-4">إلغاء المتابعة</button>
                </div>
            </div>
          </div>
        </div>
      </div>
      <div class="row" v-if="companies.length">
      <div class="col-12" style="direction:ltr">
      <nav aria-label="Page navigation">
        <ul class="pagination justify-content-center">
          <li class="page-item active" @click.prevent="getCompany(10)"><a class="page-link " href="#">التالي</a></li>
          <li class="page-item" @click.prevent="getCompany(-10)" :class="{'active' : more > 9 }"><a class="page-link" href="#">السابق</a></li>

        </ul>
      </nav>
      </div>
      </div>
<!--
      <div class="flex-row-reverse" v-if="companies.length">
        <nav class="justify-content-center">
          <jw-pagination
            :disableDefaultStyles="true"
            :styles="customStyles"
            :items="companies"
            @changePage="onChangePage"
            :labels="customLabels"
          ></jw-pagination>
        </nav>
      </div>
-->
    </div>
</template>

<script>
import breadcrumb from '../pages/accessories/breadcrumb.vue'
import discover from "../home/discover.vue";

export default {
    props:['data'],
  components: {
    discover,
    breadcrumb,
              },
   data() {
    return {
      more:0,
      
      user:this.$store.state.user,
      companies:{},
      companiesdata:this.data,
      customLabels: {
        previous: "السابق",
        next: "التالي",
      },
 
      pageOfItems: [],
      followCompany:{
                company_id:"",
                user_id:this.data.user.id,
      },
    };
  },
  methods: {
    postFollowCompany(id)
            {
        this.http.post('/company/followComapny',
        {
                company_id:id,
                user_id:this.data.user.id,
        }
        )
        .then(async (response)=>{
            this.company.isFollowing = true
                     })
            },
    postUnFollowCompany(id)
            {
        this.http.post('/company/deleteFowllerComapny/delete',
        {
                company_id:id,
                user_id:this.data.user.id,
        }
        )
        .then(async (response)=>{
             this.company.isFollowing = false
                     })
            },
    onChangePage(pageOfItems) {
      this.pageOfItems = pageOfItems;
    },
   async getCompany(v) {
    this.more=this.more+v
      this.http.post("/company/filter?skip="+this.more,{

          "order":this.companiesdata.filters,
      "country":[this.$store.state.countryFilter.toLowerCase()]
      },{ headers: { token:this.$store.state.token } }).then(async (response) => {
        this.companies = response.data.items;
      });
    },
  },
  created() {
    this.getCompany(0);
  },
};
</script>
<style scoped>
/*
     customStyles: {
        ul: {
          "justify-content": "center",
        },
        li: {
          position: "relative",
          display: "block",

          "text-decoration": "none",
        },

        a: {},
      },
*/
</style>