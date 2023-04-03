<template>
    <div class="col-md-8">
    <div >
        <h2 class="py-3 text-primary"> أهلاً {{user.firstname}}</h2>
        <h3 class="py-3">الأشعارات</h3>
        <section class="best-company-groups bg-white">
                <div class="container">
            
                    </div>
            </section>
    </div>

  </div>
</template>

<script>

export default {
  
    data() {
        return {
            user:this.$store.state.user,
        }
    },
}
</script>

<style>

</style>