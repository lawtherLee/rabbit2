<script lang="ts" setup>
import { SubCategory } from "@/types/category";

const props = defineProps<{
  subCategory: SubCategory;
}>();
</script>

<template>
  <!-- 分类关联商品 -->
  <div class="ref-goods">
    <div class="head">
      <h3>- {{ subCategory.name }} -</h3>
      <p class="tag">温暖柔软，品质之选</p>
      <XtxMore to="/" />
    </div>
    <div class="body">
      <RouterLink
        v-for="item in subCategory.goods"
        :key="item.id"
        to="/"
        class="goods-item"
      >
        <img v-lazyLoad="item.picture" alt="" />
        <p class="name ellipsis">{{ item.desc }}</p>
        <p class="desc ellipsis">{{ item.name }}</p>
        <p class="price">&yen;{{ item.price }}</p>
      </RouterLink>
    </div>
  </div>
</template>
<style lang="less" scoped>
.ref-goods {
  background-color: #fff;
  margin-top: 20px;
  position: relative;
  .head {
    .xtx-more {
      position: absolute;
      top: 20px;
      right: 20px;
    }
    .tag {
      text-align: center;
      color: #999;
      font-size: 20px;
      position: relative;
      top: -20px;
    }
    h3 {
      font-size: 28px;
      color: #666;
      font-weight: normal;
      text-align: center;
      line-height: 100px;
    }
  }
  .body {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    padding: 0 65px 30px;
    .goods-item {
      display: block;
      width: 220px;
      padding: 20px 30px;
      text-align: center;
      .hoverShadow();
      img {
        width: 160px;
        height: 160px;
      }
      p {
        padding-top: 10px;
      }
      .name {
        font-size: 16px;
      }
      .desc {
        color: #999;
        height: 29px;
      }
      .price {
        color: @priceColor;
        font-size: 20px;
      }
    }
  }
}
</style>
