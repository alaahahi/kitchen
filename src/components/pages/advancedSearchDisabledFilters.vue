<template>
  <div>
    <!-- النوع غير مفعل -->
    <div class="accordion-item bg-white">
      <h2 class="accordion-header bg-white" id="headingOne">
        <button
          class="accordion-button bg-white pb-0 text-disabled d-flex align-items-center"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#gender"
          aria-expanded="true"
          aria-controls="gender"
        >
          النوع
          <span class="me-1 margin-top-neg">
            <lockSvg />
          </span>
        </button>
      </h2>
      <div
        id="gender"
        class="accordion-collapse collapse"
        aria-labelledby="headingOne"
        data-bs-parent="#accordionExample"
        @click="openModal()"
      >
        <div class="accordion-body">
          <div class="form-check">
            <input
              class="form-check-input"
              value="most_searched"
              type="radio"
              name="gender"
              id="male"
              @change="
                gender = 1
                getResults()
              "
              disabled
            />
            <label class="form-check-label text-disabled-content show disabled" for="male">
              ذكر
              <span> ({{ total_for_male }}) </span>
            </label>
          </div>
          <div class="form-check">
            <input
              class="form-check-input"
              value="most_visited"
              type="radio"
              name="gender"
              id="famel"
              @change="
                gender = 2
                getResults()
              "
              disabled
            />
            <label class="form-check-label text-disabled-content show" for="famel">
              أنثى
              <span> ({{ total_for_female }}) </span>
            </label>
          </div>
        </div>
      </div>
    </div>
    <!--  الفئة العمرية غير مفعل-->
    <div  @click="openModal()">
      <div class="m-3 pe-1 fs-16">
        <p class="pb-0 fs-16 d-flex align-items-center text-disabled">
          الفئات العمرية
          <span class="me-1 margin-top-neg">
            <lockSvg />
          </span>
        </p>
        <select
          @change="setAge()"
          v-model="age"
          class="form-select country-selects text-disabled-content w-100"
          aria-label="Default select example"
          disabled
        >
          <option value="">اختيار الفئة العمرية</option>
          <option value="1">من 1 سنة إلي 20 سنة</option>
          <option value="2">من 20 سنة إلي 40 سنة</option>
          <option value="3">من 40 سنة إلي 60 سنة</option>
          <option value="4">من 60 سنة إلي 80 سنة</option>
        </select>
      </div>
    </div>
    <!--  على قيد الحياة غير مفعل -->
    <div @click="openModal()">
      <div class="form-check form-switch m-3 pe-1 fs-16">
        <input
          @change="
            is_alive == '' ? (is_alive = 'yes') : (is_alive = '')
            getResults()
          "
          class="mark-for-override form-check-input form-check-input-green shadow-none"
          type="checkbox"
          disabled
        />
        <label class="mark-for-override form-check-label" for="flexSwitchCheckChecked"
          >على قيد الحياة
          <span class="me-1 margin-top-neg">
            <lockSvg />
          </span>
        </label>
      </div>
    </div>
    <!-- البلد غير مفعل -->
    <div @click="openModal()"
    >
      <hr class="my-4" style="border-color: #8488ad" />
      <div class="m-3 pe-1 fs-16">
        <p class="text-disabled pb-0 fs-16">
          البلد
          <span class="me-1 margin-top-neg">
            <lockSvg />
          </span>
        </p>

        <model-list-select
          :list="countries"
          v-model="country"
       
          option-value="id"
          option-text="country_name"
          placeholder="بلد الإقامة"
          class="form-select w-100 form-control mb-2 country-selects"
          :isDisabled="true"
        >
        </model-list-select>

        <model-list-select
          @select="alert(0)"
          :list="countries"
          v-model="nationality"
          option-value="id"
       
          option-text="country_name"
          placeholder="الجنسية"
          class="form-select w-100 form-control mb-2 country-selects"
          :isDisabled="true"
        >
        </model-list-select>

        <model-list-select
          :list="countries"
          v-model="countryCompnay"
          
          option-value="id"
          option-text="country_name"
          placeholder="الدولة"
          class="form-select w-100 form-control mb-2 country-selects"
          :isDisabled="true"
        >
        </model-list-select>
      </div>
      <hr class="mt-4 mb-0" style="border-color: #8488ad" />
    </div>
    <!--  التصنيف غير مفعل-->
    <div class="accordion-item bg-white" @click="openModal()">
      <h2 class="accordion-header bg-white" id="headingOne">
        <button
          class="accordion-button bg-white text-disabled pb-0 fs-16"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#category"
          aria-expanded="true"
          aria-controls="category"
        >
          التصنيفات
          <span class="me-1 margin-top-neg">
            <lockSvg />
          </span>
        </button>
      </h2>
      <div
        id="category"
        class="accordion-collapse collapse show"
        aria-labelledby="headingOne"
        data-bs-parent="#accordionExample"
        @click="openModal()"
      >
        <div class="accordion-body">
          <div class="position-relative">
            <input
              v-model="cat_text"
              class="mb-3 form-control rounded-btn shadow-none input-f text-disabled-content disabled-bg"
              placeholder="ابحث عن تصنيف"
              disabled
            />
            <svg
              width="20"
              class="position-absolute top-50 end-0-c translate-middle-y"
              height="21"
              viewBox="0 0 20 21"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1 19.5L7 13.5M5 8.5C5 12.366 8.13401 15.5 12 15.5C15.866 15.5 19 12.366 19 8.5C19 4.63401 15.866 1.5 12 1.5C8.13401 1.5 5 4.63401 5 8.5Z"
                stroke="#C1C1C1"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>
          <div v-for="cat in category" :key="cat.id">
            <div class="form-check">
              <input
                class="form-check-input mark-for-override"
                :value="cat.id"
                type="checkbox"
                name="flexRadioDefault1"
                id="flexRadioDefault1"
                @change="onChangeS($event, cat)"
                disabled
              />
              <label class="form-check-label fs-16 text-disabled-content" for="flexRadioDefault1">
                {{ cat.phrase }}
              </label>
            </div>
          </div>
          <div v-for="cat in favoriteCategory" :key="cat.id + 1">
            <div class="form-check">
              <input
                class="form-check-input mark-for-override"
                :value="cat.id"
                type="checkbox"
                name="cat"
                id="cat"
                :checked="filterCategoryArray.includes(cat.id)"
                @change="onChange($event)"
                disabled
              />
              <label class="form-check-label fs-16 text-disabled-content" for="cat">
                {{ cat.name }}
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- قوائم خاصة / تصنيفات خاصة غير مفعل -->
    <div class="accordion-item bg-white" @click="openModal()">
      <h2 class="accordion-header bg-white" id="headingScat">
        <button
          class="accordion-button bg-white text-disabled pb-0"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#categoryS"
          aria-expanded="true"
          aria-controls="categoryS"
        >
          التصنيفات الخاصة
          <span class="me-1 margin-top-neg">
            <lockSvg />
          </span>
        </button>
      </h2>
      <div
        id="categoryS"
        class="accordion-collapse collapse show"
        aria-labelledby="headingScat"
        data-bs-parent="#accordionExample"
        @click="openModal()"
      >
        <div class="accordion-body">
          <div v-for="cat in Scategorys" :key="cat.id">
            <div class="form-check">
              <input
                class="form-check-input mark-for-override"
                :value="cat.id_inside_property"
                type="checkbox"
                name="cat"
                id="cat"
                :checked="filterCategoryArray.includes(cat.id)"
                @change="onChange($event)"
                disabled
              />
              <label class="form-check-label fs-16 text-disabled-content" for="cat">
                {{ cat.name }}
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--  التعليم غير مفعل -->
    <div class="accordion-item bg-white" @click="openModal()">
      <h2 class="accordion-header" id="headingIn">
        <button
          class="accordion-button text-disabled bg-white pb-0"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#inistitute"
          aria-expanded="true"
          aria-controls="inistitute"
        >
          المؤسسات العلمية
          <span class="me-1 margin-top-neg">
            <lockSvg />
          </span>
        </button>
      </h2>
      <div
        id="inistitute"
        class="accordion-collapse collapse show"
        aria-labelledby="headingIn"
        data-bs-parent="#accordionExample"
        @click="openModal()"
      >
        <div class="accordion-body">
          <div class="position-relative">
            <input
              v-model="inistitute_text"
              class="mb-3 form-control rounded-btn shadow-none input-f text-disabled-content disabled-bg"
              placeholder="ابحث عن مؤسسة"
              disabled
            />
            <svg
              width="20"
              class="position-absolute top-50 end-0-c translate-middle-y"
              height="21"
              viewBox="0 0 20 21"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1 19.5L7 13.5M5 8.5C5 12.366 8.13401 15.5 12 15.5C15.866 15.5 19 12.366 19 8.5C19 4.63401 15.866 1.5 12 1.5C8.13401 1.5 5 4.63401 5 8.5Z"
                stroke="#C1C1C1"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>
          <div v-for="inist in inistitute" :key="inist.id">
            <div class="form-check" >
              <input
                class="form-check-input mark-for-override"
                :value="inist.phrase"
                type="checkbox"
                name="flexRadioDefault1"
                id="flexRadioDefault1"
                @change="onChangeSInistitute($event, inist)"
                disabled
              />
              <label class="form-check-label text-disabled-content fs-16" for="flexRadioDefault1">
                {{ inist.phrase }}
              </label>
            </div>
          </div>
          <div v-for="inist in favoriteInistitute" :key="inist.id">
            <div class="form-check">
              <input
                class="form-check-input mark-for-override"
                :value="inist.name"
                type="checkbox"
                name="flexRadioDefault1"
                id="flexRadioDefault1"
                :checked="filterInistituteArray.includes(inist.name) || filterInistituteArray.includes(inist.phrase)"
                @change="onChangeInistitute($event)"
                disabled
              />
              <label class="form-check-label fs-16 text-disabled-content" for="flexRadioDefault1">
                {{ inist.name }} {{ inist.phrase }}
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- الدرجة العلمية غير مفعل -->
    <div class="accordion-item bg-white"  @click="openModal()">
      <h2 class="accordion-header bg-white" id="headingOne">
        <button
          class="accordion-button bg-white pb-0 text-disabled"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#degree"
          aria-expanded="true"
          aria-controls="degree"
        >
          درجة العلمية
          <span class="me-1 margin-top-neg">
            <lockSvg />
          </span>
        </button>
      </h2>
      <div
        id="degree"
        class="accordion-collapse collapse show"
        aria-labelledby="headingOne"
        data-bs-parent="#accordionExample"
        @click="openModal()"
      >
        <div class="accordion-body">
          <div v-for="deg in favoriteDegree" :key="deg">
            <div class="form-check">
              <input
                class="form-check-input mark-for-override"
                :value="deg"
                type="checkbox"
                name="flexRadioDefault1"
                id="flexRadioDefault1"
                @change="onChangeDegree($event)"
                disabled
              />
              <label class="form-check-label text-disabled-content" for="flexRadioDefault1">
                {{ deg }}
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- حاصل على جوائز غير مفعل-->
    <div  @click="openModal()">
      <div class="form-check form-switch m-3 pe-1 fs-16">
        <input
          @change="
            has_trophy == '' ? (has_trophy = 'yes') : (has_trophy = '')
            getResults()
          "
          class="mark-for-override form-check-input form-check-input-green shadow-none"
          type="checkbox"
          disabled
        />
        <label class="form-check-label mark-for-override fs-16" for="flexSwitchCheckChecked"
          >حاصل على جوائز
          <span class="me-1 margin-top-neg">
            <lockSvg />
          </span>
        </label>
      </div>
    </div>
    <!-- يملك مؤلفات غير مفعل -->
    <div @click="openModal()">
      <div class="form-check form-switch m-3 pe-1 fs-16">
        <input
          @change="
            has_authors == '' ? (has_authors = 'yes') : (has_authors = '')
            getResults()
          "
          class="mark-for-override form-check-input form-check-input-green shadow-none"
          type="checkbox"
          disabled
        />
        <label class="form-check-label mark-for-override fs-16" for="flexSwitchCheckChecked">
          قام بكتابة مؤلفات
          <span class="me-1 margin-top-neg">
            <lockSvg />
          </span>
        </label>
      </div>
    </div>
    <div class="text-center">
      <button class="btn btn-primary m-3 w-74" @click="restFilter()">تهيئة الفلتر</button>
    </div>
    <!-- button -->
    <button
      class="btn btn-light bg-white d-none fw-bold"
      ref="toggleModal"
      data-bs-toggle="modal"
      data-bs-target="#disabledModal"
    ></button>
    <!-- modal -->
    <div
      class="modal fade"
      id="disabledModal"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
      ref="disabledModal"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <i data-bs-dismiss="modal" aria-label="Close" ref="closeDisabledModal"
              ><svg
                style="
                  border-radius: 50%;
                  position: relative;
                  top: 2px;
                  top: -31px;
                  width: 31px;
                  right: -32px;
                  background: rgb(255, 255, 255);
                  padding: 3px;
                "
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M15.9992 28.8002C23.0685 28.8002 28.7992 23.0694 28.7992 16.0002C28.7992 8.93095 23.0685 3.2002 15.9992 3.2002C8.92997 3.2002 3.19922 8.93095 3.19922 16.0002C3.19922 23.0694 8.92997 28.8002 15.9992 28.8002ZM13.9306 11.6688C13.3058 11.044 12.2927 11.044 11.6678 11.6688C11.043 12.2937 11.043 13.3067 11.6678 13.9316L13.7365 16.0002L11.6678 18.0688C11.043 18.6937 11.043 19.7067 11.6678 20.3316C12.2927 20.9564 13.3058 20.9564 13.9306 20.3316L15.9992 18.2629L18.0678 20.3316C18.6927 20.9564 19.7057 20.9564 20.3306 20.3316C20.9554 19.7067 20.9554 18.6937 20.3306 18.0688L18.262 16.0002L20.3306 13.9316C20.9554 13.3067 20.9554 12.2937 20.3306 11.6688C19.7057 11.044 18.6927 11.044 18.0678 11.6688L15.9992 13.7375L13.9306 11.6688Z"
                  fill="#20211F"
                />
              </svg>
            </i>
            <div class="w-100 d-flex justify-content-center align-items-center">
              <span class="modal-header-text">اكمل معلومات حسابك</span>
            </div>
          </div>
          <div class="modal-body d-flex alig-items-center justify-content-center">
            <div class="w-75 text-center">
              <span> لابد من إضافة جميع معلوماتك لتكن لديك القدرة في الوصول </span>
              <span> الى جميع مميزات الموقع </span>
            </div>
          </div>
          <div class="modal-footer d-flex justify-content-center">
            <!-- <button type="button" data-bs-dismiss="modal" class="btn btn-light border float-start">إلغاء</button> -->
            <!-- @click.prevent="changeUserInfo()" -->
            <button type="button" class="w-75 btn btn-primary">
              اكمل معلومات حسابك
              <!-- <span :class="{ 'spinner-border spinner-border-sm': loadingEdit }"></span> -->
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import ClickOutside from 'vue-click-outside'
import { ModelListSelect } from 'vue-search-select'
import 'vue-search-select/dist/VueSearchSelect.css'
import lockSvg from './accessories/svg/lockSvg.vue'

export default {
  metaInfo: {
    title: 'من هم؟ | البحث المتقدم',
  },
  components: {
    ModelListSelect,
    ClickOutside,
    lockSvg,
  },
  data() {
    return {
      category_type: 'character',
      agestart: '',
      ageend: '',
      age: '',
      is_alive: '',
      filterCategoryArray: [],
      filterDegreeArray: [],
      filterInistituteArray: [],
      showhistory: false,
      allow_filter: [],
      show_charactoursH: false,
      show_companiesH: false,
      show_categoriesH: false,
      prevResults: 0,
      nextResults: 5,
      disabled: true,
      max: false,
      resultsCount: 0,
      noResult: false,
      selectSearch: this.$route.params.selectSearch ? this.$route.params.selectSearch : 4,
      text: this.$route.params.q,
      resultsCompany: [],
      resultsCharactour: [],
      allCharactour: [],
      categorys: [],
      categorysSelected: [],
      morec: 0,
      more: 0,
      country: { id: '' },
      category: [],
      inistitute: [],
      degree: [],
      nationality: { id: '' },
      countryCompnay: { id: '' },
      countries: [],
      companies: {},
      charactours: {},
      allSubCategories: {},
      selectSubCategory: '',
      order: [],
      code: this.$route.meta.code
        ? this.$route.meta.code
        : this.$store.getters.countryFilter
        ? this.$store.getters.countryFilter.toLowerCase()
        : 'ae',
      resultsCategory: [],
      skip: 0,
      more: 0,
      cat_text: '',
      inistitute_text: '',
      degree_text: '',
      show_charactours: this.$route.params.q ? true : false,
      show_companies: false,
      show_categories: false,
      results_count_charactours: 0,
      results_count_companies: 0,
      results_count_categories: 0,
      has_trophy: '',
      has_authors: '',
      resultsMostSearchCharactour: [],
      resultsMostSearchCompany: [],
      resultsMostSearchCategories: [],
      favoriteDegree: [],
      favoriteInistitute: [],
      favoriteCategory: [],
      allow_filterImportantInstitute: [],
      type: '',
      gender: '',
      breadcrumbLsit: [
        {
          name: 'الرئيسية',
          link: '/',
        },
        {
          name: 'البحث متقدم',
          link: '',
        },
      ],
      title: ' من هم؟ | البحث المتقدم',
      total_for_male: 0,
      total_for_female: 0,
      Scategorys:[]
    }
  },
  metaInfo() {
    return {
      title: this.title,
    }
  },
  watch: {
    cat_text: function (value) {
      this.getCatResults(value)
    },
    countryCompnay: function (value) {
      this.getResults(value)
    },
    nationality: function (value) {
      this.getResults(value)
    },
    country: function (value) {
      this.getResults(value)
    },
    inistitute_text: function (value) {
      this.educationInistitute(value)
    },
    degree_text: function (value) {
      if (value) {
        if (value.length > 2) {
          this.educationDegree(value)
        }
      }
    },
  },
  methods: {
    openModal(){
        this.$refs.toggleModal.click();
    },
    restFilter() {
      this.category_type = 'character'
      this.agestart = ''
      this.ageend = ''
      this.age = ''
      this.is_alive = ''
      this.filterCategoryArray = []
      this.filterDegreeArray = []
      this.filterInistituteArray = []
      this.showhistory = false
      this.disabled = true
      this.max = false
      this.resultsCompany = []
      this.resultsCharactour = []
      this.allCharactour = []
      this.categorys = []
      this.country = { id: '' }
      this.category = []
      this.inistitute = []
      this.degree = []
      this.nationality = { id: '' }
      this.countryCompnay = { id: '' }
      this.countries = []
      this.companies = {}
      this.charactours = {}
      this.allSubCategories = {}
      this.selectSubCategory = ''
      this.order = []
      this.code = this.$store.getters.countryFilter ? this.$store.getters.countryFilter.toLowerCase() : 'ae'
      this.resultsCategory = []
      this.skip = 0
      this.more = 0
      this.cat_text = ''
      this.inistitute_text = ''
      this.degree_text = ''
      this.show_charactours = this.$route.params.q ? true : false
      this.show_companies = false
      this.show_categories = false
      this.results_count_charactours = 0
      this.results_count_companies = 0
      this.results_count_categories = 0
      this.has_trophy = ''
      this.has_authors = ''
      this.resultsMostSearchCharactour = []
      this.resultsMostSearchCompany = []
      this.resultsMostSearchCategories = []
      this.favoriteDegree = []
      this.favoriteInistitute = []
      this.favoriteCategory = []
      this.type = ''
      this.gender = ''
      this.getResults()
    },
    getSCategory() {
      this.http
        .get('/category/getCategoriesByCountry?code=' + this.code)
        .then(async (response) => {
          this.Scategorys = response.data.categories
        })
        .catch((error) => {})
    },
    setAge() {
      if (this.age == '') {
        this.agestart = ''
        this.ageend = ''
      }
      if (this.age == 1) {
        this.agestart = 1
        this.ageend = 20
      }
      if (this.age == 2) {
        this.agestart = 20
        this.ageend = 40
      }
      if (this.age == 3) {
        this.agestart = 40
        this.ageend = 60
      }
      if (this.age == 4) {
        this.agestart = 60
        this.ageend = 80
      }
      this.getResults()
    },
    getMoreResults(v) {
      this.skip = this.skip + v
      if (this.skip != 0) {
        this.prevResults = -5
      }
      if (this.skip == 0) {
        this.prevResults = 0
      }
      if (this.skip + 5 < this.resultsCount) {
        this.max = false
      }
      if (this.skip + 5 >= this.resultsCount) {
        this.max = true
      }
      this.http
        .get(
          '/advance_search_v2?q=' +
            this.text +
            '&type=' +
            this.type +
            '&has_trophy=' +
            this.has_trophy +
            '&has_authors=' +
            this.has_authors +
            '&gender=' +
            this.gender +
            '&agestart=' +
            this.agestart +
            '&ageend=' +
            this.ageend +
            '&rel_education_inistitute=' +
            this.filterInistituteArray +
            '&category=' +
            this.filterCategoryArray +
            '&rel_education_degree=' +
            this.filterDegreeArray +
            '&country_of_residence=' +
            this.country.id +
            '&is_alive=' +
            this.is_alive +
            '&nationality=' +
            this.countryCompnay.id +
            '&countries=' +
            this.countryCompnay.id +
            '&skip=' +
            this.skip
        )
        .then(async (response) => {
          if (response.data != '401 - You have used incorrect or expired token') {
            this.resultsCompany = response.data.result
              ? response.data.result.filter((item) => {
                  return item.type == 'company'
                })
              : null
            this.resultsCharactour = response.data.result
              ? response.data.result.filter((item) => {
                  return item.type == 'person'
                })
              : null
            this.resultsCategory = response.data.result
              ? response.data.result.filter((item) => {
                  return item.type == 'category'
                })
              : null
            this.resultsCount = response.data.totalDocuments
            this.results_count_charactours = response.data.total_for_person
            this.results_count_companies = response.data.total_for_company
            this.results_count_categories = response.data.total_for_category
            this.total_for_male = response.data.total_for_male
            this.total_for_female = response.data.total_for_female
          }
          window.scrollTo(0, 100)
        })
        .catch((error) => {
          this.resultsCharactour = []
        })
    },
    reset() {
      this.noResult = false
      this.text = ''
    },
    hides() {
      this.showhistory = false
    },
    getCatResults(word) {
      this.http
        .get(
          '/category/search_categories_subcategories_lableb?q=' +
            word +
            '&type=' +
            this.type +
            '&category_type=' +
            this.category_type
        )
        .then(async (response) => {
          if (response.data != '401 - You have used incorrect or expired token') {
            this.category = response.data.suggestions
          }
        })
        .catch((error) => {
          this.category = null
        })
    },
    educationInistitute(word) {
      this.http
        .get('/charactour/search_education_inistitute_lableb?q=' + word + '&limit=5&skip=0')
        .then(async (response) => {
          if (response.data != '401 - You have used incorrect or expired token') {
            this.inistitute = response.data.suggestions
          }
        })
    },
    educationDegree(word) {
      this.http
        .get('/charactour/search_education_degree_lableb?q=' + word + '&limit=5&skip=0')
        .then(async (response) => {
          if (response.data != '401 - You have used incorrect or expired token') {
            this.degree = response.data.suggestions
          }
        })
    },
    getResults() {
      if (this.text) {
        if (this.selectSearch == 1) this.type = 'person'
        if (this.selectSearch == 2) this.type = 'company'
        if (this.selectSearch == 3) this.type = 'category'
        this.http
          .get(
            '/advance_search_v2?q=' +
              this.text +
              '&type=' +
              this.type +
              '&has_trophy=' +
              this.has_trophy +
              '&has_authors=' +
              this.has_authors +
              '&gender=' +
              this.gender +
              '&agestart=' +
              this.agestart +
              '&ageend=' +
              this.ageend +
              '&rel_education_inistitute=' +
              this.filterInistituteArray +
              '&category=' +
              this.filterCategoryArray +
              '&rel_education_degree=' +
              this.filterDegreeArray +
              '&country_of_residence=' +
              this.country.id +
              '&is_alive=' +
              this.is_alive +
              '&nationality=' +
              this.nationality.id +
              '&countries=' +
              this.countryCompnay.id
          )
          .then(async (response) => {
            if (response.data != '401 - You have used incorrect or expired token') {
              this.resultsCompany = response.data.result
                ? response.data.result.filter((item) => {
                    return item.type == 'company'
                  })
                : null
              this.resultsCharactour = response.data.result
                ? response.data.result.filter((item) => {
                    return item.type == 'person'
                  })
                : null
              this.resultsCategory = response.data.result
                ? response.data.result.filter((item) => {
                    return item.type == 'category'
                  })
                : null
              this.resultsCount = response.data.totalDocuments
              this.results_count_charactours = response.data.total_for_person
              this.results_count_companies = response.data.total_for_company
              this.results_count_categories = response.data.total_for_category
              this.total_for_male = response.data.total_for_male
              this.total_for_female = response.data.total_for_female
            }
            setTimeout(() => {
              this.resultsCompany || this.resultsCharactour ? (this.noResult = true) : (this.noResult = false)
            }, 4000)
          })
      }
    },
    checkAllCharactour() {
      try {
        if (this.allCharactour.length) {
          return false
        }
      } catch (error) {
        return true
      }
      return true
    },
    checkAllCharactourMore() {
      try {
        if (this.allCharactour.length > 9) {
          return true
        }
      } catch (error) {
        return false
      }
      return false
    },
    checkAllCompany() {
      try {
        if (this.categorys.length) {
          return false
        }
      } catch (error) {
        return true
      }
      return true
    },
    checkAllCompanyMore() {
      try {
        if (this.categorys.length > 9) {
          return true
        }
      } catch (error) {
        return false
      }
      return false
    },
    onChange(event) {
      var data = event.target.value
      var index = this.filterCategoryArray.indexOf(data)
      if (index !== -1) {
        this.filterCategoryArray.splice(index, 1)
      } else {
        this.filterCategoryArray.unshift(data)
      }
      this.getResults()
    },
    onChangeS(event, cat) {
      var data = event.target.value
      var index = this.filterCategoryArray.indexOf(data)
      if (index !== -1) {
        this.filterCategoryArray.splice(index, 1)
      } else {
        this.filterCategoryArray.unshift(data)
      }
      if (!this.category.includes(cat)) {
        this.category.unshift(cat)
      }
      if (!this.favoriteCategory.includes(cat)) {
        this.favoriteCategory.unshift(cat)
      }
      var index1 = this.category.indexOf(cat)
      if (index1 !== -1) {
        this.category.splice(index1, 1)
      }

      this.getResults()
    },
    onChangeInistitute(event) {
      var data = event.target.value
      var index = this.filterInistituteArray.indexOf(data)
      if (index !== -1) {
        this.filterInistituteArray.splice(index, 1)
      } else {
        this.filterInistituteArray.unshift(data)
      }
      this.getResults()
    },
    onChangeSInistitute(event, cat) {
      var data = event.target.value
      var index = this.filterInistituteArray.indexOf(data)
      if (index !== -1) {
        this.filterInistituteArray.splice(index, 1)
      } else {
        this.filterInistituteArray.unshift(data)
      }
      if (!this.inistitute.includes(cat)) {
        this.inistitute.unshift(cat)
      }
      if (!this.favoriteInistitute.includes(cat)) {
        this.favoriteInistitute.unshift(cat)
      }
      var index1 = this.inistitute.indexOf(cat)
      if (index1 !== -1) {
        this.inistitute.splice(index1, 1)
      }

      this.getResults()
    },
    onChangeDegree(event) {
      var data = event.target.value
      var index = this.filterDegreeArray.indexOf(data)
      if (index !== -1) {
        this.filterDegreeArray.splice(index, 1)
      } else {
        this.filterDegreeArray.unshift(data)
      }
      this.getResults()
    },
    getcountry() {
      this.httpMg.get('/countries').then(async (response) => {
        this.countries = response.data.countries
      })
    },
    getMostSearchResults() {
      this.http
        .get(
          '/most_search?characters=1&companies=1&categories=1&skip=0'
        )
        .then(async (response) => {
          this.resultsMostSearchCharactour = response.data.characters
          this.resultsMostSearchCompany = response.data.companies
          this.resultsMostSearchCategories = response.data.categories
        })
    },
    getFilterSearch(typeFilter = 'character') {
      this.http
        .get('/search_filters?type=' + typeFilter, { headers: { Authorization: `Bearer ${this.$store.state.token}` } })
        .then(async (response) => {
          this.allow_filter = []
          response.data.filters.forEach((item, index) => {
            this.allow_filter.push(item.name)
          })
          response.data.important_institute.forEach((item) => {
            this.allow_filterImportantInstitute.push(item.name)
          })

          this.favoriteCategory = response.data.important_categories
          this.favoriteInistitute = response.data.important_institute
          this.favoriteDegree = response.data.education_degree
        })
    },
  },
  created() {
    this.getResults(this.$route.params.q)
    this.getMostSearchResults()
    this.getcountry()
    this.getFilterSearch()
    this.getSCategory()
  },
  directives: {
    ClickOutside,
  },
}
</script>
<style scoped>
/* jaafar */

.modal-header-text {
  margin-right: -2.5rem;
  font-weight: 700;
  font-size: 20px;
}
.disabled-bg {
  background: #f8f8f8 !important;
}
.mark-for-override.form-check-input:disabled ~ .mark-for-override.form-check-label,
.mark-for-override.form-check-input[disabled] ~ .mark-for-override.form-check-label {
  font-weight: 500 !important;
  font-size: 16px !important;
  color: #828282 !important;
  opacity: 1;
}
.form-select.country-selects {
  padding-right: 0.8rem;
}
.text-disabled {
  font-weight: 500;
  font-size: 16px;
  color: #828282;
}
.text-disabled-content {
  font-weight: 500;
  font-size: 16px;
  color: #c1c1c1 !important;
}
.margin-top-neg {
  margin-top: -6px;
}
/*  */
.shados {
  box-shadow: 0px 0px 24px rgba(0, 0, 0, 0.05);
  border-radius: 12px;
}

.border {
  border-color: #f2f2f2 !important;
}

.p-c {
  top: 8px;
  right: 8px;
}

.accordion-button:not(.collapsed)::after {
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='%23212529'%3e%3cpath fill-rule='evenodd' d='M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z'/%3e%3c/svg%3e");
}

.accordion-button:not(.collapsed) {
  /* color: #3b5fcc; */
  /* background-color: #ecf0fc; */
  box-shadow: unset;
}
.bg-adv {
  background-color: #e5e5e50d;
}
.accordion-button:focus {
  z-index: 3;
  border-color: none;
  outline: 0;
  box-shadow: none;
}
h2 {
  height: 55px;
}
.end-0-c {
  right: 10px !important;
}
.input-f {
  height: 43px;
  padding-right: 35px;
}

.form-check-input-green:checked {
  background-color: #54e592;
  border: none;
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='-4 -4 8 8'%3e%3ccircle r='3' fill='white'/%3e%3c/svg%3e") !important;
}
.form-check-input-green:focus {
  border-color: rgb(191, 191, 191);
}
.form-switch .form-check-input {
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='-4 -4 8 8'%3e%3ccircle r='3' fill='rgba%280, 0, 0, 0.25%29'/%3e%3c/svg%3e");
}

.ui.selection.dropdown {
  background: #f8f8f8;
  box-shadow: none;
  border-radius: 10px !important;
  border: none;
}
.form-select > i {
  display: none;
}
.ui.fluid.dropdown {
  display: block;
  width: 74%;
  min-width: 0;
}
</style>

<style scoped>
@media screen and (max-width: 521px) {
  .text-center-m {
    justify-content: center;
    text-align: center;
  }
}
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

.router-link-exact-active,
.router-link-active {
  color: #20211f !important;
}
.bg-adv {
  background-color: #e5e5e50d;
}
</style>
