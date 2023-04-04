<template>
    <div class="fixbg" style="background-image:url('web-asset/img/path104.png')" v-if="!userSubscriptionIsGoldSub()">
        <section class="subscriptionType">
            <div class="container text-center mb-5 pt-5">
                <h1 class="fs-1 py-4 fw-bold">اشترك بباقاتنا وحقق <div class="position-relative text-fix">
                        <div style="background-image: url('web-asset/img/Path 14.png')" class="text-price"></div>أفضل
                        استفادة
                    </div>
                </h1>
                <h2 class="display-4 fs-5 py-4 text">مميزات متنوعة عند التسجيل ضمن إحدى باقات عضوية من هم</h2>
            </div>
            <div id="sub"></div>
            <div class="w-80 m-auto text-center pb-2">
                <div class="d-none d-lg-block">
                    <div class="row" :class="loadings ? 'd-none' : 'd-flex'">
                        <div class=" m-auto p-4 col-md-6" v-for="(subscription, index) in subscriptions" :key=index
                            v-show="!userSubscriptionIsGoldSub() && user || !user || subscription.popular && user">
                            <div class="card text-center mb-4  shadow rounded-btn-img" :class="subscription.popular ? 'border-gold':'border-none'" >
                                <div class="card-body pb-5">
                                    
                                    <h1 class="card-title pt-3">{{ subscription.name }}</h1>
                                    <p class="card-text text-muted">{{ subscription.slug }}</p>

                                    <router-link :to="{ name: 'login'}" class="btn btn-outline-secondary px-5 py-2 fw-bold" v-if="!fixFilter(subscription.is_paid)">باقة مجانية</router-link>


                                    <h2 class="card-title" v-if="fixFilter(subscription.is_paid)"><span
                                            :class="subscription.popular ? 'text-price-hi fw-bold' : 'text-price-none fw-bold'"
                                            style="background-image: url('web-asset/img/path1984.png')">{{
                                                    fixFilter(subscription.price)
                                            }} <span v-if="subscription.price != 0">{{ currency_text }}</span>
                                        </span>
                                        <span class="fs-5 text-muted">{{ subscription.duration_unit |
                                                durationUnitFilter
                                        }}</span></h2>
                                    <button data-bs-toggle="modal"
                                        @click.prevent="postsubscription(subscription.id, index)"
                                        class="btn p-2 w-100 my-3 fw-bold fs-5 border-none rounded-btn"
                                        :class="subscription.popular ? 'btn-primary' : '  button-gray'">
                                        <span :class="{ 'spinner-border spinner-border-sm': loading == index }"></span>
                                        ابدأ الآن </button>
                                    <div class="text-center">
                                        <p class="card-text fs-5" v-for="feature in subscription.features"
                                            :key=feature.id>
                                            <i class="fa-solid m-1  fs-5"
                                                :class="feature.type == 'primary' ? 'fa-check text-primary' : 'fa-close text-muted'"></i>
                                            <span class="mx-2" :class="feature.type == 'primary' ? '' : 'text-muted'">
                                                {{ feature.name }}
                                            </span>

                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row" :class="loadings ? 'd-flex' : 'd-none'">
                        <div class="col-md-4 fixGold" v-for="(subscription, index) in 3" :key=index>
                            <VueSkeletonLoader type="rect" width="95%" height="600px" color="#F6F6F6" animation="wave"
                                :rounded=true radius=15 />
                        </div>
                    </div>
                </div>
                <div class="row d-lg-none d-block  subscription ">
                    <hooper :settings="hooperSettings">
                        <slide v-for="subscription in subscriptions" :key=subscription.id
                            class=" m-auto mt-2  ps-5 pe-3">
                            <div class="card text-center mb-4  shadow rounded-btn-img"  :class="subscription.popular ? 'border-gold':'border-none'">
                                <div class="card-body">

                                    <h1 class="card-title">{{ subscription.name }}</h1>
                                    <p class="card-text text-muted">{{ subscription.slug }}</p>
                                    <router-link :to="{ name: 'login'}" class="btn btn-outline-secondary px-5 py-2 fw-bold" v-if="!fixFilter(subscription.is_paid)">باقة مجانية</router-link>

                                    <h2 class="card-title"  v-if="fixFilter(subscription.is_paid)">
                                      
                                        <span
                                            :class="subscription.popular ? 'text-price-hi fw-bold' : 'text-price-none fw-bold'"
                                            style="background-image: url('web-asset/img/path1984.png') ;">{{
                                                   fixFilter(subscription.price)
                                            
                                            }} <span v-if="subscription.price != 0">{{ currency_text }}</span>
                                        </span><span class="fs-5 text-muted">{{ subscription.duration_unit |
                                                durationUnitFilter
                                        }}</span></h2>
                                    <button @click.prevent="postsubscription(subscription.id, subscription.id)"
                                        class="btn p-2 w-100 my-3 fw-bold fs-5 border-none rounded-btn"
                                        :class="subscription.popular ? 'btn-primary' : '  button-gray'">
                                        <span
                                            :class="{ 'spinner-border spinner-border-sm': loading == subscription.id }"></span>
                                        ابدأ الآن</button>
                                    <div class="text-center">
                                        <p class="card-text fs-5" v-for="feature in subscription.features"
                                            :key=feature.id>
                                            <i class="fa-solid fs-5"
                                                :class="feature.type == 'primary' ? 'fa-check text-primary' : 'fa-close text-muted'"></i>
                                            <span class="mx-2" :class="feature.type == 'primary' ? '' : 'text-muted'">
                                                {{ feature.name }}
                                            </span>

                                        </p>
                                    </div>
                                </div>
                            </div>
                        </slide>
                        <hooper-navigation slot="hooper-addons" v-if="subscriptions.length > 1"></hooper-navigation>

                    </hooper>

                </div>
            </div>
        </section>
        <button data-bs-toggle="modal" data-bs-target="#redirectModal" data-bs-keyboard="false" id="openModal"
            data-bs-backdrop="static" style="opacity:0;width:1px;height:1px;visibility: hidden;"></button>

        <div class="modal fade" id="redirectModal" tabindex="-1" aria-labelledby="exampleModalLabel"
            data-bs-keyboard="false" data-bs-backdrop="static">
            <div class="modal-dialog modal-dialog-centered ">
                <button type="button" style="opacity:0;width:1px;height:1px;visibility: hidden;" id="closeModal"
                    data-bs-dismiss="modal" aria-label="Close"></button>
                <div class="modal-content ">
                    <div class="modal-body px-5 py-4">
                        <h2 class="text-center fw-bold pb-2">
                            جاري التحويل إلى صفحة الدفع
                        </h2>
                        <h4 class="text-center fw-bold pb-4">الرجاء الإنتظار</h4>
                        <span class="spinner-border m-auto d-block mb-4" style="color:#4B91F1"></span>
                    </div>

                </div>
            </div>
        </div>

        <button data-bs-toggle="modal" data-bs-target="#redirectModallogout" data-bs-keyboard="false" id="openModallogout"
            data-bs-backdrop="static" style="opacity:0;width:1px;height:1px;visibility: hidden;"></button>

        <div class="modal fade" id="redirectModallogout" tabindex="-1" aria-labelledby="exampleModalLabel"
            data-bs-keyboard="false" data-bs-backdrop="static">
            <div class="modal-dialog modal-dialog-centered ">
                <button type="button" style="opacity:0;width:1px;height:1px;visibility: hidden;" id="closeModallogout"
                    data-bs-dismiss="modal" aria-label="Close"></button>
                <div class="modal-content ">
                    <div class="modal-body px-5 py-4">
                        <h2 class="text-center fw-bold pb-2">
                           الجلسة غير صالحة سيتم تحويلك الى صفحة تسجيل الدخول
                        </h2>
                        <h4 class="text-center fw-bold pb-4">الرجاء الإنتظار</h4>
                        <span class="spinner-border m-auto d-block mb-4" style="color:#4B91F1"></span>
                    </div>

                </div>
            </div>
        </div>
    </div>
</template>
<script>
import VueSkeletonLoader from 'skeleton-loader-vue';
import { Hooper, Slide, Navigation as HooperNavigation } from 'hooper';
import 'hooper/dist/hooper.css';
export default {
    components:
    {
        Hooper,
        Slide,
        HooperNavigation,
        VueSkeletonLoader
    },
    data() {

        return {
            token: this.$store.state.token,
            currency_text: "",
            subscriptions: {},
            loading: undefined,
            user: this.$store.state.user,
            userSubscription: '',
            userSubscriptionAll: this.$store.state.subscription ? this.$store.state.subscription : '',
            loadings: true,
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
                        itemsToShow: 2
                    },
                    1000: {
                        itemsToShow: 2,
                    }
                }
            },
            hooperSettingsL: {
                itemsToSlide: 1,
                rtl: true,
                touchDrag: true,
                mouseDrag: false,
                wheelControl: false,
                itemsToShow: 3,
                breakpoints: {
                    800: {
                        centerMode: false,
                        itemsToShow: 3
                    },
                    1000: {
                        itemsToShow: 3,
                    }
                }
            },
        }
    },
    methods: {

        userSubscriptionIsGoldSub() {
            try {
                if(this.userSubscriptionAll){
                    return this.userSubscriptionAll.plan.package.is_paid == 1 ? true : false
                }
                return false
            } catch (error) {
                return false
            }
        },

        getsubscription() {
            this.httpSp.get('/subscription_package')
                .then(async (response) => {
                    this.currency_text = response.data.currency_text
                    if (this.user) {
                        this.subscriptions = this._.orderBy(response.data.subscription_packages.filter((item) => { return (item.plans.id != this.userSubscription && item.price != 0) }), 'weight')
                    }
                    else {
                        this.subscriptions = this._.orderBy(response.data.subscription_packages, 'weight')
                    }

                    this.loadings = false
                }).catch(err => {
                    this.errors = err.response.data
                    console.log(this.errors)

                })
        },
        postsubscription(v, i) {
            if (this.user) {
                this.loading=i
                document.getElementById('openModal').click()
                this.httpSp.post('/subscription_start', { "type": "new_subscribe", "subscription_package_id": v },
                    { headers: { Authorization: `Bearer ${this.token}` } })
                    .then(async (response) => {
                        window.location.href = response.data.payment_order.stripe_payment_session_url;
                        try {
                            this.loading =null
                            document.getElementById('closeModal').click()
                            if (response.data.subscription) {
                                localStorage.removeItem('subscription')
                                localStorage.setItem('subscription', JSON.stringify(response.data.subscription));
                                this.$store.state.subscription = response.data.subscription
                            }

                        } catch {
                            this.loading = null
                            document.getElementById('closeModal').click()
                        }

                    }).catch(err => {
                        this.loading = null
                        document.getElementById('closeModal').click()
                        this.errors = err.response.data
                        if (this.errors.errorCode = 401) {
                            document.getElementById('openModallogout').click()
                            setTimeout(()=>{    
                                this.logout(); 
                                },3000);
                        }
                        if (this.errors.errorCode = 406) {
                            this.httpSp
                                .post(
                                    "/upgrade_subscription",
                                    {
                                        subscription_package_id: v,
                                    },
                                    { headers: { Authorization: `Bearer ${this.token}` } }
                                )
                                .then(async (response) => {

                                    try {
                                        window.location.href = response.data.subscription.last_invoice_link;
                                        this.loading = true
                                        try {
                                            if (response.data.subscription) {
                                                localStorage.removeItem('subscription')
                                                localStorage.setItem('subscription', JSON.stringify(response.data.subscription));
                                                this.$store.state.subscription = response.data.subscription
                                            }
                                        } catch {
                                            console.log("erorr")
                                        }
                                    }
                                    catch {
                                        this.loading = true
                                    }
                                });
                        }

                    })
            } else {
                this.$router.push({ name: 'login' })
            }
        },
        backCallback() {
            document.getElementById('closeModal').click()
            this.loading = 0
        },
        logout: function () {
      localStorage.removeItem('isLoggedIn')
      localStorage.removeItem('tokenWeb')
      localStorage.removeItem('userWeb')
      localStorage.removeItem('subscription')
      this.$cookies.remove('token');
      this.$cookies.set('isLoggedIn',false );
      this.$cookies.remove('userWeb');
      this.$cookies.remove('subscription');
      this.$store.state.subscription = ""
      this.$store.state.user = ""
      document.getElementById('closeModallogout').click()
      this.$router.push({ name: 'login' })
    },
    fixFilter(string) {
            if (string == 0) {
             return  false;
            }
            return parseFloat(string).toFixed(0);
        },
    },
    created() {
        this.getsubscription();
    },
    filters: {

        durationUnitFilter: function (string) {
            if (!string) return "";

            try {
                if (string == "month") {
                    return " / الشهر ";
                }
                if (string == "week") {
                    return " / أسبوع ";
                }
                if (string == "day") {
                    return " / اليوم ";
                }
                if (string == "year") {
                    return " / السنة ";
                }
            } catch (error) {
                return " / غير محدودة ";
            }
        }
    }
};
</script>
<style >
.subscriptionType {
    background-color: #f59ed524;
    margin-bottom: -25px;
}



.bg-path {
    background-size: contain;
    background-repeat: no-repeat;
    background-position: bottom;
}


.text-price-hi {
    background-repeat: no-repeat;
    background-size: 103%;
    background-position: center;
    background-size: 184px 41px;
}

.text-price-none {
    background-image: none !important;
}

@media screen and (max-width: 768px) {
  


}

.subscription>section>div>.hooper-navigation>.hooper-next {
    right: auto;
    left: 0px !important;
}

.subscription>section>div>.hooper-navigation>.hooper-prev {
    left: auto;
    right: 0px !important;
}

.subscription>section>div>.hooper-navigation>button {
    background-color: #F6F6F6 !important;
}
.fixbg{
    background-repeat: no-repeat;
}
.border-gold{
    border: 4px solid #EBBF69;
    transform: scale(1.03);
}
</style>
