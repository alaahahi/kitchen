<template>
  <div class="container">
    <!-- Three columns of text below the carousel -->
    <div class="m-auto w-size">
      <p class="text-gray-80 py-2 fs-3 fw-bold pt-5 mt-3 text-center">{{ $t('kitchen') }}</p>
      <div class="nav justify-content-center p-0"></div>
    </div>
    <div class="row mx-1 m-auto d-flex justify-content-around py-5">
      <div class="col-lg-4 col-md-6 col-sm-12" v-for="src in images" :key="src">
        <div class="course_card">
          <div class="course_card_img">
            <viewer >
                <img  :src="src" />
            </viewer>
          </div>
          <div class="course_card_content">
            <h3 class="title">Angular Typescript</h3>
            <p class="description">
              When we are no longer able to change a situation - we are challenged to change ourselves. Spread love
              everywhere you go. Let no one ever come to you without leaving happier. Problems are not stop signs, they
              are guidelines.
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
      images: ['https://picsum.photos/200/200', 'https://picsum.photos/300/200', 'https://picsum.photos/250/200'],
    }
  },
  methods: {
    show() {
      this.$viewerApi({
        options: {
          toolbar: false,
        },
        images: this.images,
      })
    },
  },
}
</script>
  
  <style>
</style>