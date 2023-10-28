<script setup lang="ts">
import useStore from "@/store";
import { useRoute } from "vue-router";

const route = useRoute();

const { useCategoryStore } = useStore();
useCategoryStore.getTopCategory(route.params.id as string);
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
