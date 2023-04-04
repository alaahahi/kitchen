<template>
  <section class="header" v-click-outside="hide">
    <nav class="navbar navbar-expand-xl navbar-light bg-white fixed-top shadow-c py-2 py-xl-0">
      <div class="container">
        <router-link class="navbar-brand" to="/">
          <picture>
            <source type="image/avif" src="/web-asset/img/logo.png" />
            <img
              src="/web-asset/img/logo.png"
              alt="describe image content"
              loading="lazy"
              decoding="async"
              class="logo-katchen"
            />
          </picture>
        </router-link>
        <ul class="navbar-nav me-md-auto me-auto ms-0 ms-md-3">
          <li class="nav-item dropdown py-xl-3 d-block d-xl-none">
            <a
              class="nav-link fw-bold dropdown-toggle"
              id="navbarScrollingDropdown"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              style="color: #20211f !important "
            >
              {{ value }} <i class="fa-solid fa-angle-down me-2 ms-3 text-gray-90"></i>
            </a>
            <ul
              class="dropdown-menu position-absolute text-end shadow rounded-btn border-none"
              aria-labelledby="navbarScrollingDropdown"
            >
              <li v-for="lang in language" :key="lang.id">
                <button v-if="value != lang.name" @click="changelang(lang.name, lang.code)" class="dropdown-item">
                  {{ lang.name }}
                </button>
              </li>
            </ul>
          </li>
        </ul>
        <button
          ref="fileInput"
          @click.prevent="toggler()"
          aria-label="menu"
          class="navbar-toggler rounded-circle navbar-toggler-c"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarScroll"
        >
          <span v-if="btnToggler" class="navbar-toggler-icon"></span>
          <span v-if="!btnToggler"><i class="fa-solid fa-close" style="line-height: inherit"></i></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarScroll" ref="nav">
          <ul class="navbar-nav my-xl-0 w-100 align-middle me-0 me-xl-2 pe-0 pe-xl-3">
            <li v-if="user" class="nav-item dropdown py-xl-1 position-relative d-block d-xl-none">
              <div class="row">
                <div class="col-12 me-0 pt-4 pt-md-0 pb-md-0 pb-4">
                  <router-link
                    class="nav-link fw-bold dropdown-toggle g-0 p-0 pt-2 m-0"
                    to="#"
                    id="navbarScrollingDropdown1"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <div class="float-end">
                      <img
                        v-if="!user.avatar"
                        class="logo-katchen pt-2"
                        src="/web-asset/img/person-circle.png"
                        alt="person-circle"
                      />
                      <img
                        v-if="user.avatar"
                        class="logo-profile rounded-circle"
                        :src="user.avatar"
                        alt="person-circle"
                      />
                      <div class="clearfix"></div>
                    </div>

                    <div class="text-primary fs-4 pe-2">
                      <span class="pe-2">مرحباَ {{ user.firstname }}</span
                      ><i class="fa-solid fa-angle-down float-start ps-4 mt-3"></i>
                    </div>
                  </router-link>
                  <div class="badge rounded-pill bg-secondary p-2 px-4 me-0 me-md-5">
                    {{ subscription | fixTitelFilter }}
                  </div>
                  <ul
                    class="dropdown-menu mt-3 text-end shadow rounded-btn border-none"
                    aria-labelledby="navbarScrollingDropdown1 "
                  >
                    <li><router-link class="dropdown-item" to="/profile">حسابي</router-link></li>
                    <li><button @click.prevent="logout()" class="dropdown-item">تسجيل الخروج</button></li>
                  </ul>
                </div>
              </div>
            </li>
            <li class="nav-item px-xl-2 py-xl-3 d-block d-xl-none align-middle" v-for="tap in taps" :key="tap.id">
              <router-link
                class="nav-link fw-bold"
                :to="{ name: tap.element }"><div class="fs-16" @click="trigger">
                  {{ code =='ar' ? tap.nameAr : tap.nameEn }}
                </div></router-link
              >
      
            </li>
            <li
              class="nav-item px-xl-2 pb-xl-4 pt-xl-4 d-none d-xl-block align-middle"
              v-for="(tap,index) in taps"
              :key="index"
            >
              <router-link
                class="nav-link fw-bold fs-16"
                :to="{ name: tap.element }">  {{ code =='ar' ? tap.nameAr : tap.nameEn }}</router-link
              >
         
            </li>
            <li class="nav-item dropdown ms-xl-auto pb-xl-4 pt-xl-4 d-none d-xl-block">
              <a
                class="nav-link fw-bolder fs-6 dropdown-toggle"
                id="navbarScrollingDropdown1"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                style="color: #20211f !important "
              >
                {{ value }} <i class="fa-solid fa-angle-down me-2 ms-3 text-gray-90"></i>
              </a>
              <ul
                class="dropdown-menu text-end shadow rounded-btn border-none"
                aria-labelledby="navbarScrollingDropdown1"
              >
                <li v-for="lang in language" :key="lang.id">
                  <button
                    v-if="value != lang.name"
                    @click="changelang(lang.name, lang.code)"
                    class="dropdown-item"
                  >
                    {{ lang.name }}
                  </button>
                </li>
              </ul>
            </li>
            <li v-if="!user" class="nav-item" style="padding: 1.3rem 0">
              <hr class="d-block d-xl-none" />
              <router-link
                class="btn btn-light btn-w mx-md-2 px-3 text-white rounded-btn signInBtn d-flex justify-content-center align-items-center"
                :to="{ name: 'login' }"
              >
                <span class="mx-1"> {{ $t('login')}}</span>
              </router-link>
            </li>
            <!-- <li v-if="!user" class="nav-item py-xl-4">
                    <router-link class="btn btn-primary  btn-w mx-md-2 fw-bold px-3 rounded-btn" :to="{ name: 'register'}" style="color: #fff !important;">إنشاء حساب</router-link>
                    </li> -->
            <li v-if="user" class="nav-item dropdown py-xl-1 position-relative d-none d-xl-block">
              <router-link
                class="nav-link fw-bold dropdown-toggle g-0 p-0 pt-2"
                to="#"
                id="navbarScrollingDropdown1"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <img
                  v-if="!user.avatar"
                  class="logo-katchen pt-2"
                  src="/web-asset/img/person-circle.png"
                  alt="person-circle"
                />
                <img v-if="user.avatar" class="logo-profile rounded-circle" :src="user.avatar" alt="person-circle" />
                <b class="text-gray-90 me-2"
                  >{{ user.email | truncateEn(14) }} <i class="fa-solid fa-angle-down me-2"></i>
                </b>
              </router-link>
              <div class="badge rounded-pill bg-secondary p-2 px-4 me-5 fixlable">
                {{ subscription | fixTitelFilter }}
              </div>
              <ul
                class="dropdown-menu text-end shadow rounded-btn border-none"
                aria-labelledby="navbarScrollingDropdown1"
              >
                <li><router-link class="dropdown-item" to="/profile">حسابي</router-link></li>
                <li><button @click.prevent="logout()" class="dropdown-item">تسجيل الخروج</button></li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </section>
</template>
<script>
import ClickOutside from 'vue-click-outside'
import signInSvg from '../pages/accessories/svg/signInSvg.vue'
import massageComplete from '../pages/accessories/massageComplete.vue'

export default {
  components: {
    signInSvg,
    massageComplete,
  },
  mounted() {
    // prevent click outside event with popupItem.
    this.popupItem = this.$el
  },

  // do not forget this section
  directives: {
    ClickOutside,
  },
  data() {
    return {
      langLocation: '',
      btnToggler: true,
      close: 0,
      x: document.body.offsetWidth,
      language: [
        { id: '1', code: 'ar', name: 'عربي' },
        { id: '2', code: 'en', name: 'English' },
      ],
      value: 'عربي',
      user: this.$store.state.user,
      subscription: '',
      taps: [
        {
          nameAr: 'مطبخك',
          nameEn: 'Kitchen',
          type: 'header',
          title: 'مطبخك',
          elementType: 'link',
          element: '/',
          order: 1,
          status: 'active',
        },
        {
          nameAr: 'خدماتنا',
          nameEn: 'Services',
          type: 'header',
          elementType: 'link',
          status: 'active',
          element: 'categories',
          order: 2,
        },
        {
          nameAr: 'من نحن',
          nameEn: 'About Us',
          type: 'header',
          elementType: 'link',
          order: 3,
          element: 'subscriptions',
          status: 'active',
          id: 553410,
        },
        {
          nameAr: 'تواصل معنا',
          nameEn: 'Contact Us',
          type: 'header',
          elementType: 'link',
          element: 'addCharacter',
          order: 4,
          status: 'active',
        },
      ],
      code: this.$route.meta.code
        ? this.$route.meta.code
        : this.$store.getters.langFilter
        ? this.$store.getters.langFilter
        : 'ar',
    }
  },
  methods: {
    userSubscriptionIsGoldSub() {
      try {
        if (this.subscription) {
          return this.subscription.plan.package.is_paid == 1 ? true : false
        }
        return false
      } catch (error) {
        return false
      }
    },
    complete() {
      try {
        if (localStorage.getItem('completeMassage') == 'false' && this.user) {
          const content = {
            component: massageComplete,
            listeners: {
              click: () => {
                this.$router.push('/profile')
              },
            },
          }
          this.$toast(content)
          localStorage.setItem('completeMassage', true)
        }
      } catch (error) {}
    },
    getsubscription() {
      if (this.user) {
        this.httpSp.get('/web/subscriptions_by_user/' + this.$store.state.user.id).then(async (response) => {
          try {
            if (response.data.length) {
              this.subscription = response.data[0]

              this.$store.state.subscription = response.data[0]
              localStorage.setItem('subscription', JSON.stringify(response.data[0]))
              // this.$cookies.set('subscription',response.data[0])
            }
          } catch {
            console.log('erorr')
          }
          this.loading = false
        })
      }
      try {
        this.$cookies.remove('subscription')
      } catch (error) {}
    },
    toggler() {
      if (this.btnToggler) {
        this.btnToggler = false
      } else {
        this.btnToggler = true
      }
    },
    trigger() {
      this.$refs.fileInput.click()
    },
    hide() {
      if (window.innerWidth < 963) {
        this.$refs.nav.classList.remove('show')
        if (this.btnToggler == false) {
          this.btnToggler = true
        }
      }
    },

    getCountries() {
          try {
            this.code = this.$store.state.langFilter
            this.value = this.language.filter((item) => {
              return item.code == this.code.toLowerCase()
            })[0].name
          } catch {
            this.value = this.language.filter((item) => {
              return item.code == 'ar'
            })[0].name
      
          }
     
    },

    logout: function () {
      localStorage.removeItem('isLoggedIn')
      localStorage.removeItem('tokenWeb')
      localStorage.removeItem('userWeb')
      localStorage.removeItem('subscription')
      this.$cookies.remove('token')
      this.$cookies.set('isLoggedIn', false)
      this.$cookies.remove('userWeb')
      this.$cookies.remove('subscription')
      this.$store.state.subscription = ''
      this.$store.state.user = ''
      this.$router.go()
    },

    changelang(v, c) {
      this.value = v
      this.$i18n.locale = c
      this.$cookies.set('selectedlang', c)
      this.$store.state.langFilter = c
      this.$router.push('/').catch((err) => {
        this.$router.go()
      })
    },
  },
  filters: {
    fixTitelFilter: function (string) {
      if (!string) return ''
      if (string) {
        try {
          if (string.plan.title) return string.plan.title
          if (string.plan.package.name) return string.plan.package.name
        } catch (error) {
          return ''
        }
      }
      return ''
    },
    truncateEn: function (text, length, clamp) {
      clamp = clamp || '....'
      var node = document.createElement('div')
      node.innerHTML = text
      var content = node.textContent
      return content.length > length ? clamp + content.slice(0, length) : content
    },
  },

  mounted() {
    this.complete()
    this.getsubscription()
    this.getCountries()
  },
  computed: {
    name: {
      get() {
        return this.$store.getters['langFilter'].name
      },
      set(code) {
        return this.$store.dispatch('langFilter', code)
      },
    },
  },
}
</script>
<style scoped>
.header {
  padding-bottom: 3.5rem;
}
.navbar-toggler-c {
  width: 40px;
  height: 40px;
  line-height: 40px;
  padding: 0;
}
.logo-katchen {
  max-width: 100px;
}
.fs-c {
  font-size: 16px;
}
.logo-profile {
  width: 42px;
  height: 42px;
  margin-top: 8px;
  object-fit: cover;
}

.dropdown-toggle::after {
  display: none !important;
}
.navbar-toggler-icon {
  width: 20px;
  height: 20px;
  background-repeat: no-repeat;
  background-position: center;
  background-size: 100%;
  text-align: center;
  margin: auto;
  display: block;
}
@media screen and (max-width: 480px) {
  .logo-katchen {
    max-width: 60px;
  }
  .logo-profile {
    width: 64px;
    height: 64px;
    margin-top: 0;
    object-fit: cover;
  }
}
@media screen and (max-width: 776px) {
  .navbar-brand {
    margin: 0;
  }
}
@media screen and (max-width: 1199px) {
  .navbar-brand {
    margin-right: 0rem;
    margin: 10px 0;
  }
  .btn-w {
    width: 100%;
    margin-top: 15px;
  }
  .navbar-nav-p {
    padding: 20px !important;
  }
  .navbar-nav {
    padding: 0;
    margin-right: auto;
    padding-left: 15px;
  }
}
.shadow-c {
  box-shadow: 0 0.5rem 1rem rgb(0 0 0 / 2%) !important;
}
.fixlable {
  position: absolute;
  top: 50px;
}
.navbar-brand {
  margin-right: 0rem;
}
hr {
  opacity: 0.1;
}
</style>
