<template>
  <div>
    <div>
      <div style="background-color: rgb(255 255 255 / 80%)">
        <breadcrumb :data="breadcrumbLsit" />
        <h3 class="text-center fw-bold py-2">{{ company.nameAR }}</h3>
        <h5 class="text-center pt-3 text-black-80">ابحث عن الشخصيات أو المؤسسات في جميع الوطن العربي</h5>
        <section class="Discover my-5">
          <discover :isHome="true" />
        </section>
        <h3 class="text-center fw-bold py-2" v-if="type == 'شخصيات-ذات-صلة'">
          شخصيات ذات صلة بمؤسسة {{ company.nameAR }}
        </h3>
        <h3 class="text-center fw-bold py-2" v-if="type == 'رؤساء-مجلس-الإدارة'">
          أعضاء محلس إدارة {{ company.nameAR }}
        </h3>
        <h3 class="text-center fw-bold py-2" v-if="type == 'الأعضاء-التنفيذيين'">
          الأعضاء التنفيذيين g{{ company.nameAR }}
        </h3>
        <h3 class="text-center fw-bold py-2" v-if="type == 'شخصيات-يعملون'">شخصيات يعملون في {{ company.company_object.name }}</h3>
        <h3 class="text-center fw-bold py-2" v-if="type == 'شخصيات-عملو'">
          شخصيات عملو سابقاً في {{  company.company_object.name  }}
        </h3>
        <h3 class="text-center fw-bold py-2" v-if="type == 'الصور'">جميع الصور {{ company.nameAR }}</h3>
      </div>
    </div>

    <div class="container" v-if="type == 'الصور'">
      <div class="row">
        <div class="col-lg-3 col-md-4 col-sm-6 ps-4 my-2" v-for="(photo, index) in image_gallery" :key="index"
          type="button" data-bs-toggle="modal" data-bs-target="#exampleModal1" :data-bs-slide-to="index">
          <div class="pb-3 ps-2 position-relative" style="width: 100%">
            <div class="pe-0 imageGaDiv">
              <img :src="photo.image" alt="Companylogo" class="rounded-btn-img border galImg"/>
            </div>
            <button type="button" data-bs-target="#carouselExampleCaptions" :data-bs-slide-to="index"
              class="position-absolute pb-3 ps-2 rounded-btn-img btngallery" ></button>
            <div class="position-absolute g-image-text">
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="16" cy="16" r="16" fill="#4169E3" />
                <g clip-path="url(#clip0_3222_7294)">
                  <path
                    d="M25.4 22.6L22.6 19.8C23.5 18.4 24 16.8 24 15C24 10 20 6 15 6C10 6 6 10 6 15C6 20 10 24 15 24C16.8 24 18.4 23.5 19.8 22.6L22.6 25.4C23.4 26.2 24.6 26.2 25.4 25.4C26.2 24.6 26.2 23.4 25.4 22.6ZM15 22C11.1 22 8 18.9 8 15C8 11.1 11.1 8 15 8C18.9 8 22 11.1 22 15C22 18.9 18.8 22 15 22Z"
                    fill="white" />
                  <path
                    d="M19 14H16V11C16 10.4 15.6 10 15 10C14.4 10 14 10.5 14 11V14H11C10.5 14 10 14.4 10 15C10 15.6 10.4 16 11 16H14V19C14 19.6 14.4 20 15 20C15.6 20 16 19.6 16 19V16H19C19.6 16 20 15.6 20 15C20 14.4 19.5 14 19 14Z"
                    fill="white" />
                </g>
                <defs>
                  <clipPath id="clip0_3222_7294">
                    <rect width="20" height="20" fill="white" transform="translate(6 6)" />
                  </clipPath>
                </defs>
              </svg>
              <br />
              <div class="pt-1 pe-4" style="position:absolute;bottom 20px;">
                {{ photo.description }}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="modal fade" id="exampleModal1" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog modal-lg modal-dialog-centered" role="document">
          <div class="modal-content">
            <div class="modal-header" style="height: 0; padding: 4px">
              <i data-bs-dismiss="modal" aria-label="Close" ref="closebtnpssword"><svg style="
                    border-radius: 50%;
                  position: relative;
                    top: -8px;
                    width: 31px;
                    right: -22px;
                    background: rgb(255, 255, 255);
                    padding: 3px;
                  " viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd"
                    d="M15.9992 28.8002C23.0685 28.8002 28.7992 23.0694 28.7992 16.0002C28.7992 8.93095 23.0685 3.2002 15.9992 3.2002C8.92997 3.2002 3.19922 8.93095 3.19922 16.0002C3.19922 23.0694 8.92997 28.8002 15.9992 28.8002ZM13.9306 11.6688C13.3058 11.044 12.2927 11.044 11.6678 11.6688C11.043 12.2937 11.043 13.3067 11.6678 13.9316L13.7365 16.0002L11.6678 18.0688C11.043 18.6937 11.043 19.7067 11.6678 20.3316C12.2927 20.9564 13.3058 20.9564 13.9306 20.3316L15.9992 18.2629L18.0678 20.3316C18.6927 20.9564 19.7057 20.9564 20.3306 20.3316C20.9554 19.7067 20.9554 18.6937 20.3306 18.0688L18.262 16.0002L20.3306 13.9316C20.9554 13.3067 20.9554 12.2937 20.3306 11.6688C19.7057 11.044 18.6927 11.044 18.0678 11.6688L15.9992 13.7375L13.9306 11.6688Z"
                    fill="#20211F" />
                </svg></i>
            </div>

            <div class="modal-body pt-0">
              <div id="carouselExampleCaptions" class="carousel slide" data-bs-ride="carousel">
                <div class="row p-2">
                  <div class="col-md-8 col-12">
                    <div class="col-12 d-flex justify-content-between mb-2">
                      <h2 class="fw-bold fs-5 my-3">
                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path
                            d="M1 13L5.58579 8.41421C6.36683 7.63317 7.63316 7.63316 8.41421 8.41421L13 13M11 11L12.5858 9.41421C13.3668 8.63317 14.6332 8.63316 15.4142 9.41421L17 11M11 5H11.01M3 17H15C16.1046 17 17 16.1046 17 15V3C17 1.89543 16.1046 1 15 1H3C1.89543 1 1 1.89543 1 3V15C1 16.1046 1.89543 17 3 17Z"
                            stroke="#4169E3" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>

                        معرض الصور
                      </h2>
                      <div class="d-inline-flex"></div>
                    </div>
                    <div class="carousel-inner position-relative" style="height: 600px !important">
                      <div v-for="(photo, index) in image_gallery" :key="index" class="carousel-item h-100"
                        :class="index == 0 ? 'active' : ''" style="padding-bottom: 20px">
                        <img :src="photo.image" alt="Companylogo" class="w-100 rounded-btn-img border h-100"
                          style="object-fit: contain; max-height: 550px" />
                        <div class="pt-2 pe-4" style="position:absolute;bottom 20px;">
                          <h5 class="text-black fs-16">{{ photo.description }}</h5>
                        </div>
                      </div>

                      <button class="carousel-control-prev btn rounded-circle btn-size m-1 p-0 btn-light border nav-btn"
                        type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev"
                        style="color: #000; top: 46%; background: #fff; height: 45px; width: 45px">
                        <i class="fa-solid fa-angle-left"></i>

                        <span class="visually-hidden">Previous</span>
                      </button>
                      <button class="carousel-control-next btn rounded-circle btn-size m-1 p-0 btn-light border nav-btn"
                        type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next"
                        style="color: #000; top: 46%; background: #fff; height: 45px; width: 45px">
                        <i class="fa-solid fa-angle-right"></i>
                        <span class="visually-hidden">Next</span>
                      </button>
                      <div class="position-absolute">
                        <button type="button"
                          class="carousel-control-prev btn rounded-circle btn-size m-1 p-0 btn-light border nav-btn">
                          1/4
                        </button>
                      </div>
                    </div>
                  </div>
                  <div class="col-md-4 d-md-block d-none mt-3">
                    <div class="row p-0">
                      <div class="col-6 p-0" v-for="(photo, index) in image_gallery" :key="index"
                        style="height: 85px">
                        <button type="button" data-bs-target="#carouselExampleCaptions"
                          data-bs-slide-to="<?= $SIndex; ?>" class="active w-100 h-100 py-1" aria-current="true"
                          aria-label="Slide 1" style="margin-bottom: 10px; border: none; background: #fff">
                          <img :src="photo.image" alt="Companylogo" class="w-100 h-100 rounded-btn-img border"
                            style="object-fit: cover" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="container" v-if="type == 'شخصيات-ذات-صلة'">
      <div class="row">
        <div v-for="(charactour, index) in company.relatedCharacters" :index="index" :key="index"
          class="col-lg-3 col-md-4 col-sm-6 ps-4 my-2">
          <div class="card shadow m-3 rounded-btn-img pt-3 ps-3 pe-3">
            <div class="position-relative p-1 rounded-btn-img" :class="charactour.vip_person ? 'bg-prim' : ''">
              <img v-if="charactour.image" class="rounded-btn-img w-100" :src="charactour.image" alt="carousel"
                style="min-height: 190px" />
              <img v-if="!charactour.image" class="rounded-btn-img w-100" src="/web-asset/img/noResul.jpg"
                alt="carousel" />
              <span v-if="charactour.isTrend"
                class="position-absolute start-0 badge rounded-pill bg-info p-1 px-3 fs-6 p-c"><i
                  class="ms-1 fa-solid fa-arrow-trend-up"></i> تريند
              </span>
              <div class="position-absolute top-100 start-50 translate-middle">
                <h5>
                  <span class="badge rounded-pill p-2 bg-prim"
                    :class="charactour.vip_person ? 'd-block' : 'd-none'"><img src="/web-asset/img/noun_premium.png"
                      alt="carousel" class="ps-1" style="width: 20px" />عضوية
                    ذهبية
                  </span>
                </h5>
              </div>
            </div>
            <div class="text-center pt-4" style="min-height: 135px">
              <h2 class="card-title fw-bold fs-4">{{ charactour.character_name_ar }}</h2>
              <a :href="'/شخصيات/' + decodeURI(charactour.slug) + '/'"
                class="stretched-link text-decoration-none text-muted fw-bold fs-16">{{ fixContent(charactour.content) |
                truncate(50, '..') }}</a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="container" v-if="type == 'رؤساء-مجلس-الإدارة'">
      <div class="row">
        <div v-for="(charactour, index) in fixCompanyRelRep(company.relations.relations.BoardDirector)" :index="index"
          :key="index" class="col-lg-3 col-md-4 col-sm-6 ps-4 my-2">
          <div class="card shadow m-3 rounded-btn-img pt-3 ps-3 pe-3">
            <div class="position-relative p-1 rounded-btn-img"
              :class="charactour.endNode.vip_person == 1 || charactour.endNode.vip_person == 1 ? 'bg-prim' : ''">
              <img v-if="charactour.endNode.image" class="rounded-btn-img w-100" :src="charactour.endNode.image"
                alt="carousel" style="min-height: 190px" />
              <img v-if="!charactour.endNode.image" class="rounded-btn-img w-100" src="/web-asset/img/noResul.jpg"
                alt="carousel" />
              <span v-if="charactour.endNode.isTrend"
                class="position-absolute start-0 badge rounded-pill bg-info p-1 px-3 fs-6 p-c"><i
                  class="ms-1 fa-solid fa-arrow-trend-up"></i> تريند
              </span>
              <div class="position-absolute top-100 start-50 translate-middle">
                <h5>
                  <span class="badge rounded-pill p-2 bg-prim" :class="
                    charactour.endNode.vip_person == 1 || charactour.endNode.vip_person == 1 ? 'd-block' : 'd-none'
                  "><img src="/web-asset/img/noun_premium.png" alt="carousel" class="ps-1"
                      style="width: 20px" />عضوية
                    ذهبية
                  </span>
                </h5>
              </div>
            </div>
            <div class="text-center pt-4" style="min-height: 135px">
              <h2 class="card-title fw-bold fs-4">{{ charactour.endNode.character_name_ar }}</h2>

              <a :href="'/شخصيات/' + decodeURI(charactour.endNode.slug) + '/'"
                class="stretched-link text-decoration-none text-muted fw-bold fs-16">{{
                fixContent(charactour.endNode.content) | truncate(50, '..') }}</a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="container" v-if="type == 'الأعضاء-التنفيذيين'">
      <div class="row">
        <div v-for="(charactour, index) in fixCompanyRelRep(company.relations.relations.ExecutiveManager)"
          :index="index" :key="index" class="col-lg-3 col-md-4 col-sm-6 ps-4 my-2">
          <div class="card shadow m-3 rounded-btn-img pt-3 ps-3 pe-3">
            <div class="position-relative p-1 rounded-btn-img"
              :class="charactour.endNode.vip_person == 1 || charactour.endNode.vip_person == 1 ? 'bg-prim' : ''">
              <img v-if="charactour.endNode.image" class="rounded-btn-img w-100" :src="charactour.endNode.image"
                alt="carousel" style="min-height: 190px" />
              <img v-if="!charactour.endNode.image" class="rounded-btn-img w-100" src="/web-asset/img/noResul.jpg"
                alt="carousel" />
              <span v-if="charactour.endNode.isTrend"
                class="position-absolute start-0 badge rounded-pill bg-info p-1 px-3 fs-6 p-c"><i
                  class="ms-1 fa-solid fa-arrow-trend-up"></i> تريند
              </span>
              <div class="position-absolute top-100 start-50 translate-middle">
                <h5>
                  <span class="badge rounded-pill p-2 bg-prim" :class="
                    charactour.endNode.vip_person == 1 || charactour.endNode.vip_person == 1 ? 'd-block' : 'd-none'
                  "><img src="/web-asset/img/noun_premium.png" alt="carousel" class="ps-1"
                      style="width: 20px" />عضوية
                    ذهبية
                  </span>
                </h5>
              </div>
            </div>
            <div class="text-center pt-4" style="min-height: 135px">
              <h2 class="card-title fw-bold fs-4">{{ charactour.endNode.character_name_ar }}</h2>

              <a :href="'/شخصيات/' + decodeURI(charactour.endNode.slug) + '/'"
                class="stretched-link text-decoration-none text-muted fw-bold fs-16">{{
                fixContent(charactour.endNode.content) | truncate(50, '..') }}</a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="container" v-if="type == 'شخصيات-يعملون'">
      <div class="row" v-if="company.relations">
        <div v-for="(charactour, index) in company.relations" :index="index" :key="index"
          class="col-lg-3 col-md-4 col-sm-6 ps-4 my-2">
          <div class="card shadow m-3 rounded-btn-img pt-3 ps-3 pe-3">
            <div class="position-relative p-1 rounded-btn-img"
              :class="charactour.vip_person == 1 || charactour.vip_person == 1 ? 'bg-prim' : ''">
              <img v-if="charactour.image" class="rounded-btn-img w-100" :src="charactour.image" alt="carousel"
                style="min-height: 190px" />
              <img v-if="!charactour.image" class="rounded-btn-img w-100" src="/web-asset/img/noResul.jpg"
                alt="carousel" />
              <span v-if="charactour.isTrend"
                class="position-absolute start-0 badge rounded-pill bg-info p-1 px-3 fs-6 p-c"><i
                  class="ms-1 fa-solid fa-arrow-trend-up"></i> تريند
              </span>
              <div class="position-absolute top-100 start-50 translate-middle">
                <h5>
                  <span class="badge rounded-pill p-2 bg-prim"
                    :class="charactour.vip_person == 1 || charactour.vip_person == 1 ? 'd-block' : 'd-none'"><img
                      src="/web-asset/img/noun_premium.png" alt="carousel" class="ps-1" style="width: 20px" />عضوية
                    ذهبية
                  </span>
                </h5>
              </div>
            </div>
            <div class="text-center pt-4" style="min-height: 135px">
              <h2 class="card-title fw-bold fs-4">{{ charactour.character_name_ar }}</h2>

              <a  :href="'/شخصيات/' + decodeURI(charactour.slug) + '/'"
                class="stretched-link text-decoration-none text-muted fw-bold fs-16">{{
                fixContentDescription(charactour.relation) | truncate(50, '..') }}</a>
            </div>
          </div>
        </div>
      </div>
      <div class="d-flex justify-content-center text-center w-auto mx-auto my-4">
        <paginator :prevResults="prevResults" :nextResults="nextResults" :skip="skip" :item_per_page="item_per_page"
          :count="company.total_worked_at" :total="company.total_worked_at"
          @getMoreResults_from_child="getMoreResults_from_child">
        </paginator>
      </div>
    </div>
    <div class="container" v-if="type == 'شخصيات-عملو'">
      <div class="row" v-if="company.relations">
        <div v-for="(charactour, index) in company.relations" :index="index"
          :key="index" class="col-lg-3 col-md-4 col-sm-6 ps-4 my-2">
          <div class="card shadow m-3 rounded-btn-img pt-3 ps-3 pe-3">
            <div class="position-relative p-1 rounded-btn-img"
              :class="charactour.vip_person == 1 || charactour.vip_person == 1 ? 'bg-prim' : ''">
              <img v-if="charactour.image" class="rounded-btn-img w-100" :src="charactour.image"
                alt="carousel" style="min-height: 190px" />
              <img v-if="!charactour.image" class="rounded-btn-img w-100" src="/web-asset/img/noResul.jpg"
                alt="carousel" />
              <span v-if="charactour.isTrend"
                class="position-absolute start-0 badge rounded-pill bg-info p-1 px-3 fs-6 p-c"><i
                  class="ms-1 fa-solid fa-arrow-trend-up"></i> تريند
              </span>
              <div class="position-absolute top-100 start-50 translate-middle">
                <h5>
                  <span class="badge rounded-pill p-2 bg-prim" :class="
                    charactour.vip_person == 1 || charactour.vip_person == 1 ? 'd-block' : 'd-none'
                  "><img src="/web-asset/img/noun_premium.png" alt="carousel" class="ps-1"
                      style="width: 20px" />عضوية
                    ذهبية
                  </span>
                </h5>
              </div>
            </div>
            <div class="text-center pt-4" style="min-height: 135px">
              <h2 class="card-title fw-bold fs-4">{{ charactour.character_name_ar }}</h2>
              <a :href="'/شخصيات/' + decodeURI(charactour.slug) + '/'"
                class="stretched-link text-decoration-none text-muted fw-bold fs-16">{{
                  fixContentDescription(charactour.relation) | truncate(50, '..') }}</a>
            </div>
          </div>
        </div>
      </div>
      <div class="d-flex justify-content-center text-center w-auto mx-auto my-4">
        <paginator :prevResults="prevResults" :nextResults="nextResults" :skip="skip" :item_per_page="item_per_page"
          :count="company.total_worked_at" :total="company.total_worked_at"
          @getMoreResults_from_child="getMoreResults_from_child">
        </paginator>
      </div>
    </div>
  </div>
</template>
<script>
import moment from 'moment'
import discover from '../home/discover.vue'
import breadcrumb from './accessories/breadcrumbLink.vue'
import paginator from './paginator.vue'

export default {
  metaInfo: {
    title: 'عرض الكل | من هم؟',
  },
  components: {
    breadcrumb,
    discover,
    paginator,
  },
  data() {
    return {
      item_per_page: 10,
      prevResults: 0,
      nextResults: 10,
      skip: 0,
      loading: true,
      id: this.$route.params.id,
      disabled: true,
      loading: true,
      type: this.$route.params.type,
      newsProfile: [],
      news: [],
      categorys: [],
      categorysSelected: [],
      more: 8,
      moreSelected: 8,
      disabledSelected: true,
      loadingMore: false,
      loadingMoreSelected: false,
      allcategory: {},
      allcategorySelected: {},
      charactour: {},
      company: this.$route.params.company ? this.$route.params.company : [],
      breadcrumbLsit: [],
      image_gallery :[]
    }
  },
  filters: {
    formatDate: function (value) {
      if (!value) return ''
      if (value) {
        return moment(String(value)).locale('ar-ly').format(' D  MMMM , YYYY')
      }
    },
  },
  methods: {
    goto() {
        window.scrollTo(0, top);
    },
     
    getMoreResults_from_child(v) {
      this.skip = this.skip + v
      if (this.skip != 0) {
        this.prevResults = this.item_per_page * -1
      }
      if (this.skip == 0) {
        this.prevResults = 0
      }
      if (this.skip + this.item_per_page < this.resultsCount) {
        this.max = false
      }
      if (this.skip + this.item_per_page >= this.resultsCount) {
        this.max = true
      }
      if (this.type == 'شخصيات-يعملون') {
        this.http
          .get('/company/worked_at?slug=' + this.id+ '&current_position=current' + '&skip=' + this.skip + '&limit=' + this.item_per_page)
          .then((response) => {
            this.company = response.data
            this. goto()
          })
      }
      if (this.type == 'شخصيات-عملو') {
        this.http
          .get('/company/worked_at?slug=' + this.id+ '&current_position=previous' + '&skip=' + this.skip + '&limit=' + this.item_per_page)
          .then((response) => {
            this.company = response.data
            this. goto()
          })
      }
    },
    fixContent(value) {
      try {
        if (value) {
          if (value.split('.\r')[0].length > value.split('.<')[0].length) {
            return value.split('.<')[0]
          } else return value.split('.\r')[0]
        }
      } catch (error) {
        return ''
      }
    },

    fixContentDescription(value){
      try {
        if (value.description) {
          return value.description
        }
        if(value.desc){
          return value.desc
        }
      } catch (error) {
        
      }
    },

    fixCompanyRelRep(arr) {
      try {
        return [...new Map(arr.map((item) => [item.endNode.slug, item])).values()]
      } catch (error) { }
    },

    async getCompany() {
      if (this.type == 'شخصيات-يعملون') {
        await this.http.get('/company/worked_at?slug=' + this.id + '&current_position=current').then((response) => {
          this.company = response.data
          this.breadcrumbLsit = [
            {
              name: 'الرئيسية',
              link: '/',
            },
            {
              name: this.company.company_object.name,
              link: '/' + encodeURI('شركات/') + this.id,
            },
            {
              name: this.fixTitleType(this.type) + ' ' + this.company.company_object.name,
              link: '',
            },
          ]
          this.loading = false
        })
      } 
      if (this.type == 'شخصيات-عملو') {
        await this.http.get('/company/worked_at?slug=' + this.id+ '&current_position=previous').then((response) => {
          this.company = response.data
          this.breadcrumbLsit = [
            {
              name: 'الرئيسية',
              link: '/',
            },
            {
              name: this.company.company_object.name,
              link: '/' + encodeURI('شركات/') + this.id,
            },
            {
              name: this.fixTitleType(this.type) + ' ' + this.company.company_object.name,
              link: '',
            },
          ]
          this.loading = false
        })
      } else {
        await this.http.get('/company/show/' + this.id).then((response) => {
          this.company = response.data
          this.title =
            (this.charactour.gender == 2 ? 'من هي' : 'من هو ') +
            this.charactour.character_name_ar +
            '؟ | عرض الكل | من هم؟ '
          this.breadcrumbLsit = [
            {
              name: 'الرئيسية',
              link: '/',
            },
            {
              name: this.company.nameAR,
              link: '/' + encodeURI('شركات/') + this.id,
            },
            {
              name: this.fixTitleType(this.type) + ' ' + this.company.nameAR,
              link: '',
            },
          ]
          if( this.$route.params.type =='الصور'){
                        this.getImageGallery(response.data.id)
            }
            
          this.loading = false
        })
      }
    },
    getImageGallery(id) {
            this.http.get('/image_gallery?id='+ id+'&limit=24')
                .then(async (response) => {
                    this.image_gallery = response.data.result
                    //this.newsProfile = response.data.response.results
                })
        },
    fixTitleType(v) {
      if (v == 'رؤساء-مجلس-الإدارة') {
        return 'رؤساء محلس إدارة '
      }
      if (v == 'شخصيات-ذات-صلة') {
        return 'شخصيات ذات صلة بمؤسسة'
      }
      if (v == 'الأعضاء-التنفيذيين') {
        return 'الأعضاء التنفيذيين'
      }
      if (v == 'شخصيات-يعملون') {
        return 'شخصيات يعملون في'
      }
      if (v == 'شخصيات-عملو') {
        return 'شخصيات عملو سابقاً في'
      }
      return v
    },
    fixrelationNameAR(value) {
      if (!value) return ''
      if (value) {
        try {
          return value.nameAR
        } catch (error) {
          return ''
        }
      }
    },
    fixrelationslug(value) {
      try {
        if (!value) return ''
        if (value.image) return value.slug
      } catch (error) {
        return ''
      }
    },
    fixrelationImage(value) {
      try {
        if (!value) return ''
        if (value.image) return value.image
      } catch (error) {
        return ''
      }
    },
  },

  created() {
    this.getCompany()
  },
}
</script>
