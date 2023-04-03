<template>
  <div>
    <div>
      <div class="float-start mx-3 text-gray-80">
        <template v-if="count > 8">
            <router-link
              :to="'/latest/' + $route.params.slug + '/'"
              style="min-width: 135px"
              class="btn rounded-5 btn-size m-1 py-2 px-3 btn-light bg-white border text-primary fw-bold"
            >
              عرض الجميع
            </router-link>
        </template>
        <span @click.prevent="slidePrev()" v-if="show_slides">
          <slider-left class="ms-2" style="transform: rotate(180deg)" />
        </span>
        <span @click.prevent="slideNext()" v-if="show_slides">
          <slider-left />
        </span>
      </div>
      <div class="clearfix"></div>
    </div>
    <hooper ref="carousel" :settings="hooperSettings">
      <slide v-for="(charactour, index) in categorys" :key="index" class="rounded-5 col-md-3 mt-4 ps-4">
        <div class="card shadow m-1 rounded-btn-img p-1">
          <div class="position-relative p-1 rounded-btn-img">
            <app-image
              lazy-src="/web-asset/img/noResul.jpg"
              class="rounded-btn-img w-100"
              data-background-image="/web-asset/img/noResulw.jpg"
              src="/web-asset/img/noResul.jpg"
              :height="220"
              :lazy-srcset="charactour.image"
            />
            <div class="position-absolute custom-p translate-middle" :class="charactour.vip_person ? '' : 'd-none-s'">
              <h5>
                <span class="badge rounded-pill p-0 bg-prim-c">
                  <primarySvg />
                </span>
              </h5>
            </div>
          </div>
          <div class="text-center pb-1" style="min-height: 115px">
            <a :href="'/شخصيات/' + decodeURI(charactour.slug) + '/'" class="stretched-link text-decoration-none">
              <h3 class="card-title mb-1 fs-4 fw-bold" style="color: #212529">{{ charactour.name }}</h3>
              <p class="m-0 text-muted fw-bold fs-16" v-if="fixContent(charactour.content)">
                {{ fixContent(charactour.content) | truncate(40, '..') }}
              </p>
            </a>
          </div>
        </div>
      </slide>
    </hooper>
  </div>
</template>
    <script>
import sliderLeft from '../svg/slider-left.vue'
import sliderRight from '../svg/slider-right.vue'
import { Hooper, Slide } from 'hooper'
import primarySvg from '../svg/primarySvg.vue'

import 'hooper/dist/hooper.css'
import appImage from '../appImage.vue'
export default {
  components: { sliderLeft, sliderRight, Hooper, Slide, appImage, primarySvg },
  props: ['categorys','count'],
  data() {
    return {
      next: 0,
      prev: 0,
      is_mounted: false,
      disabled: true,
      categorysSelected: [],
      more: 8,
      moreSelected: 8,
      disabledSelected: true,
      loadingMore: false,
      loadingMoreSelected: false,
      allcategory: {},
      allcategorySelected: {},
      hooperSettings: {
        touchDrag: true,
        itemsToSlide: 1,
        rtl: true,
        mouseDrag: false,
        wheelControl: false,

        itemsToShow: 1,
        breakpoints: {
          350: {
            centerMode: false,
            itemsToShow: 1,
          },
          600: {
            centerMode: false,
            itemsToShow: 2,
          },
          850: {
            centerMode: false,
            itemsToShow: 3,
          },
          1000: {
            itemsToShow: 3.6,
          },
        },
        
      },
      window_size:window.innerWidth,
    }
  },
  computed: {
    show_slides: function () {
      console.log('size',this.window_size)
      if (this.categorys.length <= 1){
        return false;
      }else {
        if (this.window_size > 600) {
          if (this.categorys.length > 3){
            return true
          }else {
            return false
          }
        }else if (this.window_size <= 600){
          if (this.categorys.length > 1){
            return true
          }else {
            return false
          }
        }
      }
    },
  },
  methods: {
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

    slidePrev() {
      this.$refs.carousel.slidePrev()
    },
    slideNext() {
      this.$refs.carousel.slideNext()
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
    resizeHandler(e) {
      // console.log('window.innerWidth', window.innerWidth)
      this.window_size = window.innerWidth;
    },
  },
  created() {
    console.log('categorys',this.categorys)
    window.addEventListener('resize', this.resizeHandler)
  },
  destroyed() {
    window.removeEventListener('resize', this.resizeHandler)
  },
}
</script>