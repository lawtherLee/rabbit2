<script lang="ts" setup>
import HomeBanner from "./components/home-banner.vue";
import HomeCategory from "./components/home-category.vue";
import HomeNew from "@/views/Home/components/home-new.vue";
import HomeHot from "@/views/Home/components/home-hot.vue";
import HomeBrand from "@/views/Home/components/home-brand.vue";
import HomeProduct from "@/views/Home/components/home-product.vue";
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
        <!--        热门品牌-->
        <HomeBrand />
        <!--        产品-->
        <HomeProduct />
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.page-home {
  /deep/ .xtx-carousel {
    .prev {
      left: 270px;
    }
  }
}
</style>
