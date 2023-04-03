<template>
  <div>
    <button
      v-if="user && !storedSearchesCompany.includes(Number(id))"
      @click="postFollowCompany(id)"
      class="btn px-3 fs-16 btn-outline-primary resultsMost"
    >
      <svg width="22" height="24" viewBox="0 0 22 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M10.4945 0.950684C7.0029 0.950684 4.14681 3.80881 4.14681 7.30038C4.14681 9.43532 5.21782 11.3259 6.84603 12.4761C3.05587 13.9956 0.367518 17.7026 0.367518 22.0269C0.337259 23.3902 2.39778 23.3902 2.36752 22.0269C2.36752 17.4369 6.06847 13.7378 10.6585 13.7378C12.2608 13.7378 13.7481 14.1945 15.014 14.978C16.152 15.6759 17.1989 13.969 16.0609 13.2711C15.4909 12.9184 14.8733 12.6434 14.2367 12.4058C15.8084 11.2496 16.8363 9.39288 16.8363 7.30038C16.8363 3.80881 13.986 0.950684 10.4945 0.950684ZM10.4945 2.95268C12.9052 2.95268 14.8363 4.88968 14.8363 7.30038C14.8363 9.71107 12.9052 11.6401 10.4945 11.6401C8.08378 11.6401 6.14681 9.71107 6.14681 7.30038C6.14681 4.88968 8.08378 2.95268 10.4945 2.95268ZM16.6292 19.9683V21.9683C16.6582 23.2724 18.6003 23.2724 18.6292 21.9683V19.9683H20.6312C21.9658 19.9683 21.9658 17.9664 20.6312 17.9664H18.6292V15.9664C18.6357 15.4057 18.1802 14.9491 17.6195 14.9546C17.0664 14.9584 16.6228 15.4134 16.6292 15.9664V17.9664H14.5814C13.1989 18.0303 13.2946 20.0321 14.6292 19.9683H16.6292Z"
          fill="#4169E3"
        />
      </svg>
      متابعة
    </button>

    <button
      v-if="user && storedSearchesCompany.includes(Number(id))"
      @click="postUnFollowCompany(id)"
      class="btn px-3 fs-16 btn-outline-primary resultsMost"
    >
      <svg width="22" height="24" viewBox="0 0 22 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M10.4863 0.9729C6.99475 0.9729 4.14648 3.83091 4.14648 7.32248C4.14648 9.45685 5.21449 11.3479 6.83984 12.4982C3.04878 14.0173 0.359375 17.724 0.359375 22.049C0.365176 22.3104 0.47308 22.5591 0.659985 22.7419C0.846889 22.9247 1.09794 23.0271 1.35938 23.0271C1.62081 23.0271 1.87186 22.9247 2.05877 22.7419C2.24567 22.5591 2.35357 22.3104 2.35938 22.049C2.35938 17.459 6.06032 13.7599 10.6504 13.7599C12.2526 13.7599 13.7399 14.2167 15.0059 15.0002C15.1179 15.0698 15.2427 15.1166 15.3729 15.1379C15.5031 15.1593 15.6362 15.1547 15.7647 15.1246C15.8931 15.0944 16.0144 15.0391 16.1214 14.962C16.2285 14.8849 16.3193 14.7876 16.3887 14.6753C16.4581 14.5631 16.5046 14.4382 16.5256 14.3079C16.5467 14.1777 16.5418 14.0445 16.5113 13.9161C16.4808 13.7877 16.4253 13.6666 16.348 13.5597C16.2706 13.4528 16.173 13.3623 16.0605 13.2932C15.4901 12.9402 14.8709 12.6638 14.2324 12.426C15.8053 11.2698 16.8359 9.41426 16.8359 7.32248C16.8359 3.83091 13.9779 0.9729 10.4863 0.9729ZM10.4863 2.97478C12.897 2.97478 14.8359 4.91178 14.8359 7.32248C14.8359 9.73318 12.897 11.6623 10.4863 11.6623C8.07563 11.6623 6.14648 9.73318 6.14648 7.32248C6.14649 4.91178 8.07563 2.97478 10.4863 2.97478ZM20.6074 14.9768C20.4449 14.9815 20.2859 15.0257 20.1444 15.1056C20.0028 15.1856 19.8828 15.299 19.7949 15.4358L16.3477 20.6018L14.1855 19.1545C14.0759 19.0808 13.9528 19.0294 13.8233 19.0034C13.6938 18.9774 13.5604 18.9771 13.4308 19.0027C13.3012 19.0283 13.1779 19.0793 13.068 19.1527C12.9581 19.226 12.8638 19.3203 12.7904 19.4302C12.717 19.54 12.6661 19.6632 12.6404 19.7928C12.6148 19.9224 12.615 20.0559 12.641 20.1854C12.667 20.315 12.7183 20.4381 12.792 20.5477C12.8656 20.6574 12.9602 20.7514 13.0703 20.8244L16.0762 22.8244C16.1857 22.8971 16.3084 22.9475 16.4374 22.9727C16.5664 22.9978 16.699 22.9973 16.8278 22.9712C16.9566 22.945 17.079 22.8938 17.1879 22.8204C17.2969 22.747 17.3903 22.6528 17.4629 22.5432L21.4648 16.5413C21.5692 16.3888 21.6293 16.2104 21.6384 16.0258C21.6476 15.8413 21.6054 15.6578 21.5166 15.4957C21.4278 15.3337 21.2958 15.1994 21.1353 15.1078C20.9748 15.0162 20.7921 14.9709 20.6074 14.9768Z"
          fill="#4169E3"
        />
      </svg>
      تمت المتابعة
    </button>
    <div class="position-relative d-inline" v-if="!user">
      <div class="position-absolute top-0 start-100 translate-middle">
        <img src="/web-asset/img/lock.png" alt="lock" width="26px" />
      </div>
      <router-link :to="{ name: 'login' }" class="btn px-3 fs-16 btn-outline-secondary resultsMost">
        <svg width="22" height="24" viewBox="0 0 22 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M10.4945 0.951172C7.0029 0.951172 4.14681 3.8093 4.14681 7.30087C4.14681 9.43581 5.21782 11.3264 6.84603 12.4766C3.05587 13.9961 0.367518 17.703 0.367518 22.0274C0.337259 23.3907 2.39778 23.3907 2.36752 22.0274C2.36752 17.4373 6.06847 13.7383 10.6585 13.7383C12.2608 13.7383 13.7481 14.195 15.014 14.9785C16.152 15.6764 17.1989 13.9695 16.0609 13.2715C15.4909 12.9189 14.8733 12.6439 14.2367 12.4062C15.8084 11.2501 16.8363 9.39336 16.8363 7.30087C16.8363 3.8093 13.986 0.951172 10.4945 0.951172ZM10.4945 2.95316C12.9052 2.95316 14.8363 4.89017 14.8363 7.30087C14.8363 9.71156 12.9052 11.6406 10.4945 11.6406C8.08378 11.6406 6.14681 9.71156 6.14681 7.30087C6.14681 4.89017 8.08378 2.95316 10.4945 2.95316ZM16.6292 19.9688V21.9688C16.6582 23.2728 18.6003 23.2728 18.6292 21.9688V19.9688H20.6312C21.9658 19.9688 21.9658 17.9669 20.6312 17.9669H18.6292V15.9669C18.6357 15.4062 18.1802 14.9496 17.6195 14.9551C17.0664 14.9589 16.6228 15.4138 16.6292 15.9669V17.9669H14.5814C13.1989 18.0308 13.2946 20.0326 14.6292 19.9688H16.6292Z"
            fill="#828282"
          />
        </svg>
        متابعة
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  props: ['id'],
  data() {
    return {
      user: this.$store.state.user,
    }
  },
  computed: {
    storedSearchesCompany: function () {
      return localStorage.followed_companies === undefined ? [] : [...JSON.parse(localStorage.followed_companies)]
    },
  },
  methods: {
    onEnter(id) {
      let storedSearches = this.storedSearchesCompany
      if (!storedSearches.includes(id)) {
        storedSearches.push(id)
        localStorage.followed_companies = JSON.stringify(storedSearches)
      }
    },
    onUnEnter(id) {
      let storedSearches = this.storedSearchesCompany
      var index = storedSearches.indexOf(id)
      if (index !== -1) {
        storedSearches.splice(index, 1)
        localStorage.followed_companies = JSON.stringify(storedSearches)
      }
    },
    postUnFollowCompany(v) {
      this.http
        .post(
          '/unfollowCompany',
          {
            company_id: v,
            user_id: this.$store.state.user.id,
          },
          { headers: { Authorization: `Bearer ${this.$store.state.token}` } }
        )
        .then(async (response) => {
          this.getCompanyfollowUser()
          this.onUnEnter(v)
          this.$forceUpdate()
          this.$toast.info(' تم إلغاء المتابعة بنجاح')
        })
        .catch((error) => {
          return ''
        })
    },

    postFollowCompany(v) {
      this.http
        .post(
          '/followCompany',
          {
            company_id: v,
            user_id: this.$store.state.user.id,
          },
          { headers: { Authorization: `Bearer ${this.$store.state.token}` } }
        )
        .then(async (response) => {
          this.$toast.info(' تم المتابعة بنجاح')
          this.onEnter(v)
          this.$forceUpdate()
        })
        .catch((error) => {
          if (error.response.data.errorCode == 402) {
            this.$toast.warning('يجب عليك اكمال معلوماتك أولا لمتابعة الشركة')
          } else {
            this.$toast.warning('لم يتم المتابعة ')
          }
        })
    },
  },
}
</script>
<style scoped>
.btn-outline-primary:hover {
  color: #0d6efd;
  background-color: #fff;
  border-color: #0d6efd;
}
.btn-outline-primary:active {
  color: #0d6efd;
  background-color: #fff;
  border-color: #0d6efd;
}
.btn-outline-primary:focus {
  color: #0d6efd !important;
  background-color: #fff !important;
  border-color: #0d6efd;
}
.btn-outline-secondary:hover {
  color: #6c757d;
  background-color: #fff;
  border-color: #6c757d;
}
.btn-outline-secondary:active {
  color: #6c757d;
  background-color: #fff;
  border-color: #6c757d;
}
.btn-outline-secondary:focus {
  color: #6c757d !important;
  background-color: #fff !important;
  border-color: #6c757d;
}
</style>