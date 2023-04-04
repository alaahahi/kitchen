<template>
    <div>
        <div style="background-image: url('web-asset/img/path104.png'); ">
            <div style="background-color: rgb(255 255 255 / 80%);">
                <div :class="{ 'w-100 h-100 bg-white position-fixed': loading}" style="margin-top: -13px;z-index:1 ;">
                    <div class="position-absolute top-50 start-50  bg-white"
                        :class="{ 'spinner-border text-primary spinner-border-xl': loading}"></div>
                </div>
                <breadcrumb :data=breadcrumbLsit />
                <h3 class="text-center fw-bold py-2">{{charactour.character_name_ar}}</h3>
                <h5 class="text-center  pt-3 text-black-80">ابحث عن الشخصيات أو المؤسسات في جميع الوطن العربي</h5>
                <section class="Discover my-5">
                    <discover :isHome=true />
                </section>
                <h3 class="text-center fw-bold py-2" v-if="type == 'الأخبار'">الأخبار</h3>
                <h3 class="text-center fw-bold py-2" v-if="type == 'مقالات-بقلم'">مقالات بقلم
                    {{charactour.character_name_ar}}</h3>
                <h3 class="text-center fw-bold py-2" v-if="type == 'أقارب'">أقارب {{charactour.character_name_ar}}</h3>
                <h3 class="text-center fw-bold py-2" v-if="type == 'الصور'">جميع الصور {{charactour.character_name_ar}}</h3>
                <h3 class="text-center fw-bold py-2" v-if="type == 'أشخاص'">أشخاص لها علاقة ب
                    {{charactour.character_name_ar}}</h3>
            </div>
        </div>
        <div class="container" v-if="type=='الأخبار'">
        <div class="row">
        <div class="col-lg-3 col-sm-6 col-12 ps-4  my-2" v-for="(news,index) in news" :key=index>
                    <div class="card pb-3 rounded-btn-img-news" v-if="!news.hidden">
                        <div class="col-12" style="height:200px ;">
                        <a :href=news.url target="_blank">
                                    <img class="rounded-btn-img-news w-100 h-100" :src=news.image alt="carousel"
                                          onerror="this.style.display='none'" >
                        </a>
                        </div>
                  <div class="row">
                            <div class="col-12">
                                <a :href=news.url target="_blank">
                                <div class="card-body text-end" style="min-height: 120px;">
                                    <h5 class="card-title p-0 pt-2 text-black fw-bold">{{news.title | truncate(70, '...')}}</h5>
                                </div>
                                </a>
                            </div>
                            <div class="col-5 text-end ps-0">
                                <span class="card-title  fw-bold me-3" style="font-size: 13px;">
                                    {{news.source| truncate(12, '..')}}
                                </span>
                            </div>
                            <div class="col-7  text-start  pe-0">
                                <span class="card-title  fw-bold ms-3" style="font-size: 13px;">
                                    <img width="18px" class="me-1" src="/web-asset/img/calicon.png" alt="pepole"  style="margin-top: -4px;">
                                    {{ formatDate(news.dateTime)}}
                                </span>
                            </div>
                        </div>
        </div>
        </div>
  
        </div>
        </div>
        <div class="container" v-if="type=='الصور'">
            <div class="row">
                <div class="col-lg-3 col-md-4 col-sm-6  ps-4  my-2" v-for="(photo,index) in image_gallery" :key=index  type="button" data-bs-toggle="modal" data-bs-target="#exampleModal1"  :data-bs-slide-to=index>
                                <div class="pb-3 ps-2 position-relative" style="width: 100%">
                                <div  class="pe-0 imageGaDiv">
                                        <img  :src=photo.image alt="Companylogo" class=" rounded-btn-img  border galImg">
                                </div>
                                <button type="button" data-bs-target="#carouselExampleCaptions" :data-bs-slide-to=index  class="position-absolute pb-3 ps-2  rounded-btn-img btngallery">
                                </button>
                                        <div class="position-absolute g-image-text">
                                        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <circle cx="16" cy="16" r="16" fill="#4B91F1"/>
                                        <g clip-path="url(#clip0_3222_7294)">
                                        <path d="M25.4 22.6L22.6 19.8C23.5 18.4 24 16.8 24 15C24 10 20 6 15 6C10 6 6 10 6 15C6 20 10 24 15 24C16.8 24 18.4 23.5 19.8 22.6L22.6 25.4C23.4 26.2 24.6 26.2 25.4 25.4C26.2 24.6 26.2 23.4 25.4 22.6ZM15 22C11.1 22 8 18.9 8 15C8 11.1 11.1 8 15 8C18.9 8 22 11.1 22 15C22 18.9 18.8 22 15 22Z" fill="white"/>
                                        <path d="M19 14H16V11C16 10.4 15.6 10 15 10C14.4 10 14 10.5 14 11V14H11C10.5 14 10 14.4 10 15C10 15.6 10.4 16 11 16H14V19C14 19.6 14.4 20 15 20C15.6 20 16 19.6 16 19V16H19C19.6 16 20 15.6 20 15C20 14.4 19.5 14 19 14Z" fill="white"/>
                                        </g>
                                        <defs>
                                        <clipPath id="clip0_3222_7294">
                                        <rect width="20" height="20" fill="white" transform="translate(6 6)"/>
                                        </clipPath>
                                        </defs>
                                        </svg>
                                        <br>
                                        <div class="pt-1 pe-4" style="position:absolute;bottom 20px;">
                                            {{photo.description}}
                                        </div>
                                        </div>
                                </div>
                            </div>

      
            </div>
            <div class="modal fade" id="exampleModal1" tabindex="-1" role="dialog" aria-hidden="true">
  <div class="modal-dialog modal-lg  modal-dialog-centered" role="document">
    <div class="modal-content">
    <div class="modal-header" style="height: 0;padding: 4px;">
                        <i data-bs-dismiss="modal" aria-label="Close" ref="closebtnpssword"><svg
                                style="border-radius: 50%;position: relative;top: -8px;width: 31px;right: -22px;background: rgb(255, 255, 255);padding: 3px;"
                                viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd"
                                    d="M15.9992 28.8002C23.0685 28.8002 28.7992 23.0694 28.7992 16.0002C28.7992 8.93095 23.0685 3.2002 15.9992 3.2002C8.92997 3.2002 3.19922 8.93095 3.19922 16.0002C3.19922 23.0694 8.92997 28.8002 15.9992 28.8002ZM13.9306 11.6688C13.3058 11.044 12.2927 11.044 11.6678 11.6688C11.043 12.2937 11.043 13.3067 11.6678 13.9316L13.7365 16.0002L11.6678 18.0688C11.043 18.6937 11.043 19.7067 11.6678 20.3316C12.2927 20.9564 13.3058 20.9564 13.9306 20.3316L15.9992 18.2629L18.0678 20.3316C18.6927 20.9564 19.7057 20.9564 20.3306 20.3316C20.9554 19.7067 20.9554 18.6937 20.3306 18.0688L18.262 16.0002L20.3306 13.9316C20.9554 13.3067 20.9554 12.2937 20.3306 11.6688C19.7057 11.044 18.6927 11.044 18.0678 11.6688L15.9992 13.7375L13.9306 11.6688Z"
                                    fill="#20211F" />
                            </svg></i>
                    </div>

      <div class="modal-body pt-0">
      <div id="carouselExampleCaptions" class="carousel slide" data-bs-ride="carousel">

        <div class="row p-2">
        <div class="col-md-8 col-12 ">
            <div   class="col-12 d-flex justify-content-between mb-2">
                <h2   class="fw-bold fs-5 my-3">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
               <path d="M1 13L5.58579 8.41421C6.36683 7.63317 7.63316 7.63316 8.41421 8.41421L13 13M11 11L12.5858 9.41421C13.3668 8.63317 14.6332 8.63316 15.4142 9.41421L17 11M11 5H11.01M3 17H15C16.1046 17 17 16.1046 17 15V3C17 1.89543 16.1046 1 15 1H3C1.89543 1 1 1.89543 1 3V15C1 16.1046 1.89543 17 3 17Z" stroke="#4B91F1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
               </svg>

                   معرض الصور
                </h2>
                <div   class="d-inline-flex">
             
 
           </div>
            </div>
            <div class="carousel-inner position-relative" style="height: 600px !important;" >
            
            <div v-for="(photo,index) in image_gallery" :key=index class="carousel-item h-100" :class="index==0?'active':''" style="padding-bottom:20px ">
                  <img :src=photo.image alt="Companylogo" class="w-100  rounded-btn-img  border h-100" style="object-fit: contain;max-height:550px">
                  <div class="pt-2 pe-4" style="position:absolute;bottom 20px;">
                     
                    <h5 class="text-black  fs-16">                 {{photo.description}}</h5>

                </div>
              </div> 
   
           

            <button class="carousel-control-prev btn rounded-circle  btn-size m-1 p-0 btn-light border nav-btn" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev" style="color: #000;top: 46%;background: #fff; height: 45px;width: 45px;">
            <i class="fa-solid fa-angle-left"></i>


            <span class="visually-hidden">Previous</span>
            </button>
            <button class="carousel-control-next btn rounded-circle  btn-size m-1 p-0 btn-light border nav-btn" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next" style="color: #000;top: 46%;background: #fff; height: 45px;width: 45px;">
            <i class="fa-solid fa-angle-right"></i>
                <span class="visually-hidden">Next</span>
            </button>
            <div class="position-absolute">
                <button type="button" class="carousel-control-prev btn rounded-circle  btn-size m-1 p-0 btn-light border nav-btn" >1/4</button>
            </div>
            </div>
        </div>
        <div class="col-md-4 d-md-block d-none mt-3">
            <div class="row p-0">
                <div class="col-6 p-0"  v-for="(photo,index) in image_gallery" :key=index  style="height: 85px">

            <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="<?= $SIndex; ?>" class="active w-100 h-100 py-1" aria-current="true" aria-label="Slide 1" style="margin-bottom: 10px;border: none; background: #fff;">
            <img :src=photo.image alt="Companylogo" class="w-100 h-100 rounded-btn-img  border" style="object-fit: cover;">

            </button>
            </div>   
         
            </div>
        </div>
        </div>
        
        </div>

      </div>
    </div>
  </div>
</div>

        </div>
        <div class="container" v-if="type=='مقالات-بقلم'">
            <div class="row">
                <div class="col-lg-3 col-sm-6 col-12   ps-4  my-2" v-for="(news,index) in newsProfile" :key=index>
                    <div class="card pb-3" v-if="!news.hidden">
                        <div class="row">
                            <div class="col-12" style="height: 200px;">
                                <a :href=news.url target="_blank">
                                    <img class="rounded-btn-img-news w-100 h-100" :src=news.image alt="carousel"  onerror="this.style.display='none'" >
                                </a>
                            </div>
                            <div class="col-12">
                                <a :href=news.url target="_blank">
                                <div class="card-body text-end" style="min-height: 120px;">
                                    <h5 class="card-title p-0 pt-2 text-black fw-bold">{{news.title | truncate(80, '...')}}</h5>
                                </div>
                                </a>
                            </div>
                            <div class="col-5 text-end ">
                                <span class="card-title  fw-bold me-3" style="font-size: 13px;">
                                    {{news.authors[0] | truncate(12, '...')}}
                                </span>
                            </div>
                            <div class="col-7  text-start ">
                                <span class="card-title  fw-bold ms-3">
                                    <img width="18px" class="me-1" src="/web-asset/img/calicon.png" alt="pepole"  style="margin-top: -4px;font-size: 13px;">
                                    {{ formatDate(news.date)}}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="text-center my-4" v-if="false">
                    <button @click="getCategorymore()" class="btn btn-primary py-2"
                        :class="disabled ? 'disabled' : '' "><i class="fa-solid fa-rotate"
                            :class="{ 'fa-spin': loadingMore} "></i> عرض الكل </button>
                </div>
            </div>
        </div>
        <div class="container" v-if="type=='أقارب'">
            <div class="row" v-if="charactour.relations">
                <div v-for="charactour in fixCompanyRelRep(charactour.relations.relations.cousins)" :key=charactour.id
                    class="col-lg-3 col-md-4 col-sm-6  ps-4  my-2">
                    <div class="m-3 rounded-btn-img p-0">
                    <a  :href="'/شخصيات/'+decodeURI(charactour.slug)+'/'" >
                            <div class="position-relative p-1 rounded-btn-img"
                                :class="charactour.endNode.vip_person == 1 || charactour.endNode.vip_person =='1'  ?'bg-prim':''">
                                <img v-if="charactour.endNode.image" class=" rounded-btn-img w-100"
                                    :src=charactour.endNode.image alt="carousel" style=" min-height: 160px;">
                                <img v-if="!charactour.endNode.image" class="rounded-btn-img w-100"
                                    src="/web-asset/img/noun_premium.png" alt="carousel">
                                <div class="position-absolute top-100 start-50 translate-middle">
                                    <h5><span class="badge rounded-pill p-2  bg-prim"
                                            :class="charactour.endNode.vip_person == 1 || charactour.endNode.vip_person =='1'  ? 'd-block':'d-none' "><img
                                                src="/web-asset/img/noun_premium.png" alt="carousel" class="ps-1"
                                                style="width:20px">عضوية ذهبية
                                        </span></h5>
                                </div>
                            </div>
                        </a>
                        <div class="text-center pt-4" style="min-height: 135px;">
                            <h2 class="card-title  fw-bold fs-4">{{charactour.endNode.character_name_ar}}</h2>
                            <h5 class=" text-muted  fs-5">ابن عم</h5>
                        </div>
                    </div>
                </div>
                <div v-for="charactour in fixCompanyRelRep(charactour.relations.relations.siblings) " :key=charactour.id
                    class="col-lg-3 col-md-4 col-sm-6  ps-4  my-2">
                    <div class="m-3 rounded-btn-img p-0">
                    <a  :href="'/شخصيات/'+decodeURI(charactour.slug)+'/'" >
                            <div class="position-relative p-1 rounded-btn-img"
                                :class="charactour.endNode.vip_person == 1 || charactour.endNode.vip_person =='1'  ?'bg-prim':''">
                                <img v-if="charactour.endNode.image" class=" rounded-btn-img w-100"
                                    :src=charactour.endNode.image alt="carousel" style=" min-height: 160px;">
                                <img v-if="!charactour.endNode.image" class="rounded-btn-img w-100"
                                    src="/web-asset/img/noun_premium.png" alt="carousel">
                                <div class="position-absolute top-100 start-50 translate-middle">
                                    <h5><span class="badge rounded-pill p-2  bg-prim"
                                            :class="charactour.endNode.vip_person == 1 || charactour.endNode.vip_person =='1'  ? 'd-block':'d-none' "><img
                                                src="/web-asset/img/noun_premium.png" alt="carousel" class="ps-1"
                                                style="width:20px">عضوية ذهبية
                                        </span></h5>
                                </div>
                            </div>
                        </a>
                        <div class="text-center pt-4" style="min-height: 135px;">
                            <h2 class="card-title  fw-bold fs-4">{{charactour.endNode.character_name_ar}}</h2>
                            <h5 class=" text-muted  fs-5">أخ</h5>
                        </div>
                    </div>
                </div>
                <div v-for="charactour in  fixCompanyRelRep(charactour.relations.relations.childrens)"
                    :key=charactour.id class="col-lg-3 col-md-4 col-sm-6  ps-4  my-2">
                    <div class="m-3 rounded-btn-img p-0">
                    <a  :href="'/شخصيات/'+decodeURI(charactour.slug)+'/'" >
                            <div class="position-relative p-1 rounded-btn-img"
                                :class="charactour.endNode.vip_person == 1 || charactour.endNode.vip_person =='1'  ?'bg-prim':''">
                                <img v-if="charactour.endNode.image" class=" rounded-btn-img w-100"
                                    :src=charactour.endNode.image alt="carousel" style=" min-height: 160px;">
                                <img v-if="!charactour.endNode.image" class="rounded-btn-img w-100"
                                    src="/web-asset/img/noun_premium.png" alt="carousel">
                                <div class="position-absolute top-100 start-50 translate-middle">
                                    <h5><span class="badge rounded-pill p-2  bg-prim"
                                            :class="charactour.endNode.vip_person == 1 || charactour.endNode.vip_person =='1'  ? 'd-block':'d-none' "><img
                                                src="/web-asset/img/noun_premium.png" alt="carousel" class="ps-1"
                                                style="width:20px">عضوية ذهبية
                                        </span></h5>
                                </div>
                            </div>
                        </a>
                        <div class="text-center pt-4" style="min-height: 135px;">
                            <h2 class="card-title  fw-bold fs-4">{{charactour.endNode.character_name_ar}}</h2>
                            <h5 class=" text-muted  fs-5">أبن</h5>
                        </div>
                    </div>
                </div>
                <div v-for="charactour in fixCompanyRelRep(charactour.relations.relations.spouse)" :key=charactour.id
                    class="col-lg-3 col-md-4 col-sm-6  ps-4  my-2">
                    <div class="m-3 rounded-btn-img p-0">
                    <a  :href="'/شخصيات/'+decodeURI(charactour.slug)+'/'" >
                            <div class="position-relative p-1 rounded-btn-img"
                                :class="charactour.endNode.vip_person == 1 || charactour.endNode.vip_person =='1'  ?'bg-prim':''">
                                <img v-if="charactour.endNode.image" class=" rounded-btn-img w-100"
                                    :src=charactour.endNode.image alt="carousel" style=" min-height: 160px;">
                                <img v-if="!charactour.endNode.image" class="rounded-btn-img w-100"
                                    src="/web-asset/img/noun_premium.png" alt="carousel">
                                <div class="position-absolute top-100 start-50 translate-middle">
                                    <h5><span class="badge rounded-pill p-2  bg-prim"
                                            :class="charactour.endNode.vip_person == 1 || charactour.endNode.vip_person =='1'  ? 'd-block':'d-none' "><img
                                                src="/web-asset/img/noun_premium.png" alt="carousel" class="ps-1"
                                                style="width:20px">عضوية ذهبية
                                        </span></h5>
                                </div>
                            </div>
                        </a>
                        <div class="text-center pt-4" style="min-height: 135px;">
                            <h2 class="card-title  fw-bold fs-4">{{charactour.endNode.character_name_ar}}</h2>
                            <h5 class=" text-muted  fs-5">زوج</h5>
                        </div>
                    </div>
                </div>
                <div v-for="charactour in fixCompanyRelRep(charactour.relations.relations.parents)" :key=charactour.id
                    class="col-lg-3 col-md-4 col-sm-6  ps-4  my-2">
                    <div class="m-3 rounded-btn-img p-0">
                    <a  :href="'/شخصيات/'+decodeURI(charactour.slug)+'/'" >
                            <div class="position-relative p-1 rounded-btn-img"
                                :class="charactour.endNode.vip_person == 1 || charactour.endNode.vip_person =='1'  ?'bg-prim':''">
                                <img v-if="charactour.endNode.image" class=" rounded-btn-img w-100"
                                    :src=charactour.endNode.image alt="carousel" style=" min-height: 160px;">
                                <img v-if="!charactour.endNode.image" class="rounded-btn-img w-100"
                                    src="/web-asset/img/noun_premium.png" alt="carousel">
                                <div class="position-absolute top-100 start-50 translate-middle">
                                    <h5><span class="badge rounded-pill p-2  bg-prim"
                                            :class="charactour.endNode.vip_person == 1 || charactour.endNode.vip_person =='1'  ? 'd-block':'d-none' "><img
                                                src="/web-asset/img/noun_premium.png" alt="carousel" class="ps-1"
                                                style="width:20px">عضوية ذهبية
                                        </span></h5>
                                </div>
                            </div>
                        </a>
                        <div class="text-center pt-4" style="min-height: 135px;">
                            <h2 class="card-title  fw-bold fs-4">{{charactour.endNode.character_name_ar}}</h2>
                            <h5 class=" text-muted  fs-5">أب</h5>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="container" v-if="type=='مناصب'">
            <div class="row" v-if="charactour.relations">
                <div v-for="(rel, index) in fixCompanyRelRep(charactour.relations.relations.worked_at)" :index="index"
                    :key="index" class="col-lg-2 col-md-3 col-sm-4 col-6 ps-4  my-2 p-3"
                    v-show="rel.startNode.slug != rel.endNode.slug">
                    <div class="card h-100 bg-transparent border-card-company">
                        <div class="d-flex align-items-center justify-content-center">
                            <a  :href="'/شركات/'+decodeURI(company.endNode.slug)+'/'">
                          
                                <img v-if="rel.endNode.image" class="w-85  rounded-btn-img  border"
                                    :src="rel.endNode.image" alt="Companylogo">
                        </a>
                            <img v-if="rel.endNode.image && !rel.endNode.slug" class="w-85  rounded-btn-img  border"
                                :src="rel.endNode.image" alt="Companylogo">
                            <img v-if="!rel.endNode.image" class="w-85 rounded-btn-img  border"
                                :src="'/../web-asset/img/v2-image.png'" alt="Companylogo">
                        </div>
                        <div class="card-body text-center">

                            <h5 class="card-title fs-16 fw-bold">{{rel.endNode.nameAR}}</h5>
                            <p class="card-text text-muted">{{rel.Propoerties.information ? rel.Propoerties.information
                            : rel.Propoerties.desc}}</p>

                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="container" v-if="type=='أشخاص'">
            <div class="row" v-if="charactour.relations">
                <div v-for="(charactour, index) in charactour.characterRelated" :index="index" :key="index"
                    class="col-lg-3 col-md-4 col-sm-6  ps-4  my-2">
                    <div class="card shadow m-3 rounded-btn-img pt-3 ps-3 pe-3">
                        <div class="position-relative p-1 rounded-btn-img" :class="charactour.vip_person ?'bg-prim':''">
                            <img v-if="charactour.image" class=" rounded-btn-img w-100" :src=charactour.image
                                alt="carousel" style="    min-height: 190px;">
                            <img v-if="!charactour.image" class="rounded-btn-img w-100" src="/web-asset/img/noResul.jpg"
                                alt="carousel">
                            <span v-if="charactour.isTrend"
                                class=" position-absolute start-0 badge rounded-pill bg-info p-1 px-3 fs-6 p-c"><i
                                    class="ms-1 fa-solid fa-arrow-trend-up"></i>
                                تريند </span>
                            <div class="position-absolute top-100 start-50 translate-middle">
                                <h5><span class="badge rounded-pill p-2  bg-prim"
                                        :class="charactour.vip_person ? 'd-block':'d-none' "><img
                                            src="/web-asset/img/noun_premium.png" alt="carousel" class="ps-1"
                                            style="width:20px">عضوية ذهبية
                                    </span></h5>
                            </div>
                        </div>
                        <div class="text-center pt-4" style="min-height: 135px;">
                            <h2 class="card-title  fw-bold fs-4">{{charactour.character_name_ar}}</h2>
                            <a  :href="'/شخصيات/'+decodeURI(charactour.slug)+'/'"
                                class="stretched-link text-decoration-none text-muted fw-bold fs-16">
                                {{fixContent(charactour.content)| truncate(50,'..')}}</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </div>
</template>
<script>
import moment from 'moment'
import discover from '../home/discover.vue'
import breadcrumb from './accessories/breadcrumbLink.vue'
export default {
    metaInfo: {
        title: 'عرض الكل | من هم؟'
    },
    components:
    {
        breadcrumb,
        discover,
    },
    data() {

        return {
            id: this.$route.params.id,
            disabled: true,
            loading: true,
            type: this.$route.params.type,
            newsProfile: [],
            news: [],
            categorys: [],
            image_gallery:[],
            categorysSelected: [],
            more: 8,
            moreSelected: 8,
            disabledSelected: true,
            loadingMore: false,
            loadingMoreSelected: false,
            allcategory: {},
            allcategorySelected: {},
            charactour: {},
            'breadcrumbLsit': [],
            skipnews:1,
            monthNamesArabic: [
                'يناير',
                'فبراير',
                'مارس',
                'أبريل',
                'مايو',
                'يونيو',
                'يوليو',
                'أغسطس',
                'سبتمبر',
                'أكتوبر',
                'نوفمبر',
                'ديسمبر',
            ],

        }
    },
    filters: {
 
    },
    methods: {
        formatDate(date) {
            if (!date) return ''
            if (date) {
                try {
                date= new Date(date)
                const day = date.getDate();
                const month = this.monthNamesArabic[date.getMonth()];
                const year = date.getFullYear();
                return `${day} ${month} ${year}`;
                } catch (error) {
                    return ""
                }
              
            }
        },
        fixCompanyRelRep(arr) {
            try {
                return [...new Map(arr.map(item => [item.endNode.slug, item])).values()]
            } catch (error) {

            }

        },
        fixfmCousins(v) {
            try {
                if (v.cousins.length) return v.cousins
            } catch (error) {
                return {}
            }
            return {}
        },
        fixfmSiblings(v) {
            try {
                if (v.siblings.length) return v.siblings
            } catch (error) {
                return {}
            }
            return {}
        },
        fixfmChildrens(v) {
            try {
                if (v.childrens.length) return v.childrens
            } catch (error) {
                return {}
            }
            return {}
        },
        fixfmHusbends(v) {
            try {
                if (v.cousins.husbends) return v.husbends
            } catch (error) {
                return {}
            }
            return {}
        },
        fixfmParents(v) {
            try {
                if (v.parents.length) return v.parents
            } catch (error) {
                return {}
            }
            return {}
        },
        fixContent(value) {
            try {
                if (value) {
                    if (((value.split(".\r"))[0]).length > ((value.split(".<"))[0]).length) {
                        return (value.split(".<"))[0]
                    }
                    else return (value.split(".\r"))[0]
                }
            } catch (error) {
                return ''
            }
        },
        getCategory() {
            this.loadingMore = true
            this.http.get('/categories')
                .then(async (response) => {
                    this.allcategory = response.data
                    this.categorys = this.allcategory.slice(0, this.more)
                    this.loadingMore = false
                    if (response.data.length > 6) {
                        this.disabled = false
                    }
                })
        },
        getCategorymore() {
            this.more = this.more + 8
            this.categorys = this.allcategory.slice(0, this.more)
        },

        getCategorySelected() {
            this.loadingMoreSelected = true
            this.http.get("/category/getCategoriesByCountry?code=" + this.$store.state.langFilter.toLowerCase())
                .then(async (response) => {

                    this.allcategorySelected = response.data
                    this.categorysSelected = this.allcategorySelected.slice(0, this.more)
                    this.loadingMoreSelected = false
                    if (response.data.length > 6) {
                        this.disabledSelected = false
                    }
                })
        },
        getCategorySelectedmore() {
            this.moreSelected = this.moreSelected + 8
            this.categorysSelected = this.allcategorySelected.slice(0, this.moreSelected)
        },
        getNews(v=0) {
            this.skipnews = this.skipnews +v
            this.http.get('/charactour/getNews?id=' + this.charactour.id)
                .then(async (response) => {
                    this.news = response.data
                })
        },
        getNewsProfile(id) {
            this.http.get('/charactour/getNewsFromLablebWrittenByCharacter?id=' + id)
                .then(async (response) => {
                    this.newsProfile = response.data
                    //this.newsProfile = response.data.response.results
                })
        },
        getImageGallery(id) {
            this.http.get('/image_gallery?id='+ id+'&limit=24')
                .then(async (response) => {
                    this.image_gallery = response.data.result
                    //this.newsProfile = response.data.response.results
                })
        },
        async getCharactour() {
    
            await this.http.get('/charactour/show/' + this.id)
                .then((response) => {
                    this.charactour = response.data
                    this.getNews()
                    this.getNewsProfile(response.data.id)
                    if( this.$route.params.type =='الصور'){
                        this.getImageGallery(response.data.id)
                    }
                    //this.title= (this.charactour.gender ? 'من هي':'من هو ')+this.charactour.character_name_ar +'؟ | عرض الكل | من هم؟ '
                    // document.title =  'من هو '+this.charactour.character_name_ar +'؟ | ملف الشخصية | من هم؟ '
                    this.breadcrumbLsit = [
                        {
                            name: 'الرئيسية',
                            link: '/'
                        },
                        {
                            name: this.charactour.character_name_ar,
                            link: '/' + encodeURI('شخصيات/') + this.id
                        },
                        {
                            name: this.fixTitleType(this.type) + ' ' + this.charactour.character_name_ar,
                            link: ''
                        },
                    ]
                    this.loading = false
                  
      
                })
        },
        fixTitleType(v) {
            if (v == 'أشخاص') {
                return ' أشخاص  لها علاقة ب '
            }
            return v
        },
        fixrelationNameAR(value) {
            if (!value) return ''
            if (value) {
                try {
                    return value.nameAR
                } catch (error) {
                    return ''
                }
            }
        },
        fixrelationslug(value) {
            try {
                if (!value) return ''
                if (value.image) return value.slug
            }
            catch (error) {
                return ''
            }
        },
        fixrelationImage(value) {
            try {
                if (!value) return ''
                if (value.image) return value.image
            }
            catch (error) {
                return ''
            }
        },
    },

    created() {
        this.getCharactour()
    }
};
</script>

