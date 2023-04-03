<template>
  <div class="Discover container col-md-9 my-3" v-click-outside="hides">
    <div>
      <div class="position-relative">
        <div class="rounded-btn-img" :class="isHome ? 'search' : 'search-c'" > 
          <img v-if="isHome" src="/web-asset/img/searchicons.png" alt="search icon" />
          <img v-if="!isHome" src="/web-asset/img/searchprofile.png" alt="searchprofile icon" />
          <div style="position: absolute; left: 120px; top: 20px; cursor: pointer" @click="text = '';showhistory = false;" v-if="text">
            <closeSearch />
          </div>
          <input
            @input="debounce(() => { q=$event.target.value } , 500);"
            @keyup.enter="getAdv()"
            v-model="text"
            @focus="showhistory = true"
            type="text"
            class="form-control bg-white search-cat"
            placeholder="ابحث عن شخصية أو مؤسسة"
          />
          <router-link
            :to="{
              name: 'advancedSearchPage',
              params: { q: text ,selectSearch: text && this.selectSearch == 4 ? 1 :this.selectSearch},
              resultsCharactour: resultsCharactour,
              resultsCompany: resultsCompany,
            }"
            class="btn text-decoration-none"
            :class="text ? 'btn-primary fix-primary' : 'btn-light'"
            @click="getResults()"
            >ابحث</router-link
          >
        </div>
        <div>
          <resultsSearch :showhistory="showhistory" @push="push" :text="q" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import ClickOutside from 'vue-click-outside'
import sliderLeft from '../pages/accessories/svg/slider-left.vue'
import sliderRight from '../pages/accessories/svg/slider-right.vue'
import 'hooper/dist/hooper.css'
import resultsSearch from '../pages/accessories/resultsSearch.vue'
import closeSearch from '../pages/accessories/svg/closeSearch.vue'

export default {
  components: { sliderLeft, sliderRight, resultsSearch, closeSearch },
  props: ['isHome'],
  data() {
    return {
      q:"",
      debounce: null,
      showhistory: false,
      hide: false,
      noResult: false,
      text: '',
      isTyping: false,
      isStoredSearches: true,
      resultsCompany: [],
      resultsCharactour: [],
      hooperSettings: {
        touchDrag: true,
        itemsToSlide: 1,
        rtl: true,
        mouseDrag: false,
        wheelControl: false,
        itemsToShow: 1,
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
      characters: [
        {
          image: 'https://mgmt.manhom.com/wp-content/uploads/2017/08/رزان-خليفة-المبارك-1.jpg',
          nameAR: null,
          gender: 2,
          vip_person: 0,
          character_name_ar: 'رزان خليفة المبارك',
          slug: '%d8%b1%d8%b2%d8%a7%d9%86-%d8%ae%d9%84%d9%8a%d9%81%d8%a9-%d8%a7%d9%84%d9%85%d8%a8%d8%a7%d8%b1%d9%83',
          id: 108175,
        },
        {
          image: 'https://mgmt.manhom.com/wp-content/uploads/2013/07/من-هو-عبدالسلام-هيكل.jpg',
          nameAR: null,
          gender: 1,
          vip_person: 1,
          character_name_ar: 'عبد السلام هيكل',
          slug: '%d8%b9%d8%a8%d8%af-%d8%a7%d9%84%d8%b3%d9%84%d8%a7%d9%85-%d9%87%d9%8a%d9%83%d9%84',
          id: 108458,
        },
        {
          image: 'https://mgmt.manhom.com/wp-content/uploads/2011/07/ستريدا-جعجع.jpg',
          nameAR: null,
          gender: 2,
          vip_person: 0,
          character_name_ar: 'ستريدا جعجع',
          slug: '%d8%b3%d8%aa%d8%b1%d9%8a%d8%af%d8%a7-%d8%ac%d8%b9%d8%ac%d8%b9',
          id: 115124,
        },
        {
          image: 'https://mgmt.manhom.com/wp-content/uploads/2017/08/رزان-خليفة-المبارك-1.jpg',
          nameAR: null,
          gender: 2,
          vip_person: 0,
          character_name_ar: 'رزان خليفة المبارك',
          slug: '%d8%b1%d8%b2%d8%a7%d9%86-%d8%ae%d9%84%d9%8a%d9%81%d8%a9-%d8%a7%d9%84%d9%85%d8%a8%d8%a7%d8%b1%d9%83',
          id: 108175,
        },
      ],
      selectSearch:4,
    }
  },

  methods: {
    copy() {
      this.$refs.myinput.focus();
      document.execCommand('copy');
    },
    setavalue (){
      this.debounce =this.createDebounce()
    },
    createDebounce() {
		let timeout = null;
      return function (fnc, delayMs) {
     
        clearTimeout(timeout);
        timeout = setTimeout(() => {
          fnc();
        }, delayMs || 500);
      };
    },
    slidePrev() {
      this.$refs.carousel.slidePrev()
    },
    slideNext() {
      this.$refs.carousel.slideNext()
    },
    clear() {
      localStorage.removeItem('storedSearches')
      this.showhistory = false
      this.isStoredSearches = false
      this.$router.go()
    },
    reset() {
      this.text = ''
      this.hide = false
      this.noResult = false
    },
    hides() {
      this.hide = false
      this.showhistory = false
    },
    getAdv() {
      this.$router.push({ name: 'advancedSearchPage', params: { q: this.text,selectSearch: this.text && this.selectSearch == 4 ? 1 : this.selectSearch} })
    },
    feadback(q, id, order, url, type, slug) {
      this.http
        .get('/search/feedback?q=' + q + '&item_id=' + id + '&item_order=' + order + '&url=' + url + id)
        .then(async (response) => {
          this.onEnter(q, type, slug)
        })
    },
    onEnter(text, type, slug) {
      this.isStoredSearches = true
      let storedSearches = this.storedSearches
      if (!storedSearches.includes(this.text)) {
        storedSearches.push({ name: text, type: type, slug: slug })
        localStorage.storedSearches = JSON.stringify(storedSearches)
      }
    },
    storedSearchesisvalue() {
      try {
        if (this.storedSearches.length) return true
      } catch (error) {
        return false
      }
      return false
    },
    push(selectSearch) {
      // console.log('selectSearch value',selectSearch)
      this.selectSearch = selectSearch;
    },
  },
  computed: {
    storedSearches: function () {
      return localStorage.storedSearches === undefined ? [] : [...JSON.parse(localStorage.storedSearches)]
    },
  },
  mounted() {
    // prevent click outside event with popupItem.
    this.popupItem = this.$el
    this.setavalue()
  },

  // do not forget this section
  directives: {
    ClickOutside,
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

.fix-primary {
  background: #4169E3 !important ;

  color: #fff !important;
}
</style>

