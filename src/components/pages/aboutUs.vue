<template>
  <div >
        <div  style="background-image: url('web-asset/img/path104.png');" >
        <div style="background-color: rgb(255 255 255 / 80%);">
            <breadcrumb :data=breadcrumbLsit />
<div class="container">
            <div class="col-md-6 col-12 py-3">
              <h2 class=" fw-bold my-4">عن من هم</h2>

<p class="fs-16">دليل &quot;من هم&quot; هو أكبر قاعدة بيانات للشخصيات والشركات العربية. يضم الدليل 220,000 شخصية ومؤسسة عربية من مختلف القطاعات.</p>

<p class="fs-16 ">من هم، هو أحد مواقع&nbsp;<a href="https://majarra.com" target="_blank">مجرة</a>.</p>
<p class="fs-3 fw-bold">الأسئلة الشائعة</p>
<p class="fs-16 fw-bold">كيف يمكنني إضافة نفسي أو شخصية أعرفها إلى الدليل؟</p>
<p class="fs-16">يمكنك إضافة شخصية من خلال زيارة&nbsp;<router-link :to="{ name: 'addCharacter'}" >الصفحة التالية</router-link >.</p>
<p class="fs-16 fw-bold">كم من الوقت يحتاج طلب الإضافة أو التعديل؟</p>
<p class="fs-16">تحتاج طلبات الإضافة مدة تتراوح بين 15-30 يوماً، أما طلبات التعديل فتتم خلال 48 ساعة من موعد الإرسال.</p>
<p class="fs-16 fw-bold">هل يقوم دليل &quot;من هم؟&quot; بنشر معلومات شخصية خاصة؟</p>
<p class="fs-16">يتم جمع المعلومات في الدليل من خلال البيانات المفتوحة والمنشورة مسبقاً، كالمصادر الرسمية المعتمدة والمنشورة علناً، بالإضافة إلى المعلومات التي ينشرها الأشخاص عن أنفسهم على مواقع شركاتهم وصفحاتهم على وسائل التواصل الاجتماعي.</p>
</div>

</div>


                   </div>
        </div>
  </div>
</template>

<script>
import breadcrumb from '../pages/accessories/breadcrumb.vue'
export default {
  metaInfo: {
      title: " عن من هم؟  | بوابة الشخصيات والمؤسسات" 
    },
      components: 
        {
        breadcrumb,
      },
    data() {

        return {
       charactours:{},
       loading:false,
      'breadcrumbLsit' :[
        {
          name:'الرئيسية',
          link:'/'
        },
        {
          name:'عن من هم',
          link:'/%D8%B9%D9%86-%D9%85%D9%86-%D9%87%D9%85'
        },
                        ],
      
        }
    },

        methods: {
    getCharactour()
            {
              this.http.get('/charactour/most_visited?code='+this.$store.state.countryFilter.toLowerCase())
              .then(async (response)=>{
                this.charactours = response.data.top_characters.slice(0,2)
        this.loading = false
                     })
            }
        },
               created() 
        {
            this.getCharactour()
        }
}
</script>

<style>
.cardmargin {
      margin-top: 69px;

}
.bg-category{
    background: linear-gradient(to bottom, transparent 8%, black 100%);

}

</style>