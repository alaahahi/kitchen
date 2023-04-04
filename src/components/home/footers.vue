<template>
 <section class="footer">
                    <div  class="bg-light pt-5" >
                    <!--
                        <div class="bg-white" >
                        <h2 class="py-5  text-center" id="question">
                  هل لديك أسئله حول (من هم)      
                        </h2>
                    <div class="container">
                    <div class="accordion accordion-flush " id="accordion">
                    
                    <div  v-for="(faq,index) in faqs"  :key=index class="accordion-item bg-white">
                        <h2 class="accordion-header" :id="'heading'+index">
                        <button class="accordion-button fs-6 bg-white text-black" :class="index ==0 ? '' :'collapsed'" type="button" data-bs-toggle="collapse" :data-bs-target="'#a'+index" aria-expanded="false" :aria-controls=index>
                        {{faq.question}}                        
                        </button>
                        </h2>
                        <div :id="'a'+index" class="accordion-collapse collapse" :class="index ==0 ? 'collapse show' :'collapsed'" :aria-labelledby="'heading'+index" data-bs-parent="#accordion">
                        <div class="accordion-body text-muted fw-bold">
                        {{faq.answer}}    
                        </div>
                        </div>
                    </div>
                    </div>
                    </div>
                    <h3 class="text-center">
                    <button class="btn btn-primary m-4" type="button">تصفح كل الأسئلة</button>
                        </h3>
                        </div>
                    -->
                    <div class="container footerlink">
                    <div class="row w-100">
                        <div class="col-lg-4 col-md-12 col-sm-12 col-12">
                        <img class="logo-footer m-3" src="/web-asset/img/logo.png" alt="logo ManHOM">
                        <div class="m-3">
                        <p class="text-gray-90  text-md-end footer-info w-75   lh-lg fs-6">   <span>مطبخي</span> جديد عالم المطابخ
                        أحدث التجهزات من الماركات العالمية</p>
                        <b class="fs-6">تابعنا على</b>
                        <span class="me-3 text-md-start">
                        <a aria-label="Manhom linkedin" target=”_blank” href="https://www.linkedin.com/company/manhom/"     class="text-gray-90"> 
                            <svg  class="mx-2" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 28 28" width="32px" height="32px">
                                 <g id="surface198844223">
                                 <path style=" stroke:none;fill-rule:nonzero;fill:rgb(31.764707%,31.764707%,32.156864%);fill-opacity:1;" d="M 5.832031 3.5 C 4.542969 3.5 3.5 4.542969 3.5 5.832031 L 3.5 22.167969 C 3.5 23.457031 4.542969 24.5 5.832031 24.5 L 22.167969 24.5 C 23.457031 24.5 24.5 23.457031 24.5 22.167969 L 24.5 5.832031 C 24.5 4.542969 23.457031 3.5 22.167969 3.5 Z M 5.832031 5.832031 L 22.167969 5.832031 L 22.167969 22.167969 L 5.832031 22.167969 Z M 9.074219 7.371094 C 8.074219 7.371094 7.476562 7.96875 7.476562 8.769531 C 7.476562 9.570312 8.074219 10.167969 8.976562 10.167969 C 9.976562 10.167969 10.574219 9.570312 10.574219 8.769531 C 10.574219 7.96875 9.976562 7.371094 9.074219 7.371094 Z M 7.554688 11.667969 L 7.554688 19.832031 L 10.5 19.832031 L 10.5 11.667969 Z M 12.929688 11.667969 L 12.929688 19.832031 L 15.875 19.832031 L 15.875 15.371094 C 15.875 14.039062 16.820312 13.851562 17.105469 13.851562 C 17.390625 13.851562 18.152344 14.136719 18.152344 15.371094 L 18.152344 19.832031 L 21 19.832031 L 21 15.371094 C 21 12.804688 19.859375 11.667969 18.4375 11.667969 C 17.011719 11.667969 16.253906 12.140625 15.875 12.804688 L 15.875 11.667969 Z M 12.929688 11.667969 "/>
                                 </g>
                                 </svg></a>
                        <a aria-label="Manhom twitter" target=”_blank” href="https://twitter.com/ManHomAliq"          class="text-gray-90">
                            <svg class="mx-2" width="28" height="24" viewBox="0 0 28 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                 <path fill-rule="evenodd" clip-rule="evenodd" d="M27.3335 3.60073C26.6444 4.51947 25.8115 5.3209 24.8668 5.97406C24.8668 6.21406 24.8668 6.45406 24.8668 6.7074C24.8706 8.86501 24.445 11.0018 23.615 12.9934C22.785 14.985 21.567 16.7915 20.0321 18.3079C18.4971 19.8242 16.6759 21.02 14.6743 21.8257C12.6728 22.6314 10.5309 23.0308 8.3735 23.0007C5.85407 23.0091 3.36691 22.4341 1.10683 21.3207C1.04721 21.2947 0.9965 21.2518 0.960961 21.1973C0.925423 21.1428 0.906607 21.0791 0.906833 21.0141V20.8674C0.906833 20.7755 0.943357 20.6873 1.00837 20.6223C1.07338 20.5572 1.16156 20.5207 1.2535 20.5207C3.73004 20.4391 6.11822 19.5809 8.08017 18.0674C6.98177 18.0453 5.91201 17.7131 4.9943 17.1092C4.07658 16.5052 3.34831 15.6541 2.8935 14.6541C2.87045 14.5992 2.86188 14.5394 2.86863 14.4803C2.87537 14.4213 2.8972 14.3649 2.93202 14.3167C2.96684 14.2685 3.01347 14.23 3.06743 14.2051C3.1214 14.1801 3.18088 14.1694 3.24017 14.1741C3.92144 14.2425 4.60952 14.1791 5.26683 13.9874C4.0608 13.7372 2.96542 13.1103 2.13867 12.1973C1.31191 11.2843 0.796525 10.1323 0.666833 8.9074C0.662183 8.84811 0.67286 8.78863 0.69784 8.73466C0.722819 8.6807 0.76126 8.63406 0.809468 8.59925C0.857676 8.56443 0.914029 8.5426 0.973112 8.53586C1.03219 8.52911 1.09202 8.53767 1.14683 8.56073C1.81089 8.85361 2.52775 9.00787 3.2535 9.01406C2.19913 8.32236 1.40356 7.3009 0.991071 6.10926C0.578581 4.91762 0.572402 3.62292 0.9735 2.4274C1.01535 2.30996 1.08698 2.2054 1.18138 2.12396C1.27578 2.04252 1.3897 1.98699 1.512 1.96279C1.63431 1.9386 1.76079 1.94658 1.87909 1.98595C1.99738 2.02533 2.10342 2.09474 2.18683 2.1874C5.11281 5.30003 9.13315 7.15484 13.4002 7.36073C13.2909 6.9248 13.2371 6.47681 13.2402 6.0274C13.2597 4.87519 13.6212 3.75478 14.2788 2.80846C14.9364 1.86214 15.8604 1.13261 16.9335 0.712529C18.0065 0.292445 19.1803 0.20076 20.3056 0.449118C21.4308 0.697476 22.4569 1.27467 23.2535 2.1074C24.364 1.89594 25.4376 1.5231 26.4402 1.00073C26.4762 0.978268 26.5177 0.96636 26.5602 0.96636C26.6026 0.96636 26.6442 0.978268 26.6802 1.00073C26.7026 1.03673 26.7145 1.0783 26.7145 1.12073C26.7145 1.16316 26.7026 1.20474 26.6802 1.24073C26.1946 2.3522 25.3742 3.28442 24.3335 3.9074C25.2448 3.80176 26.1402 3.58689 27.0002 3.2674C27.0356 3.24332 27.0774 3.23045 27.1202 3.23045C27.163 3.23045 27.2048 3.24332 27.2402 3.2674C27.2701 3.2811 27.2967 3.30118 27.3182 3.32622C27.3396 3.35127 27.3553 3.38068 27.3642 3.41241C27.373 3.44414 27.3749 3.47743 27.3696 3.50995C27.3643 3.54248 27.352 3.57346 27.3335 3.60073Z" fill="#515152"/>
                                 </svg>
                                 
                        </a>
                        <a aria-label="Manhom youtube" target=”_blank” href="https://www.youtube.com/channel/UCFjTTx_G9TPs7xYI175vggA/featured"      class="text-gray-90">
                            <svg class="mx-2" width="30" height="22" viewBox="0 0 30 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M25.6698 0.985348L23.7231 0.785349C17.8988 0.180925 12.0275 0.180925 6.20313 0.785349L4.33646 0.985348C3.22413 1.11107 2.1984 1.64626 1.459 2.48672C0.719592 3.32718 0.319441 4.41273 0.336459 5.53202V16.4654C0.319441 17.5846 0.719592 18.6702 1.459 19.5106C2.1984 20.3511 3.22413 20.8863 4.33646 21.012L6.28313 21.212C9.17994 21.5146 12.0906 21.6659 15.0031 21.6653C17.929 21.6673 20.853 21.516 23.7631 21.212L25.6698 21.012C26.7821 20.8863 27.8079 20.3511 28.5473 19.5106C29.2867 18.6702 29.6868 17.5846 29.6698 16.4654V5.53202C29.6868 4.41273 29.2867 3.32718 28.5473 2.48672C27.8079 1.64626 26.7821 1.11107 25.6698 0.985348ZM27.0031 16.4654C27.021 16.9195 26.8702 17.3643 26.5797 17.7139C26.2892 18.0635 25.8796 18.2932 25.4298 18.3587L23.4831 18.5587C20.666 18.8522 17.8355 18.9991 15.0031 18.9987C12.1707 18.9991 9.34026 18.8522 6.52313 18.5587L4.57646 18.3587C4.12666 18.2932 3.71704 18.0635 3.42654 17.7139C3.13603 17.3643 2.9852 16.9195 3.00313 16.4654V5.53202C2.9852 5.07783 3.13603 4.63308 3.42654 4.28349C3.71704 3.9339 4.12666 3.7042 4.57646 3.63868L6.52313 3.43868C12.1612 2.85199 17.845 2.85199 23.4831 3.43868L25.4298 3.63868C25.8796 3.7042 26.2892 3.9339 26.5797 4.28349C26.8702 4.63308 27.021 5.07783 27.0031 5.53202V16.4654ZM13.8965 6.70535C13.7462 6.60377 13.5711 6.54498 13.39 6.53527C13.2089 6.52557 13.0285 6.56531 12.8682 6.65024C12.7079 6.73517 12.5738 6.86209 12.4801 7.01742C12.3865 7.17275 12.3368 7.35063 12.3365 7.53202V14.4654C12.3368 14.6467 12.3865 14.8246 12.4801 14.9799C12.5738 15.1353 12.7079 15.2622 12.8682 15.3471C13.0285 15.4321 13.2089 15.4718 13.39 15.4621C13.5711 15.4524 13.7462 15.3936 13.8965 15.292L19.0831 11.8253C19.2207 11.7357 19.3337 11.6132 19.4119 11.4688C19.4902 11.3245 19.5312 11.1629 19.5312 10.9987C19.5312 10.8345 19.4902 10.6729 19.4119 10.5285C19.3337 10.3842 19.2207 10.2617 19.0831 10.172L13.8965 6.70535Z" fill="#515152"/>
                              </svg>
                        </a>
                        </span>
                        </div>
                        </div>
                        <div class="col-lg-4 col-md-6 col-sm-6 col-6">
                        <ul class="nav flex-column p-0">
                        <li class="nav-item">
                            <h2 class="fw-bold fs-16">حول  مطبخي</h2>
                        </li>
                        <li  class="nav-item  py-2" v-for="(tap,index) in taps0" :key=index>
                        <a  class="text-gray-90 py-1 fs-6 fw-bold text-decoration-none" :href=tap.element >{{tap.title}}</a>
                        </li>
                        </ul>
                        </div>
                        <div class="col-lg-4 col-md-6 col-sm-6 col-6">
                        <ul class="nav flex-column p-0">
                        <li class="nav-item">
                            <h2 class="fw-bold fs-16" >من نحن</h2>
                        </li>
                        <li  class="nav-item  py-2" v-for="(tap,index) in taps1" :key=index>
                        <a :target="tap.element.includes('http') ? '_blank' : ''" class="text-gray-90 fs-6 fw-bold text-decoration-none" :href=tap.element >{{tap.title}}</a>
                        </li>
                        </ul>
                        </div>
<!--
                        <div class="col-lg-3 col-md-4 col-sm-12 col-12">
                        <ul class="nav flex-column p-0">
                        <li class="nav-item">
                            <h2 class="nav-link fw-bold fs-6">المزيد</h2>
                        </li>
                        <li  class="nav-item" v-for="(tap,index) in taps2" :key=index>
                        <a :target="tap.element.includes('http') ? '_blank' : ''" class="nav-link text-muted" :href=tap.element >{{tap.title}}</a>
                        </li>
                        </ul>
                        </div>
-->
                    </div>   
                    </div>
                    <div class="container-fluid fix">
                    <h2 class="fs-6">
                    <div class="text-muted">جميع الحقوق محفوظة ©2012-{{ new Date().getFullYear() }}.</div>
                    </h2>
                    </div>
                    </div>
            </section>
</template>
<script>
export default {
    props:['taps0','taps1'],
    data() {
        return {
     
            faqs:{}
        }
    },
    methods: {

    getfaq()
      {
      if (localStorage.getItem('faqs')) {
       this.faqs = JSON.parse(localStorage.getItem('faqs'));
      } 
      else 
      {
        this.httpIm.get('/faqs')
        .then(async (response)=>{
        this.faqs = this._.orderBy(response.data.faqs,"order");
       localStorage.setItem('faqs',JSON.stringify(this.faqs));
                     })
     }
   
            }
        },

};
</script>
<style scoped>


.fix {
        text-align: center;
    height: 60px;
    padding-top: 20px;
    border:1px  solid rgb(0 0 0 / 7%);
    margin-top: 10px;
}
</style>
