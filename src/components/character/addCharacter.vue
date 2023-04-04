<template>
  <div class="container">
    <div>
      <div class="bg-white">
        <div class="container bg-white">
          <breadcrumb :data="breadcrumbLsit" />
          <div class="row py-3">
            <div class="col-md-4 p-5">
              <div
                class="card rounded-btn border py-3 rounded-btn-img"
                style="box-shadow: 0px 0px 24px rgba(32, 33, 31, 0.06)"
              >
                <ul class="nav flex-column">
                  <li class="nav-item fw-bold">
                    <a
                      class="nav-link"
                      href=""
                      @click.prevent="goto(1)"
                      :class="currentPage == 1 ? 'router-link-exact-active' : ''"
                    >
                      <img
                        v-if="currentPage != 1"
                        class="float-end ps-3"
                        src="/web-asset/img/allIconaddc.png"
                        alt="video Iconaddch"
                      />
                      <img
                        v-if="currentPage == 1"
                        class="float-end ps-3"
                        src="/web-asset/img/allIconaddch.png"
                        alt="video Iconaddch"
                      />
                      المعلومات العامة
                    </a>
                  </li>
                  <!--
                                    <li class="nav-item fw-bold">
                                        <a class="nav-link" href="" @click.prevent="goto(2)" :class="
                                            currentPage == 2 ? 'router-link-exact-active' : ''
                                        ">

                                            <img v-if="currentPage != 2" class="float-end ps-3"
                                                src="/web-asset/img/videoIconaddch.png" alt="video Iconaddch" />
                                            <img v-if="currentPage == 2" class="float-end ps-3"
                                                src="/web-asset/img/videoIconaddch-b.png" alt="video Iconaddch" />
                                            الفيديو التعريفي
                                        </a>
                                    </li>
                                    -->
                  <li class="nav-item">
                    <a
                      class="nav-link fw-bold"
                      href=""
                      @click.prevent="goto(2)"
                      :class="currentPage == 2 ? 'router-link-exact-active' : ''"
                    >
                      <img
                        v-if="currentPage != 2"
                        class="float-end ps-3 mt-1"
                        src="/web-asset/img/Iconcontent.png"
                        alt="video Iconaddch"
                      />
                      <img
                        v-if="currentPage == 2"
                        class="float-end ps-3 mt-1"
                        src="/web-asset/img/Iconcontent-b.png"
                        alt="video Iconaddch"
                      />
                      المحتوى
                    </a>
                  </li>
                  <!--
                                    <li class="nav-item fw-bold">
                                        <a class="nav-link" href="" @click.prevent="goto(3)" :class="
                                            currentPage == 3 ? 'router-link-exact-active' : ''
                                        ">
                                            <img v-if="currentPage != 3" class="float-end ps-3"
                                                src="/web-asset/img/edIconaddch.png" alt="video Iconaddch" />
                                            <img v-if="currentPage == 3" class="float-end ps-3"
                                                src="/web-asset/img/edIconaddch-b.png" alt="video Iconaddch" />
                                            التعليم
                                        </a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link fw-bold" href="" @click.prevent="goto(4)" :class="
                                            currentPage == 4 ? 'router-link-exact-active' : ''
                                        ">
                                            <img v-if="currentPage != 4" class="float-end ps-3"
                                                src="/web-asset/img/workIconaddch.png" alt="video Iconaddch" />
                                            <img v-if="currentPage == 4" class="float-end ps-3"
                                                src="/web-asset/img/workIconaddch-b.png" alt="video Iconaddch" />
                                            الخبرة العملية
                                        </a>
                                    </li>


                                    <li class="nav-item">
                                        <a class="nav-link  fw-bold" href="" @click.prevent="goto(5)" :class="
                                            currentPage == 5 ? 'router-link-exact-active' : ''
                                        ">
                                            <img v-if="currentPage != 5" class="float-end ps-3"
                                                src="/web-asset/img/Iconfamily.png" alt="video Iconaddch" />
                                            <img v-if="currentPage == 5" class="float-end ps-3"
                                                src="/web-asset/img/Iconfamily-b.png" alt="video Iconaddch" />
                                            إضافة الاقارب
                                        </a>
                                    </li>
                                -->
                </ul>
              </div>
            </div>
            <div class="col-md-8" ref="top">
              <div class="pb-2">
                <img
                  v-if="!charactour.image"
                  class="float-end ps-3"
                  src="/web-asset/img/user-profile.png"
                  alt="logo ManHOM"
                />
                <img
                  class="float-end ps-3"
                  v-if="charactour.image"
                  :src="charactour.image"
                  style="max-width: 120px"
                  alt="logo ManHOM"
                />
                <span :class="{ 'spinner-border spinner-border-sm': loading }"></span>
                <input
                  type="file"
                  @change="upload_avatar($event);"
                  class="d-none"
                  name="avatar"
                  ref="fileInput"
                  accept="image/png, image/gif, image/jpeg"
                />
                <div class="clearfix">
                  <h4>الصورة الشخصية</h4>
                  <p class="text-black-80">هذه الصورة تكون في الملف الشخصي للشخصية وليس لها علاقة بصورة حسابك</p>
                  <p class="text-black-80 fw-light">يمكنك تحميل الصورة بصيغة PNG, JPG, JPEG بحد أقصى 2 ميغا للصورة.</p>
                  <button class="btn btn-primary px-4 fw-bold rounded-btn" @click.prevent="trigger">
                    تغيير الصورة
                  </button>
                  <a
                    class="fw-bold px-4 fs-5link-primary text-decoration-none"
                    @click.prevent="reset_image()"
                    href=""
                    >حذف
                  </a>
                </div>
              </div>
              <div class="card border px-4 rounded-btn-img" style="box-shadow: 0px 0px 24px rgba(32, 33, 31, 0.06)">
                <div class="row" v-if="currentPage == 1">
                  <h4 class="py-3">معلومات عامة</h4>
                  <div class="mb-3 col-md-6">
                    <label for="formGroupExampleInput" class="form-label" required>الاسم</label>
                    <input type="text" class="form-control" v-model="charactour.character_name_ar" />
                    <div class="text-danger pt-1 fs-7" v-if="!charactour.character_name_ar">مطلوب</div>
                  </div>

                  <div class="mb-3 col-md-6">
                    <label for="formGroupExampleInput" class="form-label" required>الاسم بالإنكليزي</label>
                    <input type="text" class="form-control" v-model="charactour.character_name_en" />
                  </div>
                  <div class="mb-3 col-md-12">
                    <label for="formGroupExampleInput" class="form-label" required>الجنس</label>
                    <div class="form-check form-check-inline">
                      <label class="form-check-label fw-bold mx-2" for="inlineRadio1">ذكر</label>
                      <input
                        class="form-check-input"
                        type="radio"
                        name="inlineRadioOptions"
                        id="inlineRadio1"
                        value="1"
                        v-model="charactour.gender"
                      />
                    </div>
                    <div class="form-check form-check-inline">
                      <label class="form-check-label fw-bold mx-2" for="inlineRadio2">أنثى</label>
                      <input
                        class="form-check-input"
                        type="radio"
                        name="inlineRadioOptions"
                        id="inlineRadio2"
                        value="2"
                        v-model="charactour.gender"
                      />
                    </div>
                  </div>
                  <div class="mb-3 col-md-12">
                    <label for="formGroupExampleInput" class="form-label" required>المهنة الحالية</label>
                    <input type="text" class="form-control" v-model="charactour.position" />
                    <div class="text-danger pt-1 fs-7" v-if="!charactour.position">مطلوب</div>
                  </div>
                  <div class="mb-3 col-md-12">
                    <div class="row">
                      <label for="formGroupExampleInput" class="form-label" required>تاريخ الميلاد</label>
                      <div class="col-md-4 mb-3">
                        <select v-model="day" class="form-select" aria-label=".form-select-sm example">
                          <option value="" disabled>يوم</option>
                          <option :value="n" v-for="n in 31" :key="n">
                            {{ n }}
                          </option>
                        </select>
                      </div>
                      <div class="col-md-4 mb-3">
                        <select v-model="month" class="form-select" aria-label=".form-select-sm example">
                          <option value="" disabled>شهر</option>
                          <option :value="n" v-for="n in 12" :key="n">
                            {{ n }}
                          </option>
                        </select>
                      </div>
                      <div class="col-md-4 mb-3">
                        <select v-model="year" class="form-select" aria-label=".form-select-sm example">
                          <option value="" disabled>سنة</option>
                          <option :value="n + 1949" v-for="n in 60" :key="n">
                            {{ n + 1949 }}
                          </option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div class="mb-3 col-md-12">
                    <div class="row">
                      <label for="formGroupExampleInput" class="form-label" required>الجنسية</label>
                      <div class="col-md-6 mb-3">
                        <!-- v-on:input -->
                        <model-list-select
                          :list="countries"
                          v-model="charactour.first_nationality"
                          option-value="id"
                          option-text="country_name"
                          placeholder="اختر البلد"
                          class="form-select j-country-selects"
                          v-on:input="select_change('model-list')"
                          id="model-list"
                        >
                        </model-list-select>

                        <div class="text-danger pt-1 fs-7" v-if="!charactour.first_nationality">مطلوب</div>
                      </div>
                      <div class="col-md-6 mb-3">
                        <model-list-select
                          :list="countries"
                          v-model="charactour.main_country_of_residence"
                          option-value="id"
                          option-text="country_name"
                          placeholder="اختر بلد الإقامة"
                          class="form-select j-country-selects"
                          v-on:input="select_change('model-list1')"
                          id="model-list1"
                        >
                        </model-list-select>
                      </div>
                    </div>
                  </div>
                  <div class="mb-3 col-md-12">
                    <label for="formGroupExampleInput" class="form-label" required>تصنيف الملف الشخصي</label>
                    <model-list-select
                      :list="categorys"
                      v-model="charactour.category_id"
                      option-value="id"
                      option-text="name"
                      placeholder="اختر تصنيف الملف الشخصي"
                      class="form-select j-country-selects"
                      v-on:input="select_change('model-list2')"
                      id="model-list2"
                    >
                    </model-list-select>
                    <div class="text-danger pt-1 fs-7" v-if="!charactour.category_id">مطلوب</div>
                  </div>
                  <div class="mb-3 col-md-12" @click.prevent="onSelect()">
                    <label for="formGroupExampleInput" class="form-label" required>تخصص الملف الشخصي</label>
                    <model-list-select
                      :list="subCategorys"
                      v-model="charactour.subCategory_id"
                      option-value="id"
                      option-text="name"
                      placeholder="أدخل تخصص الملف الشخصي"
                      class="form-select j-country-selects"
                      v-on:input="select_change('model-list3')"
                      id="model-list3"
                    >
                    </model-list-select>
                  </div>
                </div>
                <!-- end page 1-->
                <div class="row" v-if="currentPage == 2">
                  <div>
                    <h4 class="py-3">إضافة محتوى</h4>
                  </div>
                  <div class="clearfix row">
                    <div class="mb-3 col-md-12">
                      <textarea
                        type="text"
                        class="form-control"
                        v-model="charactour.information"
                        style="height: 104px"
                      ></textarea>
                    </div>
                  </div>
                </div>
                <!--
                                <div class="row" v-if="currentPage == 2">
                                    <h4 class="py-3">فيديو تعريفي</h4>
                                    <div class="mb-3 col-md-12">
                                        <div class="row">
                                            <div class="col-md-5">
                                                <img v-if="!charactour.resume_url" class="float-end ms-3 rounded-btn-img"
                                                    width="100%" src="asset/img/ve-image.png" alt="company logo" />
                                                <div v-if="charactour.resume_url">
                                                    <div class="player">
                                                        <LazyYoutube ref="youtubeLazyVideo" :src=charactour.resume_url
                                                            max-width="300px" aspect-ratio="16:9"
                                                            thumbnail-quality="standard" :showTitle=false />
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-md-7">
                                                <button class="btn btn-gold" @click.prevent="openVideo"
                                                    style="margin-top:15%" data-bs-toggle="modal"
                                                    data-bs-target="#addVideo">
                                                    <i class="fa-solid fa-upload ms-2"></i>رابط فيديو
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <p class="text-black-80 clearfix">
                                        الفيديو التجريبي يظهر هنا فقط لا يظهر في الملف الشخصي
                                        للزوار
                                    </p>
                                </div>
                                -->
                <!-- end page 2
                                <div class="row" v-if="currentPage == 3">
                                    <h4 class="py-3">التعليم</h4>
                                    <div class="py-2">
                                        <h6 class="float-end">شهادات جامعية</h6>
                                        <button class="btn btn-gold float-start" @click.prevent="openEd()"
                                            data-bs-toggle="modal" data-bs-target="#addEducation">
                                            <i class="fa-solid fa-plus ms-2"></i>اضف شهادة
                                        </button>
                                    </div>
                                    <div class="clearfix row"></div>

                                    <div v-for="(edu, index) in educationList" :key=index
                                        class="bg-pink my-3 card rounded-btn">
                                        <div class="py-2">
                                            <h4 class="float-end py-2 fw-bold">{{ edu.description }}</h4>
                                            <button class="btn btn-light  float-start m-1"
                                                @click.prevent="editEducationList(index)" data-bs-toggle="modal"
                                                data-bs-target="#addEducation">
                                                <img src="/web-asset/img/Iconeditaddch.png" alt="Iconeditaddch" />
                                            </button>
                                            <button class="btn btn-light  float-start  m-1"
                                                @click.prevent="delEducationList(index)">
                                                <img src="/web-asset/img/Icondelladdch.png " alt="video Iconaddch" />
                                            </button>
                                        </div>
                                        <div class="clearfix row"></div>
                                        <span></span>
                                        <p><span class="fw-bold">الدرجة العلمية: </span> {{ edu.info }}</p>
                                        <p><span class="fw-bold"> من قبل: </span> {{ edu.givenBy }}</p>
                                        <p><span class="fw-bold">مدة الحصول على الدرجة العلمية:</span> {{ edu.date }}
                                        </p>
                                    </div>
                                </div>
                               end page 3
                                <div class="row" v-if="currentPage == 4">
                                    <div class="py-2">
                                        <h4 class="py-2">الخبرة العملية</h4>
                                        <button class="btn btn-gold float-start" data-bs-toggle="modal"
                                            data-bs-target="#addWork">
                                            <i class="fa-solid fa-plus ms-2"></i>اضف خبرة أو نشاط
                                        </button>
                                    </div>
                                    <div class="clearfix row"></div>
                                    <div v-for="(wor, index) in workList" :key=index
                                        class="bg-pink my-3 card rounded-btn">
                                        <div class="py-2">
                                            <h4 class="float-end py-2 fw-bold">{{ wor.description }}</h4>
                                            <button class="btn btn-light  float-start  m-1"
                                                @click.prevent="editWorkList(index)" data-bs-toggle="modal"
                                                data-bs-target="#addWork">
                                                <img src="/web-asset/img/Iconeditaddch.png" alt="video Iconaddch" />
                                            </button>
                                            <button class="btn btn-light  float-start m-1"
                                                @click.prevent="delWorkList(index)">
                                                <img src="/web-asset/img/Icondelladdch.png" alt="Iconeditaddch" />
                                            </button>
                                        </div>
                                        <div class="clearfix row"></div>

                                        <p><span class="fw-bold">المؤسسة: </span>{{ wor.givenBy }}</p>
                                        <p><span class="fw-bold">مدة العمل: </span>{{ 'من' + wor.date + ' إلى ' +
                                                wor.endDate
                                        }} </p>
                                    </div>
                                </div>
                             end page 4-

                             end page 5
                                <div class="row" v-if="currentPage == 5">
                                    <div>
                                        <h4 class="py-3">إضافة الاقارب</h4>
                                      
                      <button class="btn btn-gold float-start" @click.prevent="pushfmailyList()">
                        <i class="fa-solid fa-plus ms-2"></i>إضافة أقرباء
                      </button> 
                                    </div>
                                    <div class="clearfix row">
                                        <div class="mb-3 col-md-12">
                                            <label for="formGroupExampleInput" class="form-label" required>أبحث عن
                                                أقاربك في منصة من هم</label>
                                            <input @keyup="getResults()" v-model="text" type="text"
                                                class="form-control  bg-white rounded-btn " placeholder="أبحث عن شخصية">
                                            <div class="row">
                                                <div v-if="hide" class="col-12 shadow-sm" :class="false ? 'ps-4' : ''"
                                                    style="position: absolute;z-index:75; ">
                                                    <div class="dyn-height  rounded-btn-img mt-4 "
                                                        style="background-color: #fff;box-shadow: 0px 0px 10px 3px rgb(0 0 0 / 10%);">
                                                        <div class="p-1" v-for="result in resultsCharactour"
                                                            :key=result.id>
                                                            <div class="row py-3"
                                                                @click.prevent="text = result.phrase; hide = false; famaily.characterId = result.id; famaily.givenBy = result.phrase; famaily.description = result.phrase; famaily.url = result.image; pushfmailyList()">
                                                                <div class=" d-flex align-items-center  me-4 mt-1 g-0 align-middle div-image-c"
                                                                    :class="false ? 'div-image' : 'div-image-c'">
                                                                    <img v-if="result.image"
                                                                        class="img-fluid rounded-btn" :src=result.image
                                                                        :class="false ? 'image-wid-s' : 'image-wid-p'">
                                                                </div>
                                                                <div class="col-8">
                                                                    <div class="pt-3 pe-4">
                                                                        <a class="text-gray-90 card-title">
                                                                            {{ result.phrase }}
                                                                        </a>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="mb-3 col-md-4">


                                        </div>
                                        <div class="row mb-2">
                                            <div v-for="(family, index) in fmailyList" :key=index
                                                class="rounded-btn col-lg-3 col-md-4 col-6">
                                                <div class="rounded-btn-img">
                                                    <div class="position-relative rounded-btn-img"
                                                        :class="family.vip_person ? 'bg-prim' : ''">
                                                        <img v-if="family.url" class=" rounded-btn-img w-100"
                                                            :src=family.url alt="carousel" style=" min-height: 160px;">
                                                        <img v-if="!family.url" class="rounded-btn-img w-100"
                                                            src="/web-asset/img/noun_premium.png" alt="carousel">
                                                        <div
                                                            class="position-absolute top-100 start-50 translate-middle">
                                                            <h5><span class="badge rounded-pill p-2  bg-prim"
                                                                    :class="family.vip_person ? 'd-block' : 'd-none'"><img
                                                                        src="/web-asset/img/noun_premium.png" alt="carousel"
                                                                        class="ps-1" style="width:20px">عضوية ذهبية
                                                                </span></h5>
                                                        </div>
                                                    </div>
                                                    <div class="text-center pt-4" style="min-height: 70px;">
                                                        <h2 class="card-title  fw-bold fs-4">{{ family.description }}
                                                        </h2>
                                                    </div>
                                                    <select class="form-select form-select"
                                                        aria-label=".form-select-sm example"
                                                        v-model="fmailyList[index].type">
                                                        <option value=null selected disabled>اختر صلة القرابة</option>
                                                        <option value="parents">أب</option>
                                                        <option value="siblings">أخ</option>
                                                        <option value="spouse">زوج</option>
                                                        <option value="cousins">أبن عم</option>
                                                        <option value="childrens">أبن</option>
                                                    </select>
                                                </div>

                                            </div>
                                        </div>


                                    </div>
                                </div>
                               end page 6-->
                <div class="mb-3 col-md-12 text-xl-end text-center">
                  <button
                    class="btn btn-primary border px-4 rounded-btn fw-bold"
                    v-if="currentPage != 2"
                    @click.prevent="submit()"
                  >
                    استمرار
                  </button>
                  <input
                    v-if="currentPage == 2"
                    @click.prevent="submitAll()"
                    class="btn btn-primary border px-4 rounded-btn fw-bold"
                    value="حفظ وإنهاء البيانات"
                    :disabled="submitStatus === 'PENDING'"
                  />
                </div>
                <div class="mb-3 col-md-12 text-center">
                  <div
                    class="alert alert-danger alert-dismissible fade show text-center"
                    role="alert"
                    v-if="submitStatus === 'ERROR'"
                  >
                    <strong>يرجى ملء جميع الحقول المطلوبة</strong>
                  </div>
                  <div
                    class="alert alert-info alert-dismissible fade show text-center"
                    role="alert"
                    v-if="submitStatus === 'PENDING'"
                  >
                    <strong>يرجى الإنتظار</strong>
                  </div>
                  <div
                    class="alert alert-success alert-dismissible fade show text-center"
                    role="alert"
                    v-if="submitStatus === 'OK'"
                  >
                    <strong>شكرا لك للتسجل سنقوم بمراجعة الشخصية في أسرع وقت </strong>
                  </div>
                  <div v-if="errors.errorMessage" class="alert alert-warning alert-dismissible fade show" role="alert">
                    <strong
                      >{{
                        errors.errorMessage == 'User does not exist or password mismatch'
                          ? 'المعذرة البريد الإلكتروني غير صالحة'
                          : errors.errorMessage
                      }}
                    </strong>
                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--
        <div class="modal fade" id="addEducation" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <i data-bs-dismiss="modal" aria-label="Close" ref="addEducation"><svg
                                style="border-radius: 50%;position: relative;top: 2px;top: -16px;width: 31px;right: -32px;background: rgb(255, 255, 255);padding: 3px;"
                                viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd"
                                    d="M15.9992 28.8002C23.0685 28.8002 28.7992 23.0694 28.7992 16.0002C28.7992 8.93095 23.0685 3.2002 15.9992 3.2002C8.92997 3.2002 3.19922 8.93095 3.19922 16.0002C3.19922 23.0694 8.92997 28.8002 15.9992 28.8002ZM13.9306 11.6688C13.3058 11.044 12.2927 11.044 11.6678 11.6688C11.043 12.2937 11.043 13.3067 11.6678 13.9316L13.7365 16.0002L11.6678 18.0688C11.043 18.6937 11.043 19.7067 11.6678 20.3316C12.2927 20.9564 13.3058 20.9564 13.9306 20.3316L15.9992 18.2629L18.0678 20.3316C18.6927 20.9564 19.7057 20.9564 20.3306 20.3316C20.9554 19.7067 20.9554 18.6937 20.3306 18.0688L18.262 16.0002L20.3306 13.9316C20.9554 13.3067 20.9554 12.2937 20.3306 11.6688C19.7057 11.044 18.6927 11.044 18.0678 11.6688L15.9992 13.7375L13.9306 11.6688Z"
                                    fill="#20211F" />
                            </svg></i>
                    </div>
                    <div class="modal-body">
                        <h4 class="py-2">إضافة شهادة جامعية</h4>
                        <form class="row g-3">
                            <div class="col-md-12">
                                <label for="inputEmail4" class="form-label">الدرجة العلمية</label>
                                <select class="form-select form-select" aria-label=".form-select-sm example"
                                    v-model="education.description">
                                    <option value="" selected disabled>اختر الدرجة العلمية</option>
                                    <option v-for="educationD in educationLi" :key=educationD.id :value=educationD.name>
                                        {{ educationD.name }}</option>
                                </select>
                            </div>
                            <div class="col-md-12 my-3">
                                <div class="row">
                                    <label for="inputEmail4" class="form-label">مدة الحصول على الدرجة العلمية</label>
                                    <div class="col-12">
                                        <select v-model="education.date" class="form-select"
                                            aria-label=".form-select-sm example">
                                            <option value="" disabled>سنة</option>
                                            <option :value="2023 - n" v-for="n in 70" :key="n">
                                                {{ 2023 - n }}
                                            </option>
                                        </select>
                                    </div>
                                  
                          <div class="col-6">
                          <select
                            v-model="education.endDate"
                            class="form-select"
                            aria-label=".form-select-sm example"
                          >
                            <option value="" disabled>حتى سنة</option>
                            <option :value="2023 - n" v-for="n in 70" :key="n" v-show="education.date <  2023 - n ">
                              {{ 2023 - n }}
                            </option>
                          </select>
                          </div>
                     
                                </div>
                            </div>
                            <div class="col-md-12">
                                <label for="inputEmail4" class="form-label">الدرجة العلمية في</label>
                                <input type="text" class="form-control" v-model="education.info" />
                            </div>


                            <div class="col-md-12">
                                <label for="inputEmail4" class="form-label">الدرجة العلمية من قبل</label>
                                <input @keyup="getResults()" v-model="text" type="text"
                                    class="form-control  bg-white rounded-btn " placeholder="أبحث عن مؤسسة">
                                <div class="row">
                                    <div v-if="hide" class="col-12 shadow-sm" :class="false ? 'ps-4' : ''"
                                        style="position: absolute;z-index:75; ">
                                        <div class="dyn-height  rounded-btn-img mt-4 "
                                            style="background-color: #fff;box-shadow: 0px 0px 10px 3px rgb(0 0 0 / 10%);">
                                            <div class="p-1" v-for="result in resultsCompany" :key=result.id>
                                                <div class="row py-3"
                                                    @click.prevent="text = result.phrase; education.givenBy = result.phrase; education.companyId = result.id; hide = false">
                                                    <div
                                                        class=" d-flex align-items-center  me-4 mt-1 g-0 align-middle div-image-c">
                                                        <img v-if="result.image && result.image != 'image'"
                                                            class="img-fluid rounded-btn image-wid-p" :src=result.image>
                                                        <img v-if="result.image == 'image'"
                                                            class="img-fluid rounded-btn image-wid-p"
                                                            src="/web-asset/img/noResultC.png">
                                                    </div>
                                                    <div class="col-8">
                                                        <div class="pt-3 pe-4">
                                                            <a href="" class="text-gray-90 card-title "
                                                                :class="false ? ' fs-4' : ' fs-6'">
                                                                {{ result.phrase }}
                                                            </a><span v-if="result.id == '273245'"
                                                                :class="false ? '' : 'd-none'"><button
                                                                    class="btn btn-gold me-2">عضوية
                                                                    ذهبية</button></span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" data-bs-dismiss="modal" aria-label="Close"
                            class="btn btn-light border float-start">
                            إلغاء
                        </button>
                        <button type="button" @click.prevent="pushEducationList()" class="btn btn-primary">
                            حفظ
                            <span :class="{ 'spinner-border spinner-border-sm': loadingEdit }"></span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal fade" id="addWork" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <i data-bs-dismiss="modal" aria-label="Close" ref="addWork"><svg
                                style="border-radius: 50%;position: relative;top: 2px;top: -16px;width: 31px;right: -32px;background: rgb(255, 255, 255);padding: 3px;"
                                viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd"
                                    d="M15.9992 28.8002C23.0685 28.8002 28.7992 23.0694 28.7992 16.0002C28.7992 8.93095 23.0685 3.2002 15.9992 3.2002C8.92997 3.2002 3.19922 8.93095 3.19922 16.0002C3.19922 23.0694 8.92997 28.8002 15.9992 28.8002ZM13.9306 11.6688C13.3058 11.044 12.2927 11.044 11.6678 11.6688C11.043 12.2937 11.043 13.3067 11.6678 13.9316L13.7365 16.0002L11.6678 18.0688C11.043 18.6937 11.043 19.7067 11.6678 20.3316C12.2927 20.9564 13.3058 20.9564 13.9306 20.3316L15.9992 18.2629L18.0678 20.3316C18.6927 20.9564 19.7057 20.9564 20.3306 20.3316C20.9554 19.7067 20.9554 18.6937 20.3306 18.0688L18.262 16.0002L20.3306 13.9316C20.9554 13.3067 20.9554 12.2937 20.3306 11.6688C19.7057 11.044 18.6927 11.044 18.0678 11.6688L15.9992 13.7375L13.9306 11.6688Z"
                                    fill="#20211F" />
                            </svg></i>
                    </div>
                    <div class="modal-body">
                        <h4 class="py-2">إضافة خبرة أو نشاط</h4>
                        <form class="row g-3">
                            <div class="col-md-12">
                                <label for="inputEmail4" class="form-label">المنصب</label>
                                <input type="text" class="form-control" v-model="work.description" />
                            </div>
                            <div class="col-md-12">
                                <label for="inputEmail4" class="form-label"> المؤسسة</label>
                                <input @keyup="getResults()" v-model="text" type="text"
                                    class="form-control  bg-white rounded-btn " placeholder="أبحث عن مؤسسة">
                                <div class="row">
                                    <div v-if="hide" class="col-12 shadow-sm" :class="false ? 'ps-4' : ''"
                                        style="position: absolute;z-index:75; ">
                                        <div class="dyn-height  rounded-btn-img mt-4 "
                                            style="background-color: #fff;box-shadow: 0px 0px 10px 3px rgb(0 0 0 / 10%);">
                                            <div class="p-1" v-for="result in resultsCompany" :key=result.id>
                                                <div class="row py-3"
                                                    @click.prevent="text = result.phrase; work.givenBy = result.phrase; work.companyId = result.id; hide = false">
                                                    <div
                                                        class=" d-flex align-items-center  me-4 mt-1 g-0 align-middle div-image-c">
                                                        <img v-if="result.image && result.image != 'image'"
                                                            class="img-fluid rounded-btn image-wid-p" :src=result.image>
                                                        <img v-if="result.image == 'image'"
                                                            class="img-fluid rounded-btn image-wid-p"
                                                            src="/web-asset/img/noResultC.png">
                                                    </div>
                                                    <div class="col-8">
                                                        <div class="pt-3 pe-4">
                                                            <a href="" class="text-gray-90 card-title  fs-6">
                                                                {{ result.phrase }}
                                                            </a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-12 my-3">
                                <div class="row">
                                    <label for="inputEmail4" class="form-label">مدة العمل أو التدريب</label>
                                    <div class="col-6">
                                        <select v-model="work.date" class="form-select"
                                            aria-label=".form-select-sm example">
                                            <option value="" disabled>من سنة</option>
                                            <option :value="2023 - n" v-for="n in 70" :key="n">
                                                {{ 2023 - n }}
                                            </option>
                                        </select>
                                    </div>
                                    <div class="col-6">
                                        <select v-model="work.endDate" class="form-select"
                                            aria-label=".form-select-sm example">
                                            <option value="" disabled>حتى سنة</option>
                                            <option :value="2023 - n" v-for="n in 70" :key="n"
                                                v-show="work.date < 2023 - n">
                                                {{ 2023 - n }}
                                            </option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" data-bs-dismiss="modal" aria-label="Close"
                            class="btn btn-light border float-start">
                            إلغاء
                        </button>
                        <button type="button" @click.prevent="pushWorkList()" class="btn btn-primary">
                            حفظ
                            <span :class="{ 'spinner-border spinner-border-sm': loadingEdit }"></span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal fade" id="addVideo" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <i data-bs-dismiss="modal" aria-label="Close" ref="addVideo"><svg
                                style="border-radius: 50%;position: relative;top: 2px;top: -16px;width: 31px;right: -32px;background: rgb(255, 255, 255);padding: 3px;"
                                viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd"
                                    d="M15.9992 28.8002C23.0685 28.8002 28.7992 23.0694 28.7992 16.0002C28.7992 8.93095 23.0685 3.2002 15.9992 3.2002C8.92997 3.2002 3.19922 8.93095 3.19922 16.0002C3.19922 23.0694 8.92997 28.8002 15.9992 28.8002ZM13.9306 11.6688C13.3058 11.044 12.2927 11.044 11.6678 11.6688C11.043 12.2937 11.043 13.3067 11.6678 13.9316L13.7365 16.0002L11.6678 18.0688C11.043 18.6937 11.043 19.7067 11.6678 20.3316C12.2927 20.9564 13.3058 20.9564 13.9306 20.3316L15.9992 18.2629L18.0678 20.3316C18.6927 20.9564 19.7057 20.9564 20.3306 20.3316C20.9554 19.7067 20.9554 18.6937 20.3306 18.0688L18.262 16.0002L20.3306 13.9316C20.9554 13.3067 20.9554 12.2937 20.3306 11.6688C19.7057 11.044 18.6927 11.044 18.0678 11.6688L15.9992 13.7375L13.9306 11.6688Z"
                                    fill="#20211F" />
                            </svg></i>
                    </div>
                    <div class="modal-body">
                        <h4 class="py-2">إضافة الفيديو</h4>
                        <form class="row g-3">
                            <div class="col-md-12">
                                <label for="inputEmail4" class="form-label">رابط الفيديو</label>
                                <input type="text" class="form-control" v-model="charactour.resume_url" />
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" data-bs-dismiss="modal" aria-label="Close"
                            class="btn btn-light border float-start">
                            إلغاء
                        </button>
                        <button type="button" data-bs-dismiss="modal" aria-label="Close" class="btn btn-primary">
                            حفظ
                            <span :class="{ 'spinner-border spinner-border-sm': loadingEdit }"></span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    -->
  </div>
</template>

<script>
import breadcrumb from '../pages/accessories/breadcrumb.vue'
import { ModelListSelect } from 'vue-search-select'
import ClickOutside from 'vue-click-outside'
import 'vue-search-select/dist/VueSearchSelect.css'
export default {
  components: {
    breadcrumb,
    ModelListSelect,
  },
  data() {
    return {
      hide: false,
      noResult: false,
      text: '',
      day: '',
      month: '',
      year: '',
      errors: {
        message: '',
        errorCode: '',
        errorMessage: '',
      },
      submitStatus: null,
      educationLi: [
        {
          id: 1,
          name: 'شهادة الثانوية العامة',
        },
        {
          id: 2,
          name: 'شهادة الدبلوم',
        },
        {
          id: 3,
          name: 'شهادة البكالوريوس',
        },
        {
          id: 4,
          name: 'شهادة الماجستير',
        },
        {
          id: 5,
          name: 'شهادة الدكتوراة',
        },
      ],

      loading: false,
      loadingEdit: false,
      charactour: {
        character_name_en: '',
        character_name_ar: '',
        current_country_of_residence: '',
        nationality: '',
        position: '',
        gender: '',
        dateOfBirth: '',
        first_nationality: '',
        second_nationality: '',
        third_nationality: '',
        main_country_of_residence: '',
        category_id: '',
        subCategory_id: '',
        dateOfBirth: '',
        userName: this.$store.state.user.firstname + ' ' + this.$store.state.user.lastname,
        userEmail: this.$store.state.user.email,
        companyId: '',
        position: '',
        company_id: 1,
        user_id: this.$store.state.user.id,
        resume_url: '',
        country: '',
        information: '',
        image: '',
        education_id: '',
        experience_id: '',
      },
      token: this.$store.state.token,
      countries: [],
      categorys: [],
      subCategorys: [],
      currentPage: 1,
      error: [],
      relation: [],
      eduCompany: [],
      dataimage: '',
      breadcrumbLsit: [
        {
          name: 'الرئيسية',
          link: '/',
        },
        {
          name: 'إضافة شخصية',
          link: '/addCharacter',
        },
      ],
    }
  },

    methods: {
      reset_image(){
        this.charactour.image = '';
        this.dataimage = ''; 
        this.$refs.fileInput.value = '';
      }, 
        select_change(id){
            let el = document.getElementById(id)
            el.blur();
        },  
        onSelect() {
        this.getsubCategorys() 
        },
        setAge() {

        },
        touch() {
                if(this.charactour.character_name_ar && this.charactour.position && this.charactour.first_nationality && this.charactour.category_id)
                    { return true}
                    else
                    return false
        },
        submit() {
            if (!this.touch()) {
                this.submitStatus = 'ERROR'
                this.currentPage = 1
            } else {
                this.submitStatus = ''
               //this.submitStatus = 'PENDING'
                this.next()
            }
        },
        submitAll() {
            if (this.touch()) {
            this.submitStatus = 'PENDING'
            
            this.postCharactour()
            }else{
                this.currentPage = 1
                
            }
        },
        /*
        pushEducationList() {
            var index = this.educationList.findIndex(x => x.description == this.education.description);
            index === -1 ? this.educationList.push(this.education) : ""
            // this.educationList.push(this.education)
            this.education = {}
            this.text = ""
            this.$refs.addEducation.click()
        },
        editEducationList(v) {
            this.education = this.educationList[v]
            //this.educationList.splice(v, 1)

            this.text = this.education.givenBy
        },
        delEducationList(v) {
            this.educationList.splice(v, 1)
        },
        pushWorkList() {
            var index = this.workList.findIndex(x => x.description == this.work.description);
            index === -1 ? this.workList.push(this.work) : ""

            // this.workList.indexOf(this.work) === -1 ?  this.workList.push(this.work) : ""
            this.work = {}
            this.text = ""
            this.$refs.addWork.click()
        },
        pushfmailyList() {
            this.fmailyList.indexOf(this.famaily) === -1 ? this.fmailyList.push(this.famaily) : ""
            this.famaily = {}
            this.text = ""
        },
        delfamailtList(v) {
            this.fmailyList.splice(v, 1)
        },
        editWorkList(v) {
            this.work = this.workList[v]
            //this.workList.splice(v, 1)
            this.text = this.work.givenBy
        },
        delWorkList(v) {
            this.workList.splice(v, 1)
        },
        */
    next() {
      this.currentPage++
      this.text = ''
      window.scrollTo(0, 0)
    },
    goto(v) {
      if (this.charactour.character_name_ar && this.charactour.position && this.charactour.first_nationality && this.charactour.category_id){
          this.currentPage = v
          this.text = ''
          var element = this.$refs['top']
          var top = element.offsetTop - 100
          window.scrollTo(0, 0)
      }else {
        this.$toast.error('يرجى ملء جميع الحقول المطلوبة')
      }
    },

    postCharactour() {
      /*
            let relation = [...this.educationList, ...this.workList, ...this.fmailyList];
            let _this = this
            let valid = true
            relation.forEach(function (value, index) {
                if (value.type == null) {
                    _this.submitStatus = null
                    _this.$toast.error("يرجى اختيار صلة القرابة");
                    valid = false
                }
            })
            */
      //let company = this.companys
      let formData = new FormData()
      formData.append('character_name_ar', this.charactour.character_name_ar)
      formData.append('character_name_en', this.charactour.character_name_en)
      formData.append('content', this.charactour.information)
      formData.append('gender', this.charactour.gender)
      formData.append('resume_url', this.charactour.resume_url)
      formData.append('birth_date', this.day + '-' + this.month + '-' + this.year)
      formData.append('first_nationality', this.charactour.first_nationality)
      formData.append('position', this.charactour.position)
      formData.append('main_country_of_residence', this.charactour.main_country_of_residence)
      //formData.append('category_id',this.charactour.category_id);
      formData.append('image', this.dataimage)
      //formData.append('status',this.charactour.status);
      //formData.append('IsAddReq',1);
      //formData.append('company_id',this.charactour.company_id);
      formData.append('user_id', this.charactour.user_id)
      formData.append('userName', this.charactour.userName)
      formData.append('userEmail', this.charactour.userEmail)
      formData.append('category', this.charactour.category_id)
      formData.append('subCategory', this.charactour.subCategory_id)
      /*
            relation.forEach(function (value, index) {
                formData.append("type[" + index + "]", value.type)
                formData.append("description[" + index + "]", value.info ? value.description + " - " + value.info : value.description)
                //formData.append("url["+index+"]", value.description)
                formData.append("start_date[" + index + "]", value.date)
                formData.append("end_date[" + index + "]", value.endDate)
                //formData.append("content["+index+"]", value.content)
                //formData.append("relation["+index+"]", value.content)
                //formData.append("info["+index+"]", value.info)
                //formData.append("givenBy["+index+"]", value.givenBy)
                formData.append("characterId[" + index + "]", value.characterId)
                formData.append("companyId[" + index + "]", value.companyId)
            })
            */
      // console.log(relation)
      this.httpIm
        .post('/user_info',{'social_token':this.token}, { headers: { Authorization: `Bearer ${this.token}` } })
        .then(async (response) => {
          if (response.data.user.add_character_allowed == 1) {
            this.http
              .post('/RequestAddCharacter/store', formData)
              .then(async (response) => {
                this.error = response.data.errorMessage
                this.submitStatus = 'OK'
                this.$toast.success('تم الحفظ, سوف يتم مراجعة الطلب من قبل المدير')
                setTimeout(() => {
                  this.$router.push('/')
                }, 1000)
              })
              .catch((error) => {
                if (error) {
                  this.$toast.error('نعتذر حدث خطأ أثناء الحفظ')
                  this.errors = error.response.data
                }
              })
          } else {
            this.submitStatus = ''
            this.$toast.warning('يجب عليك اكمال معلوماتك أولا إضافة الشخصية')
          }
        })
        .catch((error) => {
          this.$toast.error('نعتذر حدث خطأ أثناء الحفظ')
        })
    },
    add() {},
    getcategory() {
      this.http.get('/allcategories?type=character').then(async (response) => {
        this.categorys = response.data.items
      })
    },
    getsubCategorys() {
      this.http.get('/category/show/' + this.charactour.category_id).then(async (response) => {
        this.subCategorys = response.data.subCategories
      })
    } /*
        getCompany() {
            this.http.get("/company").then(async (response) => {
                this.companys = response.data;
            });
        },

                */,
    trigger() {
      this.$refs.fileInput.click();
    },
    upload_avatar(e) {
      let file = e.target.files[0]
      // console.log(file)
      //    let formData = new FormData();
      //  formData.append(this.company);
      let reader = new FileReader()

      if (file['size'] < 2111775) {
        reader.onloadend = (file) => {
          this.charactour.image = reader.result
        }
        this.dataimage = file
        reader.readAsDataURL(file)
        this.loading = false
      } else {
        this.$toast.error(' نعتذر, مطلوب صورة ذو حجم اقل من 2 ميغا')
        this.charactour.image = null
        this.dataimage = ''
      }
    },

    getcountry() {
      this.httpMg.get('/countries').then(async (response) => {
        this.countries = response.data.countries
      })
    },
    /*
        getEduCompany() {
            this.http.get('/company',
                {
                    //"categories":[parseInt(this.$route.params.category_id)],
                    //"country":[this.$store.state.langFilter.toLowerCase()]
                })
                .then(async (response) => {
                    this.eduCompany = response.data.items
                })
        },
    
        getResults() {
            if (this.text != "") {
                this.http.get('/charactour/search?q=' + this.text)
                    .then(async (response) => {
                        this.resultsCompany = response.data.suggestions ? response.data.suggestions.filter((item) => { return (item.type == 'company') }) : null
                        this.resultsCharactour = response.data.suggestions ? response.data.suggestions.filter((item) => { return (item.type == 'person') }) : null
                        this.hide = true
                        this.noResult = true
                    })
            }
        },
        */
    hides() {
      this.hide = false
      this.showhistory = false
    },
  },
  created() {
    this.getcategory()
    // this.getsubCategorys()
    // this.getCompany()
    this.getcountry()
    // this.getEduCompany()
  },
  mounted() {
    // prevent click outside event with popupItem.
    this.popupItem = this.$el
  },
  directives: {
    ClickOutside,
  },
}
</script>
<style scoped>
.ui.search.dropdown > input.search {
  top: -8px !important;
}

.ui.search.selection.dropdown > input.search,
.ui.search.selection.dropdown > span.sizer {
  padding: 0;
}

.ui.selection.dropdown,
.item {
  text-align: right !important;
  padding-right: 35px;
}

.ui.dropdown:not(.button) > .default.text {
  color: #000;
}

.form-select {
  display: block;
  width: 100%;
  padding: 0.375rem 2.25rem 0.375rem 0.75rem;
  -moz-padding-start: calc(0.75rem - 3px);
  font-size: 0.9rem;
  font-weight: 400;
  line-height: 1.6;
  color: #212529;
  background-color: #f8fafc;
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3e%3cpath fill='none' stroke='%23343a40' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M2 5l6 6 6-6'/%3e%3c/svg%3e") !important;
  background-repeat: no-repeat !important;
  background-position: right 0.75rem center !important;
  background-size: 16px 12px !important;
  border: 1px solid #ced4da;
  border-radius: 0.25rem !important;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
}

.form-select > i {
  display: none;
}
</style>
<style scoped>
start-0-c {
  left: 15px !important;
}

.nav-link.router-link-exact-active {
  border-radius: 20px 0px 0px 20px;
  background-color: #4B91F12e;
  border-right: 5px #4B91F1 solid;
  color: #4B91F1;
  font-weight: bold;
}

.profImg {
  width: 40px;
}

.dropdown-toggle1::after {
  display: none !important;
}

.form-check .form-check-input {
  float: none;
  margin-left: 0;
}

.form-select,
.form-control {
  background-color: #fff;
  border-radius: 0.5rem;
}

.form-label {
  font-weight: bold;
}

.nav.flex-column {
  padding-inline-end: 20px;
  padding-inline-start: 0;
}

.nav.flex-column > .nav-item > .nav-link {
  color: #4f4f4f;
}

.player {
  border-radius: 15px !important;
  overflow: hidden;
  z-index: 100;
}

@media screen and (max-width: 992px) {
  .dyn-height {
    margin-top: 20px;
  }
}

@media screen and (max-width: 480px) {
}

.dyn-height {
  max-height: 600px;
  overflow-y: auto;
  overflow-x: hidden;
}

.dyn-height::-webkit-scrollbar-track {
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  border-radius: 10px;
  background-color: #f5f5f5;
}

.dyn-height::-webkit-scrollbar {
  width: 6px;
  background-color: #f5f5f5;
}

.dyn-height::-webkit-scrollbar-thumb {
  border-radius: 10px;
  box-shadow: inset 0 0 3px rgba(0, 0, 0, 0.2);
  background-color: #4f4f4f;
}

.input,
input::placeholder {
  padding-right: 10px;
}

.btn-w {
  width: 100%;
  margin-top: 10px;
}

.image-wid-s {
  width: 80px;
  height: 80px;
}

.image-wid-p {
  width: 50px;
  height: 40px;
}

.div-image {
  width: 80px;
}

.div-image-c {
  width: 40px;
}

.bg-pink {
  background-image: linear-gradient(#f8f8f8, #fff);
}
</style>
<style scoped>
.modal-footer {
  justify-content: space-between;
}

.modal-footer button {
  width: 100px;
}

.avatar {
  max-width: 80px;
  cursor: pointer;
}

hr {
  background: #f2f2f2;
  opacity: 1;
  border-color: #f2f2f2 !important;
}

.border {
  border-color: #f2f2f2 !important;
}

.modal-body {
  padding-top: 0;
}

.modal-header {
  padding-bottom: 0;
  height: 14px;
}
</style>
