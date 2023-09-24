<template>
  <div>
    hello world
    <button class="hoverShadow">登录</button>
    <p class="hoverShadow">a11</p>
  </div>
</template>

<script setup lang="ts">
import instance from "@/utils/request.ts";

async function getHome() {
  const res = await instance.get("/home/index");
  console.log(res);
}

getHome();
</script>

<style scoped lang="less">
@import "@/assets/styles/variables.less";
@import "@/assets/styles/mixins";

button {
  background-color: @xtxColor;
  .hoverShadow();
}

p {
  .hoverShadow();
}
</style>