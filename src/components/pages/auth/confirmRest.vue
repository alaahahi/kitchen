<template>
    <div class="container">
     <div class="row">
      <div class="col-12 text-center py-5 ">
              <svg width="83" height="82" viewBox="0 0 83 82" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M41.5 0C33.391 0 25.4641 2.40461 18.7216 6.90974C11.9792 11.4149 6.72415 17.8182 3.62096 25.31C0.517765 32.8017 -0.294172 41.0455 1.28782 48.9987C2.86982 56.9519 6.77469 64.2574 12.5086 69.9914C18.2426 75.7253 25.5481 79.6302 33.5013 81.2122C41.4545 82.7942 49.6983 81.9822 57.19 78.879C64.6818 75.7758 71.0851 70.5208 75.5903 63.7784C80.0954 57.0359 82.5 49.109 82.5 41C82.5 35.6158 81.4395 30.2843 79.3791 25.31C77.3186 20.3356 74.2986 15.8158 70.4914 12.0086C66.6842 8.20142 62.1644 5.18138 57.19 3.12094C52.2157 1.0605 46.8842 0 41.5 0ZM59.335 31.693L36.293 54.735C36.109 54.9311 35.8867 55.0874 35.6399 55.1942C35.3931 55.3011 35.127 55.3562 34.858 55.3562C34.5891 55.3562 34.323 55.3011 34.0762 55.1942C33.8294 55.0874 33.6071 54.9311 33.423 54.735L23.665 45.1C23.4729 44.9094 23.3204 44.6827 23.2163 44.4329C23.1122 44.1831 23.0586 43.9151 23.0586 43.6445C23.0586 43.3739 23.1122 43.1059 23.2163 42.8561C23.3204 42.6063 23.4729 42.3796 23.665 42.189L25.838 40.016C26.0221 39.8199 26.2444 39.6636 26.4912 39.5567C26.738 39.4499 27.0041 39.3948 27.273 39.3948C27.542 39.3948 27.8081 39.4499 28.0549 39.5567C28.3017 39.6636 28.524 39.8199 28.708 40.016L34.858 46.125L54.292 26.691C54.6752 26.3154 55.1904 26.105 55.727 26.105C56.2636 26.105 56.7788 26.3154 57.162 26.691L59.335 28.864C59.6985 29.2452 59.9012 29.7518 59.9012 30.2785C59.9012 30.8052 59.6985 31.3117 59.335 31.693Z" fill="#4FCD8A"/>
              </svg>
              <div class="my-4"><p class="fs-4 fw-bold text-gray-90">تم تسجيلك بنجاح </p></div>
              <div><p class="done" style="font-size: 20px;color: #4F4F4F;">لقد تم إرسال كلمة مرور تلقائية على بريدك يمكنك تغييرها من ملف الشخصي </p></div>
              <div class="my-4 d-inline mx-1"><a  href='/البحث-المتقدم' class="btn btn-primary rounded-btn border-none shadow-card px-5 py-2 fs-16 input-reg" >انتقل الي البحث المتقدم الآن</a></div>
              <div class="my-4 d-inline mx-1">
                <button   data-bs-toggle="modal"
                            data-bs-target="#passwordModal" ref="passwordbtn" class="btn btn-light rounded-btn border-none shadow-card  py-2 text-primary  fs-16 input-reg" style="background: rgba(65, 105, 227, 0.08);padding: 0 80px;">تغيير كلمة المرور</button>
     
              
              </div>

          </div>
     </div>
     <div class="modal fade" id="passwordModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <i data-bs-dismiss="modal" aria-label="Close" ref="closebtnpssword"><svg
                                style="border-radius: 50%;position: relative;top: 2px;top: -31px;width: 31px;right: -32px;background: rgb(255, 255, 255);padding: 3px;"
                                viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd"
                                    d="M15.9992 28.8002C23.0685 28.8002 28.7992 23.0694 28.7992 16.0002C28.7992 8.93095 23.0685 3.2002 15.9992 3.2002C8.92997 3.2002 3.19922 8.93095 3.19922 16.0002C3.19922 23.0694 8.92997 28.8002 15.9992 28.8002ZM13.9306 11.6688C13.3058 11.044 12.2927 11.044 11.6678 11.6688C11.043 12.2937 11.043 13.3067 11.6678 13.9316L13.7365 16.0002L11.6678 18.0688C11.043 18.6937 11.043 19.7067 11.6678 20.3316C12.2927 20.9564 13.3058 20.9564 13.9306 20.3316L15.9992 18.2629L18.0678 20.3316C18.6927 20.9564 19.7057 20.9564 20.3306 20.3316C20.9554 19.7067 20.9554 18.6937 20.3306 18.0688L18.262 16.0002L20.3306 13.9316C20.9554 13.3067 20.9554 12.2937 20.3306 11.6688C19.7057 11.044 18.6927 11.044 18.0678 11.6688L15.9992 13.7375L13.9306 11.6688Z"
                                    fill="#20211F" />
                            </svg></i>
                    </div>
                    <div class="modal-body">
                        <h4 class="pb-2">تغيير كلمة المرور</h4>
                        <form class="row g-3" @submit.prevent="submit">
                            <div class="col-md-12">
                                <label for="inputEmail4" class="form-label">كلمة المرور الحالية</label>
                                <div class="position-relative has-validation">
                                    <input :type="passwordFieldType" v-model="passwordLast"
                                        class="form-control bg-white text-end"
                                        :class="!passwords(passwordLast) ? '' : 'is-valid'" style="direction: ltr;">
                                    <i @click="switchVisibility()" :class="passwordFieldIcon"
                                        class="fa-solid fa-eye position-absolute top-50 start-0-c translate-middle-y text-muted"></i>
                                </div>
                                <div class="text-danger py-1  fs-7"
                                    v-if="!passwords(passwordLast)">
                                    مطلوب 6 محارف  على الأقل متضمنة حرف و رقم و رمز
                                </div>
                            </div>

                            <div class="col-md-12">
                                <label for="inputEmail4" class="form-label">كلمة المرور الجديدة</label>
                                <div class="position-relative has-validation">
                                    <input :type="passwordFieldType" v-model="newPassword"
                                        class="form-control bg-white  text-end"
                                        :class="!passwords(newPassword)? '' : 'is-valid'" style="direction: ltr;">
                                    <i @click="switchVisibility()" :class="passwordFieldIcon"
                                        class="fa-solid fa-eye position-absolute top-50 start-0-c translate-middle-y text-muted"></i>
                                </div>
                                <div class="text-danger py-1  fs-7"
                                    v-if="!passwords(newPassword)">
                                    مطلوب 6 محارف  على الأقل متضمنة حرف و رقم و رمز
                                </div>
                            </div>

                            <div class="col-md-12">
                                <label for="inputEmail4" class="form-label">تأكيد كلمة المرور الجديدة</label>
                                <div class="position-relative has-validation">
                                    <input :type="passwordFieldType" v-model="newPasswordConf"
                                        class="form-control bg-white  text-end"
                                        :class="newPasswordConf == newPassword && newPasswordConf ? 'is-valid' : ''" style="direction: ltr;">
                                    <i @click="switchVisibility()" :class="passwordFieldIcon"
                                        class="fa-solid fa-eye position-absolute top-50 start-0-c translate-middle-y text-muted"></i>
                                </div>
                                <div class="text-danger pt-1  fs-7" v-if="newPasswordConf != newPassword">كلمة السر
                                    غير متطابقة</div>
                            </div>
                  

                            <div class="alert alert-danger alert-dismissible fade show text-center" role="alert"
                                v-if="submitStatus == 'ERROR'">
                                <strong>يرجى ملء جميع الحقول المطلوبة</strong>
                            </div>
                            <div class="col-12">
                                <button type="button" @click.prevent="submit()" class="btn btn-primary  w-100">
                                    تأكيد كلمة المرور الجديدة
                                    <span :class="{ 'spinner-border spinner-border-sm': resetPasswordLoading }"></span>
                                </button>
                                <button type="button" data-bs-dismiss="modal" class="btn btn-light border w-100 mt-2">
                                    إلغاء
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
  </div>
  </template>
  
  
  <script>

  export default {
    data() {
        return {
          submitStatus:"",
          passwordFieldType: "password",
            passwordFieldIcon: "fa-eye",
            newPasswordConf: "",
            passwordLast:"",
            resetPasswordLoading:false,
            newPassword: "",
            password: "",
            checkPassword: "",
            token: this.$store.state.token,
            user: this.$store.state.user,
          }
      },   
      
            methods: {
                passwords(value) {
          //const containsUppercase = /[A-Z]/.test(value)
          const containsLowercase = /[a-z]/.test(value)
          const containsNumber = /[0-9]/.test(value)
          const containsSpecial = /[#?!@$%^&*-]/.test(value)
          return containsLowercase  && containsLowercase && containsNumber && containsSpecial && value.length > 5},
              changePassword() {

            this.resetPasswordLoading = true
            this.httpIm.put("/password_direct_reset", {
                "current_password": this.passwordLast,
                "password": this.newPassword,
                "password_confirm": this.newPasswordConf
            }, { headers: { Authorization: `Bearer ${this.token}` } })
                .then(async (response) => {
                    this.resetPasswordLoading = false
                    this.$refs.passwordbtn.click()
                    if(response.data.user){
                        localStorage.setItem( 'userWeb',JSON.stringify(response.data.user));
                        this.$cookies.set('userWeb', response.data.user );

                    }
                    this.$toast.success("تم تعديل كلمة المرور بنجاح",);
                    setTimeout(() => {
                               this.$router.go() 
                        }, 1000);
               

                }).catch(err => {
                    this.resetPasswordLoading = false
                    this.errors = err.response.data
                    if (this.errors.errorCode = 406) {
                        this.$toast.error("كلمة المرور الحالية التي تم إدخالها غير صحيحة",);
                    }
                });
            },
            switchVisibility() {
            this.passwordFieldType =
                this.passwordFieldType === "password" ? "text" : "password";
            this.passwordFieldIcon =
                this.passwordFieldType === "password" ? "fa-eye" : "fa-eye-slash";
        },
              submit() {
               
            if (this.passwords(this.passwordLast) && this.passwords(this.newPassword) &&  this.newPassword == this.newPasswordConf) {
                this.submitStatus = 'PENDING'
                this.changePassword()
       
            } else {
         
                this.submitStatus = 'ERROR'
            }
        },
   restPassword(){
    this.$router.push({name: 'email'})
   }
            },
     created() {
     
      }
  }
  </script>
  <style>
.done 
  {
  font-weight: 500;
  font-size: 20px;
  color: #4F4F4F;
  }
</style>
  