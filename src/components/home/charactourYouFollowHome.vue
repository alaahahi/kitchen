<template>
    <section class="best-company-groups bg-white py-5" v-if="checkRelLength(charactours) || checkRelLength(companices)">
        <div class="container-fluid text-center ">
            <h1 class="fs-1 py-4">شخصيات وشركات تتابعها</h1>
            <h1 class="display-4 fs-4 py-4 text-black-80 ">الشخصيات والشركات الأكثر زيارة ً ... الأكثر تفاعلاً ....
                الأكثر تأثيرا ً </h1>
        </div>
        <div class="container-fluid">
            <hooperCharactoureCompany  id="charactoursFollowSlider"  :charactours="charactours" :companices="companices"
                :hooperSettings=hooperSettings />
        </div>

    </section>
</template>
<script>
import hooperCharactoureCompany from '../pages/accessories/hooperCharactoureCompany.vue'
export default {
    components:
    {
        hooperCharactoureCompany,
    },
    computed:{
        showSliderNav: function () {
            let length = this.checkRelLength(this.charactours) + this.checkRelLength(this.companices)
            if (this.windowSize >= 1200 && length > 6) {
                this.videos_items = 3
                return true
            } else if (this.windowSize < 1200 && this.windowSize >= 800 && length > 2) {
                this.videos_items = 2
                return true
            } else if (this.windowSize < 800 && length > 1) {
                this.videos_items = 1;
                return true
            }
            else return false
        },
    },
    data() {
        return {
            windowSize: window.innerWidth,
            charactours: {},
            companices: {},
            hooperSettings: {
                "itemsToSlide": 1,
                "touchDrag": true,
                "mouseDrag": false,
                "centerMode": false,
                "wheelControl": false, 
                "infiniteScroll": false, 
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
                return 0
            }
        },
        getCharactourfollowCharactourUser() {
            this.http.post('/getFollowCharacters', { 'user_id': this.$store.state.user.id })
                .then(async (response) => {
                    this.charactours = response.data.characters 
                    this.companices  = response.data.companies
                    if(this.charactours.length + this.companices.length > 3 ){
                        this.hooperSettings.infiniteScroll = true
                        this.hooperSettings.centerMode = true
                    }
                    // let arr_char = localStorage.storedSearche;
                    // let arr_comp = localStorage.storedSearcheCompany;
                    let char_ids=[];
                    this.charactours.forEach(el => {
                        char_ids.push(el.id)
                    })
                    let comp_ids=[];
                    this.companices.forEach(el => {
                        comp_ids.push(el.id)
                    })
                    localStorage.setItem('followed_characters',JSON.stringify(char_ids))
                    localStorage.setItem('followed_companies',JSON.stringify(comp_ids))

                })
        },

    },
    created() {
        this.getCharactourfollowCharactourUser()
        window.addEventListener("resize", this.resizeHandler);
    },
    destroyed() {
        window.removeEventListener("resize", this.resizeHandler);
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
        },

    },

};
</script>
