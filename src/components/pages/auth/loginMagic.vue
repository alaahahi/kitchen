<template>
<div>
  <div class="container-fluid">
    <div class="row">
        <div class="col-md-6 bg-white">
   
          <div class="row  flex-row-reverse my-3">
            <div class="col-md-8 text-end">
              <h2>تسجيل الدخول أو إنشاء حساب</h2>
              <h5>البريد الإلكتروني أو رقم الهاتف</h5>
              </div>
          </div>
          <div class="row  flex-row-reverse mb-4">
            <div class="col-md-8 text-end">  <p class="text-muted ">(تسجيل الدخول عبر رقم الهاتف للمسجلين فقط)</p>
                     <form @submit.prevent="submit">
              <div class="mb-3">
                     <div class="input-group has-validation  w-75">
                        <input type="email" v-model.trim="$v.user.email.$model"   placeholder="ahmad@gmail.com"  class="form-control w-75 bg-white " :class="!$v.user.email.email || $v.user.email.$model == '' ? '' : 'is-valid'">
                        <div  class="text-danger"  v-if="!$v.user.email.email">
                    يرجى التأكد من الإيميل
                    </div>
                    </div>
              </div>
               <button class="btn btn-primary w-75 my-2" type="submit" :disabled="submitStatus === 'PENDING'" >التالي</button>
                <div class="alert alert-danger alert-dismissible fade show w-75 text-center" role="alert" v-if="submitStatus === 'ERROR'">
                  <strong>يرجى ملء جميع الحقول المطلوبة</strong>
                  <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>
                <div class="alert alert-info alert-dismissible fade show w-75 text-center" role="alert" v-if="submitStatus === 'PENDING'">
                  <strong>يرجى الإنتظار</strong>
                </div>
                <div v-if="errors.errorMessage" class="alert alert-warning alert-dismissible fade show w-75 text-center" role="alert" >
                  <strong>{{errors.errorMessage == "User does not exist or password mismatch" ? 'المعذرة البريد الإلكتروني أو كلمة المرور غير صالحة': errors.errorMessage}} </strong>
                  <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>
              </form>
              <h1 class="fs-6 text-muted my-2 py-2 w-75">أو</h1>
              </div>
          </div>
          <div class="row  flex-row-reverse">
            <div class="col-md-8 text-end">
              <a class="btn btn-light w-75"> <i class="fa-brands fa-google text-danger float-end m-1"></i>المتابعة بإستخدام Google</a>
              <br>
              <a class="btn btn-info w-75 my-4 text-white"><i class="fa-brands fa-twitter text-white float-end m-1"></i> المتابعة بإستخدام Twitter </a>
              <br>
              <a class="btn btn-primary w-75"> <i class="fa-brands fa-facebook text-white float-end m-1"></i>المتابعة بإستخدام Facebook</a>
              <h6 class="py-2">عند تسجيلك في من هم أنت موافق على الشروط والأحكام، وسياسة الخصوصية.</h6>
            </div>
          </div>
        </div>
        <div class="col-md-6 m-auto">
          <div class="container">
          <h2 class="my-5 text-center">
            مميزات وإضافات غير محدودة  
          </h2>
                <hooper  :settings="hooperSettings">
                <slide >
                <div class="card m-1 ">
                <div class="p-5 text-center">
                <i class="fa-solid fa-circle-check fa-2xl text-success"></i>
                </div>
                <div class="card-body text-center">
                    <h5 class="card-title  fw-bold">تصحيح المعلومات</h5>
                    <a href="#" class="text-muted text-decoration-none">فريق التحرير حريص علي مراجعة أي معلومة قد تكون مغلوطة أو منقوصة</a>
                </div>
                </div>
                </slide>
                <slide >
                <div class="card m-1 ">
                <div class="p-5 text-center">
                <i class="fa-solid fa-circle-nodes fa-2xl text-warning"></i>
                </div>
                <div class="card-body text-center">
                    <h5 class="card-title  fw-bold">تقارير الزوار</h5>
                    <a href="#" class="text-muted text-decoration-none">يتم ربط صفحتك بالبريد الإلكتروني لتصلك بإستمرار تقارير عن عدد زوار صفحتك</a>
                </div>
                </div>
                </slide>
                <slide >
                <div class="card m-1 ">
                <div class="p-5 text-center">
                <i class="fa-solid fa-circle-check fa-2xl text-success"></i>
                </div>
                <div class="card-body text-center">
                    <h5 class="card-title  fw-bold">تصحيح المعلومات</h5>
                    <a href="#" class="text-muted text-decoration-none">فريق التحرير حريص علي مراجعة أي معلومة قد تكون مغلوطة أو منقوصة</a>
                </div>
                </div>
                </slide>
                  <hooper-navigation slot="hooper-addons"></hooper-navigation>
                 </hooper>
                </div>
        </div>
    </div>
  </div>
</div>
</template>
<script>
import { minLength,email,required } from 'vuelidate/lib/validators'
import {Hooper,Slide,Navigation as HooperNavigation } from 'hooper';

export default {
    components:
        {
           Hooper,
        Slide,
        HooperNavigation,
        },
    data() 
        {
        return {
            submitStatus: null,
            password: "",
            passwordFieldType: "password",
            passwordFieldIcon:"fa-eye",
              isConnected: false,
            name: '',
            email: '',
            personalID: '',
            FB: undefined,
            errors:
            {
                "message": "",
                "errorCode": "",
                "errorMessage":""
            },
            user:{
                "email": "",
                "password": "",
                 },
              hooperSettings: {
          touchDrag: true,
        itemsToSlide:1,
        rtl:true,
        mouseDrag:false, 
        wheelControl:false,
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
              };
        },
        validations: {
    user: {
      email: {
        email,
         required,
      },
      password:{
        minLength: minLength(6),
        valid: function(value) {
         //const containsUppercase = /[A-Z]/.test(value)
         const containsLowercase = /[a-z]/.test(value)
          //const containsNumber = /[0-9]/.test(value)
          //const containsSpecial = /[#?!@$%^&*-]/.test(value)
          return containsLowercase //&& containsLowercase && containsNumber && containsSpecial
        }
      },
    }
  },
    methods:{
      submit() {
      console.log('submit!')
      this.$v.$touch()
      if (this.$v.$invalid) {
        this.submitStatus = 'ERROR'
      } else {
        this.submitStatus = 'PENDING'
          this.postrigister(this.user)
       
      }
    },
    switchVisibility() {
      this.passwordFieldType = this.passwordFieldType === "password" ? "text" : "password";
      this.passwordFieldIcon = this.passwordFieldType === "password" ? "fa-eye" : "fa-eye-slash";
    },
     postrigister(value)
            {
        this.httpIm.post('/users/login',value)
        .then(async (response)=>{
          this.httpIm.defaults.headers.common['Authorization'] = 'Bearer ' + response.data. access_token;
          this.httpSp.defaults.headers.common['Authorization'] = 'Bearer ' + response.data. access_token;
          localStorage.setItem( 'token', response.data. access_token );
             localStorage.setItem( 'isLoggedIn',true );
              this.$session.start()
              this.$session.set('user', response.data.user )
              this.$store.state.user = response.data.user 
              this.$router.push('/')
              this.submitStatus = 'OK'
                     }).catch(err => {
                                this.errors=err.response.data
                                 this.submitStatus = 'OK'
                })
            },
    
  },
  };
</script>
<style scoped>
h1 {
  overflow: hidden;
  text-align: center;
}

h1:before,
h1:after {
  background-color: rgba(152, 132, 132, 0.499);
  content: "";
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
.start-0-c{
  left: 12px !important;
}
</style>
