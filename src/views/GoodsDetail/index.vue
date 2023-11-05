<script setup lang="ts">
import { useRoute } from "vue-router";
import useStore from "@/store";
import GoodsImage from "@/views/GoodsDetail/components/goods-image.vue";
import { storeToRefs } from "pinia";
import GoodsSales from "@/views/GoodsDetail/components/goods-sales.vue";
import GoodsName from "@/views/GoodsDetail/components/goods-name.vue";
import GoodsSku from "@/views/GoodsDetail/components/goods-sku.vue";
import { Sku } from "@/types/goods";
import { ref } from "vue";

const route = useRoute();

const { goodsStore } = useStore();
const { goods } = storeToRefs(goodsStore); // 解决结构丢失响应式
goodsStore.getGoodsInfo(route.params.id as string);

const onGetSku = (sku: Sku) => {
  console.log(sku);
  goods.value.price = sku.price;
  goods.value.oldPrice = sku.oldPrice;
};

// 购买数量
const count = ref(1);

const addShopCar = () => {};
</script>

<template>
  <div class="goods-container">
    <div class="container" v-if="goods.id">
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
          <goods-sales></goods-sales>
        </div>
        <div class="spec">
          <goods-name :goods="goods"></goods-name>
          <!--          规格-->
          <goods-sku
            @get-sku="onGetSku"
            :goods="goods"
            skuId="1369155862131642369"
          />
          <XtxNumbox v-model:buyCount="count" :isShowLabel="true" />
          <XtxButton
            @click="addShopCar"
            style="margin: 10px 3px"
            size="middle"
            type="primary"
            >加入购物车
          </XtxButton>
        </div>
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
