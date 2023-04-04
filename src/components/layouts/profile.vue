<template>
<div>
   
  <headers  :taps=header class="mb-5" />
      <div class="container-fluid bg-white my-5">
      <div class="row py-3">
        <div class="col-lg-3 p-5 pt-3">
          <div class="border rdir  rounded-btn-img" style="box-shadow: 0px 0px 24px rgba(32, 33, 31, 0.06);">
            <div class="text-center pt-5 " >
              <img v-if="!user.avatar"
                class="avatar  rounded-circle"
                src="/web-asset/img/v-image.png"
                alt="logo ManHOM"
                width="40%"
              />
              <img v-if="user.avatar "
                class=" avatar  rounded-circle"
                :src=user.avatar
                alt="logo ManHOM"
              />
              <p class="pt-2 fs-6 fw-bold text-gray-60 ">مرحباَ بك</p>
              <h5 class="fw-bold">{{user.firstname | userFilter(user.lastname)}}</h5>
              <hr class="mx-2 text-center" />
              <ul class="nav flex-column">
                <li class="nav-item">
                  <router-link class="nav-link fw-bold" to="/profile">
                     الملف
                    الشخصي
                      <svg style="width:24px;" class="h-6 w-6 ms-2" xmlns="http://www.w3.org/2000/svg"   fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg></router-link
                  >
                </li>
                <li class="nav-item">
                  <router-link class="nav-link fw-bold" to="/characterYoufollowerPage">
                    متابعاتي
                    <svg xmlns="http://www.w3.org/2000/svg" style="width:24px;" class="h-6 w-6 ms-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                    </router-link>
                </li>
                <li class="nav-item">
                  <router-link class="nav-link fw-bold" href="#" to="/myAdds">
                   إضافاتي
                    <svg xmlns="http://www.w3.org/2000/svg" style="width:24px;" class="h-6 w-6 ms-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                    </svg>
                    </router-link
                  >
                </li>
                <li class="nav-item " v-if="user.user_type_id != 1">
                  <router-link class="nav-link fw-bold" to="/mySubscription"
                    >
                    إشتراكاتي

                <svg style="width:24px;" class="h-6 w-6 ms-2" xmlns="http://www.w3.org/2000/svg"   fill="currentColor" viewBox="0 0 24 24" stroke="none"  >
                <path d="M7.00806 2.99072C6.80706 3.00272 6.53106 3.08672 6.38306 3.20972C6.33406 3.25072 6.19204 3.38773 6.16504 3.42873L2.20205 9.39274C2.06205 9.58375 1.99805 9.83874 1.99805 9.99474C1.99805 10.4237 2.27906 10.6817 2.27906 10.6817L11.217 21.6198C11.223 21.6278 11.543 22.0018 11.998 21.9948C12.453 21.9868 12.773 21.6278 12.779 21.6198C13.058 21.2788 21.751 10.6438 21.751 10.6438C21.751 10.6438 21.998 10.3037 21.998 9.99474C21.998 9.68473 21.76 9.33974 21.76 9.33974L17.842 3.43172C17.814 3.39072 17.75 3.40472 17.717 3.36972C17.677 3.32172 17.672 3.25372 17.623 3.21272C17.475 3.08972 17.3 3.07772 17.123 3.05672C17.075 3.04972 17.047 2.99472 16.998 2.99472H16.904L7.00806 2.99072ZM9.12305 4.99472H14.873L11.998 8.43174L9.12305 4.99472ZM7.09205 5.68172L9.87305 8.99473H4.87305L7.09205 5.68172ZM16.904 5.68172L19.123 8.99473H14.123L16.904 5.68172ZM5.12305 10.9947H10.998V18.1818L5.12305 10.9947ZM12.998 10.9947H18.873C17.478 12.6987 14.725 16.0718 12.998 18.1818V10.9947Z" />
                </svg>
                    </router-link
                  >
                </li>
                <!--
                <li class="nav-item">
                  <router-link class="nav-link fw-bold" to="/notficition">
                    جرس
                    الإشعارات
                <svg style="width:24px;" class="h-6 w-6 ms-2" xmlns="http://www.w3.org/2000/svg"   fill="currentColor" viewBox="0 0 24 24" stroke="none"  >
                <path d="M11.9904 1.99902C8.43814 1.99902 5.99044 4.44703 5.99044 7.99904C5.99044 8.48404 5.99044 9.96905 5.99044 9.99905C5.99044 10.321 5.82784 10.54 5.27164 10.999C5.20854 11.051 4.94404 11.278 4.86544 11.343C3.60004 12.389 2.97724 13.369 2.99044 14.999C3.00374 16.647 4.34714 17.9801 5.99044 17.9991H9.16644C9.16644 17.9991 8.99044 18.6101 8.99044 18.9991C8.99044 20.6561 10.3334 21.9991 11.9904 21.9991C13.6474 21.9991 14.9904 20.6561 14.9904 18.9991C14.9904 18.6101 14.8224 17.9991 14.8224 17.9991H17.9904C19.6304 18.0051 20.9924 16.654 20.9904 14.999C20.9884 13.381 20.3644 12.384 19.1154 11.343C19.0334 11.274 18.7434 11.053 18.6774 10.999C18.1334 10.545 17.9904 10.317 17.9904 9.99905C17.9904 8.74904 17.9904 7.99904 17.9904 7.99904C17.9904 4.44703 15.5424 1.99902 11.9904 1.99902ZM11.9904 3.99903C14.4384 3.99903 15.9904 5.55103 15.9904 7.99904C15.9904 7.99904 15.9904 8.74904 15.9904 9.99905C15.9904 11.061 16.4384 11.731 17.3964 12.53C17.4724 12.593 17.7934 12.845 17.8654 12.905C18.7034 13.604 18.9894 14.077 18.9904 14.999C18.9914 15.543 18.5254 16.001 17.9904 15.999C17.8014 15.998 14.8904 15.998 11.9904 15.999C9.09074 16 6.20294 16.001 5.99044 15.999C5.43224 15.992 4.99494 15.554 4.99044 14.999C4.98304 14.079 5.26894 13.605 6.11544 12.905C6.18454 12.848 6.48024 12.59 6.55294 12.53C7.52614 11.726 7.99044 11.071 7.99044 9.99905C7.99044 9.96905 7.99044 8.48404 7.99044 7.99904C7.99044 5.55103 9.54274 3.99903 11.9904 3.99903ZM11.9904 17.9991C12.5424 17.9991 12.9904 18.4471 12.9904 18.9991C12.9904 19.5511 12.5424 19.9991 11.9904 19.9991C11.4384 19.9991 10.9904 19.5511 10.9904 18.9991C10.9904 18.4471 11.4384 17.9991 11.9904 17.9991Z" />
                </svg>
                    </router-link
                  >
                </li>
                -->
              </ul>
            </div>
            <hr class="mx-2 text-center" />
            <ul class="nav flex-column">
              <li class="nav-item">
                <a @click.prevent="logout()" class="nav-link fw-bold" href=""
                  >
                  تسجيل الخروج
                               <svg style="width:24px;" class="h-6 w-6 ms-2" xmlns="http://www.w3.org/2000/svg"   fill="currentColor" viewBox="0 0 24 24" stroke="none"  >
                                <path d="M2.99023 6.99072C2.99023 4.78172 4.78113 2.99072 6.99023 2.99072H10.9902C13.1993 2.99072 14.9902 4.78172 14.9902 6.99072C14.9902 7.54272 14.5425 7.99072 13.9902 7.99072C13.4379 7.99072 12.9902 7.54272 12.9902 6.99072C12.9902 5.88572 12.0948 4.99072 10.9902 4.99072H6.99023C5.88563 4.99072 4.99023 5.88572 4.99023 6.99072V16.9907C4.99023 18.0957 5.88563 18.9907 6.99023 18.9907H10.9902C12.0948 18.9907 12.9902 18.0957 12.9902 16.9907C12.9902 16.4387 13.4379 15.9907 13.9902 15.9907C14.5425 15.9907 14.9902 16.4387 14.9902 16.9907C14.9902 19.1997 13.1993 20.9907 10.9902 20.9907H6.99023C4.78113 20.9907 2.99023 19.1997 2.99023 16.9907V6.99072ZM9.99023 11.9907C9.99023 11.4387 10.4379 10.9907 10.9902 10.9907H17.9902V7.99072L21.9902 11.9907L17.9902 15.9907V12.9907H10.9902C10.4379 12.9907 9.99023 12.5427 9.99023 11.9907Z" />
                                </svg>

                  </a
                >
              </li>
            </ul>
          </div>
        </div>
          <router-view></router-view>
      </div>
    </div>
    <footers :taps0=taps0  :taps1=taps1  />
</div>
</template>
<script>
import headers from '../home/header.vue'

import footers from '../home/footers.vue'
import headerProfile from '../home/header.vue'
export default {
        metaInfo: {
      title: 'من هم ؟ | حسابي'
    },
        components: {
        footers,headers
      },
        data() {
    return {
      user: this.$store.state.user,
      footer:[],
      header:[],
      taps1:[],
      taps0:[]

      }
      },
      methods: {
      logout: function () {
      localStorage.removeItem('isLoggedIn')
      localStorage.removeItem('tokenWeb')
      localStorage.removeItem('userWeb')
      localStorage.removeItem('subscription')
      this.$cookies.remove('token');
      this.$cookies.set('isLoggedIn',false );
      this.$cookies.remove('userWeb');
      this.$cookies.remove('subscription');
      this.$store.state.subscription = ""
      this.$store.state.user = ""
      this.$router.go()
    },
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
    filters: {
    userFilter: function (string,value) {
      if (!string) return "";
      if (string == value) {
          return string;
      }
      if (!value){
                return string;
            }else {
                return string + ' ' + value;
            }
    },},
    created()
{
  this.getFooter()
}
};
</script>
<style scoped>
.start-0-c {
  left: 15px !important;
}
.navbar {
  height: 60px;
  margin-top: 0;
  margin-bottom: 0;
}
.nav-link {
  color: #6c757d ;
  margin: 5px 0;
  text-align: right;
}
.router-link-exact-active {
  border-radius: 20px 0px 0px 20px;
  background-color: #4B91F12e;
  border-right: 5px #4B91F1 solid;
  color: #4B91F1;
  font-weight: bold;
}
.rdir {
  direction: ltr;
  padding: 20px 0px 20px 20px;
}
.profImg {
  width: 40px;
}
.dropdown-toggle1::after {
  display: none !important;
}
.form-check .form-check-input {
  float: none;
  margin-left: 0;
}
.avatar{
    width:135px;
   height:135px;
   object-fit: cover;
}

</style>
