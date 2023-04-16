<template>
  <div class="container">
    <!-- Three columns of text below the carousel -->
    <div class="m-auto w-size">
      <p class="text-gray-80 py-2 fs-3 fw-bold pt-5 mt-3 text-center">{{ $t('kitchen') }}</p>
      <div class="nav justify-content-center p-0"></div>
    </div>
    <div class="row mx-1 m-auto d-flex justify-content-around py-5">
      <div class="col-lg-4 col-md-6 col-sm-12"   v-for="(kitchen, index) in kitchens"  :key=index  :class="index >= 6 ? 'd-none' : ''" >
        <div class="course_card">
          <div class="course_card_img">
            <viewer >
              <img v-for="(image, indexs) in kitchen.image" :key="indexs" :src="image.path" :alt='indexs' :class="indexs >= 1 ? 'd-none' : ''" >
            </viewer>
          </div>
          <div class="course_card_content">
            <h3 class="title">{{kitchen.title}}</h3>
            <p class="description">
             {{kitchen.description}}
            </p>
          </div>
          <div class="course_card_footer">
            <a class="nav-item" href="https://www.smartcodehub.com/blog">Add Review</a
            ><a class="nav-item" href="https://www.smartcodehub.com/blog">Learn More</a>
          </div>
        </div>
      </div>

    </div>
  </div>
  <!-- /.row -->
</template>
  
  <script>
export default {
  data() {
    return {
      kitchens:[],
      lang:this.$store.state.langFilter
    }},
methods:{
  getTestimonial() {
         this.http.get('/kitchen', { headers: { 'Accept-Language': this.lang } }).then(async (response) => {
        this.kitchens = response.data.data
      })
    }
},
created() {
    this.getTestimonial()
  },
}
</script>
  
  <style>
</style>