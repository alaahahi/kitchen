<template>
  <div class="h-100" style="margin-bottom: -3rem">
    <div class="container-fluid h-100">
      <div class="row bg-light bg-gradient h-100">
        <div class="col-md-6 mt-2 d-block d-lg-none">
          <div class="row mt-2 flex-row-reverse">
            <div class="col-md-10 text-center">
              <router-link to="/"
                ><img style="width: 140px" src="/web-asset/img/logo.png" alt="logo ManHOM"
              /></router-link>
            </div>
          </div>
          <authSlider />
        </div>
        <div class="col-md-6 bg-white" v-if="page == 1">
          <div class="row flex-row-reverse mb-4">
            <div class="col-md-10">
              <h4 v-if="!massage" class="text-gray-60 pt-4 text-header text-center text-md-end">
                تسجيل الدخول أو إنشاء حساب
              </h4>
              <h4 v-if="massage" class="text-gray-60 pt-4 text-header text-center text-md-end">{{ massage }}</h4>
            </div>
          </div>
          <div class="row flex-row-reverse">
            <div class="col-md-10 text-center text-md-end">
              <button
                class="btn btn-light input-reg border bg-white w-74"
                @click="AuthProvider('google')"
                style="color: #222222; line-height: 30px"
              >
                <svg
                  class="float-end m-1"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect width="24" height="24" fill="white" />
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M23.04 12.2615C23.04 11.446 22.9668 10.6619 22.8309 9.90918H12V14.3576H18.1891C17.9225 15.7951 17.1123 17.013 15.8943 17.8285V20.714H19.6109C21.7855 18.7119 23.04 15.7637 23.04 12.2615Z"
                    fill="#4285F4"
                  />
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M12 23.4996C15.105 23.4996 17.7081 22.4698 19.6109 20.7134L15.8943 17.828C14.8645 18.518 13.5472 18.9257 12 18.9257C9.00474 18.9257 6.46951 16.9028 5.56519 14.1846H1.72314V17.1641C3.61542 20.9225 7.50451 23.4996 12 23.4996Z"
                    fill="#34A853"
                  />
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M5.56523 14.1855C5.33523 13.4955 5.20455 12.7584 5.20455 12.0005C5.20455 11.2425 5.33523 10.5055 5.56523 9.81548V6.83594H1.72318C0.944318 8.38844 0.5 10.1448 0.5 12.0005C0.5 13.8562 0.944318 15.6125 1.72318 17.165L5.56523 14.1855Z"
                    fill="#FBBC05"
                  />
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M12 5.07386C13.6884 5.07386 15.2043 5.65409 16.3961 6.79364L19.6945 3.49523C17.7029 1.63955 15.0997 0.5 12 0.5C7.50451 0.5 3.61542 3.07705 1.72314 6.83545L5.56519 9.815C6.46951 7.09682 9.00474 5.07386 12 5.07386Z"
                    fill="#EA4335"
                  />
                </svg>
                المتابعة باستخدام جوجل
                <span :class="{ 'spinner-border spinner-border-sm': loading == 'google' }"></span>
              </button>
              <!--    <button class="btn btn-info w-75 my-4 text-white" disabled><i class="fa-brands fa-twitter text-white float-end m-1"></i> المتابعة بإستخدام Twitter </button> -->
              <button
                class="btn btn-primary input-reg mt-3 w-74"
                @click="AuthProvider('facebook')"
                style="color: #fff; background-color: #1877f2 !important; line-height: 30px"
              >
                <svg
                  class="float-end m-1"
                  width="23"
                  height="23"
                  viewBox="0 0 23 23"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M23 12.0694C23 5.71811 17.8513 0.569391 11.5 0.569391C5.14872 0.569391 0 5.71811 0 12.0694C0 17.8094 4.20538 22.567 9.70312 23.4297V15.3936H6.7832V12.0694H9.70312V9.5358C9.70312 6.65361 11.42 5.06158 14.0468 5.06158C15.305 5.06158 16.6211 5.28619 16.6211 5.28619V8.11627H15.171C13.7424 8.11627 13.2969 9.00273 13.2969 9.91218V12.0694H16.4863L15.9765 15.3936H13.2969V23.4297C18.7946 22.567 23 17.8094 23 12.0694Z"
                    fill="white"
                  />
                </svg>

                المتابعة باستخدام فيسبوك
                <span :class="{ 'spinner-border spinner-border-sm': loading == 'facebook' }"></span>
              </button>
              <h1 class="fs-6 gray-light my-2 py-5 w-74 m-auto m-md-0"><span style="color: #717173">أو </span></h1>

              <div class="w-74 m-auto m-md-0">
                <label for="email" class="form-label"
                  >البريد الإلكتروني <span v-if="!validEmail(email)">*</span>
                </label>

                <div class="input-group has-validation m-auto m-md-0">
                  <input
                    type="email"
                    v-model="email"
                    class="form-control input-reg bg-white"
                    :class="!validEmail(email) ? '' : 'is-valid'"
                  />
                </div>
                <div class="text-danger pt-3 fs-7" v-if="!validEmail(email) && email">يرجى التأكد من الإيميل</div>
              </div>
              <div class="my-4">
                <button
                  @click="go()"
                  class="btn btn-primary w-74 input-reg m-auto m-md-0"
                  type="submit"
                  :disabled="submitStatus === 'PENDING'"
                >
                  التالي
                  <span :class="{ 'spinner-border spinner-border-sm': loadings }"></span>
                </button>
              </div>
              <div
                class="alert alert-danger alert-dismissible fade show w-74 text-center mt-2"
                role="alert"
                v-if="submitStatus === 'ERROR'"
              >
                <strong>يرجى ملء حقل البريد الإلكتروني </strong>
              </div>
              <div
                class="alert alert-info alert-dismissible fade show w-74 text-center mt-2"
                role="alert"
                v-if="submitStatus === 'PENDING'"
              >
                <strong>يرجى الإنتظار</strong>
              </div>
              <div class="m-auto m-md-0">
                <p class="text-center text-md-end">
                  عند تسجيلك في من هم أنت موافق على
                  <span class="text-gray-900" style="text-decoration: underline"> الشروط والأحكام</span>
                  ،
                  <span class="text-gray-900" style="text-decoration: underline"> وسياسة الخصوصية</span>
                  .
                </p>
              </div>
              <div></div>
            </div>
          </div>
        </div>
        <div class="col-md-6 bg-white" v-if="page == 2">
          <div class="row flex-row-reverse mb-4">
            <div class="col-md-10">
              <h4 class="text-gray-60 pt-4 text-header text-center text-md-end">مرحبا بك،</h4>
              <div class="text-gray-80 fw-bold text-center text-md-end">{{ email }}</div>
              <p class="text-gray-900 pt-3 fw-bold text-center text-md-end">خطوة واحدة متبقية لإنشاء حساب جديد</p>
            </div>
          </div>
          <div class="row flex-row-reverse">
            <div class="col-md-10 text-center text-md-end">
              <form @submit.prevent="submit">
                <div class="w-74 text-center m-auto m-md-0">
                  <input
                    type="file"
                    @change="upload_avatar"
                    class="d-none"
                    name="avatar"
                    ref="fileInput"
                    accept="image/jpeg,image/png,image/jpg;"
                  />
                  <img
                    v-if="!user.avatar"
                    class="avatar rounded-circle"
                    src="/web-asset/img/upNew.png"
                    alt="logo ManHOM"
                    @click="trigger"
                    width="80px"
                  />
                  <img
                    class="avatar rounded-circle"
                    v-if="user.avatar"
                    width="80px"
                    :src="user.avatar"
                    alt="logo ManHOM"
                    @click="trigger"
                    style="min-height: 80px; object-fit: cover"
                  />
                  <div
                    class="d-flex justify-content-center align-items-center mt-2"
                    style="color: #828282; font-size: 14px"
                  >
                    (إختياري)
                  </div>
                  <div class="d-flex justify-content-center align-items-center mt-2" v-if="loading">
                    <span>جاري تحميل الصورة</span>
                    <span class="spinner-border spinner-border-sm me-2" style="color: #4169e3"></span>
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-12 pt-2">
                    <div>
                      <label for="firstname" class="form-label"
                        >الاسم <span v-if="!(user.firstname?.length > 2)">*</span></label
                      >
                      <div class="input-group has-validation w-75 m-auto m-md-0">
                        <input
                          type="text"
                          v-model="user.firstname"
                          class="form-control w-75 bg-white input-reg"
                          placeholder="أدخل الاسم"
                        />
                      </div>
                      <div class="text-danger pt-1 pt-1 fs-7" v-if="user.firstname && !(user.firstname?.length > 2)">
                        مطلوب أكثر من 3 حروف.
                      </div>
                    </div>
                  </div>
                </div>
                <div class="row mt-3">
                  <div class="col-md-12">
                    <label for="lastname" class="form-label"
                      >الكنية<span v-if="!(user.lastname?.length > 2)">*</span></label
                    >
                    <div class="input-group has-validation w-75 m-auto m-md-0">
                      <input
                        type="text"
                        v-model="user.lastname"
                        class="form-control w-75 bg-white input-reg"
                        placeholder="أدخل الكنية"
                      />
                    </div>
                    <div class="text-danger pt-1 fs-7" v-if="user.lastname && !(user.lastname?.length > 2)">
                      مطلوب أكثر من 3 حروف.
                    </div>
                  </div>
                </div>
                <div class="row mt-3">
                  <div class="col-md-12">
                    <label for="country" class="form-label">الدولة</label>
                    <span v-if="!user.nationality">*</span>
                    <model-list-select
                      :list="countries"
                      v-model="user.nationality"
                      option-value="id"
                      option-text="country_name"
                      placeholder="إختر الدولة"
                      style="border-radius: 8px !important"
                      class="form-select bg-white w-75 m-auto m-md-0 input-reg country-selects"
                    >
                    </model-list-select>
                  </div>
                </div>

                <div class="row mt-3">
                  <div class="col-md-12">
                    <label for="company" class="form-label">المؤسسة</label>
                    <span v-if="!user.company_id || !text">*</span>
                    <div class="input-group has-validation w-75 m-auto m-md-0 input-reg">
                      <input
                        @keyup="getResults()"
                        type="text"
                        v-model="text"
                        class="form-control w-75 bg-white"
                        placeholder="أبحث عن مؤسسة"
                      />
                    </div>
                    <div v-if="hide" class="col-12 shadow-sm w-75" style="z-index: 75">
                      <div
                        class="dyn-height rounded-btn-img mt-1"
                        style="background-color: #fff; box-shadow: 0px 0px 10px 3px rgb(0 0 0 / 10%)"
                      >
                        <div class="p-1" v-for="result in resultsCompany" :key="result.id">
                          <div
                            class="row py-1"
                            @click.prevent="
                              text = result.name
                              hide = false
                              user.company_id = result.id
                            "
                          >
                            <div class="col-12">
                              <div class="pt-2 pe-4">
                                <a href="" class="text-gray-90 card-title fs-6">
                                  {{ result.name }}
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="row mt-3">
                  <div class="col-md-12">
                    <label for="occupation" class="form-label">المنصب<span v-if="!user.occupation">*</span> </label>

                    <div class="input-group has-validation w-75 m-auto m-md-0 input-reg">
                      <input
                        type="text"
                        v-model="user.occupation"
                        class="form-control w-75 bg-white"
                        placeholder="المنصب"
                      />
                    </div>
                  </div>
                </div>
                <div class="w-75 mt-3 m-auto m-md-0 pt-3">
                  <div class="row">
                    <label for="mobile" class="form-label"
                      >رقم الهاتف
                      <span style="color: #828282; font-size: 14px"> (إختياري) </span>
                    </label>

                    <div class="col-lg-3 col-md-4 col-sm-5 col-5 ps-0">
                      <select
                        v-model="codephone"
                        class="form-select mt-2 w-100 country-selects j-min-heigth"
                        aria-label=".form-select-sm example"
                      >
                        <option value="" disabled>الرمز الدولي</option>
                        <option
                          class="contact_dir"
                          v-for="country in countries"
                          :key="country.call_code"
                          v-show="country.call_code"
                          :value="country.call_code"
                        >
                          {{ country.call_code }}
                        </option>
                      </select>
                    </div>
                    <div class="col-lg-9 col-md-8 col-sm-7 col-7">
                      <input
                        type="text"
                        @keyup="validatePhoneNumber"
                        class="form-control mt-2 j-min-heigth"
                        v-model="phone"
                        style="direction: ltr; text-align: end"
                        :class="{ valid: isValidPhoneNumber, invalid: !isValidPhoneNumber }"
                        placeholder="أدخل رقم الهاتف"
                      />
                    </div>

                    <div class="invalid-warning text-danger fs-6 mt-1" v-if="!isValidPhoneNumber">
                      يرجى ادخال أرقام فقط
                    </div>
                  </div>
                </div>

                <div class="row mt-3">
                  <div class="col-md-12">
                    <label for="birthdate" class="form-label"
                      >تاريخ الميلاد <span style="color: #828282; font-size: 14px"> (إختياري) </span></label
                    >
                    <div class="input-group has-validation w-75 m-auto m-md-0 input-reg">
                      <input type="date" v-model="user.birthdate" class="form-control w-75 bg-white" />
                      <div class="input-group-append" v-if="false">
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path
                            d="M6 5V1M14 5V1M5 9H15M3 19H17C18.1046 19 19 18.1046 19 17V5C19 3.89543 18.1046 3 17 3H3C1.89543 3 1 3.89543 1 5V17C1 18.1046 1.89543 19 3 19Z"
                            stroke="#4F4F4F"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="row mt-4">
                  <div class="col-md-3">
                    <label for="birthdate" class="form-label form-check-inline me-0"
                      >الجنس<span v-if="!user.gender">*</span>
                    </label>
                  </div>
                  <div class="col-md-9">
                    <div class="form-check form-check-inline">
                      <input
                        class="form-check-input"
                        type="radio"
                        name="inlineRadioOptions"
                        value="male"
                        v-model="user.gender"
                      />
                      <label class="form-check-label" for="inlineRadio1">ذكر</label>
                    </div>
                    <div class="form-check form-check-inline">
                      <input
                        class="form-check-input"
                        type="radio"
                        name="inlineRadioOptions"
                        value="female"
                        v-model="user.gender"
                      />
                      <label class="form-check-label me-4" for="inlineRadio2">انثى</label>
                    </div>
                  </div>
                </div>

                <div></div>
                <div class="my-4">
                  <button
                    class="btn btn-primary w-75 m-auto m-md-0"
                    type="submit"
                    :disabled="submitStatus === 'PENDING'"
                    style="font-size: 20px"
                  >
                    إنشاء حساب
                    <span :class="{ 'spinner-border spinner-border-sm': loadings }"></span>
                  </button>
                </div>
                <div
                  class="alert alert-danger alert-dismissible fade show w-75 text-center mt-2"
                  role="alert"
                  v-if="submitStatus === 'ERROR'"
                >
                  <strong>يرجى ملء جميع الحقول المطلوبة</strong>
                </div>
                <div
                  class="alert alert-info alert-dismissible fade show w-75 text-center mt-2"
                  role="alert"
                  v-if="submitStatus === 'PENDING'"
                >
                  <strong>يرجى الإنتظار</strong>
                </div>
              </form>
              <div></div>
            </div>
          </div>
        </div>
        <div class="col-md-6 bg-white" v-if="page == 3">
          <div class="row flex-row-reverse mb-4">
            <div class="col-md-10">
              <h4 class="text-gray-60 pt-4 text-header text-center text-md-end">تسجيل الدخول</h4>
            </div>
          </div>
          <div class="row flex-row-reverse">
            <div class="col-md-10 text-center text-md-end">
              <div class="text-gray-900 fw-bold py-3">{{ email }}</div>

              <div class="w-74 m-auto m-md-0">
                <label for="password" class="form-label mt-1">كلمة المرور </label>
                <span v-if="!passwords(password)">*</span>
                <div class="position-relative has-validation m-auto m-md-0">
                  <input
                    :type="passwordFieldType"
                    v-model="password"
                    class="form-control bg-white text-end input-reg"
                    :class="!passwords(password) ? '' : 'is-valid'"
                    style="direction: ltr"
                  />
                  <i
                    @click="switchVisibility()"
                    :class="passwordFieldIcon"
                    class="fa-solid fa-eye position-absolute top-50 start-0-c translate-middle-y text-muted"
                  ></i>
                </div>
              </div>
              <div class="pt-1 fs-7" v-if="!passwords(password)">مطلوب 6 محارف على الأقل متضمنة حرف و رقم و رمز</div>
              <div class="m-md-end pt-2 m-md-0 m-auto w-74">
                <router-link to="/email" class="text-decoration-none fw-bold" style="color: #262847; font-size: 20px"
                  >نسيت كلمة المرور؟</router-link
                >
              </div>

              <div class="my-4">
                <button
                  @click="gologin()"
                  class="btn btn-primary w-74 input-reg m-auto m-md-0"
                  type="submit"
                  :disabled="submitStatus === 'PENDING'"
                >
                  تسجيل الدخول
                  <span :class="{ 'spinner-border spinner-border-sm': loadings }"></span>
                </button>
              </div>
              <div
                class="alert alert-danger alert-dismissible fade show w-74 text-center mt-2"
                role="alert"
                v-if="errorsPassword"
              >
                <strong> كلمة المرور غير صالحة</strong>
              </div>
              <div
                class="alert alert-danger alert-dismissible fade show w-74 text-center mt-2"
                role="alert"
                v-if="submitStatus === 'ERROR'"
              >
                <strong> كلمة المرور غير صالحة</strong>
              </div>
              <div
                class="alert alert-info alert-dismissible fade show w-74 text-center mt-2"
                role="alert"
                v-if="submitStatus === 'PENDING'"
              >
                <strong>يرجى الإنتظار</strong>
              </div>

              <div></div>
            </div>
          </div>
          <div class="row">
            <div class="col-md-10 text-center text-md-end">
              <div></div>
            </div>
          </div>
        </div>
        <div class="col-md-6 my-5 d-none d-lg-block">
          <authSlider />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { Providers } from 'universal-social-auth'
import authSlider from '../accessories/authSlider.vue'
import 'hooper/dist/hooper.css'
import { ModelListSelect } from 'vue-search-select'
import 'vue-search-select/dist/VueSearchSelect.css'

export default {
  metaInfo: {
    title: 'التسجيل',
  },
  components: {
    authSlider,
    Providers,
    ModelListSelect,
  },
  data() {
    return {
      errorsPassword: '',
      new_or_login: '',
      password: '',
      email: '',
      page: 1,
      isValidPhoneNumber: true,
      phone: '',
      loading: '',
      loadings: false,
      token: '',
      submitStatus: null,
      password: '',
      passwordConf: '',
      passwordFieldType: 'password',
      passwordFieldIcon: 'fa-eye',
      passwordConfirmFieldType: 'password',
      passwordConfirmFieldIcon: 'fa-eye',
      name: '',
      hide: false,
      text: '',
      email: '',
      dataimage: '',
      personalID: '',
      picture: '',
      FB: undefined,
      isConnected: '',
      phone: '',
      token: '',
      codephone: '',
      nextUrl: this.$route.params.nextUrl,
      countries: [],
      errors: {},
      massage: '',
      parameters: '',
      storedFollow: [{ name: '', code: '' }],
      user: {
        avatar: '',
        firstname: '',
        lastname: '',
        occupation: '',
        company_id: '',
        nationality: '',
        birthdate: '',
        gender: '',
      },
    }
  },

  methods: {
    storedFollows() {
      let follows = localStorage.follow === undefined ? [] : [...JSON.parse(localStorage.follow)] // [...JSON.parse(localStorage.follow)]
      if (follows?.length != 0) {
        this.follow(follows[0].code)
        this.storedFollow = follows
      }
    },
    follow(v) {
      this.http
        .get('/custom_message/' + v)
        .then(async (response) => {
          this.parameters = JSON.parse(response.data.parameters)
          this.massage = response.data.custom_message.value.replaceAll(
            '{{' + this.parameters[0] + '}}',
            this.storedFollow[0].name
          )

          localStorage.removeItem('follow')
        })
        .catch((error) => {
          confi
        })
    },
    getResults() {
      if (this.text != '') {
        this.http.get('/advance_search_v2?type=company&q=' + this.text).then(async (response) => {
          this.resultsCompany = response.data.result
          this.hide = true
          this.noResult = true
          this.resultsCompany.push({ id: '0', name: 'غير ذالك' })
        })
      }
    },
    trigger() {
      this.$refs.fileInput.click()
    },
    upload_avatar(e) {
      this.loading = true
      let file = e.target.files[0]
      let formData = new FormData()
      this.dataimage = file
      let reader = new FileReader()
      let extension = e.target.files[0].type
      if (extension == 'image/jpeg' || extension == 'image/png' || extension == 'image/jpg') {
        if (file['size'] < 2111775) {
          reader.onloadend = (file) => {
            this.user.avatar = reader.result
            this.loading = false
          }
          this.dataimage = file
          reader.readAsDataURL(file)
        } else {
          this.$toast.warning('حجم الملف اكبر من 2 ميغا')
          this.loading = false
        }
      } else {
        this.$toast.warning('صيغة الملف غير مدعومة الرجاء رفع صورة')
        this.loading = false
      }
    },
    go() {
      if (!this.validEmail(this.email)) {
        this.submitStatus = 'ERROR'
      } else {
        this.submitStatus = 'PENDING'
        this.registration_v2(this.email)
      }
    },
    gologin() {
      if (!this.passwords(this.password)) {
        this.submitStatus = 'ERROR'
      } else {
        this.submitStatus = 'PENDING'
        this.login(this.email, this.password)
      }
    },
    validEmail(email) {
      var re =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      return re.test(email)
    },
    passwords(value) {
      //const containsUppercase = /[A-Z]/.test(value)
      const containsLowercase = /[a-z]/.test(value)
      const containsNumber = /[0-9]/.test(value)
      const containsSpecial = /[#?!@$%^&*-]/.test(value)
      return containsLowercase && containsLowercase && containsNumber && containsSpecial && value?.length > 5
    },
    touch() {
      if (
        this.user.firstname?.length > 2 &&
        this.user.lastname?.length > 2 &&
        this.user.company_id &&
        this.text &&
        this.user.gender &&
        this.user.nationality &&
        this.user.occupation
      ) {
        if (this.phone) {
          if (this.isValidPhoneNumber) {
            if (this.codephone) {
              return true
            } else {
              return false
            }
          } else {
            return false
          }
        } else {
          return true
        }
      } else {
        return false
      }
    },
    submit() {
      if (!this.touch()) {
        this.submitStatus = 'ERROR'
      } else {
        this.submitStatus = 'PENDING'

        this.postrigister(this.user)
      }
    },
    switchVisibility() {
      this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password'
      this.passwordFieldIcon = this.passwordFieldType === 'password' ? 'fa-eye' : 'fa-eye-slash'
    },
    switchVisibilityconf() {
      this.passwordConfirmFieldType = this.passwordConfirmFieldType === 'password' ? 'text' : 'password'
      this.passwordConfirmFieldIcon = this.passwordConfirmFieldType === 'password' ? 'fa-eye' : 'fa-eye-slash'
    },
    registration_v2(value) {
      this.loadings = true
      this.httpIm
        .post('/registration_v2', { email: value })
        .then(async (response) => {
          this.loadings = false
          this.page = 2
          this.submitStatus = ''
          this.httpIm.defaults.headers.authorization = 'Bearer ' + response.data.access_token
          this.httpSp.defaults.headers.authorization = 'Bearer ' + response.data.access_token
          this.http.defaults.headers.authorization = 'Bearer ' + response.data.access_token
          this.$cookies.set('token', response.data.access_token)
          this.$cookies.set('isLoggedIn', true)
          this.$cookies.set('userWeb', response.data.user)
          //this.$cookies.set('subscription', response.data.subscription );
          localStorage.setItem('tokenWeb', response.data.access_token)
          localStorage.setItem('isLoggedIn', true)
          localStorage.setItem('userWeb', JSON.stringify(response.data.user))
          this.token = response.data.access_token
          this.email = response.data.user.email
          response.data.subscription ? localStorage.setItem('subscription', JSON.stringify(response.data.subscription)) :''

          // this.$router.push( {path: `/code=${this.user.email}`})
        })
        .catch((err) => {
          if ((this.errors.errorCode = 406)) {
            this.page = 3
          }
          this.errors = err.response.data.errorMessage
          this.submitStatus = 'OK'
          this.loadings = false
        })
    },
    login(email, password) {
      this.errorsPassword = ''
      this.loadings = true
      this.httpIm
        .post('/users/login', { email: email, password: password })
        .then(async (response) => {
          this.loadings = false
          this.httpIm.defaults.headers.authorization = 'Bearer ' + response.data.access_token
          this.httpSp.defaults.headers.authorization = 'Bearer ' + response.data.access_token
          this.http.defaults.headers.authorization = 'Bearer ' + response.data.access_token
          this.$cookies.set('token', response.data.access_token)
          this.$cookies.set('isLoggedIn', true)
          this.$cookies.set('userWeb', response.data.user)
          //this.$cookies.set('subscription', response.data.subscription );
          localStorage.setItem('tokenWeb', response.data.access_token)
          localStorage.setItem('isLoggedIn', true)
          localStorage.setItem('userWeb', JSON.stringify(response.data.user))
          response.data.subscription ? localStorage.setItem('subscription', JSON.stringify(response.data.subscription)) :''
          this.$store.state.user = response.data.user
          this.loading = ''
          this.submitStatus = ''
            if (!response.data.user.complete) {
              localStorage.setItem('completeMassage', false)
            }
            if (this.nextUrl) {
              this.$router.go(-1)
            }
            if (!this.nextUrl) {
              window.location = '/'
            }
          // this.$router.push( {path: `/code=${this.user.email}`})
        })
        .catch((err) => {
          this.errorsPassword = err.response.data.errorMessage
          this.submitStatus = 'OK'
          this.loadings = false
        })
    },
    postrigister(user) {
      let formData = new FormData()
      formData.append('firstname', user.firstname)
      formData.append('lastname', user.lastname)
      formData.append('occupation', user.occupation)
      formData.append('gender', user.gender)
      formData.append('nationality', user.nationality)
      formData.append('birth_date', user.birthdate)
      formData.append('company_id', user.company_id)
      formData.append('phone_number', this.codephone + this.phone)
      formData.append('avatar', this.dataimage)

      this.loadings = true
      this.httpIm
        .post('/users/myaccount_confirm', formData)
        .then(async (response) => {
          this.submitStatus = ''

          this.$cookies.set('userWeb', response.data.user)
          localStorage.setItem('userWeb', JSON.stringify(response.data.user))

          this.loadings = false
          window.location = '/confirmRest'

          // this.$router.push( {path:`/confirmRest`})
        })
        .catch((err) => {
          this.errors = err.response.data.errorMessage
          this.submitStatus = 'OK'
          this.loadings = false
        })
    },
    AuthProvider(provider) {
      this.loading = provider
      var self = this
      this.$auth
        .authenticate(provider)
        .then((response) => {
          self.SocialLogin(provider, response)
        })
        .catch((err) => {
          this.loading = ''
          console.log({ err: err })
        })
    },
    SocialLogin(provider, response) {
      this.httpIm
        .post('/users/social/login/' + provider, response)
        .then((response) => {
          try {
            this.page = 2
            this.submitStatus = ''
            this.httpIm.defaults.headers.authorization = 'Bearer ' + response.data.access_token
            this.httpSp.defaults.headers.authorization = 'Bearer ' + response.data.access_token
            this.http.defaults.headers.authorization = 'Bearer ' + response.data.access_token
            this.$cookies.set('token', response.data.access_token)
            this.$cookies.set('isLoggedIn', true)
            this.$cookies.set('userWeb', response.data.user)
            //this.$cookies.set('subscription', response.data.subscription );
            localStorage.setItem('tokenWeb', response.data.access_token)
            localStorage.setItem('isLoggedIn', true)
            localStorage.setItem('userWeb', JSON.stringify(response.data.user))
            response.data.subscription ? localStorage.setItem('subscription', JSON.stringify(response.data.subscription)) :''

            this.token = response.data.access_token
            this.email = response.data.user.email
            this.new_or_login = response.data.new_or_login
            if (this.new_or_login == 'new') {
              this.page = 3
            } else {
              window.location = '/'
            }
          } catch (error) {}

          this.$store.state.user = response.data.user
          this.$store.state.subscription = response.data.subscription ? response.data.subscription : ''
          this.$router.go()
        })
        .catch((err) => {
          this.loading = ''
          console.log({ err: err })
        })
    },
    getcountry() {
      this.http.get('/country_order_by_arabic').then(async (response) => {
        this.countries = response.data
      })
    },
    validatePhoneNumber() {
      const validationRegex = /^\+?\d{7,}$/
      if (this.phone.match(validationRegex) && this.phone != null) {
        this.isValidPhoneNumber = true
      } else {
        this.isValidPhoneNumber = false
      }
    },
  },
  created() {
    this.getcountry()
    this.storedFollows()
  },
}
</script>

<style scoped>
.j-min-heigth {
  min-height: 39.6px !important;
}
h1 {
  overflow: hidden;
  text-align: center;
}

h1:before,
h1:after {
  background-color: rgba(152, 132, 132, 0.499);
  content: '';
  display: inline-block;
  height: 1px;
  position: relative;
  vertical-align: middle;
  width: 40%;
}

h1:before {
  right: 2rem;
  margin-left: -40%;
}

h1:after {
  left: 2rem;
  margin-right: -40%;
}
.start-0-c {
  left: 12px !important;
}
</style>
<style>
.form-select.country-selects {
  background-position: left 0.75rem center !important;
  padding-right: 0.8rem;
}
.ui.search.dropdown.country-selects > input.search {
  text-indent: 11px;
}
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
  padding-right: 12px !important;
}
.ui.dropdown:not(.button) > .default.text {
  color: #000;
}
.form-select {
  display: block;
  width: 74%;
  /* padding: 0.375rem 2.25rem 0.375rem 0.75rem; */
  -moz-padding-start: calc(0.75rem - 3px);
  font-size: 0.9rem;
  font-weight: 400;
  line-height: 1.6;
  color: #212529;
  background-color: #f8fafc;
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3e%3cpath fill='none' stroke='%23343a40' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M2 5l6 6 6-6'/%3e%3c/svg%3e") !important;
  background-repeat: no-repeat !important;
  background-position: right 0.75rem center !important;
  background-size: 16px 12px !important;
  border: 1px solid #ced4da;
  border-radius: 0.25rem !important;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
}
.form-select > i {
  display: none;
}
.ui.fluid.dropdown {
  display: block;
  width: 74%;
  min-width: 0;
}
@media screen and (max-width: 766px) {
  .alert-dismissible {
    margin: auto;
  }
}
.input-group-append {
  position: absolute;
  left: 8px;
  top: 10px;
}

.text.default {
  margin-top: 3px;
}
</style>