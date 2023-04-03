<template>
<div>
  <div class="container-fluid bg-white ">
       <headers  :taps=header  class="mb-5" />

    <div class="flex-row my-4 py-4 mb-5 pb-5">
                <div class="col-lg-4  col-md-6 col-sm-8 col-xs-10  m-auto">
                    <div class="text-end">
                    <h3 class="py-4">تغيير كلمة المرور</h3>
                   <label for="email" class="form-label fw-bold">البريد الإلكتروني</label>
                  <div class="position-relative w-75">
                  <input type="email" v-model="value.email" class="form-control bg-white my-2" required   :disabled="disabled ? '' : disabled">
                  </div>
                    <div v-if="sendEmail">
                      <div class="row  flex-row-reverse my-3">
                            <div class="col-md-12 text-end"><h3>أدخل رقم التأكيد للمتابعه</h3></div>
                        </div>
                        <div class="row  flex-row-reverse mb-4">
                            <div class="col-md-12 text-end">  <h6 class="text-muted "> لقد تم إسال الكود لتأكيد من 5 ارقام إلى  {{value.email}}</h6></div>
                        </div>
                        <div class="row  flex-row-reverse">
                            <div class="col-md-12 text-end flex-row-reverse">

                            <div class="mb-3 d-flex align-items-center justify-content-between w-75" style="direction: ltr;">
                                   <div class="text-center w-100">
                                    <PincodeInput v-model="code" placeholder="0" :length=5 />
                                    </div>
                            </div>

                            <button @click.prevent="accountVerification()" class="btn btn-primary w-75">تأكيد الكود</button>
                            <div class="w-75 text-center ">
                            <div class="py-3">
                            <a href="#" class="text-decoration-none link-primary " @click.prevent="resendToken()"><i class="fa-solid fa-arrows-rotate " :class="laodSend ? 'fa-spin ' :''"></i>
                            إعادة الإرسال
                            </a>
                            </div>

                            </div>
                            </div>
                        </div>
                    </div>
                  <a  v-if="!sendEmail" class="btn btn-primary w-75 my-4 py-2" @click.prevent="postEmail()">متابعة</a>
                  <div class="w-75">
                            <div class="alert alert-success alert-dismissible fade show text-center" role="alert" v-if="submitStatus === 'OK'">
                            <strong>تم إعادة إرسال الرمز بنجاح</strong>
                            </div>
                            <div class="alert alert-info alert-dismissible fade show text-center" role="alert" v-if="submitStatus === 'PENDING'">
                            <strong>يرجى الإنتظار</strong>
                            </div>
                            <div v-if="submitStatus === 'ERROR'">
                            <div v-for="error in errors" :key=error.errorCode class="alert alert-warning alert-dismissible fade show text-center" role="alert" >
                            <strong>{{error.errorMessage == "The verification token field is required." ? 'يرجى ادخال الرقم بشكل صحيح': "الايميل المدخل غير صالح"}} </strong>

                            </div>
                            </div>
                    </div>
                    </div>
                </div>
    </div>
    <div class="mt-5 pt-5">
    <footers :taps0=taps0  :taps1=taps1  />
    </div>
  </div>
</div>
</template>
<script>
import footers from '../../home/footers.vue'
import PincodeInput from 'vue-pincode-input';
import headers from '../../home/header.vue'
export default {
        components:
        {
        footers,
        PincodeInput,
                headers
      },
    data() {
   return {
      disabled:false,
      submitStatus :"",
      sendEmail:false,
      code:"",
      footer:[],
  header:[],
  taps1:[],
  taps0:[],
           errors:{},
      laodSend:false,
      value:{
          "email":""
      }
    };
    },
    methods:{
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
     postEmail()
            {
        this.submitStatus = 'PENDING'
        this.httpIm.post('/password_reset_request',this.value)
        .then(async (response)=>{
             this.sendEmail=true
              this.submitStatus =""
              this.disabled=true
                     }).catch(err => {
                                this.errors=err.response.data
                            this.submitStatus ="ERROR"
                });
            },
           accountVerification(){
              this.httpIm
                .post("/password_token_verification",{
                    "email":this.value.email,
                    "verification_token":this.code

                })
                .then(async (response) => {
                    this.$router.push({name: 'resetPassword', params: {data: {email:this.value.email, code:this.code}}})
        //        console.log(response.data);
                }).catch(err => {
                                this.errors=err.response.data
                            this.submitStatus ="ERROR"
                });
    },
        resendToken(){
      this.laodSend=true
       this.httpIm
                .put("/refresh_verification_token",{
                    "email":this.value.email
                })
                .then(async (response) => {
                    this.submitStatus = 'OK'
                     this.laodSend=false
                }).catch(err => {
                     this.laodSend=false
                                this.errors=err.response.data
                          this.submitStatus ="ERROR"
                });
    }
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
<style>
.vue-pincode-input-wrapper .vue-pincode-input,.vue-pincode-input-wrapper  .vue-pincode-input:focus {
    box-shadow: none;
    border: solid 1px #dee2e6;
}
</style>
