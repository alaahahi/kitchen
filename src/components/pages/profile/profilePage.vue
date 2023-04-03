<template>
  <div class="col-lg-8">
    <div class="modal fade" id="accountDelModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <i data-bs-dismiss="modal" aria-label="Close" ref="accountDel"
              ><svg
                style="
                  border-radius: 50%;
                  position: relative;
                  top: 2px;
                  top: -31px;
                  width: 31px;
                  right: -32px;
                  background: rgb(255, 255, 255);
                  padding: 3px;
                "
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M15.9992 28.8002C23.0685 28.8002 28.7992 23.0694 28.7992 16.0002C28.7992 8.93095 23.0685 3.2002 15.9992 3.2002C8.92997 3.2002 3.19922 8.93095 3.19922 16.0002C3.19922 23.0694 8.92997 28.8002 15.9992 28.8002ZM13.9306 11.6688C13.3058 11.044 12.2927 11.044 11.6678 11.6688C11.043 12.2937 11.043 13.3067 11.6678 13.9316L13.7365 16.0002L11.6678 18.0688C11.043 18.6937 11.043 19.7067 11.6678 20.3316C12.2927 20.9564 13.3058 20.9564 13.9306 20.3316L15.9992 18.2629L18.0678 20.3316C18.6927 20.9564 19.7057 20.9564 20.3306 20.3316C20.9554 19.7067 20.9554 18.6937 20.3306 18.0688L18.262 16.0002L20.3306 13.9316C20.9554 13.3067 20.9554 12.2937 20.3306 11.6688C19.7057 11.044 18.6927 11.044 18.0678 11.6688L15.9992 13.7375L13.9306 11.6688Z"
                  fill="#20211F"
                /></svg
            ></i>
          </div>
          <div class="modal-body">
            <h4>حذف حسابي</h4>
            <p class="text-muted">سيؤدي حذف الحساب إلى حذف معلوماتك نهائيا</p>
            <div class="col-md-12">
              <label for="inputEmail4" class="form-label">كلمة المرور الحالية</label>
              <div class="position-relative has-validation">
                <input
                  :type="passwordFieldType"
                  v-model.trim="$v.checkPassword.$model"
                  class="form-control bg-white text-end"
                  :class="
                    $v.checkPassword.$model == '' || !$v.checkPassword.minLength || !$v.checkPassword.valid
                      ? ''
                      : 'is-valid'
                  "
                  style="direction: ltr"
                />
                <i
                  @mouseover="switchVisibility()"
                  @mouseleave="switchVisibility()"
                  :class="passwordFieldIcon"
                  class="fa-solid fa-eye position-absolute top-50 start-0-c translate-middle-y text-muted"
                ></i>
              </div>
            </div>
            <div class="text-danger py-1 fs-7" v-if="!$v.checkPassword.valid || !$v.checkPassword.minLength">
              مطلوب {{ $v.checkPassword.$params.minLength.min }} محارف على الأقل متضمنة حرف و رقم و رمز
            </div>
            <div
              class="alert alert-danger alert-dismissible fade show text-center mt-2"
              role="alert"
              v-if="submitStatus1 === 'ERROR'"
            >
              <strong>يرجى ملء حقل كلمة المرور بشكل صحيح</strong>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" data-bs-dismiss="modal" class="btn btn-light border float-start">إلغاء</button>
            <button type="button" @click.prevent="removeAccount()" class="btn btn-danger">
              حذف
              <span :class="{ 'spinner-border spinner-border-sm': delLoading }"></span>
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="modal fade" id="nameModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <i data-bs-dismiss="modal" aria-label="Close" ref="closebtnName"
              ><svg
                style="
                  border-radius: 50%;
                  position: relative;
                  top: 2px;
                  top: -31px;
                  width: 31px;
                  right: -32px;
                  background: rgb(255, 255, 255);
                  padding: 3px;
                "
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M15.9992 28.8002C23.0685 28.8002 28.7992 23.0694 28.7992 16.0002C28.7992 8.93095 23.0685 3.2002 15.9992 3.2002C8.92997 3.2002 3.19922 8.93095 3.19922 16.0002C3.19922 23.0694 8.92997 28.8002 15.9992 28.8002ZM13.9306 11.6688C13.3058 11.044 12.2927 11.044 11.6678 11.6688C11.043 12.2937 11.043 13.3067 11.6678 13.9316L13.7365 16.0002L11.6678 18.0688C11.043 18.6937 11.043 19.7067 11.6678 20.3316C12.2927 20.9564 13.3058 20.9564 13.9306 20.3316L15.9992 18.2629L18.0678 20.3316C18.6927 20.9564 19.7057 20.9564 20.3306 20.3316C20.9554 19.7067 20.9554 18.6937 20.3306 18.0688L18.262 16.0002L20.3306 13.9316C20.9554 13.3067 20.9554 12.2937 20.3306 11.6688C19.7057 11.044 18.6927 11.044 18.0678 11.6688L15.9992 13.7375L13.9306 11.6688Z"
                  fill="#20211F"
                /></svg
            ></i>
          </div>
          <div class="modal-body">
            <h4 class="pb-2">تغيير الاسم</h4>
            <form class="row g-3">
              <div class="col-md-6">
                <label for="inputEmail4" class="form-label">الاسم الأول</label>
                <input type="text" class="form-control" v-model="first" />
              </div>
              <div class="col-md-6">
                <label for="inputPassword4" class="form-label">الاسم الثاني</label>
                <input type="text" class="form-control" v-model="last" />
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" data-bs-dismiss="modal" class="btn btn-light border float-start">إلغاء</button>
            <button type="button" @click.prevent="changeUserInfo()" class="btn btn-primary">
              حفظ
              <span :class="{ 'spinner-border spinner-border-sm': loadingEdit }"></span>
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="modal fade" id="passwordModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <i data-bs-dismiss="modal" aria-label="Close" ref="closebtnpssword"
              ><svg
                style="
                  border-radius: 50%;
                  position: relative;
                  top: 2px;
                  top: -31px;
                  width: 31px;
                  right: -32px;
                  background: rgb(255, 255, 255);
                  padding: 3px;
                "
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M15.9992 28.8002C23.0685 28.8002 28.7992 23.0694 28.7992 16.0002C28.7992 8.93095 23.0685 3.2002 15.9992 3.2002C8.92997 3.2002 3.19922 8.93095 3.19922 16.0002C3.19922 23.0694 8.92997 28.8002 15.9992 28.8002ZM13.9306 11.6688C13.3058 11.044 12.2927 11.044 11.6678 11.6688C11.043 12.2937 11.043 13.3067 11.6678 13.9316L13.7365 16.0002L11.6678 18.0688C11.043 18.6937 11.043 19.7067 11.6678 20.3316C12.2927 20.9564 13.3058 20.9564 13.9306 20.3316L15.9992 18.2629L18.0678 20.3316C18.6927 20.9564 19.7057 20.9564 20.3306 20.3316C20.9554 19.7067 20.9554 18.6937 20.3306 18.0688L18.262 16.0002L20.3306 13.9316C20.9554 13.3067 20.9554 12.2937 20.3306 11.6688C19.7057 11.044 18.6927 11.044 18.0678 11.6688L15.9992 13.7375L13.9306 11.6688Z"
                  fill="#20211F"
                /></svg
            ></i>
          </div>
          <div class="modal-body">
            <h4 class="pb-2">تغيير كلمة المرور</h4>
            <form class="row g-3" @submit.prevent="submit">
              <div class="col-md-12">
                <label for="inputEmail4" class="form-label">كلمة المرور الحالية</label>
                <div class="position-relative has-validation">
                  <input
                    :type="passwordFieldType"
                    v-model.trim="$v.passwordLast.$model"
                    class="form-control bg-white text-end"
                    :class="
                      $v.passwordLast.$model == '' || !$v.passwordLast.minLength || !$v.passwordLast.valid
                        ? ''
                        : 'is-valid'
                    "
                    style="direction: ltr"
                  />
                  <i
                    @click="switchVisibility()"
                    :class="passwordFieldIcon"
                    class="fa-solid fa-eye position-absolute top-50 start-0-c translate-middle-y text-muted"
                  ></i>
                </div>
                <div class="text-danger py-1 fs-7" v-if="!$v.passwordLast.valid || !$v.passwordLast.minLength">
                  مطلوب {{ $v.passwordLast.$params.minLength.min }} محارف على الأقل متضمنة حرف و رقم و رمز
                </div>
              </div>

              <div class="col-md-12">
                <label for="inputEmail4" class="form-label">كلمة المرور الجديدة</label>
                <div class="position-relative has-validation">
                  <input
                    :type="passwordFieldType"
                    v-model.trim="$v.newPassword.$model"
                    class="form-control bg-white text-end"
                    :class="
                      $v.newPassword.$model == '' || !$v.newPassword.minLength || !$v.newPassword.valid
                        ? ''
                        : 'is-valid'
                    "
                    style="direction: ltr"
                  />
                  <i
                    @click="switchVisibility()"
                    :class="passwordFieldIcon"
                    class="fa-solid fa-eye position-absolute top-50 start-0-c translate-middle-y text-muted"
                  ></i>
                </div>
                <div class="text-danger py-1 fs-7" v-if="!$v.newPassword.valid || !$v.newPassword.minLength">
                  مطلوب {{ $v.newPassword.$params.minLength.min }} محارف على الأقل متضمنة حرف و رقم و رمز
                </div>
              </div>

              <div class="col-md-12">
                <label for="inputEmail4" class="form-label">تأكيد كلمة المرور الجديدة</label>
                <div class="position-relative has-validation">
                  <input
                    :type="passwordFieldType"
                    v-model.trim="$v.newPasswordConf.$model"
                    class="form-control bg-white text-end"
                    :class="!$v.newPasswordConf.required || !$v.newPasswordConf.sameAsPassword ? '' : 'is-valid'"
                    style="direction: ltr"
                  />
                  <i
                    @click="switchVisibility()"
                    :class="passwordFieldIcon"
                    class="fa-solid fa-eye position-absolute top-50 start-0-c translate-middle-y text-muted"
                  ></i>
                </div>
                <div class="text-danger pt-1 fs-7" v-if="!$v.newPasswordConf.sameAsPassword">كلمة السر غير متطابقة</div>
              </div>
              <div class="col-md-12">
                <div class="row m-0 p-1 pb-2 rounded-btn" style="background-color: #4169e31f">
                  <div class="col-md-7">
                    <div class="fw-bold">
                      <span>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <g clip-path="url(#clip0_551_2192)">
                            <path
                              d="M12 17.8985C11.3772 17.8985 10.875 17.3858 10.875 16.75V14.125C10.875 13.4893 11.3772 12.9766 12 12.9766C12.6228 12.9766 13.125 13.4893 13.125 14.125V16.75C13.125 17.3858 12.6228 17.8985 12 17.8985ZM21 10.8438V20.0313C21 21.1182 20.1362 22 19.0714 22H4.92857C3.86384 22 3 21.1182 3 20.0313V10.8438C3 9.75686 3.86384 8.87502 4.92857 8.87502H6.21429V6.90627C6.21429 3.64553 8.81786 0.991816 12.0161 1.00002C15.2143 1.00822 17.7857 3.69885 17.7857 6.96369V8.87502H19.0714C20.1362 8.87502 21 9.75686 21 10.8438ZM8.14286 8.87502H15.8571V6.90627C15.8571 4.73654 14.1254 2.96877 12 2.96877C9.87455 2.96877 8.14286 4.73654 8.14286 6.90627V8.87502ZM19.0714 10.8438H4.92857V20.0313H19.0714V10.8438Z"
                              fill="#4169E3"
                            />
                          </g>
                          <defs>
                            <clipPath id="clip0_551_2192">
                              <rect width="18" height="21" fill="white" transform="translate(3 1)" />
                            </clipPath>
                          </defs>
                        </svg>
                      </span>
                      إعادة تعيين كلمة المرور
                    </div>
                    <div class="text-gray-60 fs-6" style="font-size: 12px">
                      إذا نسيت كلمة مرورك للتو ، فلا داعي للقلق - لقد حصلنا عليك!
                    </div>
                  </div>
                  <div class="col-sm-5 text-start pt-4" style="font-size: 14px">
                    <a href="/email" class="text-start link-primary text-decoration-none fw-bold">
                      هل نسيت كلمة المرور؟
                      <span
                        ><svg
                          width="10"
                          class="me-2"
                          height="16"
                          viewBox="0 0 10 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M9.55581 0.418792C8.96356 -0.139597 8.00684 -0.139597 7.41458 0.418792L0.444191 6.9906C-0.148064 7.54899 -0.148064 8.45101 0.444191 9.0094L7.41458 15.5812C8.00684 16.1396 8.96356 16.1396 9.55581 15.5812C10.1481 15.0228 10.1481 14.1208 9.55581 13.5624L3.66363 7.99284L9.55581 2.43758C10.1481 1.87919 10.1329 0.962864 9.55581 0.418792Z"
                            fill="#4169E3"
                          /></svg
                      ></span>
                    </a>
                  </div>
                </div>
              </div>

              <div
                class="alert alert-danger alert-dismissible fade show text-center"
                role="alert"
                v-if="submitStatus === 'ERROR'"
              >
                <strong>يرجى ملء جميع الحقول المطلوبة</strong>
              </div>
              <div class="col-12">
                <button type="button" @click.prevent="submit()" class="btn btn-primary w-100">
                  تأكيد كلمة المرور الجديدة
                  <span :class="{ 'spinner-border spinner-border-sm': resetPasswordLoading }"></span>
                </button>
                <button type="button" data-bs-dismiss="modal" class="btn btn-light border w-100 mt-2">إلغاء</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    <div class="modal fade" id="phoneModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <i data-bs-dismiss="modal" aria-label="Close" ref="closebtnPhone"
              ><svg
                style="
                  border-radius: 50%;
                  position: relative;
                  top: 2px;
                  top: -31px;
                  width: 31px;
                  right: -32px;
                  background: rgb(255, 255, 255);
                  padding: 3px;
                "
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M15.9992 28.8002C23.0685 28.8002 28.7992 23.0694 28.7992 16.0002C28.7992 8.93095 23.0685 3.2002 15.9992 3.2002C8.92997 3.2002 3.19922 8.93095 3.19922 16.0002C3.19922 23.0694 8.92997 28.8002 15.9992 28.8002ZM13.9306 11.6688C13.3058 11.044 12.2927 11.044 11.6678 11.6688C11.043 12.2937 11.043 13.3067 11.6678 13.9316L13.7365 16.0002L11.6678 18.0688C11.043 18.6937 11.043 19.7067 11.6678 20.3316C12.2927 20.9564 13.3058 20.9564 13.9306 20.3316L15.9992 18.2629L18.0678 20.3316C18.6927 20.9564 19.7057 20.9564 20.3306 20.3316C20.9554 19.7067 20.9554 18.6937 20.3306 18.0688L18.262 16.0002L20.3306 13.9316C20.9554 13.3067 20.9554 12.2937 20.3306 11.6688C19.7057 11.044 18.6927 11.044 18.0678 11.6688L15.9992 13.7375L13.9306 11.6688Z"
                  fill="#20211F"
                /></svg
            ></i>
          </div>
          <div class="modal-body">
            <h4 class="pb-2">تغيير رقم الهاتف</h4>
            <form class="row g-3">
              <div class="col-md-12">
                <label for="inputEmail4" class="form-label">رقم الهاتف</label>
                <input
                  :class="{ valid: isValidPhoneNumber, invalid: !isValidPhoneNumber }"
                  @keyup="validatePhoneNumber"
                  type="text"
                  class="form-control text-end"
                  v-model="phone"
                  style="direction: ltr"
                />
              </div>
              <div class="invalid-warning text-danger fs-6" v-if="!isValidPhoneNumber">يرجى إدخال رقم هاتف صحيح</div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" data-bs-dismiss="modal" class="btn btn-light border float-start">إلغاء</button>
            <button
              type="button"
              @click.prevent="changeUserInfo()"
              class="btn btn-primary"
              :class="!isValidPhoneNumber ? 'd-none' : ''"
            >
              حفظ
              <span :class="{ 'spinner-border spinner-border-sm': loadingEdit }"></span>
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="modal fade" id="countriesModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <i data-bs-dismiss="modal" aria-label="Close" ref="closeCountry"
              ><svg
                style="
                  border-radius: 50%;
                  position: relative;
                  top: 2px;
                  top: -31px;
                  width: 31px;
                  right: -32px;
                  background: rgb(255, 255, 255);
                  padding: 3px;
                "
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M15.9992 28.8002C23.0685 28.8002 28.7992 23.0694 28.7992 16.0002C28.7992 8.93095 23.0685 3.2002 15.9992 3.2002C8.92997 3.2002 3.19922 8.93095 3.19922 16.0002C3.19922 23.0694 8.92997 28.8002 15.9992 28.8002ZM13.9306 11.6688C13.3058 11.044 12.2927 11.044 11.6678 11.6688C11.043 12.2937 11.043 13.3067 11.6678 13.9316L13.7365 16.0002L11.6678 18.0688C11.043 18.6937 11.043 19.7067 11.6678 20.3316C12.2927 20.9564 13.3058 20.9564 13.9306 20.3316L15.9992 18.2629L18.0678 20.3316C18.6927 20.9564 19.7057 20.9564 20.3306 20.3316C20.9554 19.7067 20.9554 18.6937 20.3306 18.0688L18.262 16.0002L20.3306 13.9316C20.9554 13.3067 20.9554 12.2937 20.3306 11.6688C19.7057 11.044 18.6927 11.044 18.0678 11.6688L15.9992 13.7375L13.9306 11.6688Z"
                  fill="#20211F"
                /></svg
            ></i>
          </div>
          <div class="modal-body">
            <h4 class="pb-2">تغيير الجنسية</h4>
            <form class="row g-3">
              <div class="col-md-12">
                <label for="inputEmail4" class="form-label">أختيار الدولة</label>
                <select v-model="user.nationality" class="w-100 form-select country-selects bg-white">
                  <option v-for="country in countries" :key="country.id" :value="country.id">
                    {{ country.country_name }}
                  </option>
                </select>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" data-bs-dismiss="modal" class="btn btn-light border float-start">إلغاء</button>
            <button type="button" @click.prevent="changeUserInfo()" class="btn btn-primary">
              حفظ
              <span :class="{ 'spinner-border spinner-border-sm': loadingEdit }"></span>
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="modal fade" id="firmModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <i data-bs-dismiss="modal" aria-label="Close" ref="closeFirm"
              ><svg
                style="
                  border-radius: 50%;
                  position: relative;
                  top: 2px;
                  top: -31px;
                  width: 31px;
                  right: -32px;
                  background: rgb(255, 255, 255);
                  padding: 3px;
                "
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M15.9992 28.8002C23.0685 28.8002 28.7992 23.0694 28.7992 16.0002C28.7992 8.93095 23.0685 3.2002 15.9992 3.2002C8.92997 3.2002 3.19922 8.93095 3.19922 16.0002C3.19922 23.0694 8.92997 28.8002 15.9992 28.8002ZM13.9306 11.6688C13.3058 11.044 12.2927 11.044 11.6678 11.6688C11.043 12.2937 11.043 13.3067 11.6678 13.9316L13.7365 16.0002L11.6678 18.0688C11.043 18.6937 11.043 19.7067 11.6678 20.3316C12.2927 20.9564 13.3058 20.9564 13.9306 20.3316L15.9992 18.2629L18.0678 20.3316C18.6927 20.9564 19.7057 20.9564 20.3306 20.3316C20.9554 19.7067 20.9554 18.6937 20.3306 18.0688L18.262 16.0002L20.3306 13.9316C20.9554 13.3067 20.9554 12.2937 20.3306 11.6688C19.7057 11.044 18.6927 11.044 18.0678 11.6688L15.9992 13.7375L13.9306 11.6688Z"
                  fill="#20211F"
                /></svg
            ></i>
          </div>

          <div class="modal-body">
            <h4 class="pb-2">تغيير المؤسسة</h4>
            <form class="row g-3">
              <div class="col-md-12">
                <label for="inputEmail4" class="form-label">اسم المؤسسة</label>
                <!-- <input type="text" class="form-control" v-model="firm" /> -->
                <!-- firm -->
                <!-- <div class="input-group has-validation w-100 m-auto m-md-0 input-reg"> -->
                <input
                  @keyup="getResults()"
                  type="text"
                  v-model="text"
                  class="form-control bg-white"
                  placeholder="أبحث عن مؤسسة"
                />
                <!-- </div> -->
                <div v-if="hide" class="col-12 shadow-sm" style="z-index: 75; position: absolute; width: 93%">
                  <div
                    class="dyn-height rounded-btn-img mt-1"
                    style="background-color: #fff; box-shadow: 0px 0px 10px 3px rgb(0 0 0 / 10%)"
                  >
                    <div class="p-1" v-for="result in resultsCompany" :key="result.id">
                      <div
                        class="row py-1"
                        @click.prevent="
                          text = result.name
                          hide = false
                          user.company_id = result.id
                        "
                      >
                        <div class="col-12">
                          <div class="pt-2 pe-4">
                            <a href="" class="text-gray-90 card-title fs-6">
                              {{ result.name }}
                            </a>
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
            <button type="button" data-bs-dismiss="modal" class="btn btn-light border float-start">إلغاء</button>
            <button type="button" @click.prevent="changeUserInfo()" class="btn btn-primary">
              حفظ
              <span :class="{ 'spinner-border spinner-border-sm': loadingEdit }"></span>
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="modal fade" id="ageModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <i data-bs-dismiss="modal" aria-label="Close" ref="closeAge"
              ><svg
                style="
                  border-radius: 50%;
                  position: relative;
                  top: 2px;
                  top: -31px;
                  width: 31px;
                  right: -32px;
                  background: rgb(255, 255, 255);
                  padding: 3px;
                "
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M15.9992 28.8002C23.0685 28.8002 28.7992 23.0694 28.7992 16.0002C28.7992 8.93095 23.0685 3.2002 15.9992 3.2002C8.92997 3.2002 3.19922 8.93095 3.19922 16.0002C3.19922 23.0694 8.92997 28.8002 15.9992 28.8002ZM13.9306 11.6688C13.3058 11.044 12.2927 11.044 11.6678 11.6688C11.043 12.2937 11.043 13.3067 11.6678 13.9316L13.7365 16.0002L11.6678 18.0688C11.043 18.6937 11.043 19.7067 11.6678 20.3316C12.2927 20.9564 13.3058 20.9564 13.9306 20.3316L15.9992 18.2629L18.0678 20.3316C18.6927 20.9564 19.7057 20.9564 20.3306 20.3316C20.9554 19.7067 20.9554 18.6937 20.3306 18.0688L18.262 16.0002L20.3306 13.9316C20.9554 13.3067 20.9554 12.2937 20.3306 11.6688C19.7057 11.044 18.6927 11.044 18.0678 11.6688L15.9992 13.7375L13.9306 11.6688Z"
                  fill="#20211F"
                /></svg
            ></i>
          </div>
          <div class="modal-body">
            <h4 class="pb-2">تعديل تاريخ الميلاد</h4>
            <form class="row g-3">
              <div class="col-md-12">
                <label for="inputEmail4" class="form-label"> تاريخ الميلاد</label>
                <input type="date" class="form-control" v-model="birth_date" />
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" data-bs-dismiss="modal" class="btn btn-light border float-start">إلغاء</button>
            <button type="button" @click.prevent="changeUserInfo()" class="btn btn-primary">
              حفظ
              <span :class="{ 'spinner-border spinner-border-sm': loadingEdit }"></span>
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="modal fade" id="genderModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <i data-bs-dismiss="modal" aria-label="Close" ref="closeGender"
              ><svg
                style="
                  border-radius: 50%;
                  position: relative;
                  top: 2px;
                  top: -31px;
                  width: 31px;
                  right: -32px;
                  background: rgb(255, 255, 255);
                  padding: 3px;
                "
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M15.9992 28.8002C23.0685 28.8002 28.7992 23.0694 28.7992 16.0002C28.7992 8.93095 23.0685 3.2002 15.9992 3.2002C8.92997 3.2002 3.19922 8.93095 3.19922 16.0002C3.19922 23.0694 8.92997 28.8002 15.9992 28.8002ZM13.9306 11.6688C13.3058 11.044 12.2927 11.044 11.6678 11.6688C11.043 12.2937 11.043 13.3067 11.6678 13.9316L13.7365 16.0002L11.6678 18.0688C11.043 18.6937 11.043 19.7067 11.6678 20.3316C12.2927 20.9564 13.3058 20.9564 13.9306 20.3316L15.9992 18.2629L18.0678 20.3316C18.6927 20.9564 19.7057 20.9564 20.3306 20.3316C20.9554 19.7067 20.9554 18.6937 20.3306 18.0688L18.262 16.0002L20.3306 13.9316C20.9554 13.3067 20.9554 12.2937 20.3306 11.6688C19.7057 11.044 18.6927 11.044 18.0678 11.6688L15.9992 13.7375L13.9306 11.6688Z"
                  fill="#20211F"
                /></svg
            ></i>
          </div>
          <div class="modal-body">
            <h4 class="pb-2">تغيير الجنس</h4>
            <form class="row g-3">
              <div class="col-md-12">
                <label for="inputEmail4" class="form-label">يرجى الاختيار</label>
                <select v-model="gender" class="w-100 form-select country-selects bg-white">
                  <option value="male">ذكر</option>
                  <option value="female">أنثى</option>
                </select>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" data-bs-dismiss="modal" class="btn btn-light border float-start">إلغاء</button>
            <button type="button" @click.prevent="changeUserInfo()" class="btn btn-primary">
              حفظ
              <span :class="{ 'spinner-border spinner-border-sm': loadingEdit }"></span>
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="modal fade" id="occupationModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <i data-bs-dismiss="modal" aria-label="Close" ref="closeOccupation"
              ><svg
                style="
                  border-radius: 50%;
                  position: relative;
                  top: 2px;
                  top: -31px;
                  width: 31px;
                  right: -32px;
                  background: rgb(255, 255, 255);
                  padding: 3px;
                "
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M15.9992 28.8002C23.0685 28.8002 28.7992 23.0694 28.7992 16.0002C28.7992 8.93095 23.0685 3.2002 15.9992 3.2002C8.92997 3.2002 3.19922 8.93095 3.19922 16.0002C3.19922 23.0694 8.92997 28.8002 15.9992 28.8002ZM13.9306 11.6688C13.3058 11.044 12.2927 11.044 11.6678 11.6688C11.043 12.2937 11.043 13.3067 11.6678 13.9316L13.7365 16.0002L11.6678 18.0688C11.043 18.6937 11.043 19.7067 11.6678 20.3316C12.2927 20.9564 13.3058 20.9564 13.9306 20.3316L15.9992 18.2629L18.0678 20.3316C18.6927 20.9564 19.7057 20.9564 20.3306 20.3316C20.9554 19.7067 20.9554 18.6937 20.3306 18.0688L18.262 16.0002L20.3306 13.9316C20.9554 13.3067 20.9554 12.2937 20.3306 11.6688C19.7057 11.044 18.6927 11.044 18.0678 11.6688L15.9992 13.7375L13.9306 11.6688Z"
                  fill="#20211F"
                /></svg
            ></i>
          </div>
          <div class="modal-body">
            <h4 class="pb-2">تغيير المهنة</h4>
            <form class="row g-3">
              <div class="col-md-12">
                <div class="col-md-12">
                  <label for="inputEmail4" class="form-label">المهنة </label>
                  <input type="text" class="form-control" v-model="occupation" />
                </div>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" data-bs-dismiss="modal" class="btn btn-light border float-start">إلغاء</button>
            <button type="button" @click.prevent="changeUserInfo()" class="btn btn-primary">
              حفظ
              <span :class="{ 'spinner-border spinner-border-sm': loadingEdit }"></span>
            </button>
          </div>
        </div>
      </div>
    </div>
    <div>
      <h2 class="py-3"><b class="text-primary"> مرحباَ بك </b>{{ user.firstname }} في من هم</h2>
      <div class="border p-4 mr-5 rounded-btn-img" style="box-shadow: 0px 0px 24px rgba(32, 33, 31, 0.06)">
        <h5 class="py-1 fw-bold">بيانات الحساب</h5>
        <div class="d-inline" v-if="!user.complete">
          <div class="notComple float-start"><span class="notCompleText">معلومات الحساب غير مكتملة</span></div>
        </div>
        <div class="d-inline" v-if="user.complete">
          <div class="comple float-start"><span class="CompleText">معلومات الحساب مكتملة</span></div>
        </div>
        <div class="clearfix"></div>
        <h6 class="py-3">معلومات الحساب الخاص بك يمكنك تحديثها بناء على رغبتك</h6>

        <div class="row fw-bold">
          <div class="col-md-2 d-flex flex-wrap align-items-center">الصورة</div>
          <div class="col-md-7 d-flex flex-wrap align-items-center">الصورة تساعدك على تخصيص وتمييز صورة حسابك</div>
          <div class="col-md-3 text-start">
            <input type="file" @change="upload_avatar" class="d-none" name="avatar" ref="fileInput" />
            <img
              v-if="!user.avatar"
              class="avatar rounded-circle"
              src="/web-asset/img/editimage.png"
              alt="logo ManHOM"
              @click="trigger"
            />
            <img
              class="avatar rounded-circle"
              v-if="user.avatar"
              :src="user.avatar"
              alt="logo ManHOM"
              @click="trigger"
            />
            <div class="d-flex justify-content-end align-items-center mt-2" v-if="loading">
              <span>جاري تحميل الصورة</span>
              <span class="spinner-border spinner-border-sm me-2" style="color: #4169e3"></span>
            </div>
          </div>
        </div>
        <hr class="mx-2 text-center" />
        <div class="row py-2 fw-bold">
          <div class="col-md-2">الاسم</div>
          <div class="col-md-7">{{ user.firstname | userFilter(user.lastname) }}</div>
          <div class="col-md-3 text-start">
            <button class="btn btn-light bg-white fw-bold" data-bs-toggle="modal" data-bs-target="#nameModal">
              <svg
                class="ms-1 mb-1"
                width="13"
                height="12"
                viewBox="0 0 13 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0 9.50069V12.0007H2.5L9.87333 4.62736L7.37333 2.12736L0 9.50069ZM11.8067 2.69402C12.0667 2.43402 12.0667 2.01402 11.8067 1.75402L10.2467 0.194023C9.98667 -0.0659766 9.56667 -0.0659766 9.30667 0.194023L8.08667 1.41402L10.5867 3.91402L11.8067 2.69402Z"
                  fill="#20211F"
                />
              </svg>
              تعديل
              <svg
                class="ms-2 me-3 mb-1"
                width="16"
                height="14"
                viewBox="0 0 16 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10.7711 13.5619L11.3898 12.9542C11.5367 12.8099 11.5367 12.5767 11.3898 12.4324L5.74298 6.87409L11.3898 1.31578C11.5367 1.17153 11.5367 0.938267 11.3898 0.794015L10.7711 0.186314C10.6242 0.0420619 10.3867 0.0420619 10.2398 0.186314L3.6961 6.61321C3.54923 6.75746 3.54923 6.99072 3.6961 7.13497L10.2398 13.5619C10.3867 13.7061 10.6242 13.7061 10.7711 13.5619Z"
                  fill="#7C7E90"
                />
              </svg>
            </button>
          </div>
        </div>
        <hr class="mx-2 text-center" />
        <div class="row py-2 fw-bold">
          <div class="col-md-2">البريد الإلكتروني</div>
          <div class="col-md-7">{{ user.email }}</div>
          <div class="col-md-3 text-start"></div>
        </div>
        <hr class="mx-2 text-center" v-if="!user.provider_name" />
        <div class="row fw-bold" v-if="!user.provider_name">
          <div class="col-md-2">الأمان وكلمة المرور</div>
          <div class="col-md-7">
            ***************
            <div class="text-danger" v-if="!user.password_modified">
              هذه كلمة المرور التلقائية سوف تجدها على بريدك يرجى إدخالها عند تغيير كلمة المرور
            </div>
          </div>

          <div class="col-md-3 text-start">
            <button
              class="btn btn-primary px-4 py-2 fw-bold"
              data-bs-toggle="modal"
              data-bs-target="#passwordModal"
              ref="passwordbtn"
            >
              تغيير كلمة المرور
            </button>
          </div>
        </div>
        <hr class="mx-2 text-center" />
        <div class="row py-2 fw-bold">
          <div class="col-md-2">رقم الهاتف</div>
          <div class="col-md-7 text-end" style="direction: ltr">{{ user.phone_number }}</div>
          <div class="col-md-3 text-start">
            <button class="btn btn-light bg-white fw-bold" data-bs-toggle="modal" data-bs-target="#phoneModal">
              <svg
                class="ms-1 mb-1"
                width="13"
                height="12"
                viewBox="0 0 13 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0 9.50069V12.0007H2.5L9.87333 4.62736L7.37333 2.12736L0 9.50069ZM11.8067 2.69402C12.0667 2.43402 12.0667 2.01402 11.8067 1.75402L10.2467 0.194023C9.98667 -0.0659766 9.56667 -0.0659766 9.30667 0.194023L8.08667 1.41402L10.5867 3.91402L11.8067 2.69402Z"
                  fill="#20211F"
                />
              </svg>
              تعديل
              <svg
                class="ms-2 me-3 mb-1"
                width="16"
                height="14"
                viewBox="0 0 16 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10.7711 13.5619L11.3898 12.9542C11.5367 12.8099 11.5367 12.5767 11.3898 12.4324L5.74298 6.87409L11.3898 1.31578C11.5367 1.17153 11.5367 0.938267 11.3898 0.794015L10.7711 0.186314C10.6242 0.0420619 10.3867 0.0420619 10.2398 0.186314L3.6961 6.61321C3.54923 6.75746 3.54923 6.99072 3.6961 7.13497L10.2398 13.5619C10.3867 13.7061 10.6242 13.7061 10.7711 13.5619Z"
                  fill="#7C7E90"
                />
              </svg>
            </button>
          </div>
        </div>
        <hr class="mx-2 text-center" />
        <div class="row py-2 fw-bold">
          <div class="col-md-2">الجنسية</div>
          <div class="col-md-7">{{ selectedCountries }}</div>
          <div class="col-md-3 text-start">
            <button class="btn btn-light bg-white fw-bold" data-bs-toggle="modal" data-bs-target="#countriesModal">
              <svg
                class="ms-1 mb-1"
                width="13"
                height="12"
                viewBox="0 0 13 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0 9.50069V12.0007H2.5L9.87333 4.62736L7.37333 2.12736L0 9.50069ZM11.8067 2.69402C12.0667 2.43402 12.0667 2.01402 11.8067 1.75402L10.2467 0.194023C9.98667 -0.0659766 9.56667 -0.0659766 9.30667 0.194023L8.08667 1.41402L10.5867 3.91402L11.8067 2.69402Z"
                  fill="#20211F"
                />
              </svg>
              تعديل
              <svg
                class="ms-2 me-3 mb-1"
                width="16"
                height="14"
                viewBox="0 0 16 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10.7711 13.5619L11.3898 12.9542C11.5367 12.8099 11.5367 12.5767 11.3898 12.4324L5.74298 6.87409L11.3898 1.31578C11.5367 1.17153 11.5367 0.938267 11.3898 0.794015L10.7711 0.186314C10.6242 0.0420619 10.3867 0.0420619 10.2398 0.186314L3.6961 6.61321C3.54923 6.75746 3.54923 6.99072 3.6961 7.13497L10.2398 13.5619C10.3867 13.7061 10.6242 13.7061 10.7711 13.5619Z"
                  fill="#7C7E90"
                />
              </svg>
            </button>
          </div>
        </div>
        <hr class="mx-2 text-center" />
        <div class="row py-2 fw-bold">
          <div class="col-md-2">المؤسسة</div>
          <div class="col-md-7">{{ user.firm ? user.firm : 'غير ذلك' }}</div>
          <div class="col-md-3 text-start">
            <button class="btn btn-light bg-white fw-bold" data-bs-toggle="modal" data-bs-target="#firmModal">
              <svg
                class="ms-1 mb-1"
                width="13"
                height="12"
                viewBox="0 0 13 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0 9.50069V12.0007H2.5L9.87333 4.62736L7.37333 2.12736L0 9.50069ZM11.8067 2.69402C12.0667 2.43402 12.0667 2.01402 11.8067 1.75402L10.2467 0.194023C9.98667 -0.0659766 9.56667 -0.0659766 9.30667 0.194023L8.08667 1.41402L10.5867 3.91402L11.8067 2.69402Z"
                  fill="#20211F"
                />
              </svg>
              تعديل
              <svg
                class="ms-2 me-3 mb-1"
                width="16"
                height="14"
                viewBox="0 0 16 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10.7711 13.5619L11.3898 12.9542C11.5367 12.8099 11.5367 12.5767 11.3898 12.4324L5.74298 6.87409L11.3898 1.31578C11.5367 1.17153 11.5367 0.938267 11.3898 0.794015L10.7711 0.186314C10.6242 0.0420619 10.3867 0.0420619 10.2398 0.186314L3.6961 6.61321C3.54923 6.75746 3.54923 6.99072 3.6961 7.13497L10.2398 13.5619C10.3867 13.7061 10.6242 13.7061 10.7711 13.5619Z"
                  fill="#7C7E90"
                />
              </svg>
            </button>
          </div>
        </div>
        <hr class="mx-2 text-center" />
        <div class="row py-2 fw-bold">
          <div class="col-md-2">تاريخ الميلاد</div>
          <div class="col-md-7" v-if="!user.birth_date">لم يتم التحديد</div>
          <div class="col-md-7" v-if="user.birth_date">{{ formatDate(user.birth_date) }}</div>
          <div class="col-md-3 text-start">
            <button class="btn btn-light bg-white fw-bold" data-bs-toggle="modal" data-bs-target="#ageModal">
              <svg
                class="ms-1 mb-1"
                width="13"
                height="12"
                viewBox="0 0 13 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0 9.50069V12.0007H2.5L9.87333 4.62736L7.37333 2.12736L0 9.50069ZM11.8067 2.69402C12.0667 2.43402 12.0667 2.01402 11.8067 1.75402L10.2467 0.194023C9.98667 -0.0659766 9.56667 -0.0659766 9.30667 0.194023L8.08667 1.41402L10.5867 3.91402L11.8067 2.69402Z"
                  fill="#20211F"
                />
              </svg>
              تعديل
              <svg
                class="ms-2 me-3 mb-1"
                width="16"
                height="14"
                viewBox="0 0 16 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10.7711 13.5619L11.3898 12.9542C11.5367 12.8099 11.5367 12.5767 11.3898 12.4324L5.74298 6.87409L11.3898 1.31578C11.5367 1.17153 11.5367 0.938267 11.3898 0.794015L10.7711 0.186314C10.6242 0.0420619 10.3867 0.0420619 10.2398 0.186314L3.6961 6.61321C3.54923 6.75746 3.54923 6.99072 3.6961 7.13497L10.2398 13.5619C10.3867 13.7061 10.6242 13.7061 10.7711 13.5619Z"
                  fill="#7C7E90"
                />
              </svg>
            </button>
          </div>
        </div>
        <hr class="mx-2 text-center" />
        <div class="row py-2 fw-bold">
          <div class="col-md-2">المهنة</div>
          <div class="col-md-7">{{ user.occupation }}</div>
          <div class="col-md-3 text-start">
            <button class="btn btn-light bg-white fw-bold" data-bs-toggle="modal" data-bs-target="#occupationModal">
              <svg
                class="ms-1 mb-1"
                width="13"
                height="12"
                viewBox="0 0 13 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0 9.50069V12.0007H2.5L9.87333 4.62736L7.37333 2.12736L0 9.50069ZM11.8067 2.69402C12.0667 2.43402 12.0667 2.01402 11.8067 1.75402L10.2467 0.194023C9.98667 -0.0659766 9.56667 -0.0659766 9.30667 0.194023L8.08667 1.41402L10.5867 3.91402L11.8067 2.69402Z"
                  fill="#20211F"
                />
              </svg>
              تعديل
              <svg
                class="ms-2 me-3 mb-1"
                width="16"
                height="14"
                viewBox="0 0 16 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10.7711 13.5619L11.3898 12.9542C11.5367 12.8099 11.5367 12.5767 11.3898 12.4324L5.74298 6.87409L11.3898 1.31578C11.5367 1.17153 11.5367 0.938267 11.3898 0.794015L10.7711 0.186314C10.6242 0.0420619 10.3867 0.0420619 10.2398 0.186314L3.6961 6.61321C3.54923 6.75746 3.54923 6.99072 3.6961 7.13497L10.2398 13.5619C10.3867 13.7061 10.6242 13.7061 10.7711 13.5619Z"
                  fill="#7C7E90"
                />
              </svg>
            </button>
          </div>
        </div>
        <hr class="mx-2 text-center" />
        <div class="row py-2 fw-bold">
          <div class="col-md-2">الجنس</div>
          <div class="col-md-7" v-if="!user.gender">لم يتم التحديد</div>
          <div class="col-md-7" v-if="user.gender">{{ user.gender == 'male' ? 'ذكر' : 'أنثى' }}</div>
          <div class="col-md-3 text-start">
            <button class="btn btn-light bg-white fw-bold" data-bs-toggle="modal" data-bs-target="#genderModal">
              <svg
                class="ms-1 mb-1"
                width="13"
                height="12"
                viewBox="0 0 13 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0 9.50069V12.0007H2.5L9.87333 4.62736L7.37333 2.12736L0 9.50069ZM11.8067 2.69402C12.0667 2.43402 12.0667 2.01402 11.8067 1.75402L10.2467 0.194023C9.98667 -0.0659766 9.56667 -0.0659766 9.30667 0.194023L8.08667 1.41402L10.5867 3.91402L11.8067 2.69402Z"
                  fill="#20211F"
                />
              </svg>
              تعديل
              <svg
                class="ms-2 me-3 mb-1"
                width="16"
                height="14"
                viewBox="0 0 16 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10.7711 13.5619L11.3898 12.9542C11.5367 12.8099 11.5367 12.5767 11.3898 12.4324L5.74298 6.87409L11.3898 1.31578C11.5367 1.17153 11.5367 0.938267 11.3898 0.794015L10.7711 0.186314C10.6242 0.0420619 10.3867 0.0420619 10.2398 0.186314L3.6961 6.61321C3.54923 6.75746 3.54923 6.99072 3.6961 7.13497L10.2398 13.5619C10.3867 13.7061 10.6242 13.7061 10.7711 13.5619Z"
                  fill="#7C7E90"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
      <div
        class="border p-4 mt-3 rounded-btn-img"
        style="box-shadow: 0px 0px 24px rgba(32, 33, 31, 0.06)"
        v-if="!user.provider_name"
      >
        <div class="row">
          <div class="col-md-6 fw-bold">
            حذف الحساب
            <br />
            <div class="fw-bold text-muted">سيؤدي حذف الحساب إلى حذف معلوماتك نهائيا</div>
          </div>
          <div class="col-md-6 text-start">
            <button class="btn btn-light text-danger fs-5" data-bs-toggle="modal" data-bs-target="#accountDelModal">
              <i class="mx-1 fa-solid fa-trash"></i>
              حذف
            </button>
          </div>
        </div>
        <div class="payment-simple"></div>
      </div>
    </div>
  </div>
</template>
<script>
import { minLength, sameAs, between, required } from 'vuelidate/lib/validators'
import moment from 'moment'
export default {
  metaInfo: {
    title: 'الملف الشخصي  | من هم؟',
  },
  data() {
    return {
      isValidPhoneNumber: true,
      submitStatus: null,
      submitStatus1: null,
      resetPasswordLoading: false,
      delLoading: false,
      passwordLast: '',
      passwordFieldType: 'password',
      passwordFieldIcon: 'fa-eye',
      firstNameNew: '',
      lastNameNew: '',
      newPasswordConf: '',
      newPassword: '',
      password: '',
      checkPassword: '',
      token: this.$store.state.token,
      user: this.$store.state.user,
      avatar: '',
      countries: '',
      selectedCountries: '',
      first: this.$store.state.user.firstname,
      last: this.$store.state.user.lastname,
      phone: this.$store.state.user.phone_number,
      counteriesEdit: this.$store.state.user.nationality,
      firm: this.$store.state.user.firm,
      age: this.$store.state.user.age,
      birth_date: this.$store.state.user.birth_date,
      gender: '',
      occupation: this.$store.state.user.occupation,
      imagePath: '',
      productSpect: '',
      loading: '',
      loadingEdit: '',
      hide: false,
      text: this.$store.state.user.firm,
      resultsCompany: [],
    }
  },
  validations: {
    checkPassword: {
      minLength: minLength(6),
      valid: function (value) {
        //const containsUppercase = /[A-Z]/.test(value)
        const containsLowercase = /[a-z]/.test(value)
        const containsNumber = /[0-9]/.test(value)
        const containsSpecial = /[#?!@$%^&*-]/.test(value)
        return containsLowercase && containsNumber && containsSpecial
      },
    },
    passwordLast: {
      minLength: minLength(6),
      valid: function (value) {
        //const containsUppercase = /[A-Z]/.test(value)
        const containsLowercase = /[a-z]/.test(value)
        const containsNumber = /[0-9]/.test(value)
        const containsSpecial = /[#?!@$%^&*-]/.test(value)
        return containsLowercase && containsNumber && containsSpecial
      },
    },
    newPassword: {
      minLength: minLength(6),
      valid: function (value) {
        //const containsUppercase = /[A-Z]/.test(value)
        const containsLowercase = /[a-z]/.test(value)
        const containsNumber = /[0-9]/.test(value)
        const containsSpecial = /[#?!@$%^&*-]/.test(value)
        return containsLowercase && containsNumber && containsSpecial
      },
    },
    newPasswordConf: {
      required,
      sameAsPassword: sameAs('newPassword'),
    },
    age: {
      between: between(5, 100),
    },
  },
  filters: {
    userFilter: function (string, value) {
      if (!string) return ''
      if (string == value) {
        return string
      }
      if (!value) {
        return string
      } else {
        return string + ' ' + value
      }
    },
  },
  methods: {
    formatDate(value) {
      if (!value) return ''
      if (value) {
        return moment(String(value)).format('YYYY-MM-DD')
      }
    },
    validatePhoneNumber() {
      const validationRegex = /^\+?\d{7,}$/
      if (this.phone.match(validationRegex) && this.phone != null) {
        this.isValidPhoneNumber = true
      } else {
        this.isValidPhoneNumber = false
      }
    },
    submit() {
      this.$v.passwordLast.$touch()
      this.$v.newPassword.$touch()
      this.$v.newPasswordConf.$touch()

      if (
        this.$v.passwordLast.$invalid ||
        this.$v.newPassword.$invalid ||
        this.$v.newPasswordConf.$invalid ||
        this.newPassword != this.newPasswordConf
      ) {
        this.submitStatus = 'ERROR'
      } else {
        this.submitStatus = 'PENDING'
        this.changePassword()
      }
    },
    trigger() {
      this.$refs.fileInput.click()
    },
    switchVisibility() {
      this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password'
      this.passwordFieldIcon = this.passwordFieldType === 'password' ? 'fa-eye' : 'fa-eye-slash'
    },
    changePassword() {
      this.resetPasswordLoading = true
      this.httpIm
        .put(
          '/password_direct_reset',
          {
            current_password: this.passwordLast,
            password: this.newPassword,
            password_confirm: this.newPasswordConf,
          },
          { headers: { Authorization: `Bearer ${this.token}` } }
        )
        .then(async (response) => {
          this.resetPasswordLoading = false
          this.$refs.passwordbtn.click()
          if (response.data.user) {
            localStorage.setItem('userWeb', JSON.stringify(response.data.user))
            this.$cookies.set('userWeb', response.data.user)
          }
          this.$toast.success('تم تعديل كلمة المرور بنجاح')
        })
        .catch((err) => {
          this.resetPasswordLoading = false
          this.errors = err.response.data
          if ((this.errors.errorCode = 406)) {
            this.$toast.error('كلمة المرور الحالية التي تم إدخالها غير صحيحة')
          }
        })
    },
    removeAccount() {
      this.$v.checkPassword.$touch()
      if (this.$v.checkPassword.$invalid) {
        this.submitStatus1 = 'ERROR'
      } else {
        this.submitStatus1 = ''
        this.delLoading = true
        this.httpIm
          .put(
            '/delete_own_account?',
            { social_token: this.token, password: this.checkPassword },
            { headers: { Authorization: `Bearer ${this.token}` } }
          )
          .then(async (response) => {
            ;(this.delLoading = true), (this.openCloseEditDel = false)
            localStorage.removeItem('isLoggedIn')
            localStorage.removeItem('tokenWeb')
            localStorage.removeItem('userWeb')
            localStorage.removeItem('subscription')
            this.$cookies.remove('token')
            this.$cookies.set('isLoggedIn', false)
            this.$cookies.remove('userWeb')
            this.$cookies.remove('subscription')
            this.$store.state.subscription = ''
            this.$store.state.user = ''
            this.$store.state.user = ''
            this.$store.state.subscription = ''
            window.location = '/'
          })
          .catch((err) => {
            this.openCloseEditDel = false
            ;(this.delLoading = false), this.$toast.error('يرجى التأكد من كلمة المرور')
          })
      }
    },
    changeUserInfo() {
      this.loadingEdit = true
      this.httpIm
        .post(
          '/users/myaccount_edit',
          {
            firstname: this.first,
            lastname: this.last,
            phone_number: this.phone,
            nationality: this.user.nationality,
            firm: this.text,
            age: this.age,
            gender: this.gender,
            birth_date: this.birth_date,
            occupation: this.occupation,
            social_token: this.token,
            company_id: this.user.company_id,
          },
          { headers: { Authorization: `Bearer ${this.token}` } }
        )
        .then(async (response) => {
          localStorage.removeItem('userWeb')
          this.$cookies.remove('userWeb')

          localStorage.setItem('userWeb', JSON.stringify(response.data))
          this.$cookies.set('userWeb', response.data)

          this.$store.state.user = response.data
          this.user.firstname = response.data.firstname
          this.user.lastname = response.data.lastname
          this.user.phone_number = response.data.phone_number
          this.user.nationality = response.data.nationality
          this.user.birth_date = response.data.birth_date
          this.user.age = response.data.age
          this.user.gender = response.data.gender
          this.user.firm = response.data.firm
          this.user.occupation = response.data.occupation
          this.user.complete = response.data.complete
          this.$refs.closebtnPhone.click()
          this.$refs.closebtnpssword.click()
          this.$refs.closeOccupation.click()
          this.$refs.closeGender.click()
          this.$refs.closeFirm.click()
          this.$refs.closeCountry.click()
          this.$refs.closeAge.click()
          this.$refs.closebtnName.click()
          this.$refs.accountDel.click()
          try {
            this.selectedCountries = this.countries.find((o) => o.id === response.data.nationality).country_name
          } catch (error) {}
          this.loadingEdit = false
          this.$toast.success('تم الحفظ بنجاح')
        })
        .catch((err) => {
          this.$toast.error('جدث خطأ داخلي ')
          this.$refs.closebtnPhone.click()
          this.$refs.closebtnpssword.click()
          this.$refs.closeOccupation.click()
          this.$refs.closeGender.click()
          this.$refs.closeFirm.click()
          this.$refs.closeCountry.click()
          this.$refs.closeAge.click()
          this.$refs.closebtnName.click()
          this.$refs.accountDel.click()
          this.loadingEdit = false
        })
    },
    upload_avatar(e) {
      this.loading = true
      let file = e.target.files[0]
      let fileName = e.target.files[0].name
      let formData = new FormData()
      formData.append('avatar', file)
      formData.append('social_token', this.token)
      let reader = new FileReader()

      if (file['size'] < 2111775) {
        this.httpIm
          .post('/users/myaccount_edit', formData, {
            headers: { Accept: 'application/json;multipart/form-data', Authorization: `Bearer ${this.token}` },
          })
          .then(async (response) => {
            localStorage.removeItem('userWeb')
            localStorage.setItem('userWeb', JSON.stringify(response.data))
            this.$cookies.set('userWeb', response.data)

            this.$store.state.user = response.data
            this.user.avatar = response.data.avatar
            this.loading = false
          })
        reader.onloadend = (file) => {
          this.avatar = reader.result
        }
        reader.readAsDataURL(file)
      } else {
        alert('File size can not be bigger than 2 MB')
      }
    },
    getcountry() {
      this.httpMg.get('/countries').then(async (response) => {
        this.countries = response.data.countries
        try {
          this.selectedCountries = response.data.countries.filter((item) => {
            return item.id == this.user.nationality
          })[0].country_name
        } catch (error) {}
      })
    },
    getResults() {
      this.resultsCompany = []
      if (this.text != '') {
        this.http.get('/advance_search_v2?type=company&q=' + this.text).then(async (response) => {
          this.resultsCompany = response.data.result
          this.hide = true
          this.noResult = true
          this.resultsCompany.push({ id: '0', name: 'غير ذالك' })
        })
      }
    },
  },
  created() {
    this.getcountry()
  },
  beforeRouteLeave(to, from, next) {
    bootstrap.Modal.getInstance(document.getElementById('accountDelModal'))?.hide()
    bootstrap.Modal.getInstance(document.getElementById('nameModal'))?.hide()
    bootstrap.Modal.getInstance(document.getElementById('passwordModal'))?.hide()
    bootstrap.Modal.getInstance(document.getElementById('phoneModal'))?.hide()
    bootstrap.Modal.getInstance(document.getElementById('countriesModal'))?.hide()
    bootstrap.Modal.getInstance(document.getElementById('firmModal'))?.hide()
    bootstrap.Modal.getInstance(document.getElementById('ageModal'))?.hide()
    bootstrap.Modal.getInstance(document.getElementById('genderModal'))?.hide()
    bootstrap.Modal.getInstance(document.getElementById('occupationModal'))?.hide()
    next()
  },
}
</script>
<style scoped>
.country-selects {
  padding-right: 0.8rem;
  border: 1px solid #ced4da;
}

.modal-footer {
  justify-content: space-between;
}

.modal-footer button {
  width: 100px;
}

.avatar {
  max-width: 80px;
  cursor: pointer;
  width: 80px;
  height: 80px;
  object-fit: cover;
}

hr {
  border-color: #f2f2f2;
  opacity: 1;
}

.border {
  border-color: #f2f2f2 !important;
}

.modal-body {
  padding-top: 0;
}

.modal-header {
  padding-bottom: 0;
}

.notComple {
  flex-direction: row;
  align-items: flex-start;
  padding: 14px 20px;
  gap: 10px;

  background: #f8d7da;
  border-radius: 50px;
}

.notCompleText {
  font-weight: 500;
  font-size: 14px;
  line-height: 16px;

  color: #b50e0e;
}

.comple {
  flex-direction: row;
  align-items: flex-start;
  padding: 14px 20px;
  gap: 10px;

  background: #4fcd8a;
  border-radius: 50px;
}

.CompleText {
  font-weight: 500;
  font-size: 14px;
  line-height: 16px;

  color: #fff;
}
</style>
