<template>
<div>
  <div class="container-fluid bg-white">
       <headers  :taps=header  class="mb-5" />
    <div class="flex-row my-4 py-4">
                <div class="col-lg-4  col-md-6 col-sm-8 col-xs-10 m-auto">
                  <div class="text-end">
                  <h3 class="py-4">تغيير كلمة المرور</h3>
                  <form @submit.prevent="submit">
                  <div  v-if="submitStatus != 'OK'">
                  <label for="password" class="form-label">كلمة المرور الجديده </label>
                  <div class="position-relative w-75  has-validation">
                  <input :type="passwordFieldType"  v-model="password" class="form-control bg-white my-2 text-end" :class="!passwords(password) ? '' : 'is-valid'" style="direction: ltr;">
                  <i  @click="switchVisibility" :class="passwordFieldIcon" class="fa-solid fa-eye position-absolute top-50 start-0-c translate-middle-y text-muted"></i>
                  </div>
                  <div class="w-75 text-danger py-1 mb-2 text-break fs-7"  v-if="!passwords(password)">
                     مطلوب 6  محارف  على الأقل متضمنة حرف و رقم و رمز 
                  </div>
                  <label for="passwordConfirm" class="form-label pt-3">تأكيد كلمة المرور الجديدة </label>
                  <div class="position-relative w-75">
                  <input :type="passwordFieldType" v-model="passwordConfirm"  class="form-control bg-white my-2 text-end" :class="passwordConfirm  == password && passwordConfirm? 'is-valid' : ''" style="direction: ltr;">
                  <i  @click="switchVisibility"  :class="passwordFieldIcon" class="fa-solid fa-eye position-absolute top-50 start-0-c translate-middle-y text-muted"></i>
                  </div>
                  <div class="w-75  text-danger pt-1  fs-7" v-if="passwordConfirm  != password && passwordConfirm">كلمة السر غير متطابقة</div>
                  <button class="btn btn-primary w-75 my-4 py-2"  type="submit" :disabled="submitStatus === 'PENDING'">تأكيد كلمة المرور الجديدة</button>
                  <div class="alert alert-danger alert-dismissible fade show w-75 text-center  fs-7" role="alert" v-if="submitStatus === 'ERROR'">
                    <strong>يرجى ملء جميع الحقول المطلوبة</strong>
                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                  </div>
                  <div class="alert alert-info alert-dismissible fade show w-75 text-center fs-7" role="alert" v-if="submitStatus === 'PENDING'">
                    <strong>يرجى الإنتظار</strong>
                  </div>
                  </div>
                  </form>
                  <div  v-if="submitStatus === 'OK'">
                  <div class="alert alert-success alert-dismissible fade show w-75 text-center fs-7" role="alert">
                    <strong>تم تعديل كلمة المرور بنجاح</strong>
                  </div>
                 <router-link :to="{ name: 'login'}" class="btn btn-light border w-75 px-3">الرجوع لصفحة تسجيل الدخول</router-link>
                  </div>
                   
              

                  </div>
                </div>
    </div>
    <div class="row mt-4 pt-4">
    <div class="mt-5 pt-5">
    <footers :taps0=taps0  :taps1=taps1  />
    </div>
    </div>
  </div>
</div>
</template>
<script>
import headers from '../../home/header.vue'
import { required, minLength,email ,sameAs} from 'vuelidate/lib/validators'
import footers from '../../home/footers.vue'
import { Carousel, Slide } from 'vue-carousel'
export default {
        components: 
        {
        Carousel,
        Slide,
        footers,
headers      },
    data() {
   return {
      submitStatus:"",
      password: "",
      passwordConfirm: "",
      passwordFieldType: "password",
      passwordFieldIcon:"fa-eye",
      errors:{},
      footer:[],
  header:[],
  taps1:[],
  taps0:[]
    };
    },

    methods:{
      passwords(value) {
          //const containsUppercase = /[A-Z]/.test(value)
          const containsLowercase = /[a-z]/.test(value)
          const containsNumber = /[0-9]/.test(value)
          const containsSpecial = /[#?!@$%^&*-]/.test(value)
          return containsLowercase  && containsLowercase && containsNumber && containsSpecial && value.length > 5},
      getFooter()
            {
        try {
          this.footer = JSON.parse(localStorage.getItem('footer')) ?JSON.parse(localStorage.getItem('footer')):[] ;
        this.header = JSON.parse(localStorage.getItem('header')) ?JSON.parse(localStorage.getItem('header')):[];
        } catch (error) {
          
        }
      
        if(this.header.length == 0 && this.header.length ==0 ){
          this.http.get('/headerFooter')
        .then(async (response)=>{
        this.footer = this._.orderBy(response.data.filter((item) => {return (item.type == 'footer')}),"order");
        this.header = this._.orderBy(response.data.filter((item) => {return (item.type == 'header')}),"order");
        this.taps0 =  this.footer.slice(0,3)
        this.taps1 =  this.footer.slice(3,10)   
        try {
          localStorage.setItem('header',JSON.stringify( this.header));
        localStorage.setItem('footer',JSON.stringify( this.footer));
        } catch (error) {
          
        } 

        
        //this.footer = JSON.parse(localStorage.getItem('tapsFooter'));
        //this.header = JSON.parse(localStorage.getItem('taps'));

                     })
        }
        else{
        try {
        this.taps0 =  this.footer.slice(0,3)
        this.taps1 =  this.footer.slice(3,10)     
        } catch (error) {
          
        }

        }

      },
          submit() {
      console.log('submit!')
      if ( !this.passwords(this.password) || this.passwordConfirm  != this.password) {
        this.submitStatus = 'ERROR'
      } else {
        this.submitStatus = 'PENDING'
          this.accountVerification()
      }
    },
    switchVisibility() {
      this.passwordFieldType = this.passwordFieldType === "password" ? "text" : "password";
      this.passwordFieldIcon = this.passwordFieldType === "password" ? "fa-eye" : "fa-eye-slash";
    },
    accountVerification(){
              this.httpIm
                .post("/password_reset",{
                 "email": this.$route.params.data.email,
                "verification_token": this.$route.params.data.code,
                "password": this.password,
                "password_confirm": this.passwordConfirm
                })
                .then(async (response) => {
                    this.submitStatus = 'OK'
                    if(response.data.user){
                      this.$cookies.set('userWeb', response.data.user );

                        localStorage.setItem( 'userWeb',JSON.stringify(response.data.user));
                    }
                }).catch(err => {
                      this.errors=err.response.data
                      this.submitStatus = 'ERROR'
                });
    },
  },
  created()
{
  this.getFooter()
}
};
</script>
<style scoped>
.start-0-c {
    left: 15px !important;
}
.navbar{
    height: 60px;
    margin-top: 0;
    margin-bottom: 0;
}
</style>