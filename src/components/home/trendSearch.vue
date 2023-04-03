<template>
    <section class="trend-search mb-5 mt-2" style="direction: ltr;">
        <div class=" text-center">
            <h1 class="py-4 fw-bold" v-resize-text="{ ratio: 1.5, minFontSize: '12px', maxFontSize: '40px' }">الشخصيات
                الأكثر زيارة الآن</h1>
            <!--<h1 class="display-4 fs-4 py-4 text-black-80 ">الشخصيات الأكثر زيارة ً ...  الأكثر تفاعلاً  .... الأكثر تأثيرا  ً </h1>-->
        </div>
        <div :class="!characters ? 'd-none' : 'd-block'">
            <div v-if="checkRelLength(characters)">
                <hooperCharactoure id="charactoursSlider" :charactours=characters :hooperSettings=hooperSettings />
            </div>
        </div>
        <div :class="!characters ? 'd-block' : 'd-none'">
            <hooper :settings="hooperSettings">
                <slide v-for="(charactour, index) in 10" :key=index>
                    <div class="m-3">
                        <VueSkeletonLoader type="rect" width="95%" height="300px" color="#F6F6F6" animation="wave"
                            :rounded=true radius=15 class="m-2" />
                    </div>
                </slide>

                <hooper-navigation slot="hooper-addons"></hooper-navigation>
            </hooper>
        </div>
        <div class="row py-4" >
            <div class=" w-100 text-center pb-5  mt-4">
                <router-link class="btn  btn-primary mt-3 mb-4 btn-size fw-bold" :to="{ name: 'allCharacterPage' }" >
                    عرض الكل
                </router-link>
            </div>
        </div>
    </section>
</template>
<script>
import { Hooper, Slide, Navigation as HooperNavigation } from 'hooper';
import 'hooper/dist/hooper.css';
import VueSkeletonLoader from 'skeleton-loader-vue';
import hooperCharactoure from '../pages/accessories/hooperCharactoure.vue'
export default {
    props:['characters'],
    components:
    {
        Hooper,
        Slide,
        HooperNavigation,
        hooperCharactoure,
        VueSkeletonLoader
    },
    data() {
        return {
            windowSize: window.innerWidth,
            loading: true,
            hooperSettings: {
                "itemsToSlide": 1,
                "touchDrag": true,
                "mouseDrag": false,
                "centerMode": true,
                "wheelControl": false, 
                "infiniteScroll": true, 
                "rtl": true, 
                "itemsToShow": 1.5, 
                "breakpoints": { 
                    "476": { "itemsToShow": 1.5 },
                    "576": { "itemsToShow": 2.5 }, 
                    "852": { "itemsToShow": 3.5 }, 
                    "1200": { "itemsToShow": 4.5 },
                    "1400": { "itemsToShow": 5.5 },
                    "1600": { "itemsToShow": 6.5 },

                 } },
            charactours: {},
            code:this.$route.meta.code ?this.$route.meta.code: (this.$store.getters.countryFilter ? this.$store.getters.countryFilter.toLowerCase() : 'ae'),
           
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
            if(this.code){

            await this.http.get('/charactour/most_visited?code=' +this.code)
                .then(async (response) => {
                    this.charactours = response.data.top_characters

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

