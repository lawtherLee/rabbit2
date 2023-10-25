<script lang="ts" setup>
import HomeBanner from "./components/home-banner.vue";
import HomeCategory from "./components/home-category.vue";
import HomeNew from "@/views/Home/components/home-new.vue";
import HomeHot from "@/views/Home/components/home-hot.vue";
</script>

<template>
  <div class="page-home">
    <div class="home-entry">
      <div class="container">
        <!-- 左侧分类 -->
        <HomeCategory />
        <!-- banner轮播图 -->
        <HomeBanner />
        <!--        新鲜好物-->
        <HomeNew />
        <!--        人气推荐-->
        <HomeHot />
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped></style>