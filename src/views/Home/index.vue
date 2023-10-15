<script lang="ts" setup>
import HomeBanner from "./components/home-banner.vue";
import HomeCategory from "./components/home-category.vue";
import HomePanel from "@/views/Home/components/home-panel.vue";
</script>

<template>
  <div class="page-home">
    <div class="home-entry">
      <div class="container">
        <!-- 左侧分类 -->
        <HomeCategory />
        <!-- banner轮播图 -->
        <HomeBanner />
        <!--        面板-->
        <HomePanel title="新鲜好物" sub-title="新鲜出炉 品质靠谱" />
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped></style>