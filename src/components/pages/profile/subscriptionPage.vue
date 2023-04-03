<template>
  <div class="col-lg-8">
    <div style="z-index: 1" :class="{ 'w-75 h-75 bg-white position-fixed': loading }">
      <div
        class="position-absolute top-50 start-50 bg-white"
        :class="{ 'spinner-border text-primary spinner-border-xl': loading }"
      ></div>
    </div>
    <div>
      <h3 class="py-1 fw-bold text-gray-80">مرحباَ بك، {{ user.firstname }}</h3>
      <div class="badge rounded-pill bg-secondary p-2 me-1 mb-3 fixlable">{{ mySubscriptions | fixTitelFilterh }}</div>
    </div>
    <div>
      <div class="border p-4 mr-5 rounded-btn-img" style="box-shadow: 0px 0px 24px rgba(32, 33, 31, 0.06)">
        <div>
          <h5 class="py-1 fw-bold">معلومات الإشتراك</h5>
          <div class="row py-2 fw-bold">
            <div class="col-md-7 pt-2">
              <span v-if="!mySubscription.plan.package"
                >لديك تحكم كامل في الاشتراك الخاص بك ، يمكنك الإشتراك الاّن.
              </span>
              <span v-if="mySubscription.plan.package"> .لديك تحكم كامل في الاشتراك الخاص بك </span>
            </div>

            <div class="col-md-5 text-start">
              <router-link
                :to="{ path: '/subscriptions' }"
                v-if="!mySubscription.plan.package"
                class="btn btn-primary fw-bold"
                style="min-width: 100px"
              >
                رقّي إشتراكك
              </router-link>
            </div>
          </div>

          <hr class="mx-2 text-center" />
          <div class="row py-2 fw-bold">
            <div class="col-md-2">انت الآن مشترك في</div>
            <div class="col-md-7">
              {{ mySubscription.plan | fixTitelFilter }}
              <span
                class="badge rounded-pill mx-3 p-2"
                :class="checkStatus(mySubscription.status, 'Active') ? 'bg-success' : 'bg-warning'"
                >{{ checkStatus(mySubscription.status, 'Active') ? 'فعالة' : 'غير فعالة' }}</span
              >
            </div>
            <div class="col-md-3 text-start">
              <button
                v-if="mySubscription.plan.package && checkStatus(mySubscription.status, 'Active')"
                data-bs-toggle="modal"
                data-bs-target="#subscriptionsp"
                class="btn btn-primary fw-bold dropdown-toggle1 d-none"
                aria-expanded="false"
                :class="mySubscription.update_restricted ? 'disabled' : ''"
              >
                <svg
                  width="20"
                  class="ms-2"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12.5108 4.73277L15.2553 7.47722M13.6752 3.56839C14.4331 2.81054 15.6618 2.81054 16.4196 3.56839C17.1775 4.32625 17.1775 5.55499 16.4196 6.31284L5.73249 17H3.01562V14.228L13.6752 3.56839Z"
                    stroke="white"
                    stroke-width="1.67"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                تعديل
              </button>
            </div>
          </div>
          <hr class="mx-2 text-center" />
          <div class="row py-2 fw-bold">
            <div class="col-md-2">سعر الاشتراك</div>
            <div class="col-md-7">
              {{ mySubscription | fixPriceFilterMain }} <span> {{ mySubscription.plan | fixDurationFilter }}</span>
            </div>
            <div class="col-md-3 text-start"></div>
          </div>
          <hr class="mx-2 text-center" />
          <div class="row py-2 fw-bold">
            <div class="col-md-2">سعر تجديد الاشتراك</div>
            <div class="col-md-7">{{ mySubscription | fixPriceFilterMain }}</div>
            <div class="col-md-3 text-start"></div>
          </div>
          <hr class="mx-2 text-center" v-if="mySubscription.plan.package" />
          <div class="row py-2 fw-bold" v-if="mySubscription.plan.package">
            <div class="col-md-2">طريقة الدفع</div>
            <div class="col-md-7">Stripe</div>
            <div class="col-md-3 text-start">
              <!--
                                      <button      type="button" class="btn btn-primary  dropdown-toggle1 fw-bold"   data-bs-toggle="dropdown" aria-expanded="false">
                              <svg width="20" class="ms-2" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12.5108 4.73277L15.2553 7.47722M13.6752 3.56839C14.4331 2.81054 15.6618 2.81054 16.4196 3.56839C17.1775 4.32625 17.1775 5.55499 16.4196 6.31284L5.73249 17H3.01562V14.228L13.6752 3.56839Z" stroke="white" stroke-width="1.67" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
                                تعديل
                            </button> -->
            </div>
          </div>
          <hr class="mx-2 text-center" />
          <div class="row py-2 fw-bold">
            <div class="col-md-2">تاريخ الاشتراك</div>
            <div class="col-md-7">{{ mySubscription.creation_date | formatDate }}</div>
            <div class="col-md-3 text-start"></div>
          </div>
          <hr class="mx-2 text-center" v-if="mySubscription.expiry_date" />
          <div class="row py-2 fw-bold" v-if="mySubscription.expiry_date">
            <div class="col-md-2">تاريخ تجديد الاشتراك</div>
            <div class="col-md-7">{{ mySubscription.expiry_date | formatDate }}</div>
            <div class="col-md-3 text-start"></div>
          </div>
          <hr class="mx-2 text-center" />
          <div class="row py-2 fw-bold">
            <div class="col-md-2">الاستهلاك الشهري للباقة</div>
            <div class="col-md-7"></div>
            <div class="col-md-3 text-start">
              <button
                data-bs-toggle="modal"
                data-bs-target="#subscriptionUse"
                class="btn btn-primary fw-bold dropdown-toggle1"
                aria-expanded="false"
              >
                <i class="fa-solid fa-eye mx-1 me-1"></i>
                عرض
              </button>
            </div>
          </div>

          <hr
            class="mx-2 text-center"
            v-if="is_paid() && checkStatus(mySubscription.status, 'Active')"
          />
          <div
            class="row py-2 fw-bold"
            v-if="is_paid() && checkStatus(mySubscription.status, 'Active')"
          >
            <div class="col-md-2">إلغاء الإشتراك</div>
            <div class="col-md-7"></div>
            <div class="col-md-3 text-start">
              <button
                data-bs-toggle="modal"
                data-bs-target="#subscriptionDel"
                class="btn btn-danger fw-bold dropdown-toggle1"
                aria-expanded="false"
              >
                <i class="fa-solid fa-trash mx-3 me-1"></i>
                إلغاء
              </button>
            </div>
          </div>
          <hr class="mx-2 text-center" v-if="is_paid()" />
          <div class="row py-2 fw-bold" v-if="is_paid()">
            <div class="col-md-2">تجديد تلقائي</div>
            <div class="col-md-7">
              <div v-if="mySubscription.expiry_date">
                <span v-if="checkStatus(mySubscription.status, 'Active')">
                  سيتم تجديد حسابك تلقائيًا في:
                  {{ mySubscription.expiry_date | formatDate }} إذا كنت ترغب في إلغاء اشتراكك حتى لا يتم تجديده
                </span>
                <span v-if="checkStatus(mySubscription.status, 'Canceled')">
                  لقد قمت بإلغاء إشتراكك، ولن يتم تجديد إشتراكك بعد
                  {{ mySubscription.expiry_date | formatDate }}
                </span>
              </div>
            </div>
            <div class="col-md-3 text-start">
              <div
                class="form-check form-switch form-switch-md"
                style="display: inline-block"
                v-if="checkStatus(mySubscription.status, 'Active')"
              >
                <input
                  class="form-check-input mx-1"
                  type="checkbox"
                  id="flexSwitchCheckDefault"
                  v-on:change="mySubscription.auto_renewal = !mySubscription.auto_renewal ;
                  renewalSubscription(mySubscription.id, !mySubscription.auto_renewal)"
                  :checked="mySubscription.auto_renewal == 1"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <!--
                   <h2 class="py-3">إشتراكاتي</h2>

                  <div
                    v-for="(mySubscription, index) in mySubscriptions"
                    :key="index"
                    class="mx-2"
                  >
                    <div class="border p-4 -2 mr-5  rounded-btn-img" style="box-shadow: 0px 0px 24px rgba(32, 33, 31, 0.06);">
                      <h5 class="py-1 fw-bold">
                        {{ mySubscription.plan | fixTitelFilter }}
                      </h5>
                      <div class="row py-1">
                        <div class="col-md-6">
                          <h6 class="py-3" v-if="mySubscription.expiry_date">
                            إشتراك فعال حتى {{ mySubscription.expiry_date | formatDate }}
                          </h6>
                          <h6 class="py-3" v-if="!mySubscription.expiry_date">
                            إشتراك فعال {{ mySubscription.expiry_date | formatDate }}
                          </h6>
                        </div>
                        <div class="col-md-6 text-start">
                          <div class="text-center float-start">
                            <h2 class="card-title">
                              {{ mySubscription | fixPriceFilterMain }}
                              <span class="fs-5 text-muted">
                              {{mySubscription.plan | fixDurationFilter}}</span
                              >
                            </h2>
                            <div>
                                <span v-if=" mySubscription.status.status != 'Active'"></span>
                              <span
                                class="badge rounded-pill p-2"
                                :class="
                                  checkStatus(mySubscription.status,'Active')
                                    ? 'bg-success'
                                    : 'bg-warning'
                                "
                                >{{ checkStatus(mySubscription.status,'Active') ? 'فعالة':'غير فعالة' }}</span>

                            </div>
                          </div>
                        </div>
                      </div>
                      <hr class="mx-2 text-center" />
                      <div class="row py-2 fw-bold">
                        <div class="col-md-9">
                          <div v-if="mySubscription.expiry_date">
                            <h6 v-if="checkStatus(mySubscription.status,'Active')">
                              سيتم تجديد حسابك تلقائيًا في:
                              {{ mySubscription.expiry_date | formatDate }} إذا كنت ترغب في
                              إلغاء اشتراكك حتى لا يتم تجديده
                            </h6>
                            <h6 v-if="mySubscription.status.status == 'Canceled'">
                              لقد قمت بإلغاء إشتراكك، ولن يتم تجديد إشتراكك بعد
                              {{ mySubscription.expiry_date | formatDate }}
                            </h6>
                            <div
                              class="form-check form-switch"
                              style="display: inline-block"
                              v-if="checkStatus(mySubscription.status,'Active')"
                            >
                              <input
                                class="form-check-input"
                                type="checkbox"
                                id="flexSwitchCheckDefault"
                                v-on:change="
                                  renewalSubscription(
                                    mySubscription.id,
                                    mySubscription.auto_renewal
                                  )
                                "
                                :checked="mySubscription.auto_renewal == 1"
                              />
                              <label class="form-check-label" for="flexSwitchCheckDefault">
                                تجديد تلقائي</label
                              >
                            </div>
                          </div>
                        </div>
                        <div
                          class="col-md-3 text-start"
                          v-if="checkStatus(mySubscription.status,'Active')">
                          <button
                            v-if="mySubscription.plan.package"
                            @click.prevent="OpenFunSp(mySubscription.id)"
                            class="btn btn-light bg-white"
                          >
                            تغيير الإشتراك
                          </button>
                          <div class="btn-group">
                            <button
                              type="button"
                              class="btn btn-light dropdown-toggle1 bg-white"
                              data-bs-toggle="dropdown"
                              aria-expanded="false"
                            >
                              <i class="fa-solid fa-ellipsis float-end m-1"></i>
                            </button>
                            <ul class="dropdown-menu">
                              <li>
                                <button
                                  v-if="mySubscription.plan.package"
                                  @click.prevent="OpenFun(mySubscription.id)"
                                  class="dropdown-item"
                                  href="#"
                                >
                                  إلغاء الإشتراك
                                </button>
                              </li>
                              <li>
                                <button

                                  @click.prevent="detailsSubscription(mySubscription)"
                                  class="dropdown-item"
                                  href="#"
                                >
                                  تفاصيل الإشتراك
                                </button>
                              </li>
                            </ul>
                          </div>
                        </div>
                        <div
                          class="col-md-3 text-start"
                          v-if="mySubscription.status.status == 'Canceled'"
                        >
                          <button

                            @click.prevent="
                              OpenFunSp(mySubscription.plan.subscription_package_id)
                            "
                            class="btn btn-light bg-white"
                          >
                            تجديد الإشتراك
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>-->
    </div>
    <div>
      <!--  <button  @click="submit">Pay now!</button> -->
    </div>

    <div class="modal fade" id="subscriptionDel" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <i @click="page = 1" data-bs-dismiss="modal" aria-label="Close" ref="subscriptionsp"
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

            <h4 class="w-100 text-center pt-2">هل تريد إلغاء الإشتراك</h4>
          </div>
          <div class="modal-body">
            <!--
            <p class="text-muted">نهتم بأسبابك في إلغاء الاشتراك معنا</p>

            <div>
              <div class="form-check">
                <input

                  type="radio"
                  name="exampleRadios"
                  id="exampleRadios1"
                  value="option1"
                  checked
                />
                <label class="me-3" for="exampleRadios1">
                  أحتاج إلى مراجعة المعلومات
                </label>
              </div>
              <div class="form-check">
                <input

                  type="radio"
                  name="exampleRadios"
                  id="exampleRadios2"
                  value="option2"
                />
                <label class="me-3 " for="exampleRadios2">
                  الشخصيه غير مؤثرة
                </label>
              </div>
              <div class="form-check">
                <input

                  type="radio"
                  name="exampleRadios"
                  id="exampleRadios3"
                  value="option3"
                />
                <label class="me-3" for="exampleRadios3">
                  غيرت رأي
                </label>
              </div>
              <div class="form-check">
                <input

                  type="radio"
                  name="exampleRadios"
                  id="exampleRadios4"
                  value="option4"
                />
                <label class="me-3" for="exampleRadios4">
                  تأخر إضافة الشخصية
                </label>
              </div>
              <div class="form-check">
                <input

                  type="radio"
                  name="exampleRadios"
                  id="exampleRadios5"
                  value="option5"
                />
                <label class="me-3" for="exampleRadios5">
                  أخرى
                </label>
              </div>
            </div>
            <h6>لديك أسباب أخرى لتذكرها؟</h6>
            <div class="mb-3">
              <textarea v-model="resian" class="form-control" rows="3"     placeholder="إضافة تعليق"></textarea>
            </div>
            -->
          </div>
          <div class="modal-footer">
            <button
              @click="page = 1"
              class="btn btn-primary fw-bold mx-2 px-3 rounded-btn"
              data-bs-dismiss="modal"
              aria-label="Close"
            >
              إلغاء
            </button>
            <button
              class="btn btn-light fw-bold mx-2 px-3 text-primary rounded-btn"
              @click.prevent="cancelSubscription(mySubscriptions.id)"
            >
              إلغاء الإشتراك
              <span :class="{ 'spinner-border spinner-border-sm': loadinUpgrad }"></span>
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="modal fade" id="subscriptionUse" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <i @click="page = 1" data-bs-dismiss="modal" aria-label="Close" ref="subscriptionsp"
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
            <h5 class="text-center">الاستهلاك الشهري للباقة</h5>
            <div class="row">
              <div class="col-md-12">
                <div class="text-center">
                  <div class="card-body">
                    <h2 class="card-title">
                      {{ mySubscriptions.plan | fixTitelFilter }}
                    </h2>

                    <div class="text-end">
                      <h5 class="card-title">تفاصيل الاستخدام</h5>
                    </div>
                    <div class="row">
                      <div class="col-12">
                        <table class="table table-sm">
                          <thead>
                            <tr>
                              <th scope="col">الميزة</th>
                              <th scope="col">العدد الأعظمي</th>
                              <th scope="col">الاستخدام الحالي</th>
                            </tr>
                          </thead>
                          <tbody v-if="mySubscriptions.limit_usage && mySubscriptions.limit_usage[0]">
                            <tr>
                              <th scope="row">متابعة شخصية</th>
                              <td>{{ mySubscriptions.plan.max_characters_follow }}</td>
                              <td>{{ mySubscriptions.limit_usage[0].max_characters_follow }}</td>
                            </tr>
                            <tr>
                              <th scope="row">أخبار الشخصية</th>
                              <td>{{ mySubscriptions.plan.max_characters_news }}</td>
                              <td>{{ mySubscriptions.limit_usage[0].max_characters_news }}</td>
                            </tr>
                            <tr>
                              <th scope="row">مقالة الشخصيات</th>
                              <td>{{ mySubscriptions.plan.max_characters_related_articles }}</td>
                              <td>{{ mySubscriptions.limit_usage[0].max_characters_related_articles }}</td>
                            </tr>
                            <tr>
                              <th scope="row">متابعة مؤسسة</th>
                              <td>{{ mySubscriptions.plan.max_company_follow }}</td>
                              <td>{{ mySubscriptions.limit_usage[0].max_company_follow }}</td>
                            </tr>

                            <!--
                            
                             <tr>
                            <th scope="row">مقالات المؤسسة</th>
                            <td>  {{mySubscriptions.plan.max_company_news}}</td>
                            <td> {{mySubscriptions.limit_usage[0].max_company_news}}</td>
                          </tr>
                          <tr>
                            <th scope="row">مقالة المؤسسات</th>
                            <td>  {{mySubscriptions.plan.max_company_related_articles}}</td>
                            <td> {{mySubscriptions.limit_usage[0].max_company_related_articles}}</td>
                          </tr>
                          <tr>
                            <th scope="row">مقارنة الملف الشخصي مع أخر</th>
                            <td>  {{mySubscriptions.plan.max_profile_compare}}</td>
                            <td> {{mySubscriptions.limit_usage[0].max_profile_compare}}</td>
                          </tr>
                          <tr>
                            <th scope="row">السيرة الذاتية فيديو</th>
                            <td>  {{mySubscriptions.plan.max_resume_video}}</td>
                            <td> {{mySubscriptions.limit_usage[0].max_resume_video}}</td>
                           </tr>    
                            -->
                          </tbody>
                        </table>
                        <hr class="mx-2 text-center" />
                        <div class="row py-2 fw-bold">
                          <div class="col-md-12">
                            سيتم تجديد جميع حدود الباقة في تاريخ
                            <span>{{ fixDateUseg(mySubscriptions.limit_usage) | formatDate }}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="row d-flex justify-content-center mt-5">
              <button
                class="btn btn-primary fw-bold col-5 mx-2 px-3 rounded-btn"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                إغلاق
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div
      class="modal fade"
      id="subscriptionsp"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
      v-if="mySubscription.plan.package"
    >
      <div class="modal-dialog" :class="page == 1 ? ' modal-xl' : 'modal-lg'">
        <div class="modal-content">
          <div class="modal-header">
            <i
              @click="
                page = 1
                loadingsp = -1
              "
              data-bs-dismiss="modal"
              aria-label="Close"
              ref="subscriptionsp"
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
          <div class="modal-body pt-0">
            <h3 class="text-center text-gray-80 pb-3">تعديل الإشتراك</h3>
            <h6 class="text-gray-60 fw-bold text-center" v-if="page == 2">نحن دائماً وابدأ معك؟</h6>
            <div class="row" v-if="page == 1">
              <div class="col-md-6 fixGold-l p-4" v-for="(subscription, index) in subscriptionspag" :key="index">
                <div
                  class="card text-center rounded-btn-img"
                  style="box-shadow: 0px 0px 24px rgba(32, 33, 31, 0.06)"
                  v-if="
                    subscription.id != mySubscriptionId &&
                    subscription.duration_unit == mySubscriptions.plan.package.duration_unit
                  "
                >
                  <div class="card-body">
                    <h1 class="card-title fw-bold py-2">{{ subscription.name }}</h1>
                    <p class="card-text text-gray-60">{{ subscription.slug }}</p>
                    <h1 class="caprd-title">
                      {{ subscription | fixFilter(currency_text) }}

                      <span v-if="subscription.price" class="fs-5 text-muted">{{
                        subscription | fixDurationPackegFilter
                      }}</span>
                    </h1>
                    <button
                      @click.prevent="getSubscriptionInfo(subscription.id)"
                      class="btn p-2 w-100 my-3 fw-bold fs-6 border-none bg-gray"
                    >
                      اشترك الأن
                      <span :class="{ 'spinner-border spinner-border-sm': loadingsp == subscription.id }"></span>
                    </button>
                    <div class="text-center">
                      <div
                        class="card-text fs-6 py-1 text-gray-80 fw-bold"
                        v-for="feature in subscription.features"
                        :key="feature.id"
                      >
                        <i
                          class="fa-solid m-1 text-primary fs-4"
                          :class="feature.type == 'primary' ? 'fa-check' : 'fa-close text-muted'"
                        ></i>
                        <span class="mx-1">
                          {{ feature.name }}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="container text-center" v-if="page == 2">
              <div class="row py-2 fw-bold">
                <div class="col-md-6">انت الآن مشترك في</div>
                <div class="col-md-6">{{ infoSubscription.current_package }}</div>
              </div>
              <hr class="mx-2 text-center" />
              <div class="row py-2 fw-bold">
                <div class="col-md-6">سعر الاشتراك</div>
                <div class="col-md-6">{{ infoSubscription | fixPriceFilterUpdate }}</div>
              </div>
              <hr class="mx-2 text-center" />
              <div class="row py-2 fw-bold">
                <div class="col-md-6">طريقة الدفع</div>
                <div class="col-md-6">Stripe</div>
              </div>
              <hr class="mx-2 text-center" />
              <div class="row py-2 fw-bold">
                <div class="col-md-6">تعديل الاشتراك إلى</div>
                <div class="col-md-6">{{ infoSubscription.new_package }}</div>
              </div>
              <hr class="mx-2 text-center" />
              <div class="row py-2 fw-bold">
                <div class="col-md-6">سعر الاشتراك</div>
                <div class="col-md-6">{{ infoSubscription | fixPriceFilterUpdate }}</div>
              </div>
              <hr class="mx-2 text-center" />
              <div class="row py-2 fw-bold">
                <div class="col-md-6">عدد الأيام الذي تحصل عليها عند تعديل الباقة</div>
                <div class="col-md-6">{{ infoSubscription.compense_days }}</div>
              </div>
              <div class="row d-flex justify-content-center mt-5">
                <button
                  v-if="infoSubscription.upgrade_proration != 0"
                  class="btn btn-light fw-bold mx-2 col-5 px-3 text-primary rounded-btn"
                  @click.prevent="updatesubscription(infoSubscription.upgrade_proration)"
                >
                  دفع ({{ infoSubscription.upgrade_proration + ' ' + infoSubscription.current_currency }})
                  <span :class="{ 'spinner-border spinner-border-sm': loadinUpgrad }"></span>
                </button>
                <button
                  v-if="infoSubscription.upgrade_proration == 0"
                  class="btn btn-light fw-bold mx-2 col-5 px-3 text-primary rounded-btn"
                  @click.prevent="updatesubscription(infoSubscription.upgrade_proration)"
                >
                  متابعة
                  <span :class="{ 'spinner-border spinner-border-sm': loadinUpgrad }"></span>
                </button>
                <button
                  @click="
                    page = 1
                    loadingsp = -1
                  "
                  class="btn btn-primary fw-bold col-5 mx-2 px-3 rounded-btn"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                >
                  تراجع
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import moment from 'moment'
import { Carousel, Slide } from 'vue-carousel'
export default {
  metaInfo: {
    title: 'إشتراكاتي | من هم؟',
  },
  components: {
    Carousel,
    Slide,
  },
  data() {
    return {
      lineItems: [
        {
          price: 'some-price-id', // The id of the one-time price you created in your Stripe dashboard
          quantity: 1,
        },
      ],
      page: 1,
      infoSubscription: {},
      successURL: 'your-success-url',
      cancelURL: 'your-cancel-url',
      publishableKey:
        'pk_test_51KzeWfHb352d9Vh0iHBtQb1W5aPIPYU4mHe7hYQbe13u92lc5puZW0PGgclV14iWB0mqd7m2arLy2nlBDdiL4Axh00XekooeQi',
      loadingPay: true,
      loading: true,
      loadingsp: '',
      loadinUpgrad: false,
      resian: '',
      newupdatesubscriptionId: '',
      OpendetailsSubscription: false,
      mySubscriptions: {},
      selectedSubscriptions: {},
      OpenClose: false,
      OpenCloseSp: false,
      v: '',
      mySubscriptionId: '',
      mySubscriptionDuration: '',
      user: this.$store.state.user,
      subscriptionspag: {},
      detailsSubscriptionObject: {},
      token: this.$store.state.token,
      mySubscription: this.$store.state.subscription ? this.$store.state.subscription : '',
      userSubscription: this.$store.state.subscription ? this.$store.state.subscription.plan.id : '',
    }
  },
  methods: {
   is_paid(){
    try{
      if(this.mySubscription.plan.package.is_paid){
        return true
      }
      else{
        return false
      }
    }catch(e){
      return false
    }
   },
    fixDateUseg(v) {
      try {
        return v[0].billing_cycle_end
      } catch (error) {}
    },
    checkStatus(subscription, status) {
      try {
        if (subscription.status == status) return true
      } catch (error) {
        return false
      }
      return false
    },
    getsubscription() {
      this.httpSp.get('/web/subscriptions_by_user/' + this.$store.state.user.id).then(async (response) => {
        this.mySubscriptions = response.data[0]
        this.mySubscription = this.mySubscriptions
        this.loading = false
      })
    },

    cancelSubscription(v) {
      this.httpSp
        .put(
          '/cancel/subscription/' + v,
          { cancel_reason: this.resian },
          {
            headers: { Authorization: `Bearer ${this.$store.state.token}` },
          }
        )
        .then(async (response) => {
          this.OpenClose = false
          this.$router.go()
          try {
            if (response.data.subscription) {
              localStorage.removeItem('subscription')
              localStorage.setItem('subscription', JSON.stringify(response.data.subscription))
              console.log(response.data.subscription)
              this.$store.state.subscription = response.data.subscription
              this.$router.go()
            }
          } catch {
            console.log('erorr')
            this.loadinUpgrad = false
          }
          this.loadingsp = ''
        })
    },
    getsubscriptionpag() {
      this.httpSp.get('/subscription_package').then(async (response) => {
        this.currency_text = response.data.currency_text

        //   this.subscriptionspag =  this._.orderBy(response.data.subscription_packages.filter((item) => {return (item.plans.id != this.userSubscription)}) , 'weight')
        this.subscriptionspag = this._.orderBy(
          response.data.subscription_packages.filter((item) => {
            return item.plans.id != this.userSubscription && item.price != 0
          }),
          'weight'
        )
      })
    },
    getSubscriptionInfo(id) {
      this.loadingsp = id
      this.newupdatesubscriptionId = id
      this.httpSp
        .post(
          '/update_pre_info',
          {
            subscription_package_id: id,
          },
          { headers: { Authorization: `Bearer ${this.token}` } }
        )
        .then(async (response) => {
          this.page = 2
          this.infoSubscription = response.data
        })
    },
    updatesubscription(v) {
      this.loadinUpgrad = true
      this.httpSp
        .post(
          '/upgrade_subscription',
          {
            subscription_package_id: this.newupdatesubscriptionId,
          },
          { headers: { Authorization: `Bearer ${this.token}` } }
        )
        .then(async (response) => {
          if (v != 0) {
            window.open(response.data.subscription.last_invoice_link, '_blank')
          }
          // window.location.href = response.data.subscription.last_invoice_link;
          //window.location.href = response.data.subscription.last_invoice_link;
          try {
            if (response.data.subscription) {
              localStorage.removeItem('subscription')
              localStorage.setItem('subscription', JSON.stringify(response.data.subscription))
              console.log(response.data.subscription)
              this.$store.state.subscription = response.data.subscription
              this.$router.go()
            }
          } catch {
            this.loadinUpgrad = false
            console.log('erorr')
          }

          this.loadingsp = ''
          this.CloseFun()
        })
    },
    renewalSubscription(id, renewal) {
      this.httpSp
        .put(
          '/auto_charge/subscription',
          {
            subscription_id: id,
            auto_renewal: renewal == 0 ? true : false,
          },
          { headers: { Authorization: `Bearer ${this.token}` } }
        )
        .then(async (response) => {
          this.$toast.success('تم الحفظ بنجاح')
        })
    },
  },

  filters: {
    fixTitelFilterh: function (string) {
      if (!string) return ''
      if (string) {
        try {
          return string.plan.package.name
        } catch (error) {
          return ''
        }
      }
      return ''
    },
    fixTitelFilter: function (string) {
      if (!string) return ''
      if (string) {
        try {
          return string.package.name
        } catch (error) {
          return string.title
        }
      }
      return string
    },
    fixPriceFilter: function (string) {
      try {
        string = string[0].plan.package.price
        var currency_text = string[0].currency_text
        if (string.plan.package.is_paid == 0) {
          return 'مجانا'
        } else return parseFloat(string).toFixed(0) + currency_text
      } catch (error) {
        return 'مجانا'
      }
    },
    fixPriceFilterMain: function (string) {
      try {
        if (string.plan.package.is_paid == 0) {
          return 'مجانا'
        } else return parseFloat(string.plan.package.price).toFixed(0) + ' ' + string.currency_text
      } catch (error) {
        return 'مجانا'
      }
    },
    fixPriceFilterUpdate: function (string) {
      try {
        if (string.plan.package.is_paid == 0) {
          return 'مجانا'
        } else return parseFloat(string.new_price).toFixed(0) + ' ' + string.current_currency
      } catch (error) {
        return 'مجانا'
      }
    },
    fixFilter: function (string, v) {
      if (!string) return 'مجانا'
      try {
        string = parseFloat(string.price).toFixed(0)
        if (string == 0) {
          return 'مجانا'
        } else return string + v
      } catch (error) {
        return 'مجانا'
      }
    },
    formatDate: function (value) {
      if (!value) return ''
      if (value) {
        return moment(String(value)).format('YYYY-MM-DD')
      }
    },
    fixDurationFilter: function (string) {
      if (!string) return ''

      try {
        if (string.package.duration_unit == 'month') {
          return ' / الشهر '
        }
        if (string.package.duration_unit == 'week') {
          return ' / أسبوع '
        }
        if (string.package.duration_unit == 'day') {
          return ' / اليوم '
        }
        if (string.package.duration_unit == 'year') {
          return ' / السنة '
        }
      } catch (error) {
        return ' / غير محدودة '
      }
    },
    fixDurationPackegFilter: function (string) {
      if (!string) return ''

      try {
        if (string.duration_unit == 'month') {
          return ' / الشهر '
        }
        if (string.duration_unit == 'week') {
          return ' / أسبوع '
        }
        if (string.duration_unit == 'day') {
          return ' / اليوم '
        }
        if (string.duration_unit == 'year') {
          return ' / السنة '
        }
      } catch (error) {
        return ' / غير محدودة '
      }
    },
  },
  created() {
    this.getsubscription()
    this.getsubscriptionpag()
  },
  beforeRouteLeave(to, from, next) {
    //bootstrap.Modal.getInstance(document.getElementById('subscriptionsp'))?.hide()
    //bootstrap.Modal.getInstance(document.getElementById('subscriptionUse'))?.hide()
    //bootstrap.Modal.getInstance(document.getElementById('subscriptionDel'))?.hide()
    next()
    // called when the route that renders this component is about to be navigated away from.
    // As with `beforeRouteUpdate`, it has access to `this` component instance.
  },
}
</script>
<style scoped>
thead,
tbody,
tfoot,
tr,
td,
th {
  border-color: #f2f2f2 !important;
  line-height: 3.5rem;
}
table tr:last-child,
table tr:last-child td,
table tr:last-child th {
  border: none;
}
.fixGold:nth-child(2) {
  transform: scale(1.1);
}
.fixGold-l:nth-child(1) {
  transform: scale(1.05);
}
hr {
  background: #f2f2f2;
  opacity: 1;
}
@media (max-width: 991px) {
  .responsive > thead th {
    display: none;
  }
  .responsive > tbody td,
  .responsive > tbody th {
    display: block;
  }
  .responsive > tbody > tr:nth-child(even) td,
  .responsive > tbody > tr:nth-child(even) th {
    background-color: #eee;
  }
  [row-header] {
    position: relative;
    width: 50%;
    vertical-align: middle;
  }
  [row-header]:before {
    content: attr(row-header);
    display: inline-block;
    vertical-align: middle;
    text-align: left;
    width: 50%;
    padding-right: 30px;
  }
}
.modal-footer {
  justify-content: space-between;
  border-top: none;
}
.modal-footer button {
  width: 120px;
}
</style>
