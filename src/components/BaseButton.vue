<script setup>
const aaa = () => {};
</script>

<template>
  <button class="btn" @click="aaa"><slot /></button>
</template>

<style scoped>
.btn {
  padding: 8px;
  background-color: #03a9f4;
  border-radius: 6px;
  color: #fff;
  text-align: center;
  font-size: 14px;
}
</style>
