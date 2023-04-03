<template>
  <div class="container-fluid bg-adv">
    <div>
      <div style="background-color: rgb(255 255 255 / 80%)">
        <section class="Discover my-5 row bg-serach j-margin-top-negative-descover">
          <div class="Discover m-auto col-md-10 py-3" v-click-outside="hides">
            <div>
              <div class="row height d-flex justify-content-center align-items-center text-center-m">
                <div class="position-relative">
                  <div class="rounded-btn-img search">
                    <img src="/web-asset/img/searchicons.png" alt="search icon" />
                    <div
                      style="position: absolute; left: 120px; top: 20px; cursor: pointer"
                      @click="
                        text = ''
                        showhistory = false
                      "
                      v-if="text"
                    >
                      <closeSearch />
                    </div>
                    <input
                      @input="debounce(() => {q=$event.target.value} , 500);"
                      @focus="showhistory = true"
                      v-model="text"
                      type="text"
                      class="form-control bg-white rounded-btn search-cat"
                      placeholder="ابحث عن شخصية أو مؤسسة"
                    />
                    <a
                      class="btn text-decoration-none"
                      :class="text ? 'btn-primary fix-primary' : 'btn-light'"
                      @click="getResults()"
                      >ابحث</a
                    >
                  </div>
                  <div>
                    <resultsSearch @add="getValue" :showhistory="showhistory" :text="q" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <div class="text-center m-auto">
        <h2 class="text-center text-gray-9000 fw-bold py-1">البحث المتقدم</h2>
        <breadcrumb :data="breadcrumbLsit" :center="true" />
      </div>
    </div>
    <div class="container">
      <div class="row">
        <div class="col-md-3">
          <div class="card border shados">
            <div class="accordion accordion-flush" id="accordionSearchAll">
              <div class="accordion-item bg-white">
                <h2 class="accordion-header bg-white" id="allaccordion" style="border-radius: 8px">
                  <button
                    style="min-height: 70px"
                    class="accordion-button bg-white text-gray-900 pb-0 fw-bold fs-3 px-3 pt-1 fw-bold"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#all"
                    aria-expanded="true"
                    aria-controls="all"
                  >
                    فلترة
                  </button>
                </h2>
                <div
                  id="all"
                  class="accordion-collapse collapse show"
                  aria-labelledby="all"
                  data-bs-parent="#accordionSearchAll"
                >
                  <div class="accordion-body px-0">
                    <div class="accordion accordion-flush" id="accordionSearch">
                      <section v-if="selectSearch == 1 || selectSearch == 2">
                        <!-- النوع مفعل -->
                        <div
                          class="accordion-item bg-white"
                          v-if="
                            allow_filter.includes('الجنس') && selectSearch == 1 && !not_active_filters.includes('الجنس')
                          "
                        >
                          <h2 class="accordion-header bg-white" id="headingOne">
                            <button
                              class="accordion-button bg-white text-gray-900 pb-0 fw-bold fs-5"
                              type="button"
                              data-bs-toggle="collapse"
                              data-bs-target="#gender"
                              aria-expanded="true"
                              aria-controls="gender"
                            >
                              النوع
                            </button>
                          </h2>
                          <div
                            id="gender"
                            class="accordion-collapse collapse show"
                            aria-labelledby="headingOne"
                            data-bs-parent="#accordionExample"
                          >
                            <div class="accordion-body">
                              <div class="form-check">
                                <input
                                  class="form-check-input"
                                  value="1"
                                  type="radio"
                                  name="gender"
                                  id="male"
                                  v-model="gender"
                                  @change="
                                    gender = 1
                                    getResults()
                                  "
                                  selected
                                />
                                <label class="form-check-label fs-16 fw-bold text-gray-60" for="male">
                                  ذكر
                                  <span> ({{ resultsMostSearcMale_total }}) </span>
                                </label>
                              </div>
                              <div class="form-check">
                                <input
                                  class="form-check-input"
                                  value="2"
                                  type="radio"
                                  name="gender"
                                  v-model="gender"
                                  id="famele"
                                  @change="
                                    gender = 2
                                    getResults()
                                  "
                                />
                                <label class="form-check-label fs-15 fw-bold text-gray-60" for="famele">
                                  أنثى
                                  <span> ({{ resultsMostSearchFemale_total }}) </span>
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>
                        <!-- النوع غير مفعل -->
                        <div
                          class="accordion-item bg-white"
                          v-if="
                            !allow_filter.includes('الجنس') &&
                            selectSearch == 1 &&
                            !not_active_filters.includes('الجنس')
                          "
                        >
                          <h2 class="accordion-header bg-white" id="headingOne">
                            <button
                              class="accordion-button bg-white pb-0 text-disabled d-flex align-items-center"
                              type="button"
                              data-bs-toggle="collapse"
                              data-bs-target="#gender"
                              aria-expanded="true"
                              aria-controls="gender"
                            >
                              النوع
                              <span class="me-1 margin-top-neg">
                                <lockSvg />
                              </span>
                            </button>
                          </h2>
                          <div
                            id="gender"
                            class="accordion-collapse collapse"
                            aria-labelledby="headingOne"
                            data-bs-parent="#accordionExample"
                            @click="openModal()"
                          >
                            <div class="accordion-body">
                              <div class="form-check">
                                <input
                                  class="form-check-input"
                                  value="1"
                                  type="radio"
                                  name="gender"
                                  id="male"
                                  disabled
                                />
                                <label class="form-check-label text-disabled-content show disabled" for="male">
                                  ذكر
                                  <span> ({{ total_for_male }}) </span>
                                </label>
                              </div>
                              <div class="form-check">
                                <input
                                  class="form-check-input"
                                  value="2"
                                  type="radio"
                                  name="gender"
                                  id="famele"
                                  v-model="gender"
                                  disabled
                                />
                                <label class="form-check-label text-disabled-content show" for="famel">
                                  أنثى
                                  <span> ({{ total_for_female }}) </span>
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>
                        <!-- الفئة العمرية -->
                        <div
                          v-if="
                            allow_filter.includes('العمر') && selectSearch == 1 && !not_active_filters.includes('العمر')
                          "
                        >
                          <div class="m-3 pe-1 fs-16">
                            <p class="text-gray-900 fw-bold pb-0 fs-16">الفئات العمرية</p>
                            <select
                              @change="setAge()"
                              v-model="age"
                              class="form-select w-100 country-selects"
                              aria-label="Default select example"
                            >
                              <option value="">اختيار الفئة العمرية</option>
                              <option value="1">من 1 سنة إلي 20 سنة</option>
                              <option value="2">من 20 سنة إلي 40 سنة</option>
                              <option value="3">من 40 سنة إلي 60 سنة</option>
                              <option value="4">من 60 سنة إلي 80 سنة</option>
                            </select>
                          </div>
                        </div>
                        <!--  الفئة العمرية غير مفعل-->
                        <div
                          @click="openModal()"
                          v-if="
                            !allow_filter.includes('العمر') &&
                            selectSearch == 1 &&
                            !not_active_filters.includes('العمر')
                          "
                        >
                          <div class="m-3 pe-1 fs-16">
                            <p class="pb-0 fs-16 d-flex align-items-center text-disabled">
                              الفئات العمرية
                              <span class="me-1 margin-top-neg">
                                <lockSvg />
                              </span>
                            </p>
                            <select
                              class="form-select country-selects text-disabled-content w-100"
                              aria-label="Default select example"
                              disabled
                            >
                              <option value="">اختيار الفئة العمرية</option>
                              <option value="1">من 1 سنة إلي 20 سنة</option>
                              <option value="2">من 20 سنة إلي 40 سنة</option>
                              <option value="3">من 40 سنة إلي 60 سنة</option>
                              <option value="4">من 60 سنة إلي 80 سنة</option>
                            </select>
                          </div>
                        </div>
                        <!-- على قيد الحياة  -->
                        <div
                          v-if="
                            allow_filter.includes('على قيد الحياة') &&
                            selectSearch == 1 &&
                            !not_active_filters.includes('على قيد الحياة')
                          "
                        >
                          <div class="form-check form-switch m-3 pe-1 fs-16">
                            <input
                              @change="
                                is_alive == '' ? (is_alive = 'yes') : (is_alive = '')
                                getResults()
                              "
                              :checked="is_alive == 'yes'"
                              class="form-check-input form-check-input-green shadow-none"
                              type="checkbox"
                              id="is_alive"
                            />
                            <label class="form-check-label text-gray-900 fw-bold fs-16" for="is_alive"
                              >على قيد الحياة</label
                            >
                          </div>
                        </div>
                        <!--  على قيد الحياة غير مفعل -->
                        <div
                          @click="openModal()"
                          v-if="
                            !allow_filter.includes('على قيد الحياة') &&
                            selectSearch == 1 &&
                            !not_active_filters.includes('على قيد الحياة')
                          "
                        >
                          <div class="form-check form-switch m-3 pe-1 fs-16">
                            <input
                              :checked="is_alive == 'yes'"
                              class="mark-for-override form-check-input form-check-input-green shadow-none"
                              type="checkbox"
                              disabled
                            />
                            <label class="mark-for-override form-check-label" for="flexSwitchCheckChecked"
                              >على قيد الحياة
                              <span class="me-1 margin-top-neg">
                                <lockSvg />
                              </span>
                            </label>
                          </div>
                        </div>
                        <!--  البلد شخصيات مفعل و غير مفعل-->
                        <div
                          v-if="
                            selectSearch == 1 &&
                            (!not_active_filters.includes('الجنسية') || !not_active_filters.includes('بلد الإقامة'))
                          "
                        >
                          <hr class="my-4" style="border-color: #8488ad" />
                          <div class="m-3 pe-1 fs-16">
                            <p
                              class="text-gray-900 fw-bold pb-0 fs-16"
                              v-if="allow_filter.includes('الجنسية') || allow_filter.includes('بلد الإقامة')"
                            >
                              البلد
                            </p>
                            <p
                              class="text-disabled pb-0 fs-16"
                              @click="openModal()"
                              v-if="!allow_filter.includes('الجنسية') && !allow_filter.includes('بلد الإقامة')"
                            >
                              البلد
                              <span class="me-1 margin-top-neg">
                                <lockSvg />
                              </span>
                            </p>
                            <model-list-select
                              :list="countries"
                              v-model="country"
                              v-if="allow_filter.includes('بلد الإقامة') && !not_active_filters.includes('بلد الإقامة')"
                              option-value="id"
                              option-text="country_name"
                              placeholder="بلد الإقامة"
                              class="form-select w-100 form-control mb-2 country-selects"
                            >
                            </model-list-select>
                            <div @click="openModal()" class="position-relative">
                              <model-list-select
                                :list="countries"
                                option-value="id"
                                option-text="country_name"
                                placeholder="بلد الإقامة"
                                class="form-select w-100 form-control mb-2 country-selects"
                                :isDisabled="true"
                                v-if="
                                  !allow_filter.includes('بلد الإقامة') && !not_active_filters.includes('بلد الإقامة')
                                "
                              >
                              </model-list-select>
                              <div
                                class="position-absolute translate-middle j-lock-position"
                                v-if="
                                  !allow_filter.includes('بلد الإقامة') && !not_active_filters.includes('بلد الإقامة')
                                "
                              >
                                <img src="/web-asset/img/lock.png" alt="lock" width="26px" />
                              </div>
                            </div>

                            <model-list-select
                              @select="alert(0)"
                              :list="countries"
                              v-model="nationality"
                              option-value="id"
                              v-if="allow_filter.includes('الجنسية') && !not_active_filters.includes('الجنسية')"
                              option-text="country_name"
                              placeholder="الجنسية"
                              class="form-select w-100 form-control mb-2 country-selects"
                            >
                            </model-list-select>
                            <div @click="openModal()" class="position-relative">
                              <model-list-select
                                :list="countries"
                                option-value="id"
                                option-text="country_name"
                                placeholder="الجنسية"
                                class="form-select w-100 form-control mb-2 country-selects"
                                :isDisabled="true"
                                v-if="!allow_filter.includes('الجنسية') && !not_active_filters.includes('الجنسية')"
                              >
                              </model-list-select>
                              <div
                                class="position-absolute translate-middle j-lock-position"
                                v-if="!allow_filter.includes('الجنسية') && !not_active_filters.includes('الجنسية')"
                              >
                                <img src="/web-asset/img/lock.png" alt="lock" width="26px" />
                              </div>
                            </div>
                          </div>
                          <hr class="mt-4 mb-0" style="border-color: #8488ad" />
                        </div>
                        <!-- البلد شركات-->
                        <div
                          v-if="
                            allow_filter.includes('الدولة') &&
                            selectSearch == 2 &&
                            !not_active_filters.includes('الدولة')
                          "
                        >
                          <hr class="j-hr-company" style="border-color: #8488ad" />
                          <div class="m-3 pe-1 fs-16">
                            <p class="text-gray-900 fw-bold pb-0 fs-16">البلد</p>
                            <model-list-select
                              :list="countries"
                              v-model="countryCompnay"
                              v-if="allow_filter.includes('الدولة')"
                              option-value="id"
                              option-text="country_name"
                              placeholder="الدولة"
                              class="form-select w-100 form-control mb-2 country-selects"
                            >
                            </model-list-select>
                          </div>
                          <hr class="mt-4 mb-0" style="border-color: #8488ad" />
                        </div>
                        <!-- البلد غير مفعل شركات-->
                        <div
                          @click="openModal()"
                          v-if="
                            !allow_filter.includes('الدولة') &&
                            selectSearch == 2 &&
                            !not_active_filters.includes('الدولة')
                          "
                        >
                          <hr class="j-hr-company" style="border-color: #8488ad" />
                          <div class="m-3 pe-1 fs-16">
                            <p class="text-disabled pb-0 fs-16">
                              البلد
                              <span class="me-1 margin-top-neg">
                                <lockSvg />
                              </span>
                            </p>
                            <model-list-select
                              :list="countries"
                              option-value="id"
                              option-text="country_name"
                              placeholder="الدولة"
                              class="form-select w-100 form-control mb-2 country-selects"
                              :isDisabled="true"
                            >
                            </model-list-select>
                          </div>
                          <hr class="mt-4 mb-0" style="border-color: #8488ad" />
                        </div>
                        <!-- التعليم -->
                        <div
                          class="accordion-item bg-white"
                          v-if="
                            allow_filter.includes('التعليم') &&
                            selectSearch == 1 &&
                            !not_active_filters.includes('التعليم')
                          "
                        >
                          <h2 class="accordion-header bg-white" id="headingIn">
                            <button
                              class="accordion-button bg-white text-gray-900 fw-bold pb-0 fs-16"
                              type="button"
                              data-bs-toggle="collapse"
                              data-bs-target="#inistitute"
                              aria-expanded="true"
                              aria-controls="inistitute"
                            >
                              المؤسسات العلمية
                            </button>
                          </h2>
                          <div
                            id="inistitute"
                            class="accordion-collapse collapse show"
                            aria-labelledby="headingIn"
                            data-bs-parent="#accordionExample"
                          >
                            <div class="accordion-body">
                              <div class="position-relative">
                                <input
                                  v-model="inistitute_text"
                                  class="mb-3 form-control bg-white rounded-btn shadow-none input-f"
                                  placeholder="ابحث عن مؤسسة"
                                />
                                <svg
                                  width="20"
                                  class="position-absolute top-50 end-0-c translate-middle-y"
                                  height="21"
                                  viewBox="0 0 20 21"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M1 19.5L7 13.5M5 8.5C5 12.366 8.13401 15.5 12 15.5C15.866 15.5 19 12.366 19 8.5C19 4.63401 15.866 1.5 12 1.5C8.13401 1.5 5 4.63401 5 8.5Z"
                                    stroke="#C1C1C1"
                                    stroke-width="2"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                  />
                                </svg>
                              </div>
                              <div v-for="inist in inistitute" :key="inist.id">
                                <div
                                  class="form-check"
                                  v-if="
                                    !allow_filterImportantInstitute.includes(inist.phrase) &&
                                    !filterInistituteArray.includes(inist.phrase)
                                  "
                                >
                                  <input
                                    class="form-check-input"
                                    :value="inist.phrase"
                                    type="checkbox"
                                    :name="inist.id"
                                    :id="inist.id"
                                    @change="onChangeSInistitute($event, inist)"
                                  />
                                  <label class="form-check-label fw-bold fs-16 text-gray-60" :for="inist.id">
                                    {{ inist.phrase }}
                                  </label>
                                </div>
                              </div>
                              <div v-for="inist in favoriteInistitute" :key="inist.id">
                                <div class="form-check">
                                  <input
                                    class="form-check-input"
                                    :value="inist.name"
                                    type="checkbox"
                                    :name="inist.id"
                                    :id="inist.id"
                                    :checked="
                                      filterInistituteArray.includes(inist.name) ||
                                      filterInistituteArray.includes(inist.phrase)
                                    "
                                    @change="onChangeInistitute($event)"
                                  />
                                  <label class="form-check-label fw-bold fs-16 text-gray-60" :for="inist.id">
                                    {{ inist.name }} {{ inist.phrase }}
                                  </label>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <!--  التعليم غير مفعل -->
                        <div
                          class="accordion-item bg-white"
                          @click="openModal()"
                          v-if="
                            !allow_filter.includes('التعليم') &&
                            selectSearch == 1 &&
                            !not_active_filters.includes('التعليم')
                          "
                        >
                          <h2 class="accordion-header" id="headingIn">
                            <button
                              class="accordion-button text-disabled bg-white pb-0"
                              type="button"
                              data-bs-toggle="collapse"
                              data-bs-target="#inistitute"
                              aria-expanded="true"
                              aria-controls="inistitute"
                            >
                              المؤسسات العلمية
                              <span class="me-1 margin-top-neg">
                                <lockSvg />
                              </span>
                            </button>
                          </h2>
                          <div
                            id="inistitute"
                            class="accordion-collapse collapse show"
                            aria-labelledby="headingIn"
                            data-bs-parent="#accordionExample"
                            @click="openModal()"
                          >
                            <div class="accordion-body">
                              <div class="position-relative">
                                <input
                                  v-model="inistitute_text"
                                  class="
                                    mb-3
                                    form-control
                                    rounded-btn
                                    shadow-none
                                    input-f
                                    text-disabled-content
                                    disabled-bg
                                  "
                                  placeholder="ابحث عن مؤسسة"
                                  disabled
                                />
                                <svg
                                  width="20"
                                  class="position-absolute top-50 end-0-c translate-middle-y"
                                  height="21"
                                  viewBox="0 0 20 21"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M1 19.5L7 13.5M5 8.5C5 12.366 8.13401 15.5 12 15.5C15.866 15.5 19 12.366 19 8.5C19 4.63401 15.866 1.5 12 1.5C8.13401 1.5 5 4.63401 5 8.5Z"
                                    stroke="#C1C1C1"
                                    stroke-width="2"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                  />
                                </svg>
                              </div>
                              <div v-for="inist in inistitute" :key="inist.id">
                                <div class="form-check">
                                  <input
                                    class="form-check-input mark-for-override"
                                    :value="inist.phrase"
                                    type="checkbox"
                                    name="flexRadioDefault1"
                                    id="flexRadioDefault1"
                                    disabled
                                  />
                                  <label class="form-check-label text-disabled-content fs-16" for="flexRadioDefault1">
                                    {{ inist.phrase }}
                                  </label>
                                </div>
                              </div>
                              <div v-for="inist in favoriteInistitute" :key="inist.id">
                                <div class="form-check">
                                  <input
                                    class="form-check-input mark-for-override"
                                    :value="inist.name"
                                    type="checkbox"
                                    name="flexRadioDefault1"
                                    id="flexRadioDefault1"
                                    :checked="
                                      filterInistituteArray.includes(inist.name) ||
                                      filterInistituteArray.includes(inist.phrase)
                                    "
                                    disabled
                                  />
                                  <label class="form-check-label fs-16 text-disabled-content" for="flexRadioDefault1">
                                    {{ inist.name }} {{ inist.phrase }}
                                  </label>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <!-- الدرجة العلمية  -->
                        <div
                          class="accordion-item bg-white"
                          v-if="
                            allow_filter.includes('الدرجة العلمية') &&
                            selectSearch == 1 &&
                            !not_active_filters.includes('الدرجة العلمية')
                          "
                        >
                          <h2 class="accordion-header bg-white" id="headingOne">
                            <button
                              class="accordion-button bg-white text-gray-900 fw-bold pb-0 fs-16"
                              type="button"
                              data-bs-toggle="collapse"
                              data-bs-target="#degree"
                              aria-expanded="true"
                              aria-controls="degree"
                            >
                              درجة العلمية
                            </button>
                          </h2>
                          <div
                            id="degree"
                            class="accordion-collapse collapse show"
                            aria-labelledby="headingOne"
                            data-bs-parent="#accordionExample"
                          >
                            <div class="accordion-body">
                              <div v-for="deg in favoriteDegree" :key="deg">
                                <div class="form-check">
                                  <input
                                    class="form-check-input"
                                    :value="deg"
                                    type="checkbox"
                                    :name="deg"
                                    :id="deg"
                                    @change="onChangeDegree($event)"
                                  />
                                  <label class="form-check-label fs-16 fw-bold text-gray-60" :for="deg">
                                    {{ deg }}
                                  </label>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <!-- الدرجة العلمية غير مفعل -->
                        <div
                          class="accordion-item bg-white"
                          @click="openModal()"
                          v-if="
                            !allow_filter.includes('الدرجة العلمية') &&
                            selectSearch == 1 &&
                            !not_active_filters.includes('الدرجة العلمية')
                          "
                        >
                          <h2 class="accordion-header bg-white" id="headingOne">
                            <button
                              class="accordion-button bg-white pb-0 text-disabled"
                              type="button"
                              data-bs-toggle="collapse"
                              data-bs-target="#degree"
                              aria-expanded="true"
                              aria-controls="degree"
                            >
                              درجة العلمية
                              <span class="me-1 margin-top-neg">
                                <lockSvg />
                              </span>
                            </button>
                          </h2>
                          <div
                            id="degree"
                            class="accordion-collapse collapse show"
                            aria-labelledby="headingOne"
                            data-bs-parent="#accordionExample"
                            @click="openModal()"
                          >
                            <div class="accordion-body">
                              <div v-for="deg in favoriteDegree" :key="deg">
                                <div class="form-check">
                                  <input
                                    class="form-check-input mark-for-override"
                                    :value="deg"
                                    type="checkbox"
                                    :name="deg"
                                    :id="deg"
                                    disabled
                                  />
                                  <label class="form-check-label text-disabled-content" :for="deg">
                                    {{ deg }}
                                  </label>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <!-- حاصل على جوائز -->
                        <div
                          v-if="
                            allow_filter.includes('حاصل على جوائز') &&
                            selectSearch == 1 &&
                            !not_active_filters.includes('حاصل على جوائز')
                          "
                        >
                          <div class="form-check form-switch m-3 pe-1 fs-16">
                            <input
                              @change="
                                has_trophy == '' ? (has_trophy = 'yes') : (has_trophy = '')
                                getResults()
                              "
                              :checked="has_trophy == 'yes'"
                              class="form-check-input form-check-input-green shadow-none"
                              type="checkbox"
                              id="has_trophy"
                            />
                            <label class="form-check-label text-gray-900 fw-bold fs-16" for="has_trophy"
                              >حاصل على جوائز</label
                            >
                          </div>
                        </div>
                        <!-- حاصل على جوائز غير مفعل-->
                        <div
                          @click="openModal()"
                          v-if="
                            !allow_filter.includes('حاصل على جوائز') &&
                            selectSearch == 1 &&
                            !not_active_filters.includes('حاصل على جوائز')
                          "
                        >
                          <div class="form-check form-switch m-3 pe-1 fs-16">
                            <input
                              class="mark-for-override form-check-input form-check-input-green shadow-none"
                              type="checkbox"
                              disabled
                            />
                            <label class="form-check-label mark-for-override fs-16" for="flexSwitchCheckChecked"
                              >حاصل على جوائز
                              <span class="me-1 margin-top-neg">
                                <lockSvg />
                              </span>
                            </label>
                          </div>
                        </div>
                        <!-- يملك مؤلفات -->
                        <div
                          v-if="
                            allow_filter.includes('يملك مؤلفات') &&
                            selectSearch == 1 &&
                            !not_active_filters.includes('يملك مؤلفات')
                          "
                        >
                          <div class="form-check form-switch m-3 pe-1 fs-16">
                            <input
                              @change="
                                has_authors == '' ? (has_authors = 'yes') : (has_authors = '')
                                getResults()
                              "
                              :checked="has_authors == 'yes'"
                              class="form-check-input form-check-input-green shadow-none"
                              type="checkbox"
                              id="has_authors"
                            />
                            <label class="form-check-label text-gray-900 fw-bold fs-16" for="has_authors">
                              قام بكتابة مؤلفات</label
                            >
                          </div>
                        </div>
                        <!-- يملك مؤلفات غير مفعل -->
                        <div
                          @click="openModal()"
                          v-if="
                            !allow_filter.includes('يملك مؤلفات') &&
                            selectSearch == 1 &&
                            !not_active_filters.includes('يملك مؤلفات')
                          "
                        >
                          <div class="form-check form-switch m-3 pe-1 fs-16">
                            <input
                              class="mark-for-override form-check-input form-check-input-green shadow-none"
                              type="checkbox"
                              disabled
                            />
                            <label class="form-check-label mark-for-override fs-16" for="flexSwitchCheckChecked">
                              قام بكتابة مؤلفات
                              <span class="me-1 margin-top-neg">
                                <lockSvg />
                              </span>
                            </label>
                          </div>
                        </div>
                        <div class="text-center">
                          <button class="btn btn-primary m-3 w-74" @click="restFilter()">تهيئة الفلتر</button>
                        </div>
                        <!-- button -->
                        <button
                          class="btn btn-light bg-white d-none fw-bold"
                          ref="toggleModal"
                          data-bs-toggle="modal"
                          data-bs-target="#disabledModal"
                        ></button>
                        <!-- modal -->
                        <div
                          class="modal fade"
                          id="disabledModal"
                          tabindex="-1"
                          aria-labelledby="exampleModalLabel"
                          aria-hidden="true"
                          ref="disabledModal"
                        >
                          <div class="modal-dialog modal-dialog-centered">
                            <div class="modal-content">
                              <div class="modal-header">
                                <i data-bs-dismiss="modal" aria-label="Close" ref="closeDisabledModal"
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
                                    />
                                  </svg>
                                </i>
                                <div class="w-100 d-flex justify-content-center align-items-center">
                                  <span class="modal-header-text" v-if="user && !user.complete"
                                    >اكمل معلومات حسابك</span
                                  >
                                  <span class="modal-header-text" v-if="!user"> غير متوفر للزائرين</span>
                                  <span
                                    class="modal-header-text"
                                    v-if="user && user.complete && userSubscriptionIsGoldSub()"
                                    >غير متوفر للعضويات الذهبية</span
                                  >
                                  <span
                                    class="modal-header-text"
                                    v-if="user && user.complete && !userSubscriptionIsGoldSub()"
                                    >غير متوفر للعضويات المجانية</span
                                  >
                                </div>
                              </div>
                              <div class="modal-body d-flex alig-items-center justify-content-center">
                                <div class="w-75 text-center">
                                  <!-- للزائر -->
                                  <template v-if="!user">
                                    <span> الفلتر غير متوفر للزائرين</span>
                                  </template>
                                  <!-- للمسجل و غير مكتمل معلوماته -->
                                  <template v-if="user && !user.complete">
                                    <span>
                                      يرجى إكمال المعلومات الملف الشخصي لتتمكن من الاستفادة من خدمة فلترة نتائج
                                      البحث</span
                                    >
                                  </template>
                                  <!-- للمشترك المسجل و مكتمل معلوماته -->
                                  <template v-if="user && user.complete && userSubscriptionIsGoldSub()">
                                    <span> الفلتر غير متوفر للعضويات الذهبية</span>
                                  </template>
                                  <!-- للمجاني المسجل و مكتمل معلوماته -->
                                  <template v-if="user && user.complete && !userSubscriptionIsGoldSub()">
                                    <span> الفلتر غير متوفر للعضويات المجانية</span>
                                  </template>
                                </div>
                              </div>
                              <div class="modal-footer d-flex justify-content-center" v-if="user && !user.complete">
                                <!-- <button type="button" data-bs-dismiss="modal" class="btn btn-light border float-start">إلغاء</button> -->
                                <!-- @click.prevent="changeUserInfo()" -->
                                <a type="button" class="w-75 btn btn-primary" href="/profile">
                                  اكمل معلومات حسابك
                                  <!-- <span :class="{ 'spinner-border spinner-border-sm': loadingEdit }"></span> -->
                                </a>
                              </div>
                              <div class="modal-footer d-flex justify-content-center" v-if="!user">
                                <!-- <button type="button" data-bs-dismiss="modal" class="btn btn-light border float-start">إلغاء</button> -->
                                <!-- @click.prevent="changeUserInfo()" -->
                                <a type="button" class="w-75 btn btn-primary" href="/تسجيل-الدخول">
                                  تسجيل الدخول
                                  <!-- <span :class="{ 'spinner-border spinner-border-sm': loadingEdit }"></span> -->
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </section>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <blockSub />
        </div>
        <div class="col-md-9">
          <div>
            <h2 class="fw-bold py-3">{{ categoryName }}</h2>
          </div>
          <cardCharacterCat :resultsCharactour="allCharactour" />

          <div class="d-flex justify-content-center text-center w-auto mx-auto my-4" v-if="!checkAllCharactour()">
            <!-- <button
              @click="getAllCharactour(prev_char - 24)"
              class="btn btn-light py-2 mx-2"
              :class="!prev_char || prev_char == '0' ? 'disabled' : ''"
            >
              <i class="fa-solid fa-arrow-right mx-2"></i> السابق
            </button>
            <button
              @click="getAllCharactour(next_char)"
              class="btn btn-light py-2 mx-2"
              :class="allCharactour.length <= 23 ? 'disabled' : ''"
            >
              التالي<i class="fa-solid fa-arrow-left mx-2"></i>
            </button> -->
            <paginator
              :prevResults="prevResults"
              :nextResults="nextResults"
              :skip="skip"
              :item_per_page="item_per_page"
              :count="total_count"
              :total="allCharactour"
              @getMoreResults_from_child="getMoreResults_from_child"
            >
            </paginator>
          </div>
        </div>
      </div>
    </div>
    <div></div>
  </div>
</template>
<script>
import discover from '../home/discover.vue'
import breadcrumb from './accessories/breadcrumb.vue'
import notfoundRsultes from './accessories/advancedSearch/notfoundRsultes.vue'
import cardCharactour from './accessories/advancedSearch/cardCharacter.vue'
import cardCompany from './accessories/advancedSearch/cardCompany.vue'
import cardAllCatSearch from './accessories/advancedSearch/cardAllCatSearch.vue'
import cardCat from './accessories/advancedSearch/cardCat.vue'
import cardAllCat from './accessories/advancedSearch/cardAllCat.vue'
import cardCharactourH from './accessories/advancedSearch/cardCharacterH.vue'
import cardCompanyH from './accessories/advancedSearch/cardCompanyH.vue'
import cardCatH from './accessories/advancedSearch/cardCatH.vue'
import ClickOutside from 'vue-click-outside'
import { ModelListSelect } from 'vue-search-select'
import 'vue-search-select/dist/VueSearchSelect.css'
import resultsSearch from '../pages/accessories/resultsSearch.vue'
import lockSvg from './accessories/svg/lockSvg.vue'
import advancedSearchDisabledFilters from './advancedSearchDisabledFilters.vue'
import paginator from './paginator.vue'
import blockSub from './ads/blockSub.vue'
import cardCharacterCat from './accessories/advancedSearch/cardCharacterCat.vue'
import closeSearch from './accessories/svg/closeSearch.vue'

export default {
  metaInfo: {
    title: 'من هم؟ | البحث المتقدم',
  },
  components: {
    breadcrumb,
    discover,
    ModelListSelect,
    notfoundRsultes,
    cardCharactour,
    cardCompany,
    cardCat,
    cardCharactourH,
    cardCompanyH,
    cardCatH,
    cardAllCat,
    resultsSearch,
    cardAllCatSearch,
    lockSvg,
    advancedSearchDisabledFilters,
    blockSub,
    paginator,
    cardCharacterCat,
    closeSearch
  },
  data() {
    return {
      debounce: null,
    q:"",
      loadingR: false,
      user: this.$store.state.user,
      category_type: 'character',
      agestart: '',
      ageend: '',
      age: '',
      is_alive: '',
      filterCategoryArray: [],
      filterDegreeArray: [],
      filterInistituteArray: [],
      showhistory: false,
      allow_filter: [],
      show_charactoursH: false,
      show_companiesH: false,
      show_categoriesH: false,
      prevResults: 0,
      nextResults: 5,
      disabled: true,
      max: false,
      resultsCount: 0,
      noResult: false,
      selectSearch: 1,
      text: this.$route.params.q,
      resultsCompany: [],
      resultsCharactour: [],
      allCharactour: [],
      categorys: [],
      categorysSelected: [],
      morec: 0,
      slug: this.$route.params.slug,
      more: 0,
      country: { id: '' },
      category: [],
      inistitute: [],
      degree: [],
      nationality: { id: '' },
      countryCompnay: { id: '' },
      countries: [],
      companies: {},
      charactours: {},
      allSubCategories: {},
      selectSubCategory: '',
      order: [],
      code: this.$route.meta.code
        ? this.$route.meta.code
        : this.$store.getters.countryFilter
        ? this.$store.getters.countryFilter.toLowerCase()
        : 'ae',
      resultsCategory: [],
      skip: 0,
      more: 0,
      cat_text: '',
      inistitute_text: '',
      degree_text: '',
      show_charactours: this.$route.params.q ? true : false,
      show_companies: false,
      show_categories: false,
      results_count_charactours: 0,
      results_count_companies: 0,
      results_count_categories: 0,
      categories: [],
      has_trophy: '',
      has_authors: '',
      resultsMostSearchCharactour: [],
      resultsMostSearchCompany: [],
      resultsMostSearchCategories: [],
      favoriteDegree: [],
      favoriteInistitute: [],
      favoriteCategory: [],
      allow_filterImportantInstitute: [],
      userSubscriptionAll: this.$store.state.subscription ? this.$store.state.subscription : '',
      type: '',
      categoryName: '',
      gender: '',
      breadcrumbLsit: [],
      title: ' من هم؟ | البحث المتقدم',
      total_for_male: 0,
      total_for_female: 0,
      Scategorys: [],
      not_active_filters: [],
      item_per_page: 10,
      prevResults: 0,
      nextResults: 10,
      max: false,
      total_count: 0,
      resultsMostSearchCharactour_total: 0,
      resultsMostSearchCompany_total: 0,
      resultsMostSearchFemale_total: 0,
      resultsMostSearcMale_total: 0,
    }
  },

  watch: {
    cat_text: function (value) {
      this.getCatResults(value)
    },
    countryCompnay: function (value) {
      this.getResults(value)
    },
    nationality: function (value) {
      this.getResults(value)
    },
    country: function (value) {
      this.getResults(value)
    },
    inistitute_text: function (value) {
      this.educationInistitute(value)
    },
    degree_text: function (value) {
      if (value) {
        if (value.length > 2) {
          this.educationDegree(value)
        }
      }
    },
  },
  methods: {
    setavalue (){
      this.debounce =this.createDebounce()
    },
    createDebounce() {
		let timeout = null;
      return function (fnc, delayMs) {
     
        clearTimeout(timeout);
        timeout = setTimeout(() => {
          fnc();
        }, delayMs || 500);
      };
    },
    getMoreResults_from_child(value) {
      console.log('value', value)
      this.getAllCharactour(value)
    },
    page_number(skip, item_per_page, index) {
      // console.log('index '+ index +' result ',(skip / item_per_page) + index )
      if (skip == 0) return index
      return skip / item_per_page + index
    },
    number_of_pages(total, item_per_page) {
      // console.log(' result Math.ceil ',Math.ceil(total/item_per_page))
      if (total == 0) return 0
      return Math.ceil(total / item_per_page)
    },
    userSubscriptionIsGoldSub() {
      try {
        if (this.userSubscriptionAll) {
          // return this.userSubscriptionAll.plan.price > 0 ? true : false
          return this.userSubscriptionAll.plan.package.is_paid == 1 ? true : false
        }
        return false
      } catch (error) {
        return false
      }
    },
    getValue(value) {
      this.selectSearch = value
      this.showhistory = false
      this.getResults()
      this.getFilterSearch()
    },
    openModal() {
      if (!this.user) {
        window.location.href = '/تسجيل-الدخول'
      } else {
        this.$refs.toggleModal.click()
      }
    },
    restFilter() {
      this.agestart = ''
      this.ageend = ''
      this.age = ''
      this.is_alive = ''
      this.filterCategory = []
      this.filterCategoryArray = []
      this.filterDegreeArray = []
      this.filterInistituteArray = []
      this.showhistory = false
      this.max = false
      this.resultsCompany = []
      this.resultsCharactour = []
      this.allCharactour = []
      this.categorys = []
      this.country = { id: '' }
      this.category = []
      this.inistitute = []
      this.degree = []
      this.nationality = { id: '' }
      this.countryCompnay = { id: '' }
      this.companies = {}
      this.charactours = {}
      this.allSubCategories = {}
      this.selectSubCategory = ''
      this.order = []
      this.resultsCategory = []
      this.skip = 0
      this.more = 0
      this.cat_text = ''
      this.inistitute_text = ''
      this.degree_text = ''
      this.has_trophy = ''
      this.has_authors = ''
      this.resultsMostSearchCharactour = []
      this.resultsMostSearchCompany = []
      this.resultsMostSearchCategories = []
      this.favoriteDegree = []
      this.favoriteInistitute = []
      this.favoriteCategory = []
      this.gender = ''
      this.resultsMostSearchCharactour_total = 0
      this.resultsMostSearchCompany_total = 0
      this.resultsMostSearchFemale_total = 0
      this.resultsMostSearcMale_total = 0
      this.getFilterSearch()
    },
    getSCategory() {
      this.http
        .get('/category/getCategoriesByCountry?code=' + this.code)
        .then(async (response) => {
          this.Scategorys = response.data.categories
        })
        .catch((error) => {})
    },
    setAge() {
      if (this.age == '') {
        this.agestart = ''
        this.ageend = ''
      }
      if (this.age == 1) {
        this.agestart = 1
        this.ageend = 20
      }
      if (this.age == 2) {
        this.agestart = 20
        this.ageend = 40
      }
      if (this.age == 3) {
        this.agestart = 40
        this.ageend = 60
      }
      if (this.age == 4) {
        this.agestart = 60
        this.ageend = 80
      }
      this.getResults()
    },
    getMoreResults(v) {
      this.loadingR = true
      this.skip = this.skip + v
      if (this.skip != 0) {
        this.prevResults = -1 * this.item_per_page
      }
      if (this.skip == 0) {
        this.prevResults = this.item_per_page
      }
      if (this.skip + this.item_per_page < this.resultsCount) {
        this.max = false
      }
      if (this.skip + this.item_per_page >= this.resultsCount) {
        this.max = true
      }
      this.http
        .get(
          '/most_searched_last_period_of_time?slug=' +
            this.slug +
            '&type=' +
            this.type +
            '&has_trophy=' +
            this.has_trophy +
            '&has_authors=' +
            this.has_authors +
            '&gender=' +
            this.gender +
            '&agestart=' +
            this.agestart +
            '&ageend=' +
            this.ageend +
            '&rel_education_inistitute=' +
            this.filterInistituteArray +
            '&category=' +
            this.filterCategoryArray +
            '&rel_education_degree=' +
            this.filterDegreeArray +
            '&country_of_residence=' +
            (this.country.id != undefined ? this.country.id : '') +
            '&is_alive=' +
            this.is_alive +
            '&nationality=' +
            (this.countryCompnay.id != undefined ? this.countryCompnay.id : '') +
            '&countries=' +
            (this.countryCompnay.id != undefined ? this.countryCompnay.id : '') +
            '&skip=' +
            this.skip
        )
        .then(async (response) => {
          if (response.data != '401 - You have used incorrect or expired token') {
            this.resultsCompany = response.data.result
              ? response.data.result.filter((item) => {
                  return item.type == 'company'
                })
              : null
            this.resultsCharactour = response.data.result
              ? response.data.result.filter((item) => {
                  return item.type == 'person'
                })
              : null
            this.resultsCategory = response.data.result
              ? response.data.result.filter((item) => {
                  return item.type == 'category'
                })
              : null
            this.resultsCount = response.data.total_for_male + response.data.total_for_female
            this.results_count_charactours = response.data.total_for_person
            this.results_count_companies = response.data.total_for_company
            this.results_count_categories = response.data.total_for_category
            this.total_for_male = response.data.total_for_male
            this.total_for_female = response.data.total_for_female
            this.total_count = response.data.total_characters

            this.loadingR = false
          }
          window.scrollTo(0, 100)
        })
        .catch((error) => {
          this.resultsCharactour = []
        })
    },
    reset() {
      this.noResult = false
      this.text = ''
    },
    hides() {
      this.showhistory = false
    },
    getCatResults(word) {
      this.loadingR = true
      if (this.selectSearch == 1) this.category_type = 'character'
      if (this.selectSearch == 2) this.category_type = 'company'
      this.http
        .get(
          '/category/search_categories_subcategories_lableb?q=' +
            word +
            '&type=' +
            this.type +
            '&category_type=' +
            this.category_type
        )
        .then(async (response) => {
          if (response.data != '401 - You have used incorrect or expired token') {
            this.loadingR = false
            this.category = response.data.suggestions
          }
        })
        .catch((error) => {
          this.category = null
        })
    },
    educationInistitute(word) {
      this.http
        .get('/charactour/search_education_inistitute_lableb?q=' + word + '&limit=5&skip=0')
        .then(async (response) => {
          if (response.data != '401 - You have used incorrect or expired token') {
            this.inistitute = response.data.suggestions
          }
        })
    },
    educationDegree(word) {
      this.http
        .get('/charactour/search_education_degree_lableb?q=' + word + '&limit=5&skip=0')
        .then(async (response) => {
          if (response.data != '401 - You have used incorrect or expired token') {
            this.degree = response.data.suggestions
          }
        })
    },
    getResults() {
      this.loadingR = true
      if (this.selectSearch == 1) this.type = 'person'
      if (this.selectSearch == 2) this.type = 'company'
      if (this.selectSearch == 3) this.type = 'category'
      this.http
        .get(
          '/most_searched_last_period_of_time?slug=' +
            this.slug +
            '&type=' +
            this.type +
            '&has_trophy=' +
            this.has_trophy +
            '&has_authors=' +
            this.has_authors +
            '&gender=' +
            this.gender +
            '&agestart=' +
            this.agestart +
            '&ageend=' +
            this.ageend +
            '&rel_education_inistitute=' +
            this.filterInistituteArray +
            '&category=' +
            this.filterCategoryArray +
            '&rel_education_degree=' +
            this.filterDegreeArray +
            '&country_of_residence=' +
            (this.country.id != undefined ? this.country.id : '') +
            '&is_alive=' +
            this.is_alive +
            '&nationality=' +
            (this.nationality.id != undefined ? this.nationality.id : '') +
            '&countries=' +
            (this.countryCompnay.id != undefined ? this.countryCompnay.id : '')
        )
        .then(async (response) => {
          if (response.data != '401 - You have used incorrect or expired token') {
            this.loadingR = false
            this.allCharactour = response.data.result
            this.resultsCompany = response.data.result
              ? response.data.result.filter((item) => {
                  return item.type == 'company'
                })
              : null
            this.resultsCharactour = response.data.result
              ? response.data.result.filter((item) => {
                  return item.type == 'person'
                })
              : null
            this.resultsCategory = response.data.result
              ? response.data.result.filter((item) => {
                  return item.type == 'category'
                })
              : null
            this.resultsCount = response.data.totalDocuments
            this.results_count_charactours = response.data.total_for_person
            this.results_count_companies = response.data.total_for_company
            this.results_count_categories = response.data.total_for_category
            this.total_for_male = response.data.total_for_male
            this.total_for_female = response.data.total_for_female
            this.total_count = response.data.total_characters

            this.skip = 0
          }
          setTimeout(() => {
            this.resultsCompany || this.resultsCharactour ? (this.noResult = true) : (this.noResult = false)
          }, 4000)
        })
    },
    checkAllCharactour() {
      try {
        if (this.allCharactour.length) {
          return false
        }
      } catch (error) {
        return true
      }
      return true
    },
    checkAllCharactourMore() {
      try {
        if (this.allCharactour.length > 9) {
          return true
        }
      } catch (error) {
        return false
      }
      return false
    },
    checkAllCompany() {
      try {
        if (this.categorys.length) {
          return false
        }
      } catch (error) {
        return true
      }
      return true
    },
    checkAllCompanyMore() {
      try {
        if (this.categorys.length > 9) {
          return true
        }
      } catch (error) {
        return false
      }
      return false
    },
    onChange(event) {
      var data = event.target.value
      var index = this.filterCategoryArray.indexOf(data)
      if (index !== -1) {
        this.filterCategoryArray.splice(index, 1)
      } else {
        this.filterCategoryArray.unshift(data)
      }
      this.getResults()
    },
    onChangeS(event, cat) {
      var data = event.target.value
      var index = this.filterCategoryArray.indexOf(data)
      if (index !== -1) {
        this.filterCategoryArray.splice(index, 1)
      } else {
        this.filterCategoryArray.unshift(data)
      }
      if (!this.category.includes(cat)) {
        this.category.unshift(cat)
      }
      if (!this.favoriteCategory.includes(cat)) {
        this.favoriteCategory.unshift(cat)
      }
      var index1 = this.category.indexOf(cat)
      if (index1 !== -1) {
        this.category.splice(index1, 1)
      }

      this.getResults()
    },
    onChangeInistitute(event) {
      var data = event.target.value
      var index = this.filterInistituteArray.indexOf(data)
      if (index !== -1) {
        this.filterInistituteArray.splice(index, 1)
      } else {
        this.filterInistituteArray.unshift(data)
      }

      this.getResults()
    },
    onChangeSInistitute(event, cat) {
      var data = event.target.value
      var index = this.filterInistituteArray.indexOf(data)
      if (index !== -1) {
        this.filterInistituteArray.splice(index, 1)
      } else {
        this.filterInistituteArray.unshift(data)
      }
      if (!this.inistitute.includes(cat)) {
        this.inistitute.unshift(cat)
      }
      if (!this.favoriteInistitute.includes(cat)) {
        this.favoriteInistitute.unshift(cat)
      }
      var index1 = this.inistitute.indexOf(cat)
      if (index1 !== -1) {
        this.inistitute.splice(index1, 1)
      }

      this.getResults()
    },
    onChangeDegree(event) {
      var data = event.target.value
      var index = this.filterDegreeArray.indexOf(data)
      if (index !== -1) {
        this.filterDegreeArray.splice(index, 1)
      } else {
        this.filterDegreeArray.unshift(data)
      }
      this.getResults()
    },
    getcountry() {
      this.httpMg.get('/countries').then(async (response) => {
        this.countries = response.data.countries
      })
    },
    getMostSearchResults() {
      this.http
        .get(
          '/most_search?characters=1&companies=1&categories=1&skip=0'
        )
        .then(async (response) => {
          this.resultsMostSearchCharactour = response.data.characters
          this.resultsMostSearchCompany = response.data.companies
          this.resultsMostSearchCategories = response.data.categories
        })
    },
    getAllCharactour(v = 0) {
      this.loadingR = true
      this.skip = this.skip + v
      if (this.skip != 0) {
        this.prevResults = -1 * this.item_per_page
      }
      if (this.skip == 0) {
        this.prevResults = 0
      }
      if (this.skip + 5 < this.resultsCount) {
        this.max = false
      }
      if (this.skip + 5 >= this.resultsCount) {
        this.max = true
      }
      this.allCharactour.forEach((element) => {
        element.image = ''
      })
      this.loadingMore = true
      this.http
        .get(
          '/most_searched_last_period_of_time?slug=' +
            this.slug +
            '&type=' +
            this.type +
            '&has_trophy=' +
            this.has_trophy +
            '&has_authors=' +
            this.has_authors +
            '&gender=' +
            this.gender +
            '&agestart=' +
            this.agestart +
            '&ageend=' +
            this.ageend +
            '&rel_education_inistitute=' +
            this.filterInistituteArray +
            '&category=' +
            this.filterCategoryArray +
            '&rel_education_degree=' +
            this.filterDegreeArray +
            '&country_of_residence=' +
            (this.country.id != undefined ? this.country.id : '') +
            '&is_alive=' +
            this.is_alive +
            '&nationality=' +
            (this.countryCompnay.id != undefined ? this.countryCompnay.id : '') +
            '&countries=' +
            (this.countryCompnay.id != undefined ? this.countryCompnay.id : '') +
            '&skip=' +
            this.skip
        )
        .then(async (response) => {
          this.allCharactour = response.data.result

          this.loadingMore = false
          this.loading = false
          this.loadingR = false
          this.total_count = response.data.total_characters

          this.resultsMostSearchCharactour_total = response.data.total_characters
          this.resultsMostSearchCompany_total = response.data.total_companies
          this.resultsMostSearchFemale_total = response.data.total_for_female
          this.resultsMostSearcMale_total = response.data.total_for_male

          this.categoryName = response.data.category_object[0].category_name
          this.breadcrumbLsit = [
            {
              name: 'الرئيسية',
              link: '/',
            },
            {
              name: 'بحث متقدم',
              link: '/' + encodeURI('البحث-المتقدم'),
            },
            {
              name: response.data.category_object[0].category_name,
              link: '/search/' + this.$route.params.slug + '/',
            },
          ]

          this.goto()
        })
        .catch((error) => {
          if (error) {
            console.log(error)
          }
        })
    },
    goto() {
      window.scrollTo(0, 0)
    },
    getFilterSearch(typeFilter = 'character') {
      this.category = []
      this.inistitute = []
      this.degree = []
      if (this.selectSearch == 1) typeFilter = 'character'

      if (this.selectSearch == 2) typeFilter = 'company'
      this.http
        .get('/search_filters?type=' + typeFilter, { headers: { Authorization: `Bearer ${this.$store.state.token}` } })
        .then(async (response) => {
          this.allow_filter = []
          this.not_active_filters = []
          response.data.filters.forEach((item, index) => {
            this.allow_filter.push(item.name)
          })
          response.data.not_active_filters.forEach((item, index) => {
            this.not_active_filters.push(item.name)
          })
          response.data.important_institute.forEach((item) => {
            this.allow_filterImportantInstitute.push(item.name)
          })

          this.favoriteCategory = response.data.important_categories
          this.favoriteInistitute = response.data.important_institute
          this.favoriteDegree = response.data.education_degree
        })
    },
  },

  created() {
    //this.getResults(this.$route.params.q)
    // this.getMostSearchResults()
    this.getcountry()
    this.getFilterSearch()
    this.getSCategory()
    this.getAllCharactour()
    this.setavalue()
  },
  directives: {
    ClickOutside,
  },
}
</script>
<style scoped>
/* jaafar */
.j-margin-top-negative-descover {
  padding-top: 5px;
  margin-top: -12px;
}
@media screen and (max-width: 1200px) {
  .j-margin-top-negative-descover {
    padding-top: 5px;
    margin-top: -24px;
  }
}
.j-main-buttons-next.disabled {
  opacity: 1;
  color: #6f7274 !important;
}
.j-main-buttons.disabled {
  opacity: 1;
  color: #6f7274 !important;
}
.j-main-buttons-next {
  background-color: white !important;
  border-top-left-radius: 10px 10px;
  border-bottom-left-radius: 10px 10px;
  border-top-right-radius: 0px 0px;
  border-bottom-right-radius: 0px 0px;
  border-width: 1px;
  border-color: #eaedef;
  color: #6f7274 !important;
  /* box-shadow: 1px 1px 2px 1px  #e4ebed; */
}
.j-main-buttons {
  background-color: white !important;
  border-top-right-radius: 10px 10px;
  border-bottom-right-radius: 10px 10px;
  border-top-left-radius: 0px 0px;
  border-bottom-left-radius: 0px 0px;
  border-width: 1px;
  border-color: #eaedef;
  color: #6f7274 !important;
}
.j-button {
  background-color: white;
  border-color: #eaedef;
  border-radius: 0;
}
.j-button.selected {
  background-color: #4e5a81;
  color: white;
}
.j-lock-position {
  top: 50%;
  left: 10%;
}
.j-hr-company {
  margin-top: 0;
  border-top: none;
}
.modal-header-text {
  margin-right: -2.5rem;
  font-weight: 700;
  font-size: 20px;
}

.disabled-bg {
  background: #f8f8f8 !important;
}

.mark-for-override.form-check-input:disabled ~ .mark-for-override.form-check-label,
.mark-for-override.form-check-input[disabled] ~ .mark-for-override.form-check-label {
  font-weight: 500 !important;
  font-size: 16px !important;
  color: #828282 !important;
  opacity: 1;
}

.form-select.country-selects {
  padding-right: 0.8rem;
}

.text-disabled {
  font-weight: 500;
  font-size: 16px;
  color: #828282;
}

.text-disabled-content {
  font-weight: 500;
  font-size: 16px;
  color: #c1c1c1 !important;
}

.margin-top-neg {
  margin-top: -6px;
}

/*  */
.shados {
  box-shadow: 0px 0px 24px rgba(0, 0, 0, 0.05);
  border-radius: 12px;
}

.border {
  border-color: #f2f2f2 !important;
}

.p-c {
  top: 8px;
  right: 8px;
}

.accordion-button:not(.collapsed)::after {
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='%23212529'%3e%3cpath fill-rule='evenodd' d='M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z'/%3e%3c/svg%3e");
}

.accordion-button:not(.collapsed) {
  /* color: #3b5fcc; */
  /* background-color: #ecf0fc; */
  box-shadow: unset;
}

.bg-adv {
  background-color: #e5e5e50d;
}

.accordion-button:focus {
  z-index: 3;
  border-color: none;
  outline: 0;
  box-shadow: none;
}

h2 {
  height: 55px;
}

.end-0-c {
  right: 10px !important;
}

.input-f {
  height: 43px;
  padding-right: 35px;
}

.form-check-input-green:checked {
  background-color: #54e592;
  border: none;
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='-4 -4 8 8'%3e%3ccircle r='3' fill='white'/%3e%3c/svg%3e") !important;
}

.form-check-input-green:focus {
  border-color: rgb(191, 191, 191);
}

.form-switch .form-check-input {
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='-4 -4 8 8'%3e%3ccircle r='3' fill='rgba%280, 0, 0, 0.25%29'/%3e%3c/svg%3e");
}

.ui.selection.dropdown {
  background: #f8f8f8;
  box-shadow: none;
  border-radius: 10px !important;
  border: none;
}

.form-select > i {
  display: none;
}

.ui.fluid.dropdown {
  display: block;
  width: 74%;
  min-width: 0;
}
</style>
<style scoped>
@media screen and (max-width: 521px) {
  .text-center-m {
    justify-content: center;
    text-align: center;
  }
}

@media screen and (max-width: 992px) {
  .dyn-height {
    margin-top: 20px;
  }
}
@media screen and (max-width: 765px) {
  .j-lock-position {
    left: 5%;
  }
}
@media screen and (max-width: 325px) {
  .j-lock-position {
    left: 8%;
  }
}
@media screen and (max-width: 245px) {
  .j-lock-position {
    left: 12%;
  }
}
@media screen and (max-width: 480px) {
}

.dyn-height {
  max-height: 350px;
  overflow-y: auto;
  overflow-x: hidden;
  margin-top: 20px;
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
}

.image-wid-p {
  width: 50px;
}

.div-image {
  width: 80px;
}

.div-image-c {
  width: 50px;
}

.fixs {
  z-index: 75;
  padding: 0 0.8rem;
}

.fixs-c {
  z-index: 75;
  padding: 0px;
  left: 13px;
}

.link {
  font-size: 20px;
  font-weight: 500;
  color: #4f4f4f;
  margin: 0 5px;
}

.active {
  color: #20211f;
  font-weight: 700;
}

.count {
  font-size: 16px;
}

.nav-pills .nav-link.active,
.nav-pills .show > .nav-link {
  color: #20211f;
  font-weight: 700;
  background: none;
}

.allresult {
  color: #4169e3;
  font-size: 16px;
  font-weight: 700;
}

hr {
  border-color: #c8cadd;
}

.router-link-exact-active,
.router-link-active {
  color: #20211f !important;
}

.bg-adv {
  background-color: #e5e5e50d;
}
</style>
