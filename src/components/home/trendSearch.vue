<template>
    <section class="trend-search mb-5 mt-2" style="direction: ltr;">
        <div :class="!sliderImages ? 'd-none' : 'd-block'">
            <div v-if="checkRelLength(sliderImages)">
              
                <hooperSliderHome id="charactoursSlider"  :hooperSettings=hooperSettings :sliders="sliderImages" />
            </div>
        </div>
        <div :class="!sliderImages ? 'd-block' : 'd-none'">
            <hooper :settings="hooperSettings">
                <slide v-for="(charactour, index) in 3" :key=index>
                    <div class="m-3">
                        <VueSkeletonLoader type="rect" width="100%" height="500px" color="#F6F6F6" animation="wave"
                            :rounded=true radius=15 class="m-2" />
                    </div>
                </slide>

                <hooper-navigation slot="hooper-addons"></hooper-navigation>
            </hooper>
        </div>

    </section>
</template>
<script>
import { Hooper, Slide, Navigation as HooperNavigation } from 'hooper';
import 'hooper/dist/hooper.css';
import VueSkeletonLoader from 'skeleton-loader-vue';
import hooperSliderHome from '../pages/accessories/hooperSliderHome.vue'
export default {
    components:
    {
        Hooper,
        Slide,
        HooperNavigation,
        hooperSliderHome,
        VueSkeletonLoader
    },
    data() {
        return {
            windowSize: window.innerWidth,
            loading: true,
            sliderImages:[{"image":"/web-asset/img/slider0.jpg"},{"image":"/web-asset/img/slider1.jpg"},{"image":"/web-asset/img/slider2.jpg"}],
            hooperSettings: {
                "itemsToSlide": 1,
                "touchDrag": true,
                "mouseDrag": false,
                "centerMode": true,
                "wheelControl": false, 
                "infiniteScroll": true,
                "autoPlay":true,
                "playSpeed":"2000",
                "rtl": true, 
                "itemsToShow": 1.5, 
                "breakpoints": { 
                    "476": { "itemsToShow": 1 },
                    "576": { "itemsToShow": 1 }, 
                    "852": { "itemsToShow": 1 }, 
                    "1200": { "itemsToShow": 1 },
                    "1400": { "itemsToShow":1 },
                    "1600": { "itemsToShow": 1 },

                 } },
            charactours: {},
            code:this.$route.meta.code ?this.$route.meta.code: (this.$store.getters.langFilter ? this.$store.getters.langFilter.toLowerCase() : 'ae'),
           
        }
    },

    methods: {
        checkRelLength(v) {
            if (!v) return 0
            try {
                if (v) {
                    return v.length
                }
            } catch (error) {
                console.log(error)
                return 0
            }
        },
        async getCharactour() {
            if(false){

            await this.http.get('/charactour/most_visited?code=' +this.code)
                .then(async (response) => {
                    this.charactours = response.data.top_sliderImages

                    this.loading = false
                })
        }
                        
    }
    },
    filters: {
        formatPositions: function (value) {
            if (!value) return ''
            if (value) {
                try {
                    value = (JSON.parse(value)[0]).postion.trim().replace(/u([0-9A-F]{0,4})/g, '&#x$1')
                } catch (error) {
                    return ""
                }
                return value
            }
        }
    },
};
</script>

