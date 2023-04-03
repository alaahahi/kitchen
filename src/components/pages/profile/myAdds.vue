<template>
  <div class="col-lg-8">
    <div style="z-index: 1" :class="{ 'w-75 h-75 bg-white position-fixed': loading }">
      <div
        class="position-absolute top-50 start-50 bg-white"
        :class="{ 'spinner-border text-primary spinner-border-xl': loading }"
      ></div>
    </div>
    <div>
      <div class="d-flex" style="justify-content: space-between">
        <h3 class="py-3 mt-2">إضافاتي</h3>
        <div class="py-3">
          <router-link
            :to="{ name: 'addCharacter' }"
            class="btn btn-light fw-bold btn-w px-3 text-primary rounded-btn py-2 w-m-100 mt-2"
            type="submit"
            ><i class="fa-solid fa-plus ms-2"></i> أضف نفسك أو شخصية تعرفها</router-link
          >
          <router-link
            :to="{ name: 'addCompany' }"
            class="btn btn-light fw-bold btn-w px-3 text-primary rounded-btn py-2 w-m-100 mt-2"
            type="submit"
            ><i class="fa-solid fa-plus ms-2"></i>أضف مؤسستك أو مؤسسة تعرفها</router-link
          >
        </div>
      </div>
      <ul class="nav nav-tabs" id="myTab" role="tablist">
        <li class="nav-item" role="presentation">
          <button
            class="nav-link active"
            id="all-tab"
            data-bs-toggle="tab"
            data-bs-target="#all"
            type="button"
            role="tab"
            aria-controls="all"
            aria-selected="true"
          >
            الكل
          </button>
        </li>
        <li class="nav-item" role="presentation">
          <button
            class="nav-link"
            id="waiting-tab"
            data-bs-toggle="tab"
            data-bs-target="#waiting"
            type="button"
            role="tab"
            aria-controls="waiting"
            aria-selected="false"
          >
            تحت المراجعة
          </button>
        </li>
        <li class="nav-item" role="presentation">
          <button
            class="nav-link"
            id="accepted-tab"
            data-bs-toggle="tab"
            data-bs-target="#accepted"
            type="button"
            role="tab"
            aria-controls="accepted"
            aria-selected="false"
          >
            تم الموافق
          </button>
        </li>
        <li class="nav-item" role="presentation">
          <button
            class="nav-link"
            id="reject-tab"
            data-bs-toggle="tab"
            data-bs-target="#reject"
            type="button"
            role="tab"
            aria-controls="reject"
            aria-selected="false"
          >
            تم الرفض
          </button>
        </li>
      </ul>
      <div class="tab-content" id="myTabContent">
        <div class="tab-pane fade show active" id="all" role="tabpanel" aria-labelledby="all-tab">
          <section class="best-company-groups bg-white" style="direction: ltr">
            <h3 class="py-3 text-end">الشخصيات</h3>
            <profileMyaddCharacter :charactours="charactours" />
            <h3 class="py-3 text-end">مؤسسات</h3>
            <profileMyaddCompany :companies="Companys" />
          </section>
        </div>
        <div class="tab-pane fade" id="waiting" role="tabpanel" aria-labelledby="waiting-tab">
          <section class="best-company-groups bg-white" style="direction: ltr">
            <h3 class="py-3 text-end">شخصيات</h3>
            <profileMyaddCharacter :charactours="waitingCharactour" />

            <h3 class="py-3 text-end">مؤسسات</h3>
            <profileMyaddCompany :companies="waitingCompany" />
          </section>
        </div>
        <div class="tab-pane fade" id="accepted" role="tabpanel" aria-labelledby="accepted-tab">
          <section class="best-company-groups bg-white" style="direction: ltr">
            <h3 class="py-3 text-end">شخصيات</h3>
            <profileMyaddCharacter :charactours="activeCharactour" />

            <h3 class="py-3 text-end">مؤسسات</h3>
            <profileMyaddCompany :companies="activeCompany" />
          </section>
        </div>
        <div class="tab-pane fade" id="reject" role="tabpanel" aria-labelledby="reject-tab">
          <section class="best-company-groups bg-white" style="direction: ltr">
            <h3 class="py-3 text-end">شخصيات</h3>
            <profileMyaddCharacter :charactours="rejectCharactour" />

            <h3 class="py-3 text-end">مؤسسات</h3>
            <profileMyaddCompany :companies="rejectCompany" />
          </section>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { Carousel, Slide } from 'vue-carousel';
import profileMyaddCharacter from '../accessories/profileMyaddCharacter.vue'
import profileMyaddCompany from '../accessories/profileMyaddCompany.vue'

export default {
    metaInfo: {
      title: 'إضافاتي | من هم؟'
    },
        components:
        {
        Carousel,
        Slide,
        profileMyaddCharacter,
        profileMyaddCompany
      },
    data() {
        return {
      loading:true,
      charactours:{},
      Companys:{},
      requestToVerifyCharactour:{},
      requestToVerifyCompany:{},
      waitingCharactour:{},
      waitingCompany:{},
      activeCharactour:{},
      activeCompany:{},
      rejectCharactour:{},
      rejectCompany:{},
      user: this.$store.state.user,
      token: this.$store.state.token,

        }
    },
      methods: {
    getCharactour()
            {
        this.http.post('/character/myAdded',{"user_id":this.$store.state.user.id,'social_token':this.token}, { headers: { Authorization: `Bearer ${this.token}` } })
        .then(async (response)=>{
        this.charactours = response.data.RequestAddCharactour
        this.requestToVerifyCharactour = response.data.RequestToVerifyCharactour
        this.waitingCharactour = response.data.RequestAddCharactour.filter((item) => {return (item.requestStatus == 0)})
        this.activeCharactour = response.data.RequestAddCharactour.filter((item) => {return (item.requestStatus == 1)})
        this.rejectCharactour = response.data.RequestAddCharactour.filter((item) => {return (item.requestStatus == -1)})
        this.loading=false
                     })
            },
    getCompany()
            {
        this.http.post('/company/myAdded',{"user_id":this.$store.state.user.id,'social_token':this.token}, { headers: { Authorization: `Bearer ${this.token}` } })
        .then(async (response)=>{
        this.Companys = response.data.RequestAddCompany
        this.requestToVerifyCompany = response.data.RequestToVerifyCompany
        this.waitingCompany = response.data.RequestAddCompany.filter((item) => {return (item.requestStatus == 0)})
        this.activeCompany = response.data.RequestAddCompany.filter((item) => {return (item.requestStatus == 1)})
        this.rejectCompany = response.data.RequestAddCompany.filter((item) => {return (item.requestStatus == -1)})
                     })
            },
        },
        created() {
            this.getCharactour()
            this.getCompany()

        }
}
</script>

<style>
.bg-warning-c {
  background-color: #f2994a;
}
.bg-danger-c {
  background-color: #b50e0e;
}
.bg-success-c {
  background-color: #27ae60;
}
.nav-link {
  color: #4f4f4f;
  font-weight: bold;
}
.nav-tabs .nav-link.active,
.nav-tabs .nav-item.show .nav-link {
  color: #4169e3;
  background-color: #fff;
  border-color: #fff;
  border-bottom: 3px solid #4169e3;
  font-weight: bold;
}
.nav-tabs .nav-link:hover,
.nav-tabs .nav-link:focus {
  color: #4169e3;
  background-color: #fff;
  border-color: #fff;
  border-bottom: 3px solid #4169e3;
  font-weight: bold;
}
</style>
