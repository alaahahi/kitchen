<template>
  <div>
    <div>
      <div>
        <breadcrumb :center="true" :data="breadcrumbLsit" />
        <!-- <section class="Discover my-5">
                    <discover :isHome=true />
                </section> -->
        <h3 class="text-center fw-bold py-2">التصنيفات الرئيسية</h3>
        <h5 class="text-center pt-3 text-black-80">يمكنك اكتشاف العديد من التصنيفات</h5>
      </div>
    </div>
    <div class="container" ref="mainCategory">
      <div class="row">
        <div v-for="(category, index) in categorys" :key="index" class="col-md-3 mt-4 p-3" style="height: auto">
          <router-link :to="'/' + category.slug + '/'" class="card position-relative bg-category h-100">
            <img v-if="!category.image" src="/web-asset/img/noResultC.png" alt="category image" />
            <img v-if="category.image" :src="category.image" alt="category image" />
            <div class="card-body text-end position-absolute bottom-0 end-0 text-white">
              <h2 class="card-title fw-bold fs-4">{{ category.name }}</h2>
              <p class="text-decoration-none text-white fs-5">{{ category.description }}</p>
            </div>
          </router-link>
        </div>
        <div>
          <div class="d-flex justify-content-center text-center w-auto mx-auto my-4">
            <button
              @click="getCategory(prev - 24)"
              class="btn btn-primary py-2 mx-2"
              :class="!prev || prev == '0' ? 'disabled' : ''"
            >
              <i class="fa-solid fa-arrow-right mx-2"></i> السابق
            </button>

            <button
              @click="getCategory(next)"
              class="btn btn-primary py-2 mx-2"
              :class="categorys.length <= 23 ? 'disabled' : ''"
            >
              التالي<i class="fa-solid fa-arrow-left mx-2"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
    <!--
              <div >
              <h3 class="text-center fw-bold  pt-5">التصنيفات المختاره</h3>
              <div class="container">
              <div class="row">
               <div v-for="(category,index) in categorysSelected" :key=index class="col-md-3 mt-4" >
                    <router-link :to="{ name: 'categoriesInfo', params: {category_id:category.id,name:category.name  }}" class="card  position-relative bg-category h-100">
                    <img v-if="!category.image"  src="/web-asset/img/noResultC.png"  alt="category image">
                    <img v-if="category.image"  :src=category.image  alt="category image">
                    <div class="card-body text-center position-absolute bottom-0 end-0 text-white w-100">
                        <h2 class="card-title  fw-bold fs-4">{{category.name}}</h2>
                    </div>
                    </router-link>
                </div>
              <div class="text-center my-4">
              <button @click="getCategorySelectedmore()"  class="btn btn-primary  py-2" :class="disabledSelected ? 'disabled' : '' "><i class="fa-solid fa-rotate"  :class="{ 'fa-spin': loadingMoreSelected}" :disabled="disabled ? 'disabled' :'' "></i> عرض الكل </button>
              </div>
              </div>
              </div>
              </div> -->
  </div>
</template>
<script>

import breadcrumb from '../pages/accessories/breadcrumb.vue'

import resultsSearch from '../pages/accessories/resultsSearch.vue'
import closeSearch from '../pages/accessories/svg/closeSearch.vue'

export default {
  metaInfo: {
    title: 'التصنيفات | من هم؟',
  },
  components: {
    breadcrumb,
    closeSearch
  },
  data() {
    return {
      next: 0,
      prev: 0,
      is_mounted: false,
      disabled: true,
      categorys: [],
      categorysSelected: [],
      more: 8,
      moreSelected: 8,
      disabledSelected: true,
      loadingMore: false,
      loadingMoreSelected: false,
      allcategory: {},
      allcategorySelected: {},
      breadcrumbLsit: [
        {
          name: 'الرئيسية',
          link: '/',
        },
        {
          name: 'التصنيفات',
          link: '/categories',
        },
      ],
      showhistory: false,
      text: '',
      selectSearch: 4,
      isTyping: false,
      resultsCompany: [],
      resultsCharactour: [],
    }
  },
  methods: {
    goto(refName) {
      var element = this.$refs[refName]
      var top = element.offsetTop - 50
      window.scrollTo(0, top)
    },
    getCategory(skip = 0) {
      this.http.get('/categories?type=character&skip=' + skip).then(async (response) => {
        this.categorys = response.data.items
        this.prev = skip
        this.next = skip + 24
        this.goto('mainCategory')
        try {
        } catch (error) {}
      })
    },

    getCategorySelected() {
      this.loadingMoreSelected = true
      this.http
        .get('/category/getCategoriesByCountry?code=' + this.$store.state.countryFilter.toLowerCase())
        .then(async (response) => {
          this.allcategorySelected = response.data.categories
          this.categorysSelected = this.allcategorySelected.slice(0, this.more)
          this.loadingMoreSelected = false
          if (response.data.length > 6) {
            this.disabledSelected = false
          }
        })
    },
    getCategorySelectedmore() {
      this.moreSelected = this.moreSelected + 8
      this.categorysSelected = this.allcategorySelected.slice(0, this.moreSelected)
    },
    hides() {
      this.showhistory = false
    },
    getAdv() {
      this.$router.push({ name: 'advancedSearchPage', params: { q: this.text,selectSearch: this.text && this.selectSearch == 4 ? 1 : this.selectSearch} })
    },
    push(selectSearch) {
      // console.log('selectSearch value',selectSearch)
      this.selectSearch = selectSearch;
    },
  },

  created() {
    this.is_mounted = true
    this.getCategory()
    //this.getCategorySelected()
  },
}
</script>
<style scoped>

@media screen and (max-width: 1200px) {
  .j-margin-top-negative-descover {
    padding-top: 5px;
    margin-top: -24px;
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

.fix-primary {
  background: #4169E3 !important ;

  color: #fff !important;
}
</style>
