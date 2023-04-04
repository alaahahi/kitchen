<template>
  <div>
    <div class="bg-white">
      <div class="container bg-white">
        <breadcrumb :data="breadcrumbLsit" />
        <div class="row py-3">
          <div class="col-md-4 p-5">
            <div
              class="card rounded-btn border py-3 rounded-btn-img"
              style="box-shadow: 0px 0px 24px rgba(32, 33, 31, 0.06)"
            >
              <ul class="nav flex-column">
                <li class="nav-item">
                  <a
                    class="nav-link fw-bold"
                    href=""
                    @click.prevent="goto(1)"
                    :class="currentPage == 1 ? 'router-link-exact-active' : ''"
                  >
                    <img
                      v-if="currentPage != 1"
                      class="float-end ps-3"
                      src="/web-asset/img/allIconaddc.png"
                      alt="video Iconaddch"
                    />
                    <img
                      v-if="currentPage == 1"
                      class="float-end ps-3"
                      src="/web-asset/img/allIconaddch.png"
                      alt="video Iconaddch"
                    />
                    معلومات المؤسسة
                  </a>
                </li>

                <li class="nav-item">
                  <a
                    class="nav-link fw-bold"
                    href=""
                    @click.prevent="goto(2)"
                    :class="currentPage == 2 ? 'router-link-exact-active' : ''"
                  >
                    <img
                      v-if="currentPage != 2"
                      class="float-end ps-3 mt-1"
                      src="/web-asset/img/Iconcontent.png"
                      alt="video Iconaddch"
                    />
                    <img
                      v-if="currentPage == 2"
                      class="float-end ps-3 mt-1"
                      src="/web-asset/img/Iconcontent-b.png"
                      alt="video Iconaddch"
                    />
                    إضافة المحتوى
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div class="col-md-8">
            <div class="pb-2">
              <img
                v-if="!company.image"
                class="float-end ps-3"
                src="/web-asset/img/company-logo.png"
                alt="logo ManHOM"
              />
              <img
                class="float-end ps-3"
                v-if="company.image"
                :src="company.image"
                style="max-width: 115px"
                alt="logo ManHOM"
              />

              <span :class="{ 'spinner-border spinner-border-sm': loading }"></span>
              <input
                id="files"
                type="file"
                @change="upload_avatar"
                class="d-none"
                name="avatar"
                ref="fileInput"
                accept="image/png, image/gif, image/jpeg"
              />
              <div class="clearfix">
                <h4>شعار المؤسسة</h4>
                <p class="text-black-80">هذه الصورة تكون في الملف الشخصي للمؤسسة وليس لها علاقة بصورة حسابك</p>
                <p class="text-black-80 fw-light">يمكنك تحميل الصورة بصيغة PNG, JPG, JPEG بحد أقصى 2 ميغا للصورة.</p>
                <button class="btn btn-primary px-4 fw-bold rounded-btn" @click="trigger">تغيير الصورة</button>
                <a
                  class="fw-bold px-4 fs-5link-primary text-decoration-none"
                  @click.prevent="reset_image()"
                  href=""
                  >حذف
                </a>
              </div>
            </div>
            <div class="card border px-4 rounded-btn-img" style="box-shadow: 0px 0px 24px rgba(32, 33, 31, 0.06)">
              <form v-on:submit.prevent="postCompany()">
                <div class="row" v-if="currentPage == 1">
                  <h4 class="py-3">معلومات المؤسسة</h4>
                  <div class="mb-3 col-md-6">
                    <label for="nameAR" class="form-label" required>اسم المؤسسة </label>
                    <input type="text" class="form-control" v-model="company.nameAR" />
                    <div class="text-danger pt-1 fs-7" v-if="!company.nameAR">مطلوب</div>
                  </div>
                  <div class="mb-3 col-md-6">
                    <label for="nameEN" class="form-label" required>اسم المؤسسة بالإنكليزي</label>
                    <input type="text" class="form-control" v-model="company.nameEN" />
                  </div>
                  <div class="mb-3 col-md-6">
                    <label for="country" class="form-label" required>الدولة </label>
                    <model-list-select
                      :list="countries"
                      v-model="company.country"
                      option-value="id"
                      option-text="country_name"
                      placeholder="اختر البلد"
                      class="form-select j-country-selects-31"
                      v-on:input="select_change('model-list')"
                      id="model-list"
                    >
                    </model-list-select>
                    <div class="text-danger pt-1 fs-7" v-if="!company.country">مطلوب</div>
                  </div>
                  <div class="mb-3 col-md-6">
                    <label for="location" class="form-label" required>دولة الفرع الرئيسي</label>
                    <model-list-select
                      :list="countries"
                      v-model="company.location"
                      option-value="id"
                      option-text="country_name"
                      placeholder="اختر دولة الفرع الرئيسي"
                      class="form-select j-country-selects-31"
                      v-on:input="select_change('model-list1')"
                      id="model-list1"
                    >
                    </model-list-select>
                  </div>
                  <div class="mb-3 col-md-12">
                    <label for="formGroupExampleInput" class="form-label" required>تصنيف المؤسسة</label>
                    <model-list-select
                      :list="categorys"
                      v-model="company.category"
                      option-value="id"
                      option-text="name"
                      placeholder="اختر تصنيف المؤسسة"
                      class="form-select j-country-selects-31"
                      v-on:input="select_change('model-list2')"
                      id="model-list2"
                    >
                    </model-list-select>
                  </div>

                  <div class="mb-3 col-md-12" @click.prevent="onSelect()">
                    <label for="formGroupExampleInput" class="form-label" required>تخصصات المؤسسة</label>
                    <model-list-select
                      :list="subCategorys"
                      v-model="company.subCategory"
                      option-value="id"
                      option-text="name"
                      placeholder="أدخل تخصصات المؤسسة"
                      class="form-select j-country-selects-31"
                      v-on:input="select_change('model-list3')"
                      id="model-list3"
                    >
                    </model-list-select>
                  </div>
                  <!--
                  <div class="mb-3 col-md-12">
                    <label
                      for="formGroupExampleInput"
                      class="form-label"
                      required
                      >حجم المؤسسة</label
                    >
                    <select
                      v-model="company.size"
                      class="form-select form-select"
                      aria-label=".form-select-sm example"
                    >
                      <option value="" disabled>اختر حجم المؤسسة</option>
                      <option value="0">مصر</option>
                      <option value="1">الإمارات العربية المتحدة</option>
                      <option value="2">سوريا</option>
                      <option value="3">العراق</option>
                    </select>
                  </div>
                  -->
                  <h4 class="py-3">معلومات التواصل</h4>
                  <div class="mb-3 row">
                    <label for="formGroupExampleInput" class="form-label">رقم الهاتف</label>

                    <div class="col-lg-9 col-md-8 col-sm-7 col-6">
                      <input
                        type="number"
                        class="form-control mt-2 text-end"
                        v-model="company.phone"
                        style="direction: ltr"
                      />
                    </div>
                    <div class="col-lg-3 col-md-4 col-sm-5 col-6">
                      <select v-model="company.code" class="form-select mt-2" aria-label=".form-select-sm example">
                        <option value="" disabled>الرمز الدولي</option>
                        <option
                          class="contact_dir"
                          v-for="country in countries"
                          :key="country.id"
                          :value="country.call_code"
                          v-show="country.call_code"
                        >
                          {{ country.call_code }}
                        </option>
                      </select>
                    </div>
                  </div>
                  <div class="mb-3 col-md-6">
                    <label for="formGroupExampleInput" class="form-label"> عنوان الشركة </label>
                    <input type="text" class="form-control" v-model="company.company_address" />
                  </div>
                  <div class="mb-3 col-md-6">
                    <label for="formGroupExampleInput" class="form-label">الموقع الإلكتروني </label>
                    <input type="text" class="form-control" v-model="company.website" />
                  </div>
                  <div class="mb-3 col-md-12">
                    <label for="formGroupExampleInput" class="form-label" required>البريد الإلكتروني </label>
                    <input type="email" class="form-control" v-model="company.email" />
                    <div class="text-danger pt-1 fs-7" v-if="!company.email">مطلوب</div>
                    <div class="text-danger py-2 fs-7" v-if="!validEmail(company.email) && company.email">
                      يرجى التأكد من الإيميل
                    </div>
                  </div>
                </div>
                <div class="row" v-if="currentPage == 2">
                  <h4 class="py-3">إضافة محتوى</h4>

                  <div class="mb-3 col-md-12">
                    <textarea
                      type="text"
                      class="form-control"
                      style="height: 104"
                      v-model="company.Information"
                      placeholder="إكتب التفاصيل هنا"
                    />
                  </div>
                </div>
                <div class="mb-3 col-md-12 text-xl-end text-center">
                  <button v-if="currentPage == 1" class="btn btn-primary border px-4 fw-bold" @click.prevent="submit()">
                    متابعة
                  </button>
                  <input
                    v-if="currentPage == 2"
                    type="submit"
                    class="btn btn-primary border px-4 rounded-btn fw-bold"
                    value="حفظ وإنهاء البيانات"
                  />
                </div>
              </form>
              <div
                class="alert alert-danger alert-dismissible fade show text-center"
                role="alert"
                v-if="submitStatus === 'ERROR'"
              >
                <strong>يرجى ملء جميع الحقول المطلوبة</strong>
              </div>
              <div
                class="alert alert-info alert-dismissible fade show text-center"
                role="alert"
                v-if="submitStatus === 'PENDING'"
              >
                <strong>يرجى الإنتظار</strong>
              </div>
              <div>
                <div
                  v-for="(erro, i) in error"
                  :index="i"
                  :key="i"
                  class="alert alert-warning alert-dismissible fade show"
                  role="alert"
                >
                  <strong
                    >{{ erro[0] == 'The name a r field is required.' ? 'يرحى إدخال اسم المؤسسة  بالعربي' : '' }}
                  </strong>
                  <strong>{{ erro[0] == 'The country field is required.' ? 'يرحى إختيار الدولة' : '' }} </strong>
                  <strong
                    >{{ erro[0] == 'The email must be a valid email address.' ? 'يرحى إدخال البريد الإلكتروني' : '' }}
                  </strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import breadcrumb from '../pages/accessories/breadcrumb.vue'
import { ModelListSelect } from 'vue-search-select'
import 'vue-search-select/dist/VueSearchSelect.css'
export default {
  components: {
    breadcrumb,
    ModelListSelect,
  },
  data() {
    return {
      loading: false,
      loadingsave: false,
      token: this.$store.state.token,
      company: {
        nameAR: '',
        nameEN: '',
        country: '',
        code: '',
        location: '',
        category: 0,
        subCategory: 0,
        zipcode: '',
        Information: '',
        phone: '',
        email: '',
        image: '',
        status: 'waiting',
        mailBox: '143505',
        website: '',
        company_address: '',
        user_id: this.$store.state.user.id,
        userEmail: this.$store.state.user.email,
        userName: this.$store.state.user.firstname + ' ' + this.$store.state.user.lastname,
      },
      submitStatus: '',
      dataimage: '',
      categorys: [],
      subCategorys: [],
      countries: [],
      currentPage: 1,
      error: [],

      breadcrumbLsit: [
        {
          name: 'الرئيسية',
          link: '/',
        },
        {
          name: 'إضافة مؤسسة',
          link: '/addCompany',
        },
      ],
    }
  },
  methods: {
    reset_image(){
        this.company.image = '';
        this.dataimage = ''; 
        this.$refs.fileInput.value = '';
      }, 
    select_change(id) {
      let el = document.getElementById(id)
      el.blur()
    },
    onSelect() {
      this.getsubCategorys()
    },
    goto(v) {
      this.currentPage = v
    },
    next() {
      this.currentPage++
    },
    touch() {
      if (this.company.nameAR && this.company.country && this.company.email && this.validEmail(this.company.email)) {
        return true
      } else {
        return false
      }
    },
    validEmail(email) {
      var re =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      return re.test(email)
    },
    submit() {
      console.log(this.touch())
      if (!this.touch()) {
        this.submitStatus = 'ERROR'
        this.currentPage = 1
      } else {
        this.submitStatus = ''
        this.next()
      }
    },
    postCompany() {
      this.submitStatus = 'PENDING'
      this.loadingsave = true
      this.error = []
      let formData = new FormData()
      formData.append('nameAR', this.company.nameAR)
      formData.append('nameEN', this.company.nameEN)
      formData.append('country', this.company.country)
      formData.append('location', this.company.location)
      formData.append('category', this.company.category)
      formData.append('subCategory', this.company.subCategory)
      formData.append('zipcode', this.company.zipcode)
      formData.append('company_address', this.company.company_address)
      formData.append('phone', this.company.code + this.company.phone)
      formData.append('email', this.company.email)
      formData.append('image', this.dataimage)
      formData.append('status', this.company.status)
      formData.append('Information', this.company.Information)
      formData.append('website', this.company.website)
      formData.append('user_id', this.company.user_id)
      formData.append('userEmail', this.company.userEmail)
      formData.append('userName', this.company.userName)
      this.httpIm
      .post('/user_info',{'social_token':this.token}, { headers: { Authorization: `Bearer ${this.token}` } })
        .then(async (response) => {
          if (response.data.user.add_company_allowed == 1) {
            this.http
              .post('/RequestAddCompany/store', formData, { Accept: 'application/json;multipart/form-data' })
              .then(async (response) => {
                this.loadingsave = false
                if (response.data.email) {
                  this.$toast.success('تم الحفظ, سوف يتم مراجعة الطلب من قبل المدير')
                  setTimeout(() => {
                    this.$router.push('/')
                  }, 1000)
                  this.company = {}
                } else {
                  this.error = response.data.errorMessage
                }
              })
              .catch((error) => {
                this.loadingsave = false
                if (error) {
                  this.$toast.error('نعتذر حدث خطأ أثناء الحقظ')
                  console.log(error)
                }
              })
          } else {
            this.submitStatus = ''
            this.$toast.warning('يجب عليك اكمال معلوماتك أولا لإضافة الشركة')
          }
        })
        .catch((error) => {
          this.$toast.error('نعتذر حدث خطأ أثناء الحقظ')
        })
    },
    getcategory() {
      this.http.get('/allcategories?type=company').then(async (response) => {
        this.categorys = response.data.items
      })
    },
    getsubCategorys() {
      this.http.get('/category/show/' + this.company.category).then(async (response) => {
        this.subCategorys = response.data.subCategories
      })
    },
    getcountry() {
      this.httpMg.get('/countries').then(async (response) => {
        //this.countries=response.data.countries
        this.countries = this._.orderBy(response.data.countries, 'call_code', 'asc')
      })
    },
    trigger() {
      this.$refs.fileInput.click()
    },
    upload_avatar(e) {
      //this.loading=true
      let file = e.target.files[0]
      console.log(file)
      //    let formData = new FormData();
      //  formData.append(this.company);
      let reader = new FileReader()
      if (file['size'] < 2111775) {
        reader.onloadend = (file) => {
          this.company.image = reader.result
        }
        this.dataimage = file
        reader.readAsDataURL(file)
      } else {
        this.$toast.error('نعتذر , مطلوب صورة ذو حجم اقل من 2 ميغا')
        this.company.image = null
      }
    },
  },

  created() {
    this.getcategory()
    this.getcountry()
  },
}
</script>
<style >
.ui.search.dropdown > input.search {
  top: -8px !important;
}
.ui.search.selection.dropdown > input.search,
.ui.search.selection.dropdown > span.sizer {
  padding: 0;
}
.ui.selection.dropdown,
.item {
  text-align: right !important;
}
.ui.dropdown:not(.button) > .default.text {
  color: #000;
}
</style>
<style scoped>
.form-select {
  border: 1px solid #ced4da;
}
start-0-c {
  left: 15px !important;
}
.nav-link.router-link-exact-active {
  border-radius: 20px 0px 0px 20px;
  background-color: #4B91F12e;
  border-right: 5px #4B91F1 solid;
  color: #4B91F1;
  font-weight: bold;
}
.rdir {
  direction: ltr;
  padding: 20px 0px 20px 20px;
}
.profImg {
  width: 40px;
}
.dropdown-toggle1::after {
  display: none !important;
}
.form-check .form-check-input {
  float: none;
  margin-left: 0;
}
.form-select,
.form-control {
  background-color: #fff;
  border-radius: 0.5rem;
}
.form-label {
  font-weight: bold;
}
.nav.flex-column {
  padding-inline-end: 20px;
  padding-inline-start: 0;
}
.nav.flex-column > .nav-item > .nav-link {
  color: #4f4f4f;
}
</style>