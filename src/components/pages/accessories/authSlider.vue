<template>
    <div class="container my-5">
        <h1 class="my-5 text-center pt-5">
            مميزات وإضافات غير محدودة 
        </h1>
        <hooper ref="carousel" @slide="updateCarousel" :settings="hooperSettings">
            <slide>
                <div class="card m-2 border-none bg-white rounded-btn-img">
                    <div class="p-5 text-center">
                        <div class="d-inline p-3 rounded-circle bg-light"><img class="logo-ads"
                                src="/web-asset/img/true.png" alt="logo ManHOM"></div>
                    </div>
                    <div class="card-body text-center">
                        <h5 class="card-title  fw-bold">تصحيح المعلومات</h5>
                        <a href="#" class="text-muted text-decoration-none fs-5">فريق التحرير محترف حريص علي مراجعة اي
                            معلومة قد تكون مغلوطة أو منقوصة</a>
                    </div>
                </div>
            </slide>
            <slide>
                <div class="card m-2 border-none bg-white rounded-btn-img">
                    <div class="p-5 text-center">
                        <div class="d-inline p-3 rounded-circle bg-light"><img class="logo-ads"
                                src="/web-asset/img/node.png" alt="logo ManHOM"></div>
                    </div>
                    <div class="card-body text-center">
                        <h5 class="card-title  fw-bold">تقارير الزوار</h5>
                        <a href="#" class="text-muted text-decoration-none fs-5">يتم ربط صفحتك بالبريد الإلكتروني لتصلك
                            بإستمرار تقارير عن عدد زوار صفحتك</a>
                    </div>
                </div>
            </slide>
            <slide>
                <div class="card m-2 border-none bg-white rounded-btn-img">
                    <div class="p-5 text-center">
                        <div class="d-inline p-3 rounded-circle bg-light"><img class="logo-ads"
                                src="/web-asset/img/network.png" alt="logo ManHOM"></div>
                    </div>
                    <div class="card-body text-center">
                        <h5 class="card-title  fw-bold">تصحيح المعلومات</h5>
                        <a href="#" class="text-muted text-decoration-none fs-5">فريق التحرير محترف حريص علي مراجعة اي
                            معلومة قد تكون مغلوطة أو منقوصة</a>
                    </div>
                </div>
            </slide>
            <!-- <hooper-navigation slot="hooper-addons"></hooper-navigation> -->
        </hooper>
        <div class="position-relative mt-5 pt-3">
            <div class="carousel-indicators ">
                <input type="button" data-bs-target="#carouselExampleIndicators" class="w-25"
                    :class="active == 0 ? 'activeBtn' : 'bg-secondary'" @click.prevent="goto(0)">
                <input type="button" data-bs-target="#carouselExampleIndicators" class="w-25 "
                    :class="active == 1 ? 'activeBtn' : 'bg-secondary'" @click.prevent="goto(1)">
                <input type="button" data-bs-target="#carouselExampleIndicators" class="w-25"
                    :class="active == 2 ? 'activeBtn' : 'bg-secondary'" @click.prevent="goto(2)" v-if="showIndicators">
            </div>
            <input v-model="carouselData" type="number" min="0" max="5" class="d-none">
        </div>
    </div>
</template>

<script>
import { Hooper, Slide, Navigation as HooperNavigation } from 'hooper';
export default {
    components:
    {
        Hooper,
        Slide,
        HooperNavigation,
    }
    , data() {
        return {
            windowSize: window.innerWidth,
            active: 0,
            carouselData: 0,
            hooperSettings: {
                touchDrag: true,
                itemsToSlide: 1,
                rtl: true,
                mouseDrag: false,
                wheelControl: false,

                itemsToShow: 1,
                breakpoints: {
                    800: {
                        centerMode: false,
                        itemsToShow: 1
                    },
                    1000: {
                        itemsToShow: 2,
                    }
                }
            },
        }
    },
    computed: {
        showIndicators: function () {
            return this.windowSize <=800
        }
    },
    watch: {
        carouselData() {
            this.$refs.carousel.slideTo(this.carouselData);
        }
    },
    created() {
        window.addEventListener("resize", this.resizeHandler);
    },
    destroyed() {
        window.removeEventListener("resize", this.resizeHandler);
    },
    methods: {
        goto(v) {
            this.carouselData = v
            this.active = v
        },
        updateCarousel(payload) {
            this.myCarouselData = payload.currentSlide;
        },
        resizeHandler(e) {
            this.windowSize = window.innerWidth
        },
    }


}
</script>

<style>
.activeBtn {
    background-color: #4169E3 !important;
}

.carousel-indicators [data-bs-target] {
    opacity: 1 !important;
}
</style>
