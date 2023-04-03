//_ = require('lodash');
import VueLodash from 'vue-lodash'
import lodash from 'lodash'
Vue.use(VueLodash, {lodash: lodash })
import "bootstrap" 
import 'bootstrap/dist/css/bootstrap.min.css'
import "./sass/app.scss"
import * as bootstrap from 'bootstrap'
window.bootstrap = bootstrap;
import axios from 'axios';
import VueAxios from 'vue-axios'
Vue.use(VueAxios, axios)
import VueMeta from 'vue-meta';
Vue.use(VueMeta, {
    refreshOnceOnNavigation: true
  })
  import Vuelidate from 'vuelidate'
Vue.use(Vuelidate)
import VueResizeText from 'vue-resize-text';
  Vue.use(VueResizeText)
  import Toast from "vue-toastification"
  import "vue-toastification/dist/index.css";

  const opti = {
    position: "bottom-right",
    timeout: 5000,
    closeOnClick: true,
    pauseOnFocusLoss: true,
    pauseOnHover: true,
    draggable: true,
    draggablePercent: 0.6,
    showCloseButtonOnHover: false,
    hideProgressBar: true,
    closeButton: "button",
    icon: true,
    rtl: true
  }
  Vue.use(Toast, opti);

  import headers from './components/home/header.vue'
import footers from './components/home/footers.vue'
  import VueSocialauth from 'vue-social-auth'
  import store from './store/store'
const options = {
  providers: {
    facebook: {
        clientId: import.meta.env.VITE_FACRBOOK_CLIENT_ID,
        redirectUri: import.meta.env.VITE_WEBSITE_URL+'/api/auth/facebook/callback'
    },
     google: {
        clientId: import.meta.env.VITE_GOOGLE_CLIENT_ID,
        redirectUri: import.meta.env.VITE_WEBSITE_URL+'/api/auth/google/callback' 
     },
  }
}
Vue.use(VueSocialauth, options)

import { setupCache } from 'axios-cache-adapter'

const cache = setupCache({
    maxAge: 60 * 60 * 1000
  })
 
  
   Vue.prototype.http = axios.create({
      baseURL: import.meta.env.VITE_DELIVERY_URL,
      adapter: cache.adapter
  });
  
  
  Vue.prototype.httpSp = axios.create({
    baseURL:  import.meta.env.VITE_SUBSCRIPTION_URL,
    adapter: cache.adapter
  });
  
  Vue.prototype.httpMg = axios.create({
    baseURL: import.meta.env.VITE_MGMT_URL,
    adapter: cache.adapter
  });
  
  Vue.prototype.httpIm = axios.create({
    baseURL: import.meta.env.VITE_IAM_URL,
    adapter: cache.adapter
  });
  var filter = function(text, length, clamp){
    clamp = clamp || '...';
    var node = document.createElement('div');
    node.innerHTML = text;
    var content = node.textContent;
    return content.length > length ? content.slice(0, length) + clamp :( content == 'undefined' ? '':content) ;
  };
  Vue.filter('truncate', filter);

  import router from './routes.js';
  window.router = router;
  window.Fire = new Vue();

//try {
//window.bootstrap =    require('bootstrap');
//} catch (e) {}

import Vue from 'vue'
//import App from './App.vue'
//import bootstrap from '~/bootstrap'
//Vue.use(bootstrap)
//new Vue(App).$mount('#app')

const app = new Vue({
    el: '#app',
    router,
    store,
    components: {
        headers,
        footers
      },
}).$mount('#app');
