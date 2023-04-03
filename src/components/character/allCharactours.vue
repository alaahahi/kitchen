<template>
    <div>
        <div  style="background-image: url('web-asset/img/path104.png');">
        <div style="background-color: rgb(255 255 255 / 80%);">
            <breadcrumb :data=breadcrumbLsit />
          <h3 class="text-center fw-bold py-2">الشخصيات</h3>
          <h5 class="text-center  pt-3 text-black-80">ابحث عن الشخصيات أو المؤسسات في جميع الوطن العربي</h5>
          <section class="Discover my-5">
          <discover :isHome=true />
          </section>
          </div>
          </div>
            <div class="container">
            <div class="row">
              <div class="col-md-3">
              <div class="card rounded-btn shadow">
                <h3 class="p-3">فلترة</h3>
                    <div class="accordion accordion-flush " id="accordionSearch">
                    <div class="accordion-item bg-white">
                     <h2 class="accordion-header bg-white" id="headingOne">
                      <button class="accordion-button bg-white text-black fw-bold fs-5" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                        شاهد حسب
                      </button>
                    </h2>
                    <div id="collapseOne" class="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                      <div class="accordion-body">
                         <div class="form-check">
                        <input class="form-check-input" value="most_searched"  type="checkbox" name="flexRadioDefault1" id="flexRadioDefault1"  @change="onChange($event)">
                        <label class="form-check-label" for="flexRadioDefault1">
                          الأكثر زيارة
                        </label>
                      </div>
                      <div class="form-check">
                        <input class="form-check-input"  value="most_visited"  type="checkbox" name="flexRadioDefault2" id="flexRadioDefault2"  @change="onChange($event)">
                        <label class="form-check-label" for="flexRadioDefault2">
                          تريند
                        </label>
                      </div>
                      <div class="form-check">
                        <input class="form-check-input"  value="most_searched"  type="checkbox" name="flexRadioDefault3" id="flexRadioDefault3"  @change="onChange($event)">
                        <label class="form-check-label" for="flexRadioDefault2">
                          عضوية ذهبية
                        </label>
                      </div>
                      <div class="form-check">
                        <input class="form-check-input"  value="recently_added"  type="checkbox" name="flexRadioDefault4" id="flexRadioDefault4"  @change="onChange($event)">
                        <label class="form-check-label" for="flexRadioDefault2">
                          المضافة أخيرا
                        </label>
                      </div>
                      </div>
                    </div>
                    </div>
                    <div class="accordion-item bg-white">
                     <h2 class="accordion-header bg-white" id="headingthree">
                      <button class="accordion-button bg-white text-black fw-bold fs-5" type="button" data-bs-toggle="collapse" data-bs-target="#collapsethree" aria-expanded="true" aria-controls="collapsethree">
                        البلد
                      </button>
                    </h2>
                    <div id="collapsethree" class="accordion-collapse collapse show" aria-labelledby="headingthree" data-bs-parent="#accordionExample">
                      <div class="accordion-body">
                      <select v-model="country" class="form-select bg-white" @change="getCharactour(0)">
                                 <option value="" selected disabled>اختر البلد</option>
                                 <option v-for="country in countries" :key=country.id :value=country.code>{{country.country_name}}</option>
                      </select>
                      </div>
                    </div>
                    </div>
                    <div class="accordion-item bg-white">
                     <h2 class="accordion-header bg-white" id="headingfour">
                      <button class="accordion-button bg-white text-black fw-bold fs-5" type="button" data-bs-toggle="collapse" data-bs-target="#collapsefour" aria-expanded="true" aria-controls="collapsethree">
                        الصنف
                      </button>
                    </h2>
                    <div id="collapsefour" class="accordion-collapse collapse show" aria-labelledby="headingfour" data-bs-parent="#accordionExample">
                      <div class="accordion-body">
                      <select v-model="selectCategory" class="form-select bg-white" @change="getCharactour(0)">
                                 <option value="" selected disabled>اختر الصنف الرئيسي</option>
                                 <option v-for="categ in category" :key=categ.id :value=categ.id>{{categ.name}}</option>
                      </select>
                      </div>
                    </div>
                    </div>
                    <div class="accordion-item bg-white">
                     <h2 class="accordion-header bg-white" id="headingfive">
                      <button class="accordion-button bg-white text-black fw-bold fs-5" type="button" data-bs-toggle="collapse" data-bs-target="#collapsefive" aria-expanded="true" aria-controls="collapsethree">
                        الصنف الفرعي
                      </button>
                    </h2>
                    <div id="collapsefive" class="accordion-collapse collapse show" aria-labelledby="headingfive" data-bs-parent="#accordionExample">
                      <div class="accordion-body">
                      <select v-model="selectSubCategory" class="form-select bg-white" @change="getCharactour(0)">
                                 <option value="" selected disabled>اختر الصنف الفرعي</option>
                                 <option v-for="subCate in subCategory" :key=subCate.id :value=subCate.id>{{subCate.name}}</option>
                      </select>
                      </div>
                    </div>
                    </div>
                    </div>
              </div>
              </div>
              <div class="col-md-9">
              <div  v-if="charactours.length && vcharactours">
              <h3  class="text-end fw-bold py-2">جميع الشخصيات في من هم</h3>
              <div v-for="result in charactours" :key=result.id class="mt-2 p-1"> 
                        <div class="card m-auto my-4 text-end shadow rounded-btn" >
                            <div class="row p-2">
                              <div class="col-sm-2 d-flex align-items-center">
                                <a  :href="'/شخصيات/'+decodeURI(result.slug)+'/'">
                                  <img class="img-fluid"  :src=result.image  alt="result image">
                              </a>
                              </div>
                              <div class="col-sm-10">
                              <div class="card-body">
                                <a  :href="'/شخصيات/'+decodeURI(result.slug)+'/'" class="card-title text-decoration-none  fw-bold fs-4">{{result.character_name_ar}}</a>
                                <div class="float-start" >
                                 <router-link  v-if="false" :to="{ name: 'login', params: {nextUrl:'addCharacter'}}"   class="btn btn-primary mx-2">متابعة</router-link>
                                 </div>
                                 <div class="float-start"  v-if="false">
                                <button v-if="charactours.isFollowing == false" @click.prevent="postFollowcharactour(charactous.id)" class="btn btn-primary mx-2">متابعة</button>
                                <button v-if="charactours.isFollowing == true " @click.prevent="postUnFollowcharactour(charactours.id)" class="btn btn-primary mx-2">إلغاء المتابعة</button>
                                </div>

                               <p class="text-warning text-decoration-none py-2 fs-5  " >
                                <span  :inner-html.prop="result.positions | formatPositions"></span>|
                                <span></span>
                                </p>
                                 <p  v-if="result.age">
                                  {{result.age}}  سنة</p>
                              </div>
                              </div>
                             </div>
              </div>
              </div>
                    <div class="row" v-if="charactours.length">
                    <div class="col-12" style="direction:ltr">
                    <nav aria-label="Page navigation">
                      <ul class="pagination justify-content-center">
                        <li class="page-item active" @click.prevent="getCharactour(10)"><a class="page-link " href="#">التالي</a></li>
                        <li class="page-item" @click.prevent="getCharactour(-10)" :class="{'active' : more > 9 }"><a class="page-link" href="#">السابق</a></li>

                      </ul>
                    </nav>
                    </div>
                    </div>
              </div>
              </div>
   
              </div>
              </div>
              <div>
              </div>
    </div>
</template>
<script>
import discover from '../home/discover.vue'
import breadcrumb from '../pages/accessories/breadcrumb.vue'
export default {
  components: 
        {
        breadcrumb,
        discover,
      },
    data() {
      return {
        user:this.$store.state.user,
        order:[],
        country:"",
        selectCategory:"",
        selectSubCategory:"",
        subCategory:{},
        category:{},
        categoryName:"",
        nationality:"",
        countries:{},
        companies:{},
        charactours:{},
        more:0,
        vcompanies:true,
        vcharactours:true,
                    breadcrumbLsit: [
        {
          name: "الرئيسية",
          link: "/",
        },
           {
          name: "جميع الشخصيات",
          link: "/allCharactours",
        },
      ],
      
        }
    },
            filters: {
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
                },},
     methods: {
      onChange(event) {
      var data = event.target.value
      this.order.push(data)  
      this.getCharactour(0)
          },
      getCharactour(v)
            {
                  this.more=this.more+v
        this.http.post('/charactour/filter?skip='+this.more,
         { 
            "categories":[this.selectCategory],
            "country":[this.country],
            "order":this.order
         }
        )
        .then(async (response)=>
                    {
        this.charactours = response.data.items
          
                     })
            },
                postFollowcharactour(v)
                {
            this.http.post('/charactour/followCharactour',
            {
            "charactou_id":parseInt(v),
            "user_id":this.$store.state.user.id
                            },
                            )
            .then(async (response)=>{
                this.charactour.isFollowing=true
             //   console.log(response.data)
                        })
                },
    postUnFollowcharactour(v)
                {
            this.http.post('/charactour/followCharactour/delete',
            {
            "charactou_id":parseInt(v),
            "user_id":this.$store.state.user.id
                            },)
            .then(async (response)=>{
                this.charactour.isFollowing=false
                        })
                },
      getcountry(){
                    this.httpMg.get('/countries')
                    .then(async (response)=>{
                    this.countries=response.data.countries
                })
                 
            },
      getCategories(){
          this.http.get('/categories').
          then(async (response)=>{
          this.category=response.data
                     })
                     },
          getSubCategories(){
          this.http.get('/subCategories').
          then(async (response)=>{
          this.subCategory=response.data
                     })
                     }
        },
        created() {
          this.getSubCategories()
          this.getCategories()
          this.getCharactour(0)
          this.getcountry();

        }
};
</script>

