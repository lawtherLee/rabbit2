<script lang="ts" setup>
import useStore from "@/store";

const { useHomeStore } = useStore();
useHomeStore.getBannerList();
</script>
<template>
  <div class="home-banner">
    <!-- 轮播图 -->
    <XtxCarousel
      :autoplay="true"
      :banners="useHomeStore.bannerList"
      :duration="2000"
      :isShowIndicator="false"
    />
  </div>
</template>

<style scoped lang="less">
.home-banner {
  width: 1240px;
  height: 500px;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 98;
  background-color: pink;
}
</style>