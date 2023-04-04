<template>
<div class="body h-100">
  <div class="container-fluid h-100">
    <div class="row bg-light bg-gradient h-100">
        <div class="col-md-6 bg-white h-100">
          <div class="row flex-row-reverse mt-3 mb-5">
            <div class="col-md-8 text-end ">
              <router-link class="navbar-brand" to="/">
                <img class="logo-katchen"  src="/web-asset/img/logo.png" alt="logo ManHOM">
              </router-link>
            </div>
          </div>
          <div class="row  flex-row-reverse my-3">
            <div class="col-md-8 text-md-end text-center"><h2>أدخل رقم التأكيد للمتابعه</h2></div>
          </div>
          <div class="row  flex-row-reverse mb-4">
            <div class="col-md-8 text-md-end text-center">  <h6 class="text-muted "> لقد تم إسال الكود لتأكيد من 5 ارقام إلى  {{email}}</h6></div>
          </div>
          <div class="row  flex-row-reverse">
            <div class="col-md-8 text-md-end text-center flex-row-reverse">
             <div class="input-wrapper">

          </div>
              <div class="mb-3 d-flex align-items-center justify-content-between w-75-c " style="direction: ltr;">
              <div class="text-center w-100">
                  <PincodeInput v-model="code" placeholder="0" :length=5 />
                  </div>
            </div>


              <button @click.prevent="submit()" class="btn btn-primary w-75 mb-4">تأكيد الكود</button>
                <div class="w-75-c text-center py-3">
                <a href="#" class="text-decoration-none link-primary" @click.prevent="resendToken()"><i class="fa-solid fa-arrows-rotate " :class="laodSend ? 'fa-spin ' :''"></i>
                إعادة الإرسال
                </a>
                </div>
                <div class="alert alert-success alert-dismissible fade show w-75 m-auto m-md-0 text-center" role="alert" v-if="submitStatus === 'OK'">
                  <strong>تم إعادة إرسال الرمز بنجاح</strong>
                </div>
                <div class="alert alert-info alert-dismissible fade show w-75 m-auto m-md-0 text-center" role="alert" v-if="submitStatus === 'PENDING'">
                  <strong>يرجى الإنتظار</strong>
                </div>
                <div v-if="errors.errorCode == 406" class="alert alert-warning alert-dismissible fade show w-75 m-auto m-md-0 text-center" role="alert" >
                  <strong>{{errors.errorCode ==406 ? 'يرجى ادخال الرقم بشكل صحيح': "الرقم المدخل غير صالح"}} </strong>
                </div>
                </div>
            </div>
          </div>
        <div class="col-md-6 my-5">
          <authSlider />
        </div>
    </div>
  </div>
</div>
</template>
<script>
import {Hooper,Slide,Navigation as HooperNavigation } from 'hooper';
import PincodeInput from 'vue-pincode-input';
import authSlider from '../accessories/authSlider.vue'
import 'hooper/dist/hooper.css';
export default {
        components:
        {
        Hooper,
        Slide,
        HooperNavigation,
        PincodeInput,
              authSlider,
      },
    data() {
   return {
      code:"",
      errors:{},
      submitStatus: "",
      laodSend:false,
      email: this.$route.params.email,
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
    methods:{
      submit() {
      {
          this.submitStatus = 'PENDING'
          this.accountVerification()
      }
    },
    resendToken(){
      this.errors.errorCode=""
      this.laodSend=true
       this.httpIm
                .put("/refresh_verification_token",{
                    "email":this.email,
                })
                .then(async (response) => {
                    this.submitStatus = 'OK'
                    this.errors.errorCode=""
                    this.code=""
                     this.laodSend=false
                }).catch(err => {
                     this.laodSend=false
                                this.errors=err.response.data

                });
    },
    accountVerification(){
      this.errors.errorCode=""
              this.httpIm
                .post("/account_verification",{
                    "verification_token": this.code,
                    "email":this.email,
                },)
                .then(async (response) => {
                  this.httpIm.defaults.headers.common['Authorization'] = 'Bearer ' + response.data.access_token;
                  try {
                this.httpIm.defaults.headers.authorization  = 'Bearer ' + response.data.access_token;
              this.httpSp.defaults.headers.authorization  = 'Bearer ' + response.data.access_token;
              this.http.defaults.headers.authorization  = 'Bearer ' + response.data.access_token;
              this.$cookies.set('token', response.data.access_token);
              this.$cookies.set('isLoggedIn',true );
              this.$cookies.set('userWeb', response.data.user );
              //this.$cookies.set('subscription', response.data.subscription );
              localStorage.setItem( 'tokenWeb', response.data.access_token );
              localStorage.setItem( 'isLoggedIn',true );
              localStorage.setItem( 'userWeb',JSON.stringify(response.data.user ));
              localStorage.setItem( 'subscription',JSON.stringify(response.data.subscription ));
              } catch (error) {
                
              }
                  this.$store.state.user =  response.data.user
                  this.$store.state.subscription =  response.data.subscription ?  response.data.subscription :[]
                  this.$router.go()
                }).catch(err => {
                                this.errors=err.response.data
                                this.submitStatus = ''

                });
    }
  }
};
</script>
<style scoped>
input {
    background-color: white;
    border-radius: 10px;
    text-align: center;
    font-size: 20px;
}
/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
/* Firefox */
input[type=number] {
  -moz-appearance: textfield;
}

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
.h{
    height: 750px;
}
</style>
<style>
 .vue-pincode-input-wrapper .vue-pincode-input,.vue-pincode-input-wrapper  .vue-pincode-input:focus {
    box-shadow: none;
    border: solid 1px #dee2e6;
}
    </style>
