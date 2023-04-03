<template>
<div class="container-fluid">
      <div class="row">
        <nav class="navbar navbar-expand-lg bg-white">
          <div class="container">
            <router-link class="navbar-brand" to="/"
              ><img class="w-25" src="/web-asset/img/logo.png" alt="logo ManHOM"
            /></router-link>
            <button
              class="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarScroll"
            >
              <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarScroll">
              <ul class="navbar-nav py-2 my-lg-0 w-100">
                <li class="nav-item dropdown me-lg-auto py-lg-3">
                  <router-link
                    class="nav-link fw-bold fs-6 dropdown-toggle"
                    to="#"
                    id="navbarScrollingDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    الإمارات
                  </router-link>
                  <ul
                    class="dropdown-menu"
                    aria-labelledby="navbarScrollingDropdown"
                  >
                    <li>
                      <router-link class="dropdown-item" to="#"
                        >سوريا</router-link
                      >
                    </li>
                    <li>
                      <router-link class="dropdown-item" to="#"
                        >مصر</router-link
                      >
                    </li>
                    <li>
                      <router-link class="dropdown-item" to="#"
                        >العراق</router-link
                      >
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
</div>
</template>

<script>
export default {
}
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
  color: black;
  margin: 5px 0;
  text-align: right;
}
.router-link-exact-active {
  border-radius: 20px 0px 0px 20px;
  background-color: #4169e32e;
  border-right: 5px #4169e3 solid;
  color: #4169e3;
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
</style>