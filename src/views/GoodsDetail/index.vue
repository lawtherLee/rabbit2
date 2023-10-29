<script setup lang="ts">
import { useRoute } from "vue-router";
import useStore from "@/store";
import GoodsImage from "@/views/GoodsDetail/components/goods-image.vue";
import { storeToRefs } from "pinia";

const route = useRoute();

const { goodsStore } = useStore();
const { goods } = storeToRefs(goodsStore); // 解决结构丢失响应式
goodsStore.getGoodsInfo(route.params.id as string);
</script>

<template>
  <div class="goods-container">
    <div class="container">
      <xtx-bread>
        <!--        面包屑-->
        <xtx-bread-item to="/">首页</xtx-bread-item>
        <xtx-bread-item
          v-for="item in goodsStore.goods.categories"
          :key="item.id"
          >{{ item.name }}</xtx-bread-item
        >
        <xtx-bread-item to="/">{{ goods.name }}</xtx-bread-item>
      </xtx-bread>
      <!-- 商品信息 -->
      <div class="goods-info">
        <div class="media">
          <GoodsImage :goodsImg="goods.mainPictures"></GoodsImage>
        </div>
        <div class="spec"></div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
.goods-info {
  min-height: 600px;
  background: #fff;
  display: flex;
  .media {
    width: 580px;
    height: 600px;
    padding: 30px 50px;
  }
  .spec {
    flex: 1;
    padding: 30px 30px 30px 0;
  }
}
</style>
