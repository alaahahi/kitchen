import Vue from 'vue'
import VueRouter from 'vue-router'
import home from './routes/home';
import store from './store/store'
Vue.use(VueRouter);

const router = new VueRouter({
    scrollBehavior(to, from, savedPosition) {
            if (to.hash) {
                return {
                  el: to.hash,
                  behavior: 'smooth',
                  y: 1500 
                }
              }
              else{
                return { x: 0, y: 0 };
    
              }
    },
    mode: "history",
    routes: [
        ...home,
    ],
});
router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (!store.getters.isLoggedIn || store.getters.isLoggedIn== 'false') {
            router.push({ name: 'login' });
        } else {
            next();
        }
    } else if (to.matched.some(record => record.meta.guest)) {
        if (store.getters.isLoggedIn == 'true') {
            next("/");
        } else {
            next();
        }
    } else {
        next();
    }
});
export default router;