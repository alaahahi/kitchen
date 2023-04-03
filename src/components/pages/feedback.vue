<template>
  <div>
    <div style="background-image: url('/web-asset/img/path104.png');">
      <div style="background-color: rgb(255 255 255 / 80%);">
        <breadcrumb :data=breadcrumbLsit />
        <h3 class="text-center fw-bold py-2">الشكاوى و الملاحظات</h3>
        <div class="container">
          <div class="row">
            <div class="col-sm-6">

              <p class="text-black-60 fs-5 w-75"> في حال كان لديكم أي اقتراح أو ملاحظة، يرجى تعبئة الاستمارة أدناه
                وسيصلكم رد في أسرع وقت ممكن.
              </p>
              <form v-on:submit.prevent="submit()">
                <div class="mb-3 row" v-if="!user">
                  <div class="mb-3 col-md-12">
                    <label for="formGroupExampleInput" class="form-label"> الاسم
                      <span v-if="!name">*</span>
                    </label>
                    <input type="text" class="form-control" v-model="name" />
                  </div>
                  
                  <!--  -->
                  <label for="formGroupExampleInput" class="form-label">رقم الهاتف</label>
                    <div class="col-lg-3 col-md-5 col-sm-6 col-6">
                      <select v-model="code" class="form-select international mt-2"
                        aria-label=".form-select-sm example">
                        <option value="" disabled>الرمز الدولي</option>
                        <option class="contact_dir" v-for="country in countries" :key=country.call_code
                          v-show="country.call_code" :value=country.call_code>
                          {{ country.call_code }}
                        </option>
                      </select>
  
                    </div>
                    <div class="col-lg-9 col-md-7 col-sm-6 col-6">
                      <input type="number"  class="form-control mt-2"
                        v-model="phone" />
                    </div>{{ validatePhoneNumber() }}
                  <div class="text-danger py-1  fs-7" v-if="validatePhoneNumber()">
                    مطلوب رقم
                  </div>
                </div>
                <!-- email -->
                <div class="mb-3 col-md-12">
                    <label for="formGroupExampleInput" class="form-label"> البريد الإلكتروني
                      <span v-if="!email || !validEmail(email)">*</span>
                    </label>
                    <input class="form-control" type="email"
                      v-model="email" />
                    <div class="text-danger pt-3 fs-7" v-if="!validEmail(email) && email">يرجى التأكد من الإيميل</div>
                </div>
                <!--  -->
                <div class="mb-3 col-md-12">
                  <label for="formGroupExampleInput" class="form-label"> نوع الرسالة
                    <span v-if="!message_type">*</span>
                  </label>
                  <select v-model="message_type" class="form-select w-100 form-select mt-2"
                    aria-label=".form-select-sm example">
                    <option value="" disabled>اختر نوع الرسالة</option>
                    <option class="contact_dir" v-for="types in feedbackType" :key=types.id :value=types.value>
                      {{ types.valueAR }}
                    </option>
                  </select>
                </div>
                <div class="mb-3 col-md-12">
                  <label for="formGroupExampleInput" class="form-label" required>محتوى الرسالة
                    <span  v-if="!content">*</span>
                  </label>
                  <textarea type="text" class="form-control" v-model="content"
                    style="height: 110px;" />
                </div>
                <button class="btn  mb-3 px-3 fw-bold rounded-btn " type="submit"
                  :class="disbled ? 'btn-primary' : 'btn-light btn-gray-light'">
                  أرسل الآن
                </button>
              </form>
              <div v-for="(erro, i) in error" :index="i" :key="i" class="alert alert-danger alert-dismissible fade show"
                role="alert">
                <strong>{{ erro }}</strong>
              </div>


              <div class="alert alert-danger alert-dismissible fade show" role="alert" v-if="submitStatus === 'ERROR'">
                <strong>يرجى ملء جميع الحقول المطلوبة</strong>
              </div>
              <div class="alert alert-danger alert-dismissible fade show" role="alert"
                v-if="submitStatus === 'PENDING'">
                <strong>يرجى الإنتظار</strong>
              </div>
              <div class="alert alert-danger alert-dismissible fade show ok" role="alert" v-if="submitStatus === 'OK'">
                <img class="ps-2" width="25px" src="/web-asset/img/trueicon.png" alt="charactour image">
                <strong>تم إرسال الرسالة بنجاح</strong>
              </div>
            </div>
            <div class="col-sm-6">
              <div class="row justify-content-center">
                <img class="rounded-btn-img w-50 cardmargin " src="/web-asset/img/feedbacksicon.png"
                  alt="charactour image">
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
  
<script>
import breadcrumb from './accessories/breadcrumb.vue'
import { required, between } from 'vuelidate/lib/validators'
export default {
  metaInfo: {
    title: " شكاوي وملاحظات  | بوابة الشخصيات والمؤسسات"
  },
  components:
  {
    breadcrumb,
  },
  data() {

    return {
      feedbackType: [{ 'id': 0, 'value': 'complaint', 'valueAR': 'شكوى' }, { 'id': 1, 'value': 'note', 'valueAR': 'ملاحظة' }, { 'id': '2', 'value': 'suggestion', 'valueAR': 'اقتراح' }, { 'id': 3, 'value': 'request', 'valueAR': 'طلب' }],
      charactours: {},
      countries: {},
      user: this.$store.state.user,
      error: {},
      disbled: null,

      errors:
      {
        "message": "",
        "errorCode": "",
        "errorMessage": ""
      },
      loading: false,
      submitStatus: null,
        name: "",
        phone: "",
        email: "",
        code: "",
        message_type: "",
        content: "",

      loading: false,
      'breadcrumbLsit': [
        {
          name: 'الرئيسية',
          link: '/'
        },
        {
          name: 'الشكاوى والملاحظات',
          link: '/%D8%B4%D9%83%D8%A7%D9%88%D9%89-%D9%88%D9%85%D9%84%D8%A7%D8%AD%D8%B8%D8%A7%D8%AA/'
        },
      ],

    }
  },
  methods: {
    validatePhoneNumber() {
      const validationRegex = /^\+?\d{7,}$/
      if (this.phone.match(validationRegex) && this.phone != null) {
        this.isValidPhoneNumber = true
      } else {
        this.isValidPhoneNumber = false
      }
    },
    submit() {
      // console.log(this.message_type+''+this.content)
      if (this.user) {
        if (!this.message_type || !this.content) {
          this.submitStatus = 'ERROR'
        } else {
          this.submitStatus = 'PENDING'
          this.postSupportMessage()
        }
      }
      if (!this.user) {
        if (!this.name || 
            !this.message_type || 
            !this.content || 
            this.validatePhoneNumber() == false || 
            !this.email || 
            !this.validEmail(this.email)) {
          this.submitStatus = 'ERROR'
        } else {
          this.submitStatus = 'PENDING'
          this.postSupportMessage()
        }
      }

    },
    getcountry() {
      this.httpMg.get('/countries')
        .then(async (response) => {
          //   this.countries=response.data.countries
          this.countries = this._.orderBy(response.data.countries, "content_preferences", "desc");
        })
    },
    postSupportMessage() {
      this.httpMg.post('/web/support_message',
        {
          name: this.name ? this.name : this.user.firstname+' '+this.user.lastname,
          email:this.email,
          phone: this.code + this.phone,
          message_type: this.message_type,
          content: this.content,
        },
        {
          headers: { Authorization: `Bearer ${this.$store.state.token}` },
        })
        .then(async (response) => {
          this.submitStatus = 'OK'
          console.log(0)
        }).catch((error) => {
          console.log(error)
        })
    },
    validEmail(email) {
      var re =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      return re.test(email)
    },
  },
  created() {
    this.getcountry()
    this.email = this.user ? this.user.email : ''
  }
}
</script>

<style>
.form-select.international{
  width: 100%;
}
.form-select {
  border: 1px solid #ced4da;
}

.cardmargin {
  margin-top: 150px;

}

.form-control,
.form-select {
  background-color: #fff;
  border-radius: 8px;
}

.alert {
  padding: 10px;
  text-align: right;
  border-radius: 12px;
  background-color: #D4EDDA;
}

.ok {
  border: solid 1px #155724
}

.form-label {
  font-weight: bold;
}
</style>