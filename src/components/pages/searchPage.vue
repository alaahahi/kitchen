<template>
  <div>
    <div style="background-image: url('web-asset/img/path104.png')">
      <div style="background-color: rgb(255 255 255 / 80%)">
        <breadcrumb :data="breadcrumbLsit" />
        <h3 class="text-center fw-bold py-2">البحث متقدم</h3>
        <h5 class="text-center pt-3 text-black-80">استكشف وتعرف على شخصيات ومؤسسات وثقافات مختلفة حول العالم العربي</h5>
        <section class="Discover">
          <div class="Discover" @click="hides()">
            <div class="container">
              <div class="row py-5 height d-flex justify-content-center align-items-center">
                <div class="col-md-8">
                  <div class="search">
                    <i class="fa fa-search fa-flip-horizontal text-muted"></i>
                    <div
                      style="position: absolute; left: 120px; top: 20px; cursor: pointer"
                      @click="
                        text = ''
                        showhistory = false
                      "
                      v-if="text"
                    >
                      <closeSearch />
                    </div>
                    <input
                      @change="getResults()"
                      v-model="text"
                      type="text"
                      class="form-control bg-white"
                      placeholder="أكتب ماتريد البحث عنه في الشخصيات أو مؤسسة"
                    />
                    <button
                      class="btn px-1 m-2 rounded-btn"
                      :class="text ? 'btn-primary fix-primary' : 'btn-light'"
                      @click="getResults()"
                    >
                      ابحث
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
    <div class="container">
      <div class="row">
        <div class="col-md-4">
          <div class="card rounded-btn shadow">
            <h3 class="p-3">فلترة</h3>
            <div class="accordion accordion-flush" id="accordionSearch">
              <div class="accordion-item bg-white">
                <h2 class="accordion-header bg-white" id="headingOne">
                  <button
                    class="accordion-button bg-white text-black fw-bold fs-5"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseOne"
                    aria-expanded="true"
                    aria-controls="collapseOne"
                  >
                    الفئة
                  </button>
                </h2>
                <div
                  id="collapseOne"
                  class="accordion-collapse collapse show"
                  aria-labelledby="headingOne"
                  data-bs-parent="#accordionExample"
                >
                  <div class="accordion-body">
                    <div class="form-check">
                      <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" />
                      <label class="form-check-label" for="flexRadioDefault1"> شخصيات </label>
                    </div>
                    <div class="form-check">
                      <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" />
                      <label class="form-check-label" for="flexRadioDefault2"> مؤسسات </label>
                    </div>
                  </div>
                </div>
              </div>
              <div class="accordion-item bg-white">
                <h2 class="accordion-header bg-white" id="headingtow">
                  <button
                    class="accordion-button bg-white text-black fw-bold fs-5"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapsetow"
                    aria-expanded="true"
                    aria-controls="collapsetow"
                  >
                    التصنيفات
                  </button>
                </h2>
                <div
                  id="collapsetow"
                  class="accordion-collapse collapse show"
                  aria-labelledby="headingtow"
                  data-bs-parent="#accordionExample"
                >
                  <div class="accordion-body">
                    <div class="form-check">
                      <input class="form-check-input" type="radio" name="flexRadioDefault1" id="flexRadioDefault3" />
                      <label class="form-check-label" for="flexRadioDefault3"> سياسة </label>
                    </div>
                    <div class="form-check">
                      <input class="form-check-input" type="radio" name="flexRadioDefault1" id="flexRadioDefault4" />
                      <label class="form-check-label" for="flexRadioDefault4"> عالم الرياضة </label>
                    </div>
                  </div>
                </div>
              </div>
              <div class="accordion-item bg-white">
                <h2 class="accordion-header bg-white" id="headingthree">
                  <button
                    class="accordion-button bg-white text-black fw-bold fs-5"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapsethree"
                    aria-expanded="true"
                    aria-controls="collapsethree"
                  >
                    البلد
                  </button>
                </h2>
                <div
                  id="collapsethree"
                  class="accordion-collapse collapse show"
                  aria-labelledby="headingthree"
                  data-bs-parent="#accordionExample"
                >
                  <div class="accordion-body">
                    <select class="form-select bg-white mb-2" aria-label="Default select example">
                      <option selected>اختر البلد</option>
                      <option value="1">One</option>
                      <option value="2">Two</option>
                      <option value="3">Three</option>
                    </select>
                    <select class="form-select bg-white" aria-label="Default select example">
                      <option selected>الجنسية</option>
                      <option value="1">One</option>
                      <option value="2">Two</option>
                      <option value="3">Three</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <div class="mb-3 p-3">
              <label for="exampleFormControlInput1" class="form-label">الوسوم</label>
              <input type="email" class="form-control bg-white" id="exampleFormControlInput1" placeholder="الوسوم" />
            </div>
          </div>
        </div>
        <div class="col-md-8">
          <h3 v-if="resultsCharactour.length" class="text-end fw-bold py-2">الشخصيات الأعلى زيارة</h3>
          <div v-for="(result, index) in resultsCharactour" :key="index" class="mt-2 p-1">
            <div class="card w-75 m-auto my-4 text-end shadow">
              <div class="row">
                <div class="col-sm-3 g-0 d-flex align-items-center">
                  <img :src="result.image" alt="result image" />
                </div>
                <div class="col-sm-9 g-0">
                  <div class="card-body">
                    <h2 class="card-title fw-bold fs-4">{{ result.name }}</h2>
                    <h6 class="text-warning py-1 fs-6">مجموعة مصطفي السلاب</h6>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <h3 v-if="resultsCompany.length" class="text-end fw-bold py-2">االمؤسسات الأعلى زيارة</h3>
          <div v-for="(result, index) in resultsCompany" :key="index" class="mt-2 p-1">
            <div class="card w-75 m-auto my-4 text-end shadow">
              <div class="row">
                <div class="col-sm-3 g-0 d-flex align-items-center">
                  <img :src="result.logo" alt="result image" />
                </div>
                <div class="col-sm-9 g-0">
                  <div class="card-body">
                    <h2 class="card-title fw-bold fs-4">{{ result.nameAR }}</h2>
                    <h6 class="text-warning py-1 fs-6">{{ result.position }}</h6>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import discover from '../home/discover.vue'
import breadcrumb from '../pages/accessories/breadcrumb.vue'
import closeSearch from '../pages/accessories/svg/closeSearch.vue'

export default {
  components: {
    breadcrumb,
    discover,
    closeSearch
  },
  data() {
    return {
      hide: false,
      text: '',
      resultsCompany: {},
      resultsCharactour: {},
      categorys: {},
      breadcrumbLsit: [
        {
          name: 'الرئيسية',
          link: '/',
        },
        {
          name: 'البحث متقدم',
          link: '/search',
        },
      ],
    }
  },
  methods: {
    hides() {
      this.hide = false
    },
    getResults() {
      this.http
        .post('/charactour/search', {
          name: this.text,
        })
        .then(async (response) => {
          this.resultsCompany = response.data.Company
          this.resultsCharactour = response.data.Charactour
          this.hide = true
        })
    },
    getCategory() {
      this.http.get('/category').then(async (response) => {
        this.categorys = response.data
      })
    },
    onChangePage(pageOfItems) {
      this.pageOfItems = pageOfItems
    },
  },
  created() {
    this.getCategory()
  },
}
</script>
<style scoped>
.accordion-button:not(.collapsed) {
  box-shadow: none;
}
</style>