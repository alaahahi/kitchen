<template>
  <div>
    <div v-for="(charactour, index) in resultsCompanySerach" :key="index" class="ps-2">
      <div class="w-100 text-center text-md-end pt-1 px-2 ps-4 my-1 pb-2">
        <div class="row text-center text-md-end">
          <div class="col-md-12 g-0" style="min-height: 106px">
            <img
              v-if="!charactour.image"
              class="img-fluid float-end ms-3 search-img"
              src="/web-asset/img/companydef.JPG"
            />
            <img v-if="charactour.image" class="img-fluid float-end ms-3 search-img" :src="charactour.image" />
            <div>
              <h4 class="card-title mb-0 pe-2 p-0 fw-bold pt-1 fs-5">
                <a
                  @click="feadback(2, charactour.id,index+1,q)"
                  :href="'/شركات/' + decodeURI(charactour.slug) + '/'"
                  class="text-black text-decoration-none"
                >
                  {{ charactour.name }}
                </a>
                <button class="btn btn-light fs-6 me-3 fw-bold bg-c px-3 py-2 rounded-btn px-4 fs-16 disabled">
                  شركة
                </button>
              </h4>
              <h2 class="fs-16 pt-2 d-flex pe-2 mb-0 text-decoration-none pt-2" style="min-height: 38px">
                {{ charactour.content | truncate(100, '..') }}
              </h2>
            </div>
            <div class="clearfix"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ['resultsCompanySerach','q'],
  data() {
    return {
   
    }
  },
  watch: {},
  methods: {
    feadback(type, id,order,q) {
      this.http.post('/log_success_search?type=' + type + '&id=' + id+'&item_order='+order+'&q='+q ).then(async (response) => {})
    },
  },
}
</script>
<style scoped>
</style>
    
    