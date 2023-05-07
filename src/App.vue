<script setup>
import TheHeader from './components/TheHeader.vue';
import TheFooter from './components/TheFooter.vue';
import MainTodo from './components/MainTodo.vue';
</script>

<template>
  <div class="wrap">
    <div><TheHeader /></div>
    <main class="main"><MainTodo /></main>
    <div><TheFooter /></div>
  </div>
</template>

<style>
@import 'assets/css/destyle.css';

.wrap {
  display: flex;
  flex-direction: column;
  /* align-items: center;これがあるとヘッダーの背景色の幅が狭くなる */
  min-height: 91vh;
  width: 370px;
  margin: 0 auto;
  font-family: sans-serif;
}

.main {
  /* <text-align: left> はメインを左に寄せるために追加した*/
  text-align: left;
  flex: 1;
  width: 100%;
}
</style>
