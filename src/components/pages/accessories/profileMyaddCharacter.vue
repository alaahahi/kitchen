<template>
  <div>
    <h4  v-if="!charactours.length" class="text-gray-60 py-5 text-center">لا يوجد شخصيات   مضافة من قبلك</h4>

            <div class="card mb-3 w-100 "  style="direction: rtl;" v-for="charactour in charactours" :key=charactour.id >
                        <div class="row g-0">
                        <div class="col-md-1">
                            <img v-if="charactour.image" class="p-2 rounded-btn-img w-100" :src=charactour.image alt="carousel" />
                            <img v-if="!charactour.image" class="p-2 rounded-btn-img w-100" src="/web-asset/img/noResult.jpg" alt="carousel" />
                         </div>
                        <div class="col-md-11">
                        <div class="card-body">
                            <div class="row">
                                <div class="col-md-8">
                                    <h5 class="card-title  fw-bold">{{charactour.character_name_ar}} </h5>
                                <p class="card-text">{{charactour.position}}</p></div>
                                <div class="col-md-4 text-start">
                                  <button
                                    @mousedown="del =charactour.id"
              class="btn btn-light px-3 border text-muted bg-white"
              data-bs-toggle="modal" data-bs-target="#accountDelModal" v-if="charactour.requestStatus == 0">
              <i class="mx-1 fa-solid fa-trash"></i>
              حذف
            </button>
                                   <span class="badge rounded-pill  px-4  p-2 me-2" style="min-width: 115px;"
                                    :class="charactour.requestStatus == 0? 'bg-warning-c':charactour.requestStatus == 1 ?'bg-success-c':'bg-danger-c'">
                                    {{ charactour.requestStatus == 0 ? 'تحت المراجعة' :'' }}
                                    {{ charactour.requestStatus == 1 ? ' تم الموافقة' :'' }}
                                    {{ charactour.requestStatus == -1 ? ' تم الرفض' :'' }}
                                    </span>


                                </div>
                            </div>
                        </div>
                        </div>
                        </div>
            </div>
 <div class="modal fade" id="accountDelModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"  ref="accountDel" > </button>
          </div>
          <div class="modal-body" style="direction:rtl ;">
          <h4>  حذف الشخصية ؟</h4>
          </div>
          <div class="modal-footer">

            <button
              type="button"
              @click.prevent="delCharactour(del)"
              class="btn btn-primary fw-bold px-4"
               > 
              حذف

            </button>

                         <button

              type="button"
              data-bs-dismiss="modal"
              class="btn btn-light border  fw-bold px-4"
            >
              إلغاء
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    props: ['charactours'],
    data() {
        return {
            del:0,
            token: this.$store.state.token,

        }},
    methods:{
            delCompany(v)
            {
        this.http.delete('/RequestAddCompany/delete/'+v)
        .then(async (response)=>{
       this.$toast.success("تم الحذف", );
       this.getCompany()
                     })
            },
                 delCharactour(v)
            {
        this.http.delete('/RequestAddCharacter/delete/'+v)
        .then(async (response)=>{
               this.$refs.accountDel.click()
           this.$toast.success("تم الحذف", );
                  this.getCharactour()
                     })
            },
                getCharactour()
            {
              this.http.post('/character/myAdded',{"user_id":this.$store.state.user.id,'social_token':this.token}, { headers: { Authorization: `Bearer ${this.token}` } })
        .then(async (response)=>{
        this.charactours = response.data.RequestAddCharactour
        this.requestToVerifyCharactour = response.data.RequestToVerifyCharactour
        this.waitingCharactour = response.data.RequestAddCharactour.filter((item) => {return (item.requestStatus == 0)})
        this.activeCharactour = response.data.RequestAddCharactour.filter((item) => {return (item.requestStatus == 1)})
        this.rejectCharactour = response.data.RequestAddCharactour.filter((item) => {return (item.requestStatus == -1)})
                     })
            },
    }
}
</script>

<style scoped>
.modal-footer{
        justify-content: space-between;
}
</style>
