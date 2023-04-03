<template>
    <div>
        <span>معلومات الحساب غير مكتملة، يرجى اكمالها</span>
        <button class="btn btn-light text-primary mx-2" @click.stop="clicked">الحساب الشخصي</button>

    </div>
</template>
<script>
export default {
  props: ["counter"],
  methods: {
    clicked() {
      this.$emit("click");
    }
  }
};
</script>