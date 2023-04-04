import Vue from 'vue'
import Vuex from 'vuex'
import VueCookies from "vue-cookies";
Vue.use(VueCookies);

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        prevRoute: null,
        lastCategoryPage: null,
        lastCharPage: null,
        lastCompanyPage: null,
        count: 0,
        user: Vue.$cookies.get("userWeb") ?  Vue.$cookies.get("userWeb")  : "",
        langFilter: Vue.$cookies.get("selectedlang") ? Vue.$cookies.get("selectedlang") : '', // localStorage.getItem("userWeb") ? (JSON.parse(localStorage.getItem("userWeb"))).nationality :
        isLoggedIn: Vue.$cookies.get("isLoggedIn") ?  Vue.$cookies.get("isLoggedIn") : false,
        token: Vue.$cookies.get("token") ? Vue.$cookies.get("token") : "",
        hooperSettings: {
            itemsToSlide: 1,
            touchDrag: true,
            mouseDrag: false,
            centerMode: true,
            wheelControl: false,
            infiniteScroll: true,
            rtl: true,
            itemsToShow: 1.5,
            breakpoints: {
                576: {
                    itemsToShow: 1.5,
                    centerMode: true
                },
                768: {
                    itemsToShow: 3.5
                    ,
                    centerMode: true
                },
                992: {
                    itemsToShow: 4.5
                    ,
                    centerMode: true
                },
                1200: {
                    itemsToShow: 5.5,
                    centerMode: true
                }
            }
        },
        subscription: localStorage.getItem("subscription") &&  Vue.$cookies.get("userWeb")? JSON.parse(localStorage.getItem("subscription")) : "",
    },
    getters: {
        isLoggedIn: state => state.isLoggedIn,
        langFilter: state => state.langFilter,
    },
})
export default store