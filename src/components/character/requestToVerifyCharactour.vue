<template>
    <div class="bg-white">
    <div class="container py-3">
    <div class="row">
        <div class="col-md-8">
            <h2 class="py-2">إضافة طلب توثيق شخصية</h2>
            <p class="text-muted py-2">نحن مطالبون للتحقق من طلبك</p>
            <div class="row rounded-3 border p-4">
                <h2>معلومات التوثيق</h2>
              <form v-on:submit.prevent="submit()">
              <div class="row">
              <div class="mb-3 col-md-6">
                <label for="formGroupExampleInput" class="form-label">اسم الشخصية <span class="text-danger">*</span></label>     
              <input type="text" class="form-control" v-model.trim="$v.VerifyCharactour.charactourName.$model" />
              </div>
              <div class="mb-3 col-md-6">
                <label for="formGroupExampleInput" class="form-label" >معلومات إضافية عن للتوثيق<span class="text-danger">*</span></label>     
              <input type="text" class="form-control"  v-model.trim="$v.VerifyCharactour.verificationReason.$model" />
              </div>
              <div class="mb-3 col-md-6">
                <label for="formGroupExampleInput" class="form-label" >ملف<span class="text-danger">*</span></label>     
                 <label for="file-upload" class="btn btn-primary form-control text-end"> 
                  إختيار ملف 
                  
                  {{'| '+ filename  | truncate(25, '...')}}
                <i class="fa fa-cloud-upload float-start mt-1"></i>
                </label> 
              <input  id="file-upload"  type="file" class="form-control" @change='uploadFile'   ref="file" />
              </div>
              <div class="mb-3 col-md-12 text-center">
              <input type="submit" class="btn btn-light border w-50" value="إضافة الطلب"/>
              </div>
              </div>
              </form>
              <div  v-for="(erro, i) in error" :index="i" :key="i"  class="alert alert-warning alert-dismissible fade show" role="alert">
                <strong>{{erro}}</strong>
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
              </div>
                <div class="alert alert-danger alert-dismissible fade show text-center" role="alert" v-if="submitStatus === 'ERROR'">
                  <strong>يرجى ملء جميع الحقول المطلوبة</strong>
                  <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>
                <div class="alert alert-info alert-dismissible fade show text-center" role="alert" v-if="submitStatus === 'PENDING'">
                  <strong>يرجى الإنتظار</strong>
                </div>
                <div class="alert alert-success alert-dismissible fade show text-center" role="alert" v-if="submitStatus === 'OK'">
                  <strong>شكرا لك للتسجل </strong>
                </div>
                <div v-if="errors.errorMessage" class="alert alert-warning alert-dismissible fade show " role="alert" >
                  <strong>{{errors.errorMessage == "User does not exist or password mismatch" ? 'المعذرة البريد الإلكتروني غير صالحة': errors.errorMessage}} </strong>
                  <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>
            </div>
        </div>
        <div class="col-md-4 col-sm-12">
          <blockSub />
          <adsFet />
        </div>
    </div>
</div>
    </div>
</template>

<script>
import { required} from 'vuelidate/lib/validators'
import blockSub from '../pages/ads/blockSub.vue'
import adsFet from '../pages/ads/adsFet.vue'
export default {
           components: 
        {
          blockSub,
          adsFet
        },
data(){
 return{  
  
    VerifyCharactour:{
      character_id : this.$route.params.id ? this.$route.params.id : 0,
     charactourName :this.$route.params.name ?decodeURI( this.$route.params.name).split('-').join(' ') : "",
     verificationReason :"",
     userName :  this.$store.state.user.firstname + ' ' +this.$store.state.user.lastname ,
     userEmail : this.$store.state.user.email,
     requestLink : this.$route.params.name ?decodeURI( this.$route.params.name) : "",
     file : "",
     user_id:this.$store.state.user.id,
    },
    filename:"",
    error:{},
     errors:
            {
                "message": "",
                "errorCode": "",
                "errorMessage":""
            },
            loading:false,
                     submitStatus: null,
}
},
          validations: {
VerifyCharactour:{
      charactourName: {
              required
      },

      verificationReason: {
              required
      },
      file: {
              required
      },
}
  },
     methods: {
           submit() {
      console.log('submit!')
      this.$v.$touch()
      if (this.$v.$invalid) {
        this.submitStatus = 'ERROR'
      } else {
        this.submitStatus = 'PENDING'
        this.postVerifyCharactour()
      }
    },
    postVerifyCharactour()
            {  
          let formData = new FormData();
         formData.append('charactourName',this.VerifyCharactour.charactourName);
         formData.append('character_id',this.VerifyCharactour.character_id);
         formData.append('verificationReason',this.VerifyCharactour.verificationReason);
         formData.append('requestLink',this.VerifyCharactour.requestLink);
         formData.append('user_id',this.VerifyCharactour.user_id);
         formData.append('userName',this.VerifyCharactour.userName);
         formData.append('userEmail',this.VerifyCharactour.userEmail);
         formData.append('file',this.VerifyCharactour.file);    
        this.http.post('/RequestToVerifyCharacter/store',formData)
        .then(async (response)=>{
        this.error=response.data.errorMessage
          this.submitStatus = 'OK'
        
                     })
        .catch((error) => { 
               if (error) {
                   console.log(error)
               }  
          })
            },
          uploadFile(e){
                let file = e.target.files[0];
                let reader = new FileReader();  
                if(file['size'] < 4111775)
                {
                    reader.onloadend = (file) => {
                    }  
                   this.filename = e.target.files[0].name;
                    this.VerifyCharactour.file =file;
                     reader.readAsDataURL(file);
                    this.loading=false            
                }else{
                    this.$toast.error("المعذرة  حجم الملف الذي تم تحميله اكبر من 4 ميغا", );
                }
            },

        },
            
}
</script>
<style>
input[type="file"] {
    display: none;
}
.custom-file-upload {
    border: 1px solid #ccc;
    display: inline-block;
    padding: 6px 12px;
    cursor: pointer;
}
</style>