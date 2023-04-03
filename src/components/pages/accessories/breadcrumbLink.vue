<template>
      <div class="container pt-3">
      <nav style="--bs-breadcrumb-divider: ''" aria-label="breadcrumb">
        <ol class="breadcrumb">
          <li v-for="(item,index,) in data" :key=index class="breadcrumb-item">
            <a
              :href=item.link
              class="text-decoration-none fs-6 text-black fw-bold"
              >{{item.name }}</a
            >
            <span class="px-2" v-if="index != data.length-1">/</span>
          </li>
        </ol>
      </nav>
    </div>
</template>

<script>
export default {
props:['data']
}
</script>

<style>
@media screen and (max-width: 480px) {
 .fs-6{font-size:12px !important;}      
}

</style>