<template>
    <picture   class="lozad"  data-iesrc="/web-asset/img/noResultC.png" data-alt="" v-if="accepted_sizes && accepted_sizes.length > 0">
        <source   :media="`(max-width:576px)`" :srcset="images[accepted_sizes[0]]"  v-if="accepted_sizes[0]" />
        <source   :media="`(max-width:768px)`" :srcset="images[accepted_sizes[1]]"  v-if="accepted_sizes[1]" />
        <source   :media="`(max-width:992px)`" :srcset="images[accepted_sizes[2]]"  v-if="accepted_sizes[2]" />
        <source   :media="`(max-width:1200px)`" :srcset="images[accepted_sizes[3]]"  v-if="accepted_sizes[3]" />
        <source   :media="`(max-width:1400px)`" :srcset="images[accepted_sizes[4]]"  v-if="accepted_sizes[4]" />
        <source   :media="`(min-width:1400px)`" :srcset="images[accepted_sizes[5]]"  v-if="accepted_sizes[5]" />
      <img :src="lazySrc" :style="'border-radius: 10px;width:'+fix+''"/> 
      
    </picture>


</template>
  
<script>
import lozad from 'lozad'
export default {
  
  name: 'AppImage',
  props: {
    fix: {
      type: String,
      default: '',
    },
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
    accepted_sizes: {
      type: Array,
      default() {
        return [{}]
      },
    },
    images: {
      type: Object,
      default: null,
    },
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
  

