<template>
    <hooper :settings="hooperSettings" >
        <slide v-for="(slider, index) in sliders" :key=index >
            <div >
                <div class="position-relative p-1 rounded-btn-img" >
                        <app-image
                     
                        lazy-src="/web-asset/img/noResul.jpg"  
                        class=" rounded-btn-img w-100"  
                        data-background-image="/web-asset/img/noResulw.jpg"  
                        src="/web-asset/img/noResul.jpg" 
                        :lazy-srcset="slider.image"/>
                        
           
                        <div class="position-absolute custom-p translate-middle" :class="slider.vip_person ? '' : 'd-none-s'">
                            <h5>
                                <span class="badge rounded-pill p-0 bg-prim-c">
                                <primarySvg />
                                </span>
                            </h5>
                        </div>
                </div>
            </div>
        </slide>

        <hooper-navigation slot="hooper-addons"></hooper-navigation>
    </hooper>
</template>

<script>
import { Hooper, Slide, Navigation as HooperNavigation } from 'hooper';
import 'hooper/dist/hooper.css';
import appImage from './appImage.vue'
import appPicture from './appPicture.vue'
import primarySvg from './svg/primarySvg.vue'

export default {
    props: ['sliders', 'hooperSettings'],
    components:
    {
        Hooper,
        Slide,
        HooperNavigation,
        appImage,
        appPicture,
        primarySvg
    },
    data() {
        return {
        }
    },
    methods: {
        fixContent(value) {
            try {
                if (value) {
                    if (((value.split(".\r"))[0]).length > ((value.split(".<"))[0]).length) {
                        return (value.split(".<"))[0]
                    }
                    else return (value.split(".\r"))[0]
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
                    value = (JSON.parse(value)[0]).postion.trim().replace(/u([0-9A-F]{0,4})/g, '&#x$1')
                } catch (error) {
                    return ""
                }
                return value
            }
        }
    },
}
</script>

<style>
.p-c {
    top: 10px;
    right: 10px;
}
</style>
