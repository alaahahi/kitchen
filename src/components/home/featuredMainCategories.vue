 <template>
  <section class="bg-pink container-fluid" v-if="checkData">
    <div class="container text-center">
      <div class="row pt-5">
        <div class="col-6">
          <h1 class="text-end fw-bold" v-resize-text="{ ratio: 1.5, minFontSize: '12px', maxFontSize: '40px' }">
            التصنيفات المختارة
          </h1>
        </div>
        <div class="col-6 text-start pt-4">
          <a class="text-decoration-none text-primary fw-bold" href="/categories" :class="disabled ? 'd-none' : ''"
            >تصفح المزيد <i class="fa-solid fa-angle-left fa-lg pe-2"></i
          ></a>
        </div>
      </div>
    </div>

    <div class="container">
      <div class="row hoopers px-4">
        <hooper :settings="hooperSettings" ref="carousel">
          <slide v-for="(category, index) in categorys" :key="index" class="rounded-5 col-md-3 mt-4 ps-4 text-center" >
            <a :href=getslug(category.slug,category.type) class="card position-relative bg-category bg-category-height">
  
              <appImage
              v-if="!category.image"
              class="rounded-5"
              alt="category image"
              :lazySrc="'/web-asset/img/noResultC.png'"
              :lazySrcset="'/web-asset/img/noResultC.png'"
              
            />
            <appPicture 
              v-if="category.image && category.image_variations"
              class="rounded-5"
              alt="category image"
              :lazySrc="category.image"
              :images="JSON.parse(category.image_variations)"
              :accepted_sizes="[
                '253_253',
                '222_200',
                '200_200',
                '204_200',
                '294_270',
                '294_270',
              ]"
               style="
                max-width: unset;
                max-height: unset;
                width: unset;
                vertical-align: unset;
                min-height: unset;
                height: unset;
                overflow: auto; 
                object-fit: cover;
              "
            />
            <appImage
              v-if="category.image && !category.image_variations"
              class="rounded-5"
              alt="category image"
              :lazySrc="category.image"
              :lazySrcset="category.image"
              style="
                max-width: unset;
                max-height: unset;
                width: unset;
                vertical-align: unset;
                min-height: unset;
                height: unset;
                overflow: auto; 
                object-fit: cover;
              "
            />
              <div class="card-body text-end position-absolute bottom-0 end-0 text-white">
                <h2 class="card-title fw-bold fs-4">{{ category.name }}</h2>
                <h5 href="#" class="text-decoration-none text-white fs-5">{{ category.description }}</h5>
              </div>
            </a>
          </slide>
          <hooper-navigation slot="hooper-addons" v-if="categorys.length > 4"></hooper-navigation>
        </hooper>
      </div>
    </div>
  </section>
</template>
<script>
import { Hooper, Slide, Navigation as HooperNavigation } from 'hooper'
import 'hooper/dist/hooper.css'
import appImage from '../pages/accessories/appImage.vue'
import appPicture from '../pages/accessories/appPicture.vue'
export default {
  props: ['charactour'],
  components: {
    Hooper,
    Slide,
    HooperNavigation,
    appImage,
    appPicture
  },
  data() {
    return {
      code: this.$route.meta.code
        ? this.$route.meta.code
        : this.$store.state.langFilter
        ? this.$store.state.langFilter.toLowerCase()
        : 'ae',
      checkData: false,
      disabled: true,
      loading: true,
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
            itemsToShow: 2.5,
          },
          1000: {
            itemsToShow: 3,
          },
          1200: {
            itemsToShow: 4,
          },
        },
      },
      categorys: [],
    }
  },
  methods: {
    //             carousel(payload) {

    // if((this.categorys.length -4) <= payload.currentSlide  && (this.categorys.length -4) <= 4){

    //     this.$refs.slideNext.classList.add("disabled");
    // }
    //  if((this.categorys.length -4) != payload.currentSlide && (this.categorys.length -4) > 4){
    //     this.$refs.slideNext.classList.remove("disabled");
    // }
    // },

    getslug(slug,type){
      try {
        if(type == 'company'){
          return '/company_category/' + slug + '/'
        }
        if(type == 'character'){
          return '/people_category/' + slug + '/'
        }
      } catch (error) {
        
      }

    },
    getCategory() {
      this.http
        .get('/category/getCategoriesByCountry?code=' + this.code)
        .then(async (response) => {
          this.categorys = response.data.categories
          if (this.categorys.length) {
            this.checkData = true
          }
        })
        .catch((error) => {
          this.checkData = false
        })
    },
  },
  created() {
    this.getCategory()
  },
}
</script>
<style >
.rounded-6 {
  border-radius: 10px;
}
.hoopers > section > div > .hooper-navigation > .hooper-next {
  right: auto;
  left: 0px !important;
}
.hoopers > section > div > .hooper-navigation > .hooper-prev {
  left: auto;
  right: 0px !important ;
}
</style>
