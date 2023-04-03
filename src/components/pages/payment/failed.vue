<template>
  <div class="container">
   <div class="row">
    <div class="col-12 text-center pb-5 ">
            <div class="my-4"><a href='/'  class="btn bg-white rounded-btn border-none shadow-card px-4 py-2  fw-bold fs-16" >سوف تنتقل إلى  الرئيسية خلال 5 ثواني</a></div>
            <svg width="97" height="97" viewBox="0 0 97 97" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M39.7431 57.2569L48.5 48.5M48.5 48.5L57.2569 39.7431M48.5 48.5L39.7431 39.7431M48.5 48.5L57.2569 57.2569M87.9063 48.5C87.9063 70.2635 70.2635 87.9063 48.5 87.9063C26.7365 87.9063 9.09375 70.2635 9.09375 48.5C9.09375 26.7365 26.7365 9.09375 48.5 9.09375C70.2635 9.09375 87.9063 26.7365 87.9063 48.5Z" stroke="#B50E0E" stroke-width="2.67" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <div class="my-4"><p class="fs-5 fw-bold text-gray-90"> نعتذر. لم تمت عملية الدفع بنجاج   </p></div>
            <div><p class="fs-16 text-gray-60">من خلال العضوية لديك العديد من المزايا التي يتمتع بها حسابك </p></div>
            <div class="my-4"><a  href='/profile' class="btn btn-primary rounded-btn border-none shadow-card px-5 py-2  fw-bold fs-16" >انتقل إلى الملف الشخصي </a></div>
        </div>
   </div>
</div>
</template>


<script>
export default {
  data() {
      return {
        }
    },
          methods: {
 submit() {
             setTimeout(()=>{    
               this.$router.push('/')
                },5000);
 }
          },
   created() {
        this.submit()
    }
}
</script>
