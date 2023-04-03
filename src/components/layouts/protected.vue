<template>
<div oncontextmenu="return false"   >


        <headers  :taps=header class="mb-5" />
          <router-view  :key='$route.fullPath'></router-view>
        <footers  :taps0=taps0  :taps1=taps1 class="mt-5" />

</div>
</template>
<script>
import headers from '../home/header.vue'
import footers from '../home/footers.vue'
export default {
    components: {
        headers,
        footers
      },
data() {

return {
  user:this.$store.state.user,
  footer:[],
  header:[],
  taps1:[],
  taps0:[]
  
}
},
      methods: {
    getFooter()
            {
        try {
          this.footer = JSON.parse(localStorage.getItem('footer')) ?JSON.parse(localStorage.getItem('footer')):[] ;
        this.header = JSON.parse(localStorage.getItem('header')) ?JSON.parse(localStorage.getItem('header')):[];
        } catch (error) {
          
        }
      
        if(this.header.length == 0 && this.header.length ==0 ){
          this.http.get('/headerFooter')
        .then(async (response)=>{
        this.footer = this._.orderBy(response.data.filter((item) => {return (item.type == 'footer')}),"order");
        this.header = this._.orderBy(response.data.filter((item) => {return (item.type == 'header')}),"order");
        this.taps0 =  this.footer.slice(0,3)
        this.taps1 =  this.footer.slice(3,10)   
        try {
          localStorage.setItem('header',JSON.stringify( this.header));
        localStorage.setItem('footer',JSON.stringify( this.footer));
        } catch (error) {
          
        } 

        
        //this.footer = JSON.parse(localStorage.getItem('tapsFooter'));
        //this.header = JSON.parse(localStorage.getItem('taps'));

                     })
        }
        else{
        try {
        this.taps0 =  this.footer.slice(0,3)
        this.taps1 =  this.footer.slice(3,10)     
        } catch (error) {
          
        }

        }

      },

    },
    created()
{
  this.getFooter()
}
};

</script>
<style scoped>
.mbs-5{
  padding-bottom: 2.7rem;
}
</style>