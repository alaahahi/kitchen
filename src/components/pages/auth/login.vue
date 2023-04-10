<template>
<div class="h-100">
  <div class="container-fluid h-100">
    <div class="row bg-light bg-gradient h-100" >
        <div class="col-md-6 mt-2 d-block d-lg-none">
           <div class="row mt-2 flex-row-reverse ">
            <div class="col-md-10 text-center "><router-link to="/"><img style="width:140px ;"  src="/web-asset/img/logo.png" alt="logo ManHOM"></router-link></div>
          </div>
          <authSlider />
              <div class="m-5 text-end">
                <p class="text-black fs-5 pt-5 ">
                   تسجيل الدخول يعطيك مميزات متعددة سجل الان
                </p></div>
        </div>
        <div class="col-md-6 bg-white">
          <div class="row mt-3 mb-5  d-none d-lg-block">
            <div class="col-md-10 me-auto text-end "><router-link to="/"><img style="width:140px ;"  src="/web-asset/img/logo.png" alt="logo ManHOM"></router-link></div>
          </div>
          <div class="row  flex-row-reverse my-3">
            <div class="col-md-10"><h5 class="text-center text-md-end">
              تسجيل الدخول

            </h5></div>
          </div>
          <div class="row  flex-row-reverse mb-4">
            <div class="col-md-10">  <h4 class="text-gray-60 text-center text-md-end">أدخل المعلومات أدناه حتي تتمكن من الدخول لحسابك</h4></div>
          </div>
          <div class="row  flex-row-reverse">
            <div class="col-md-10 text-center text-md-end">
              <button class="btn btn-light border bg-white w-75"  @click="AuthProvider('google')" style="color:#222222;font-size: 20px;">
              <svg class="float-end m-1" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="24" height="24" fill="white"/>
              <path fill-rule="evenodd" clip-rule="evenodd" d="M23.04 12.2615C23.04 11.446 22.9668 10.6619 22.8309 9.90918H12V14.3576H18.1891C17.9225 15.7951 17.1123 17.013 15.8943 17.8285V20.714H19.6109C21.7855 18.7119 23.04 15.7637 23.04 12.2615Z" fill="#4285F4"/>
              <path fill-rule="evenodd" clip-rule="evenodd" d="M12 23.4996C15.105 23.4996 17.7081 22.4698 19.6109 20.7134L15.8943 17.828C14.8645 18.518 13.5472 18.9257 12 18.9257C9.00474 18.9257 6.46951 16.9028 5.56519 14.1846H1.72314V17.1641C3.61542 20.9225 7.50451 23.4996 12 23.4996Z" fill="#34A853"/>
              <path fill-rule="evenodd" clip-rule="evenodd" d="M5.56523 14.1855C5.33523 13.4955 5.20455 12.7584 5.20455 12.0005C5.20455 11.2425 5.33523 10.5055 5.56523 9.81548V6.83594H1.72318C0.944318 8.38844 0.5 10.1448 0.5 12.0005C0.5 13.8562 0.944318 15.6125 1.72318 17.165L5.56523 14.1855Z" fill="#FBBC05"/>
              <path fill-rule="evenodd" clip-rule="evenodd" d="M12 5.07386C13.6884 5.07386 15.2043 5.65409 16.3961 6.79364L19.6945 3.49523C17.7029 1.63955 15.0997 0.5 12 0.5C7.50451 0.5 3.61542 3.07705 1.72314 6.83545L5.56519 9.815C6.46951 7.09682 9.00474 5.07386 12 5.07386Z" fill="#EA4335"/>
              </svg>

              المتابعة باستخدام غوغل
                           <span :class="{ 'spinner-border spinner-border-sm': loading == 'google'}"></span>
              </button>
          <!--    <button class="btn btn-info w-75 my-4 text-white" disabled><i class="fa-brands fa-twitter text-white float-end m-1"></i> المتابعة بإستخدام Twitter </button> -->
              <button class="btn btn-primary  mt-3 w-75" @click="AuthProvider('facebook')" style="color:#fff;font-size: 20px;"> <i class="fa-brands fa-facebook text-white float-end m-1"></i>المتابعة باستخدام فيس بوك
                <span :class="{ 'spinner-border spinner-border-sm': loading == 'facebook'}"></span>
              </button>
              <h1 class="fs-6 gray-light my-2 py-4 w-75 m-auto m-md-0"><span style="color:#717173">أو </span></h1>
                         <form @submit.prevent="submit">
              <div class="mb-3">
                     <label for="email" class="form-label text-gray-60 fs-5" style="color:#222222">البريد الإلكتروني</label>
                     <div class="input-group has-validation  w-75  m-auto m-md-0">
                      <input type="email" v-model.trim="$v.user.email.$model"   class="form-control w-75 bg-white " :class="!$v.user.email.email || $v.user.email.$model == '' ? '' : 'is-valid'">                    </div>
                      <div  class="text-danger py-2 fs-7"  v-if="!$v.user.email.email">
                                            يرجى إدخال بريد الإلكتروني صالح
                    </div>
              </div>
              <div class="mb-1 ">
           <label for="password" class="form-label  text-gray-60 fs-5" style="color:#222222">كلمة المرور </label>
                     <div class="position-relative w-75 has-validation  m-auto m-md-0">
                      <input :type="passwordFieldType"  v-model.trim="$v.user.password.$model"  class="form-control bg-white text-end" :class="$v.user.password.$model == '' || !$v.user.password.minLength || !$v.user.password.valid ? '' : 'is-valid'" style="direction: ltr;" >                        <i  @click="switchVisibility()"   :class="passwordFieldIcon" class="fa-solid fa-eye position-absolute top-50 start-0-c translate-middle-y text-muted"></i>
                    </div>
                          
              </div>
              
              <div class="text-danger py-1  fs-7" v-if="!$v.user.password.valid || !$v.user.password.minLength">
                     مطلوب  {{$v.user.password.$params.minLength.min}}    محارف  على الأقل متضمنة حرف و رقم و رمز
                      </div>

              <div class="w-100 pb-3 pt-4  m-md-0  text-end ">
                <div class="m-md-end  m-md-0 m-auto w-75">
                <router-link to="/email" class="text-decoration-none fw-bold" style="color:#262847;font-size: 20px;">نسيت كلمة المرور؟</router-link></div>
                </div>
               <button class="btn btn-primary w-75 my-2    m-auto m-md-0" type="submit" :disabled="submitStatus === 'PENDING'" style="font-size: 20px;">
               تسجيل الدخول
               <span :class="{ 'spinner-border spinner-border-sm': loadings}"></span>
               </button>
                <div class="alert alert-danger alert-dismissible fade show w-75 text-center  m-auto m-md-0   mt-md-2 mt-2" role="alert" v-if="submitStatus === 'ERROR'">
                  <strong>يرجى ملء جميع الحقول المطلوبة</strong>
                </div>
                <div class="alert alert-info alert-dismissible fade show w-75 text-center  m-auto m-md-0  mt-md-2 mt-2" role="alert" v-if="submitStatus === 'PENDING'">
                  <strong>يرجى الإنتظار</strong>
                </div>
                <div v-if="errors.errorMessage" class="alert alert-warning alert-dismissible fade show w-75 m-auto m-md-0  mt-md-2 text-center  mt-2" role="alert" >
                  <strong>{{errors.errorMessage == "User does not exist or password mismatch" ? 'المعذرة البريد الإلكتروني أو كلمة المرور غير صالحة': errors.errorMessage}} </strong>
                </div>
              </form>
              <h6 class="text-center  w-75 my-4 m-auto m-md-0  text-xl-end text-center  mt-md-4  mt-2" style="font-size: 20px;color:#515152">
                ليس لديك حساب؟
                <b>
                 <router-link class="text-decoration-none" style="color:#262847;font-size: 20px;" :to="{ name: 'register'}"> إنشاء حساب جديد</router-link>
                </b>
              </h6>
            </div>
          </div>
        </div>
        <div class="col-md-6 my-5  d-none d-lg-block">
          <authSlider />
          <div class="m-5 text-end"><p class="text-black fs-5 pt-5 ">
          فريق التحرير حريص على مراجعة أي معلومة قد تكون مغلوطة أو منقوصة
          </p></div>
        </div>
    </div>
  </div>
</div>
</template>
<script>
import { minLength,email,required } from 'vuelidate/lib/validators'
import {Hooper,Slide,Navigation as HooperNavigation } from 'hooper';
import { Providers} from 'universal-social-auth'
import authSlider from '../accessories/authSlider.vue'

import 'hooper/dist/hooper.css';
export default {
      metaInfo: {
      title: 'تسجيل الدخول'
    },
    components:
        {
        authSlider,
        Hooper,
        Slide,
        HooperNavigation,
        Providers
        },
    data() 
        {
        return {
            loading:"",
            loadings:false,
            submitStatus: null,
            password: "",
            passwordFieldType: "password",
            passwordFieldIcon:"fa-eye",
              isConnected: false,
            name: '',
            email: '',
            nextUrl:this.$route.params.nextUrl,
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
          const containsNumber = /[0-9]/.test(value)
          const containsSpecial = /[#?!@$%^&*-]/.test(value)
          return containsLowercase  && containsLowercase && containsNumber && containsSpecial
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
            this.loadings=true
            this.httpIm.post('/users/login',value)
            .then(async (response)=>{

             // this.httpIm.defaults.headers.authorization  = 'Bearer ' + response.data.access_token;
             // this.httpSp.defaults.headers.authorization  = 'Bearer ' + response.data.access_token;
              //this.http.defaults.headers.authorization  = 'Bearer ' + response.data.access_token;
          
              //this.$cookies.set('subscription', response.data.subscription );
              
              this.$cookies.set('token', response.data.access_token);
              this.$cookies.set('isLoggedIn',true );
              this.$cookies.set('userWeb', response.data.user );
              localStorage.setItem( 'tokenWeb', response.data.access_token );
              localStorage.setItem( 'isLoggedIn',true );
              localStorage.setItem( 'userWeb',JSON.stringify(response.data.user ));
              localStorage.setItem( 'subscription',JSON.stringify(response.data.subscription ));
              this.$store.state.subscription =  response.data.subscription ? response.data.subscription :""
              this.$store.state.user = response.data.user 
              this.loadings=false
              if(this.a){
                this.$router.go(-1)
              }
              if(!this.a){
                   this.$router.go()
              }
              this.submitStatus = 'OK'
                     }).catch(err => {
                      if(err.response.data.email_verified=='false'){
                         this.$router.push( {path: `/code=${err.response.data.user.email}`})
                      this.loadings=false
                      }
                     else 
                     this.errors=err.response.data         
                     this.loadings=false
                     this.submitStatus = 'OK'
                })
            },
            AuthProvider(provider) {
              this.loading=provider
              var self = this
              console.log(provider);
              this.$auth.authenticate(provider).then(response =>{
                console.log(response);
                self.SocialLogin(provider,response)
                }).catch(err => {
                  this.loading=""

                    console.log({err:err})
                })
            },
            SocialLogin(provider,response){
              console.log(response);
              this.httpIm.post('/users/social/login/'+provider,response).then(response => {
             // this.httpIm.defaults.headers.authorization  = 'Bearer ' + response.data.access_token;
              //this.httpSp.defaults.headers.authorization  = 'Bearer ' + response.data.access_token;
             // this.http.defaults.headers.authorization  = 'Bearer ' + response.data.access_token;

              //this.$cookies.set('subscription', response.data.subscription );
           
              this.$cookies.set('token', response.data.access_token);
              this.$cookies.set('isLoggedIn',true );
              this.$cookies.set('userWeb', response.data.user );
              localStorage.setItem( 'tokenWeb', response.data.access_token );
              localStorage.setItem( 'isLoggedIn',true );
              localStorage.setItem( 'userWeb',JSON.stringify(response.data.user ));
              localStorage.setItem( 'subscription',JSON.stringify(response.data.subscription ));
              this.$store.state.subscription =  response.data.subscription ? response.data.subscription :""
              this.$store.state.user =  response.data.user
             
               if(this.nextUrl){
                this.$router.go(-1)
              }
              if(!this.nextUrl){
                 this.$router.go()
               }
                }).catch(err => {
                   console.log({err:err})
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

</style>
