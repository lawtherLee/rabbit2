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
import GoodsDetailInfo from "@/views/GoodsDetail/components/goods-detail-info.vue";
import GoodsHot from "@/views/GoodsDetail/components/goods-hot.vue";
import Message from "@/components/message/index.ts";

const route = useRoute();

const { goodsStore, cartStore } = useStore();
const { goods } = storeToRefs(goodsStore); // 解决结构丢失响应式
goodsStore.getGoodsInfo(route.params.id as string);

let currentSku = {} as Sku;

const onGetSku = (sku: Sku) => {
  console.log(sku);
  goods.value.price = sku.price;
  goods.value.oldPrice = sku.oldPrice;
  currentSku = sku;
};

// 购买数量
const count = ref(1);

// 加入购物车
const addShopCar = async () => {
  console.log(currentSku);
  if (!currentSku.id) return Message.warning("请选择完整规格");
  await cartStore.addCart(currentSku.id, count.value);
  Message.success("添加购物车成功");
};
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

      <div class="goods-footer">
        <div class="goods-article">
          <!-- 商品+评价 -->
          <div class="goods-tabs">
            <!-- 商品详情 -->
            <GoodsDetailInfo :goods="goods" />
          </div>
        </div>
        <!-- 24热榜+专题推荐 -->
        <div class="goods-aside">
          <GoodsHot :type="1" />
          <GoodsHot :type="2" />
          <GoodsHot :type="3" />
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
.goods-footer {
  display: flex;
  margin-top: 20px;
  .goods-article {
    width: 940px;
    margin-right: 20px;
  }
  .goods-aside {
    width: 280px;
    min-height: 1000px;
  }
}
</style>
