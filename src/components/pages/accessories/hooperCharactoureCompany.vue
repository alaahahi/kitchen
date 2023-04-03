<template>
  <hooper :settings="hooperSettings">
    <slide v-for="(charactour, index) in charactours" :key="index">
      <div class="card shadow m-3 rounded-btn-img pt-3 ps-3 pe-3">
        <div class="position-relative rounded-btn-img">
          <!-- <img
            v-if="charactour.image"
            class="rounded-btn-img w-100"
            :src="charactour.image"
            alt="carousel"
            style="min-height: 190px"
          /> -->
          <appImage
            v-if="charactour.image"
            class="rounded-btn-img w-100"
            alt="carousel"
            :lazySrc="charactour.image"
            :lazySrcset="charactour.image"
            style="
              max-width: unset;
              max-height: unset;
              width: unset;
              vertical-align: unset;
              min-height: 190px;
              height: unset;
              object-fit: unset;
            "
          />
          <!-- <img
            v-if="!charactour.image"
            class="rounded-btn-img w-100"
            src="/web-asset/img/noResul.jpg"
            alt="charactour"
          /> -->
          <appImage
            v-if="!charactour.image"
            class="rounded-btn-img w-100"
            alt="charactour"
            :lazySrc="'/web-asset/img/noResul.jpg'"
            :lazySrcset="'/web-asset/img/noResul.jpg'"
            style="
              max-width: unset;
              max-height: unset;
              width: unset;
              vertical-align: unset;
              min-height: unset;
              height: unset;
              object-fit: unset;            "
          />
          <div class="position-absolute custom-p translate-middle" :class="charactour.vip_person ? '' : 'd-none-s'">
                            <h5>
                                <span class="badge rounded-pill p-0 bg-prim-c">
                                <primarySvg />
                                </span>
                            </h5>
                        </div>
        </div>
        <div class="text-center pt-4" style="min-height: 135px">
          <h3 class="card-title fw-bold fs-4">{{ charactour.character_name_ar }}</h3>
          <p class="mb-2">
            <a
              :href="'/شخصيات/' + decodeURI(charactour.slug) + '/'"
              class="stretched-link text-decoration-none text-muted fw-bold fs-16"
            >
              {{ fixContent(charactour.content) | truncate(50, '..') }}</a
            >
          </p>
        </div>
      </div>
    </slide>

    <slide v-for="(company, index) in companices" :key="index">
      <div class="card shadow m-3 rounded-btn-img pt-3 ps-3 pe-3">
        <div class="position-relative p-1 rounded-btn-img" >
          <!-- <img
            v-if="company.image"
            class="rounded-btn-img w-100"
            :src="company.image"
            alt="carousel"
            style="min-height: 231px"
          /> -->
          <appImage
            v-if="company.image"
            class="rounded-btn-img w-100"
            alt="carousel"
            :lazySrc="company.image"
            :lazySrcset="company.image"
            style="
              max-width: unset;
              max-height: unset;
              width: unset;
              vertical-align: unset;
              min-height: 231px;
              height: unset;
              object-fit: unset;
            "
          />
          <!-- <img v-if="!company.image" class="rounded-btn-img w-100" src="/web-asset/img/noResul.jpg" alt="company" /> -->
          <appImage
            v-if="!company.image"
            class="rounded-btn-img w-100"
            alt="company"
            :lazySrc="'/web-asset/img/noResul.jpg'"
            :lazySrcset="'/web-asset/img/noResul.jpg'"
            style="
              max-width: unset;
              max-height: unset;
              width: unset;
              vertical-align: unset;
              min-height: unset;
              height: unset;
              object-fit: unset;"
          />
          <div class="position-absolute custom-p translate-middle" :class="company.vip_person ? '' : 'd-none-s'">
                            <h5>
                                <span class="badge rounded-pill p-0 bg-prim-c">
                                <primarySvg />
                                </span>
                            </h5>
                        </div>
        </div>
        <div class="text-center pt-4" style="min-height: 135px">
          <h3 class="card-title fw-bold fs-4">{{ company.nameAR }}</h3>
          <p class="m-0">
            <a
              :href="'/شركات/' + decodeURI(company.slug) + '/'"
              class="stretched-link text-decoration-none text-muted fw-bold fs-16"
              >{{ fixContent(company.information) | truncate(50, '..') }}</a
            >
          </p>
        </div>
      </div>
    </slide>

    <hooper-navigation slot="hooper-addons"></hooper-navigation>
  </hooper>
</template>

<script>
import { Hooper, Slide, Navigation as HooperNavigation } from 'hooper'
import 'hooper/dist/hooper.css'
import appImage from '../accessories/appImage.vue'
import primarySvg from './svg/primarySvg.vue'

export default {
  props: ['charactours', 'companices', 'hooperSettings'],
  computed: {
    showSliderNav: function () {},
  },
  components: {
    Hooper,
    Slide,
    HooperNavigation,
    appImage,
    primarySvg
  },
  data() {
    return {
      windowSize: window.innerWidth,
    }
  },
  created() {
    window.addEventListener('resize', this.resizeHandler)
  },
  destroyed() {
    window.removeEventListener('resize', this.resizeHandler)
  },
  methods: {
    resizeHandler(e) {
      this.windowSize = window.innerWidth
    },
    fixContent(value) {
      try {
        if (value) {
          if (value.split('.\r')[0].length > value.split('.<')[0].length) {
            return value.split('.<')[0]
          } else return value.split('.\r')[0]
        }
      } catch (error) {
        return ''
      }
    },
  },
  filters: {
    formatPositions: function (value) {
      if (!value) return ''
      if (value) {
        try {
          value = JSON.parse(value)[0]
            .postion.trim()
            .replace(/u([0-9A-F]{0,4})/g, '&#x$1')
        } catch (error) {
          return ''
        }
        return value
      }
    },
  },
}
</script>

<style>
.p-c {
  top: 10px;
  right: 10px;
}

.CharactoureCompany .hooper-track {
  justify-content: center;
}
</style>
