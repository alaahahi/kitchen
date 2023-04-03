<template>
  <div>
    <div>
      <div class="float-start mx-3 text-gray-80">
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
      <slide v-for="(category, index) in categorys" :key="index" class="rounded-5 col-md-3 mt-4 ps-4">
        <router-link
          :to="'/search/' + category.slug + '/'"
          class="card position-relative bg-category bg-category-height"
        >
          <img
            v-if="!category.image"
            class="rounded-5"
            src="/web-asset/img/noResultC.png"
            alt="category image"
            style="overflow: auto; object-fit: cover"
          />
          <img
            v-if="category.image"
            class="rounded-5"
            :src="category.image"
            alt="category image"
            style="overflow: auto; object-fit: cover"
          />
          <div class="card-body text-end position-absolute bottom-0 end-0 text-white">
            <h2 class="card-title fw-bold fs-4">{{ category.name }}</h2>
            <h5 v-if="category.character_count" class="text-decoration-none text-white fs-16" style="color: #ebebeb">
              إستكشف أكثر من {{ category.character_count }} شخصية وتتبع أخبارهم
            </h5>
            <h5 v-if="category.company_count" class="text-decoration-none text-white fs-16" style="color: #ebebeb">
              إستكشف أكثر من {{ category.company_count }} شركة وتتبع أخبارهم
            </h5>
          </div>
        </router-link>
      </slide>
    </hooper>
  </div>
</template>
    
    <script>
import sliderLeft from '../svg/slider-left.vue'
import sliderRight from '../svg/slider-right.vue'
import { Hooper, Slide, } from 'hooper'
import 'hooper/dist/hooper.css'

export default {
  components: { sliderLeft, sliderRight, Hooper, Slide },
  props: ['categorys'],
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
      // console.log('size',this.window_size)
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
    window.addEventListener('resize', this.resizeHandler)
  },
  destroyed() {
    window.removeEventListener('resize', this.resizeHandler)
  },
}
</script>