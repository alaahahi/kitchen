 <template>
         <div class="container text-center mb-5">
        <h1 class="py-4  fw-bold"  v-resize-text="{ratio:1.5, minFontSize: '12px', maxFontSize: '48px'}">  أهلاً بك في من هم؟ <div   class="position-relative text-fix  text-primary"><div class="text-price" ></div>  أكبر دليل للشخصيات العربية </div></h1>
         <p class="fw-bold text-black-80 pt-2"  style="min-height: 44px;" v-resize-text="{ratio:1.5, minFontSize: '10px', maxFontSize: '24px'}">
          
              <span  v-if="liveCount1" > تعرف على 
     

        
        <animated-number
          :value=liveCount1
          :formatValue="formatToPrice"
          :duration="2000"
          
        />,
  
        <animated-number
          :value=liveCount2
          :formatValue="formatToPrice"
          :duration="1600"
        />

        
   شخصية ومؤسسة
  </span>
  </p>
         </div>
 </template>
<script>
import AnimatedNumber from "animated-number-vue";

export default {
  props:['liveCount1','liveCount2'],
   components: {
    AnimatedNumber
  },   
    data() {
        return {
                  value: 119,
                 value1: 480

        }
    },
      methods: {
    formatToPrice(value) {
      return value.toFixed(0);
    }
  }
    
};
</script>
