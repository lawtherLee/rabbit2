<script setup lang="ts">
import useStore from "@/store";
import { useRoute } from "vue-router";
import { watchEffect } from "vue";
import CategorySub from "@/views/Category/components/category-sub.vue";
import CategoryGoods from "@/views/Category/components/category-goods.vue";

const route = useRoute();

const { useCategoryStore, useHomeStore } = useStore();

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
    <!--    面包屑-->
    <xtx-bread separator="/">
      <xtx-bread-item to="/">首页</xtx-bread-item>
      <xtx-bread-item>{{ useCategoryStore.topCategory.name }}</xtx-bread-item>
    </xtx-bread>
    <!--    轮播图-->
    <xtx-carousel :banners="useHomeStore.bannerList" style="height: 500px" />
    <!--    二级分类-->
    <category-sub />
    <category-goods
      v-for="item in useCategoryStore.topCategory.children"
      :key="item.id"
      :sub-category="item"
    />
  </div>
</template>

<style scoped lang="less">
.category-container {
  width: 1240px;
  margin: auto;
}
</style>
