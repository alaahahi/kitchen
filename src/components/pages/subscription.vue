<template>
    <div class="bg-white">
    <div class="container py-3">
    <div class="row">
        <div class="col-md-8  col-sm-12">
            <h1 class="py-2">الإشتراك بالنشرة الإخبارية  </h1>
            <p class="text-muted py-2">الإشتراك بالنشرة الإخبارية للشخصيات والمؤسسات بإضافة لمتابعة الشخصيات والمؤسسات الذين تقلدو مناصب مرموقه إضافة إلى مجموعة من الاشخاص التي تصنع المقالات</p>
            <div class="row rounded-3 border p-4">
                <h2>معلومات الاشتراك</h2>
                <form @submit.prevent="submit" class="row">
                <div class="col-12 mb-3">
                <label for="email" class="form-label  fw-bold">البريد الإلكتروني</label>
                  <span class="text-danger" v-if="!$v.user.email.required" >*</span>
                    <div class="input-group has-validation  ">
                        <input type="email" v-model.trim="$v.user.email.$model"   class="form-control w-75 bg-white " :class="!$v.user.email.email || $v.user.email.$model == '' ? '' : 'is-valid'">
               
                    </div>
                             <div  class="text-danger mt-2"  v-if="!$v.user.email.email">
                    يرجى إدخال بريد الإلكتروني صالح
                    </div>
                </div>
                <div class="col-6 mb-3">
                <label for="email" class="form-label  fw-bold"> نوع الأخبار</label>
                  <span class="text-danger" v-if="!$v.user.newsType.required" >*</span>
                <select v-model="user.newsType" class="form-select bg-white ">
                       <option v-for="news in newsTypes" :key=news.id :value=news.value>{{news.valueAR}}</option>
                  </select>
                </div>
                <div class="col-6 mb-3">
                <label for="email" class="form-label  fw-bold"> نوع الطلب</label>
                  <span class="text-danger" v-if="!$v.user.oprtionType.required" >*</span>
                <select v-model="user.oprtionType" class="form-select bg-white ">
                       <option v-for="news in types" :key=news.id :value=news.value>{{news.valueAR}}</option>
                  </select>

                </div>
                <!--
                <div class="col-md-6 mb-3">
                  <label for="name" class="form-label fw-bold">الاسم  الأول</label>
                  <input type="text" v-model="user.firstName" class="form-control  bg-white"  placeholder="أحمد" :class="user.firstName == '' ? '' : 'is-valid'">
                </div>
                <div class="col-md-6 mb-3">
                  <label for="password" class="form-label fw-bold">الاسم  الأخير</label>
                  <input type="text" v-model="user.lastName" class="form-control bg-white"  placeholder="علي" :class="user.lastName == '' ? '' : 'is-valid'">
                </div>
                                -->
                <div class="col-12 text-center mb-3">
                    <button class="btn btn-primary w-50" :disabled="submitStatus === 'PENDING'"  type="submit" >أرسل
                     <span :class="{ 'spinner-border spinner-border-sm': loading == true }"></span>
                    </button>
                </div>

                </form>
                <div class="alert alert-danger alert-dismissible fade show text-center" role="alert" v-if="submitStatus === 'ERROR'">
                  <strong>يرجى ملء جميع الحقول المطلوبة</strong>
                </div>
                <div class="alert alert-info alert-dismissible fade show text-center" role="alert" v-if="submitStatus === 'PENDING'">
                  <strong>يرجى الإنتظار</strong>
                </div>
                <div class="alert alert-success alert-dismissible fade show text-center" role="alert" v-if="submitStatus === 'OK'">
                  <strong>شكرا  تمت العملية بنجاح سنقوم بتحويك بشكل تلقائي للصفحة الرئيسية</strong>
                </div>
                <div v-if="errors.errorMessage" class="alert alert-warning alert-dismissible fade show " role="alert" >
                  <strong>{{errors.errorMessage == "User does not exist or password mismatch" ? 'المعذرة البريد الإلكتروني غير صالحة': errors.errorMessage}} </strong>
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
import { required,email ,} from 'vuelidate/lib/validators'
import blockSub from '../pages/ads/blockSub.vue'
import adsFet from '../pages/ads/adsFet.vue'
  
export default {
        metaInfo: {
      title: 'نشراتنا الإخبارية'
    },
         components: 
        {
          blockSub,
          adsFet
        },
          validations: {
    user: {
      email: {
        email,
        required
      },
      
      newsType:{
        required
      },
      oprtionType:{
        required
      }
    }
  },
    data() {
        
        return {
         newsTypes:[{'id':0,'value':'characters','valueAR':'الشخصيات'},{'id':1,'value':'companies','valueAR':'المؤسسات'},{'id':2,'value':'all','valueAR':'الشخصيات والمؤسسات'}],
         types:[{'id':0,'value':1,'valueAR':'إشتراك'},{'id':1,'value':0,'valueAR':' إلغاء الإشتراك'}],
            user:{
            'newsType':"",
            'email':"",
            'oprtionType':""
            },
                   errors:
            {
                "message": "",
                "errorCode": "",
                "errorMessage":""
            },
            loading:false,
            submitStatus: null,
              'user_id':this.$store.state.user.id,
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
        this.postEmailRecipient()
      }
    },

    postEmailRecipient()
        {
        this.loading=true
        this.httpMg.post('/web/newsletter_news_recipient',
        {
        "newsletter_news_id":this.user.newsType,
        "email": this.user.email,
        "user_id":this.user.user_id,
        'optiontype':this.user.oprtionType //subscription ,unsubscription
        }
        )
        .then(async (response)=>{
            this.loading=false
              this.submitStatus = 'OK'
              setTimeout(()=>{    
               this.$router.push('/')
                },5000);
                     }).catch(err => {
                        this.errors=err.response.data 
                })

                   
            },
            }   ,
};
</script>