<template>
  <div>
    <div style="background-image: url('web-asset/img/path104.png')">
      <div style="background-color: rgb(255 255 255 / 80%)">
        <breadcrumb :data="breadcrumbLsit" />
        <h3 class="text-center fw-bold py-2">المؤسسات</h3>
        <h5 class="text-center pt-3 text-black-80">ابحث عن الشخصيات أو المؤسسات في جميع الوطن العربي</h5>
        <section class="Discover my-5">
          <discover :isHome="true" />
        </section>
        <h3 class="text-center fw-bold py-2">جميع المؤسسات في من هم</h3>
      </div>
    </div>
    <div class="container">
      <div class="row">
        <div v-for="(company, index) in categorys" :key="index" class="col-md-3 mt-4" style="min-height: 270px">
          <a :href="'/شركات/' + decodeURI(company.slug) + '/'" class="card position-relative bg-category h-100">
            <!-- <img
              v-if="!company.image"
              src="/web-asset/img/company-logo.png"
              alt="company image"
              style="overflow: auto; object-fit: none"
            /> -->
            <appImage
              v-if="!company.image"
              alt="company image"
              :lazySrc="'/web-asset/img/company-logo.png'"
              :lazySrcset="'/web-asset/img/company-logo.png'"
            />
            <!-- <img
              v-if="company.image"
              class="rounded-btn-img w-100"
              src="/web-asset/img/company-logo.png"
              alt="carousel"
              :data-src="company.image"
              data-err="/web-asset/img/company-logo.png"
              style="overflow: auto; object-fit: none"
            /> -->
            <!-- <appImage
              v-if="company.image"
              class="rounded-btn-img w-100"
              alt="carousel"
              :lazySrc="'/web-asset/img/company-logo.png'"
              :lazySrcset="'/web-asset/img/company-logo.png'"
            /> -->
            <!-- <img
              v-if="company.image"
              :src="company.image"
              alt="company image"
              style="overflow: auto; object-fit: none"
            /> -->
            <appImage
              v-if="company.image"
              class="rounded-btn-img w-100"
              alt="company image"
              :lazySrc="company.image"
              :lazySrcset="company.image"
            />
            <div class="card-body text-end position-absolute bottom-0 end-0 text-white">
              <h2 class="card-title fs-5 fw-bold">{{ company.nameAR }}</h2>
              <a :href="'/شركات/' + decodeURI(company.slug) + '/'" class="text-decoration-none text-white fw-bold">{{
                company.positions | formatPositions | truncate(50, '...')
              }}</a>
            </div>
          </a>
        </div>
        <div class="text-center my-4">
          <button @click="getCategorymore()" class="btn btn-primary py-2" :class="disabled ? 'disabled' : ''">
            <i class="fa-solid fa-rotate" :class="{ 'fa-spin': loadingMore }"></i> عرض الكل
          </button>
        </div>
      </div>
    </div>
    <div></div>
    <a href="#" class="float bg-primary">
      <i class="fa-solid fa-chevron-up fa-xl my-float"></i>
    </a>
  </div>
</template>
<script>
import discover from '../home/discover.vue'
import breadcrumb from '../pages/accessories/breadcrumb.vue'
import appImage from '../pages/accessories/appImage.vue'

export default {
  components: {
    breadcrumb,
    discover,
    appImage
  },
  data() {
    return {
      disabled: true,
      categorys: [],
      categorysSelected: [],
      more: 0,
      disabledSelected: true,
      loadingMore: false,
      allcategory: {},
      allcategorySelected: {},
      breadcrumbLsit: [
        {
          name: 'الرئيسية',
          link: '/',
        },
        {
          name: 'جميع المؤسسات',
          link: { path: '/%D8%AC%D9%85%D9%8A%D8%B9-%D8%A7%D9%84%D8%B4%D8%B1%D9%83%D8%A7%D8%AA' },
        },
      ],
    }
  },
  methods: {
    getCategory() {
      this.loadingMore = true
      this.http.get('/company').then(async (response) => {
        this.categorys = response.data.items
        this.loadingMore = false
        if (response.data.items.length > 6) {
          this.disabled = false
        }
      })
    },
    getCategorymore() {
      this.loadingMore = true
      this.more = this.more + 10
      this.http.get('/company?skip=' + this.more).then(async (response) => {
        //this.allcategory=response.data
        this.categorys = [...this.categorys, ...response.data.items]
        this.loadingMore = false
      })
    },
  },
  filters: {
    formatPositions: function (value) {
      if (!value) return ''
      if (value) {
        try {
          value = JSON.parse(value)[0]
            .postion.trim()
            .replace(/u([0-9A-F]{0,4})/g, '&#x$1')
        } catch (error) {
          return ''
        }
        return value
      }
    },
  },

  created() {
    this.getCategory()
    // this.getCategorySelected()
  },
}
</script>

<style scoped>
.bg-category > img {
  max-width:200px;
  margin: auto;
}
</style>
