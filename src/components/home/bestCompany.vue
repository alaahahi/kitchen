<template>
  <section class="characters-you-follow" v-if="companies">
    <div class="container text-center" v-bind="getCompanies(companies)">
      <h1 class="pb-3 pt-5 fw-bold" v-resize-text="{ ratio: 1.5, minFontSize: '24px', maxFontSize: '32px' }">
        المؤسسات الأكثر زيارة الآن
      </h1>
      <!-- <h1 class="display-4 fs-4 py-4 text-black-80 "> إستكشف أكثر المؤسسات انتشارا ً ... الشخصيات العاملة بها </h1> -->
    </div>
    <div class="container pt-3" v-if="companys1.length > 0">
      <div class="row justify-content-center m-auto">
        <div
          v-for="(company, i) in companys1"
          :index="i"
          :key="i"
        
          class="w-20-home mt-3"
        >

          <a :href="'/شركات/' + decodeURI(company.slug) + '/'" class="w-100 align-middle align-self-center">
            <div class="card m-1 rounded-btn-img pt-2 ps-3 pe-3 card-home">
            <div class="text-center  p-1 rounded-btn-img">
            <!-- <img v-if="company.image" class="rounded w-50" :src="company.image" alt="Companylogo"> -->
            <!-- <img v-if="!company.image" class="rounded w-50" src="/web-asset/img/noResultC.png" alt="Companylogo"> -->
            <appImageHome
              v-if="company.image"
              class="rounded"
              alt="Companylogo"
              :lazySrc="company.image"
              :lazySrcset="company.image"
           
            />



            <appImageHome
              v-if="!company.image"
              class="rounded"
              alt="Companylogo"
              :lazySrc="'/web-asset/img/noResultC.png'"
              :lazySrcset="'/web-asset/img/noResultC.png'"
            />

            </div>
            <div class="text-center pt-4 pb-1">
              <h3 class="card-title company-text-home ">{{ company.nameAR }}</h3>
            </div>
          </div>
          </a>
        </div>
      </div>
    </div>

    <div class="w-100 text-center pb-5 mt-4" v-if="companys">
      <router-link :to="{ name: 'allCompanyPage' }" class="btn btn-primary mt-3 px-3 py-2 mb-4 btn-size fw-bold">
        عرض الكل
      </router-link>
    </div>
  </section>
</template>
<script>
import { Hooper, Slide, Navigation as HooperNavigation } from 'hooper'
import VueSkeletonLoader from 'skeleton-loader-vue'
import hooperCharactoure from '../pages/accessories/hooperCharactoure.vue'
import appImageHome from '../pages/accessories/appImageHome.vue'
import appPicture from '../pages/accessories/appPicture.vue'

export default {
  props: ['companies'],
  components: {
    Hooper,
    Slide,
    HooperNavigation,
    VueSkeletonLoader,
    appImageHome,
    appPicture,
  },
  data() {
    return {
      code: this.$route.meta.code
        ? this.$route.meta.code
        : this.$store.state.langFilter
        ? this.$store.state.langFilter.toLowerCase()
        : 'ae',
      loading: true,
      disabled: true,
      companys: {},
      companys1: [],
      active: 0,
    }
  },

  methods: {
    getCompanies(v) {
      this.companys = v
      this.companys1 = this.companys.slice(0, 10)
      this.loading = false
    },
  },
}
</script>
<style scoped>
.activeBtn {
  background-color: #4B91F1 !important;
}

.carousel-indicators {
  position: relative;
  margin: 0;
}

.carousel-indicators [data-bs-target] {
  background-color: #c4c4c4;
  width: 10px;
  height: 10px;
  border: none;
  margin: 0 5px;
  opacity: 1;
}

.carousel-indicators [data-bs-target].activeBtn {
  background-color: #d4b370 !important;
  transform: scale(1.5);
}

.myBox {
  text-align: center;
  border-bottom: 2px solid transparent;
  border-image: linear-gradient(0.25turn, #fff, #d7d7d7, rgba(56, 2, 155, 0));
  border-image-slice: 1;
  width: 80%;
}

.z {
  border-width: 1px;
  border-style: solid;
  border-image: linear-gradient(to top, #d7d7d7, rgba(0, 0, 0, 0)) 1 100%;
}

.m {
  border-width: 1px;
  border-style: solid;
  border-image: linear-gradient(to top, #d7d7d7, #d7d7d7) 1 100%;
}

.d {
  border-width: 1px;
  border-style: solid;
  border-image: linear-gradient(to bottom, #d7d7d7, rgba(0, 0, 0, 0)) 1 100%;
}

.zm {
  border-width: 1px;
  border-style: solid;
  border-image: linear-gradient(to top, #d7d7d7, rgba(0, 0, 0, 0)) 1 100%;
}

.mm {
  border-width: 1px;
  border-style: solid;
  border-image: linear-gradient(to top, #d7d7d7, #d7d7d7) 1 100%;
}

.dm {
  border-width: 1px;
  border-style: solid;
  border-image: linear-gradient(to bottom, #d7d7d7, rgba(0, 0, 0, 0)) 1 100%;
}

.z:nth-child(1) {
  border: none;
}

.z:nth-child(5) {
  border: none;
}

.d:nth-child(1) {
  border: none;
}

.d:nth-child(5) {
  border: none;
}

.m:nth-child(1) {
  border: none;
}

.m:nth-child(5) {
  border: none;
}

.zm:nth-child(1) {
  border: none;
}

.zm:nth-child(3) {
  border: none;
}

.dm:nth-child(1) {
  border: none;
}

.dm:nth-child(3) {
  border: none;
}

.mm:nth-child(1) {
  border: none;
}

.mm:nth-child(3) {
  border: none;
}
</style>
