
<template>
   <img
      :src="lazySrc"
      :srcset="lazySrcset"
      :style="style"
      class="AppImage"
      /> 
</template>
<!-- <template>
  <div>
    <picture 
    v-if="this.Images != null  && this.Images != undefined && this.Accepted_sizes && this.Accepted_sizes.length > 0"
    >
      {{ 1 }}
      <div v-for="(value, idx) in this.Accepted_sizes" :key="idx">
        <div v-for="(image, index) in this.Images" :key="index">
          <source
            v-if="value.image_size.toString() == index.toString() && value.screen_size.toString() != '>1400px'"
            media="(max-width: `${value.screen_size}`)"
            :srcset="image"
            class="AppImage"
          />
          <source
            v-if="value.image_size.toString() == index.toString() && value.screen_size.toString() == '>1400px'"
            media="(min-width: 1400px)"
            :srcset="image"
            class="AppImage"
          />
        </div>
      </div>
      <img       
        :data-src="this.Src"
        :data-srcset="this.Srcset"
        :style="style"
        class="AppImage"
      /> 
    </picture>
    <template v-if="(this.Images == null || this.Images == undefined || this.Accepted_sizes.length <= 0)">
      <img
      :src="lazySrc"
      :srcset="lazySrcset"
      :style="style"
      class="AppImage"
      /> 
    </template>
  </div>
</template> 
in best company 
:images="company.image_variations"
              :accepted_sizes="[
                {screen_size:'576px',image_size:'60_60'},
                {screen_size:'768px',image_size:'69_69'},
                {screen_size:'992px',image_size:'93_93'},
                {screen_size:'1200px',image_size:'62_62'},
                {screen_size:'1400px',image_size:'74_74'},
                {screen_size:'>1400px',image_size:'74_74'},
              ]"
-->
  
<script>
import lozad from 'lozad'

export default {
  name: 'AppImage',
  props: {
    backgroundColor: {
      type: String,
      default: '#efefef',
    },
    height: {
      type: Number,
      default: null,
    },
    lazySrc: {
      type: String,
      default: null,
    },
    lazySrcset: {
      type: String,
      default: null,
    },
    width: {
      type: Number,
      default: null,
    },
    // accepted_sizes: {
    //   type: Array,
    //   default() {
    //     return [{}]
    //   },
    // },
    // images: {
    //   type: Object,
    //   default: null,
    // },
  },
  data() {
    return {
      loading: true,
      // Src:'',
      // Srcset: '',
      // Images: null,
      // Accepted_sizes: [{}],
    }
  },
  computed: {
    aspectRatio() {
      if (!this.width || !this.height) return null
      return (this.height / this.width) * 100
    },
    style() {
      // The background color is used as a
      // placeholder while loading the image.
      // You can use the dominant color of the
      // image to improve perceived performance.
      // See: https://manu.ninja/dominant-colors-for-lazy-loading-images/
      const style = { backgroundColor: this.backgroundColor }

      if (this.width) style.width = `${this.width}px`

      // If the image is still loading and an
      // aspect ratio could be calculated, we
      // apply the calculated aspect ratio by
      // using padding top.
      const applyAspectRatio = this.loading && this.aspectRatio
      if (applyAspectRatio) {
        // Prevent flash of unstyled image
        // after the image is loaded.
        style.height = 0;
        // Scale the image container according
        // to the aspect ratio.
        style.paddingTop = `${this.aspectRatio}%`
      }

      return style
    },
  },
  mounted() {
    // console.log('image_v',this.images)
    // console.log('sizes',this.accepted_sizes)
    // console.log('lazySrc',this.lazySrc)
    // console.log('lazySrcet',this.lazySrcset)
    // this.Src = this.lazySrc;
    // this.Srcset = this.lazySrcset;
    // this.Images = this.images;
    // this.Accepted_sizes = this.accepted_sizes;
    // As soon as the <img> element triggers
    // the `load` event, the loading state is
    // set to `false`, which removes the apsect
    // ratio we've applied earlier.
    const setLoadingState = () => {
      this.loading = false
    }
    this.$el.addEventListener('load', setLoadingState)
    // We remove the event listener as soon as
    // the component is destroyed to prevent
    // potential memory leaks.
    this.$once('hook:destroyed', () => {
      this.$el.removeEventListener('load', setLoadingState)
    })

    // We initialize Lozad.js on the root
    // element of our component.
    const observer = lozad(this.$el)
    observer.observe()
  },
};
</script>
  
  <style lang="scss">
// Responsive image styles.
.AppImage {
  max-width: 100%;
  max-height: 100%;
  width: auto;
  vertical-align: middle;
  min-height: 220px;
  height: 220px;
  object-fit: cover;
}
</style>