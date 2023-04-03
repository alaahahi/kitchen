<template>
  <div>
  
    <div class="row p1-2 position-absolute w-100 fixs" v-if="showhistory">
      <!-- style="max-height:500px;overflow-y:auto;" -->
      <div class="most-visited rounded-btn my-3 pt-4 ">
        <div>
          <span class="fw-bold float-end fs-4 most-visited-text mx-3">
            الأكثر بحثاً ( {{ resultsCharactour.length }} )
          </span>
          <div class="float-start mx-3 text-gray-80">
            <span @click.prevent="slidePrev()">
              <slider-left class="ms-2" style="transform: rotate(180deg)" />
            </span>
            <span @click.prevent="slideNext()">
              <slider-left />
            </span>
          </div>
        </div>
        <div class="clearfix"></div>
        <div>
          <section class="best-company-groups bg-white">
            <hooper ref="carousel" :settings="hooperSettings">
              <slide v-for="(charactour, index) in resultsCharactour" :key="index" class="ps-2">
                <div class="w-100 text-center text-md-end pt-3 px-2 mt-2 pb-2">
                  <div class="row text-center text-md-end">
                    <div class="col-md-4 ps-1 pe-3 g-0">
                      <img
                        v-if="!charactour.image"
                        class="img-fluid m-auto search-img-ch resultsMostImage"
                        src="/web-asset/img/companydef.JPG"
                      />
                      <img
                        v-if="charactour.image"
                        class="img-fluid m-auto search-img-ch resultsMostImage"
                        :src="charactour.image"
                      />
                    </div>
                    <div class="col-md-8" style="min-height: 106px">
                      <div class="resultsMost">
                        <a
                          :href="'/شخصيات/' + decodeURI(charactour.slug) + '/'"
                          class="text-black text-decoration-none"
                        >
                          <span class="card-title mb-0 p-0 fw-bold pt-1 fs-5" style="min-height: 55px">{{
                            charactour.name
                          }}</span>
                        </a>
                        <button class="btn btn-light me-2 fw-bold bg-c btn-sm p-2 rounded-btn px-2 disabled">
                          شخصيات
                        </button>
                        <h2 class="fs-16 mb-0 text-decoration-none mt-2" style="min-height: 38px">
                          {{ charactour.content | truncate(25, '..') }}
                        </h2>
                      </div>
                    </div>
                  </div>
                </div>
              </slide>
            </hooper>
            <div  v-if="resultsTotal || text" style="border: 1px solid #F2F2F2;border-radius: 8px;padding-top: 15px;">
              <div class="" style="">
                <ul class="nav nav-pills py-3 pe-3 flex-nowrap" id="pills-tab" role="tablist" style="overflow-x: auto;overflow-y: hidden;white-space: nowrap;">
                  <li class="nav-item" role="presentation">
                    <a
                      class="link active"
                      @click="
                        getResultsSerachMix();
                        selectSearch = 1;
                        push_event()
                      "
                      id="all-tab"
                      data-bs-toggle="pill"
                      data-bs-target="#all"
                      type="button"
                      role="tab"
                      aria-controls="all"
                      aria-selected="true"
                    >
                      الكل
                      <span class="count ms-2">({{ resultsTotal }})</span>
                    </a>
                  </li>
                  <li class="nav-item" role="presentation">
                    <a
                      class="link"
                      @click="
                        getResultsSerach('person')
                        selectSearch = 1;
                        push_event();
                      "
                      id="pills-home-tab"
                      data-bs-toggle="pill"
                      data-bs-target="#pills-home"
                      type="button"
                      role="tab"
                      aria-controls="pills-home"
                      aria-selected="false"
                    >
                      الشخصيات
                      <span class="count ms-2">({{ results_count_charactours() }})</span>
                    </a>
                  </li>
                  <li class="nav-item" role="presentation">
                    <a
                      class="link"
                      @click="
                        getResultsSerach('company');
                        selectSearch = 2;
                        push_event()
                      "
                      id="pills-profile-tab"
                      data-bs-toggle="pill"
                      data-bs-target="#pills-profile"
                      type="button"
                      role="tab"
                      aria-controls="pills-profile"
                      aria-selected="false"
                    >
                      الشركات
                      <span class="count ms-2">({{ results_count_companies() }})</span>
                    </a>
                  </li>
                  <li class="nav-item" role="presentation">
                    <a
                      class="link"
                      @click="
                        getResultsSerach('category');
                        selectSearch = 3;
                        push_event()
                      "
                      id="pills-contact-tab"
                      data-bs-toggle="pill"
                      data-bs-target="#pills-contact"
                      type="button"
                      role="tab"
                      aria-controls="pills-contact"
                      aria-selected="false"
                    >
                      التصنيفات
                      <span class="count ms-2">({{ results_count_categories() }})</span>
                    </a>
                  </li>
                </ul>
              </div>
              <hr class="mb-0" style="margin:0;">
              <div class="tab-content pe-3 dyn-height" id="pills-tabContent">
                <!-- all -->
                <div class="tab-pane fade show active" id="all" role="tabpanel" aria-labelledby="all-tab">
                  <advancedSearchCharacterCard :resultsCharactourSerach=resultsCharactourSerach :q=text ></advancedSearchCharacterCard>
                  <advancedSearchCompanyCard   :resultsCompanySerach="resultsCompanySerach"  :q=text></advancedSearchCompanyCard>
                  <advancedSearchCategoryCard  :resultsCategoriesSerach="resultsCategoriesSerach" :q=text></advancedSearchCategoryCard>
                </div>
                <!-- characters -->
                <div class="tab-pane fade" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab">
                  <advancedSearchCharacterCard :resultsCharactourSerach="resultsCharactourSerach" :q=text></advancedSearchCharacterCard>
                </div>
                <!-- companies -->
                <div class="tab-pane fade" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab">
                  <advancedSearchCompanyCard   :resultsCompanySerach="resultsCompanySerach" :q=text></advancedSearchCompanyCard>
                </div>
                <!-- categories -->
                <div class="tab-pane fade" id="pills-contact" role="tabpanel" aria-labelledby="pills-contact-tab">
                  <advancedSearchCategoryCard  :resultsCategoriesSerach="resultsCategoriesSerach" :q=text></advancedSearchCategoryCard>
                </div>
              </div>
            </div>
            <div class="text-center">
              <hr />
              <h5>
                <a class="links py-2 allresult link-primary" @click="getAdv()">
                  <span v-if="resultsTotal"> عرض جميع النتائج </span>
                  <span v-if="!resultsTotal"> البحث المتقدم </span>
                  <svg
                    class="me-2"
                    width="8"
                    height="12"
                    viewBox="0 0 8 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M7.24843 0.351472C7.71706 0.820101 7.71706 1.5799 7.24843 2.04853L3.29696 6L7.24843 9.95147C7.71706 10.4201 7.71706 11.1799 7.24843 11.6485C6.7798 12.1172 6.02 12.1172 5.55137 11.6485L0.751374 6.84853C0.282745 6.3799 0.282745 5.6201 0.751374 5.15147L5.55137 0.351472C6.02 -0.117157 6.7798 -0.117157 7.24843 0.351472Z"
                      fill="#4169E3"
                    />
                  </svg>
                </a>
              </h5>
              <hr class="mb-0" />
            </div>
            <div v-if="false" v-click-outside="hides">
              <div
                class="row text-center p1-2 position-absolute w-100 fixs"
                v-if="noResult && text != ''"
                style="z-index: 75; padding: 0 0.8rem"
              >
                <div
                  class="dyn-height rounded-btn mt-2 py-3"
                  v-click-outside="hides"
                  style="background-color: #fff; box-shadow: 0px 0px 10px 3px rgb(0 0 0 / 10%)"
                >
                  <div class="m-auto pb-2">
                    <img class="logo-manhom px-2 rounded-btn-img" src="/web-asset/img/noResult.jpg" alt="no Result" />
                    <img class="px-2 rounded-btn-img" src="/web-asset/img/noResult.jpg" alt="no Result" />
                    <img class="logo-manhom px-2 rounded-btn-img" src="/web-asset/img/noResult.jpg" alt="no Result" />
                  </div>
                  <h2 class="fw-bold">نأسف لعدم العثور على طلبك</h2>
                  <h5 class="text-black-80 py-2">
                    نقترح عليك البحث عن إسم الشخصيه بشكل دقيق
                    <br />
                    وإعادة تعيين مرة أخرى
                  </h5>
                  <div>
                    <button class="btn btn-primary px-4 fw-bold" @click.prevent="reset()">إعادة الضبط</button>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import sliderLeft from './svg/slider-left.vue'
import sliderRight from './svg/slider-right.vue'
import { Hooper, Slide } from 'hooper'
import 'hooper/dist/hooper.css'
import advancedSearchCharacterCard from './advancedSearchCharacterCard.vue'
import advancedSearchCompanyCard from './advancedSearchCompanyCard.vue'
import advancedSearchCategoryCard from './advancedSearchCategoryCard.vue'

export default {
  components: { sliderLeft, sliderRight, Hooper, Slide, advancedSearchCharacterCard, advancedSearchCompanyCard, advancedSearchCategoryCard},
  props: ['showhistory', 'text'],
  data() {
    return {
      selectSearch: 4,
      noResult: false,
      isTyping: false,
      isStoredSearches: true,
      resultsCompany: [],
      resultsCharactour: [],
      resultsCategoriesSerach: [],
      resultsCompanySerach: [],
      resultsCharactourSerach: [],
      resultsTotal: 0,
      hooperSettings: {
        touchDrag: true,
        itemsToSlide: 1,
        rtl: true,
        mouseDrag: false,
        wheelControl: false,
        itemsToShow: 1,
        results_charactours: '',
        results_companies: '',
        results_categories: '',
        breakpoints: {
          800: {
            centerMode: false,
            itemsToShow: 2,
          },
          1400: {
            itemsToShow: 3.5,
          },
        },
      },
    }
  },
  watch: {
    text: function (value) {
      if (value) {
        if (this.text.length > 0) {
          this.getResultsSerachMix()
        }
      }
    },
  },
  methods: {
    getAdv() {
      if (this.$router.currentRoute.name == 'advancedSearchPage') {
  
        this.resultsCategoriesSerach.length ?   this.selectSearch =3 : ""
        this.resultsCompanySerach.length ?this.selectSearch = 2 : ""
        this.resultsCharactourSerach.length ?this.selectSearch = 1 : ""
      
        this.$emit('add',this.selectSearch)

      } else
        this.$router.push({
          name: 'advancedSearchPage',
          params: { q: this.text, show: true, selectSearch: this.selectSearch ==4 && this.text   ? this.selectSearch=1 :this.selectSearch },
        })
    },
    push_event(){
      // console.log('selectSearch',this.selectSearch)
      this.$emit('push',this.selectSearch) 
    },
    results_count_charactours() {
      return this.results_charactours
    },
    results_count_companies() {
      return this.results_companies
    },
    results_count_categories() {
      return this.results_categories
    },
    feadback(type, id) {
      this.http.post('/log_success_search?type=' + type + '&id=' + id+'&q=' + this.text+'&item_order=').then(async (response) => {})
    },
    getResults() {
      this.http
        .get(
          '/most_search?characters=1&companies=0&categories=0&skip=0'
        )
        .then(async (response) => {
          this.resultsCharactour = response.data.characters.slice(0, 4)
          this.resultsCompany = response.data.companies
          this.resultsCategories = response.data.categories
        })
    },
    
    getResultsSerach(type = '') {
      this.http.get('/advance_search_v2?q=' + this.text + '&type=' + type+'&code='+
           (this.$store.getters.countryFilter ? this.$store.getters.countryFilter : 'ae')).then(async (response) => {
        this.resultsCompanySerach = response.data.result
          ? response.data.result.filter((item) => {
              return item.type == 'company'
            })
          : null
        this.resultsCharactourSerach = response.data.result
          ? response.data.result.filter((item) => {
              return item.type == 'person'
            })
          : null
        this.resultsCategoriesSerach = response.data.result
          ? response.data.result.filter((item) => {
              return item.type == 'category'
            })
          : null

        this.resultsSerach = response.data.results
        this.resultsTotal =
          response.data.total_for_person + response.data.total_for_company + response.data.total_for_category
        this.results_charactours = response.data.total_for_person
        this.results_companies = response.data.total_for_company
        this.results_categories = response.data.total_for_category
      })
    },

    getResultsSerachMix() {
      if(this.text){
      this.http.get('/advance_search_mix_v2?q='+this.text+'&code='+
           (this.$store.getters.countryFilter ? this.$store.getters.countryFilter : 'ae')).then(async (response) => {
            this.resultsCharactourSerach =  response.data.characters
        this.resultsCompanySerach = response.data.companies

        this.resultsCategoriesSerach =  response.data.categories

        this.resultsSerach = response.data.results
        this.resultsTotal =
          response.data.total_for_characters + response.data.total_for_companies + response.data.total_for_categories
        this.results_charactours = response.data.total_for_characters
        this.results_companies = response.data.total_for_companies
        this.results_categories = response.data.total_for_categories
      })
    }
    },
    slidePrev() {
      this.$refs.carousel.slidePrev()
    },
    slideNext() {
      this.$refs.carousel.slideNext()
    },
    clear() {
      localStorage.removeItem('storedSearches')
      this.isStoredSearches = false
      this.$router.go()
    },
    reset() {
      this.text = ''
      this.noResult = false
    },
  },
  created() {
    this.getResultsSerachMix()
    this.getResults()
    //      this.getResultsSerach()
  },
}
</script>
<style scoped>
@media screen and (max-width: 992px) {
  .dyn-height {
    margin-top: 20px;
  }
}
@media screen and (max-width: 480px) {
}
.dyn-height {
  max-height: 350px;
  overflow-y: auto;
  overflow-x: hidden;
  margin-top: 20px;
}
.dyn-height::-webkit-scrollbar-track {
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  border-radius: 10px;
  background-color: #f5f5f5;
}

.dyn-height::-webkit-scrollbar {
  width: 6px;
  background-color: #f5f5f5;
}

.dyn-height::-webkit-scrollbar-thumb {
  border-radius: 10px;
  box-shadow: inset 0 0 3px rgba(0, 0, 0, 0.2);
  background-color: #4f4f4f;
}
.input,
input::placeholder {
  padding-right: 10px;
}
.btn-w {
  width: 100%;
  margin-top: 10px;
}
.image-wid-s {
  width: 80px;
}
.image-wid-p {
  width: 50px;
}
.div-image {
  width: 80px;
}
.div-image-c {
  width: 50px;
}
.fixs {
  z-index: 75;
  padding: 0 0.8rem;
}
.fixs-c {
  z-index: 75;
  padding: 0px;
  left: 13px;
}
.link {
  font-size: 20px;
  font-weight: 500;
  color: #4f4f4f;
  margin: 0 5px;
}
.active {
  color: #20211f;
  font-weight: 700;
}
.count {
  font-size: 16px;
}
.nav-pills .nav-link.active,
.nav-pills .show > .nav-link {
  color: #20211f;
  font-weight: 700;
  background: none;
}
.allresult {
  color: #4169e3;
  font-size: 16px;
  font-weight: 700;
}
hr {
  border-color: #c8cadd;
}
.bg-c {
  background-color: #ecf0fc;
  color: #20211f;
}
a {
  cursor: pointer;
}
.search-img {
  border-radius: 0.5rem;
  height: 84px;
  width: 84px;
  object-fit: cover;
}
</style>

