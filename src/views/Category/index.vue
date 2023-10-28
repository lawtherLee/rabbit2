<script setup lang="ts">
import useStore from "@/store";
import { useRoute } from "vue-router";
import { watchEffect } from "vue";

const route = useRoute();

const { useCategoryStore } = useStore();

// watch(
//   () => route.params.id,
//   (value) => {
//     console.log(value);
//   },
//   { immediate: true },
// );

watchEffect(() => {
  if (!route.params.id) return; // 解决路由参数为undefined的问题
  useCategoryStore.getTopCategory(route.params.id as string);
});
</script>

<template>
  <div class="category-container">
    <xtx-bread separator="/">
      <xtx-bread-item to="/">首页</xtx-bread-item>
      <xtx-bread-item>居家</xtx-bread-item>
    </xtx-bread>
  </div>
</template>

<style scoped lang="less">
.category-container {
  width: 1240px;
  margin: auto;
}
</style>
