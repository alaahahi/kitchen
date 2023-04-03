<template>
<section class="companySubscription p-5 mb-5" >
                <div class="container text-center p-bottom">
                <h1 class="display-2  fs-1 py-2 fw-bold">إستمتع بتصفح وإضافات مميزات غير محدودة </h1>
                <h1 class="display-4 fs-4 pt-1 pb-2 text-black-80 ">إحصل على تحكم ومشاهدات افضل من خلال المميزات المختلفة التي نوفرها لك</h1>
                </div>
                <div class="container ">
                    <div class="row d-flex justify-content-around">
                        <div class="col-lg-5 text-end position-relative  mb-3">
                            <div class="card w-100 position-absolutes">
                            <div class="card-body">
                                <h5 class="card-title fs-3 pt-4">الباقة الذهبية</h5>
                                <div class="card-text pt-4 d-flex justify-content-start">
                                    <a href="#" class="btn btn-primary px-4">ابدأ الآن مجاناَ</a> 
                                    <span style="background-image: url(asset/svg/path1984.png);" class="fs-3 mx-4 fixbg"> 
                                    <b>15</b> دولار / الشهر
                                    </span>
                                </div>
                                <div class="text-center"><span class="badge rounded-pill bg-success">تجدد الباقة شهريا ً</span></div>
                            </div>
                            </div>
                        </div>
                        <div class="col-lg-5 text-end position-relative  mb-3">
                            <div class="card w-100 position-absolutes">
                            <div class="card-body">
                                <h5 class="card-title fs-3  pt-4">باقة بريميوم</h5>
                                 <div class="card-text pt-4 d-flex justify-content-start">
                                <a href="#" class="btn btn-outline-dark px-4">ابدأ الآن مجاناَ</a>
                                 <span style="background-image: url(asset/svg/path1984.png);" class="fs-3 mx-4 fixbg"> 
                                    <b>10</b> دولار / الشهر
                                    </span>
                                 </div>
                                <div class="text-center"><span class="badge rounded-pill bg-secondary">تجدد الباقة شهريا ً</span></div>
                        </div>
                    </div>
                    </div>
                    <div  class="row d-flex justify-content-around">
                    </div>
                    
                    </div>
                </div>
</section>
 </template>
<script>
export default {
    data() {
        return{

        }
    }
};
</script>
<style scoped>
.companySubscription{
    background-color: #f59ed561;
    padding: 0 100px;
}
.card {
    border-radius: 1rem;
    min-height: 200px;
}
.fixbg  {
    background-repeat: no-repeat;
    background-position: center;
    background-size: 101% 100%;
}
.position-absolutes{
    position: absolute;
    transform: translate(-50%, -50%);
        left: 50%;
top: 100%;
}
.p-bottom {
    padding-bottom: 110px;
}

@media screen and (max-width: 992px) {
.position-absolutes{
      position: relative;
               transform: unset;
        left: unset;
top:  unset ;
} 
  .p-bottom {
    padding-bottom: 10px;
}
}
</style>
            