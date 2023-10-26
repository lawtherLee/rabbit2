<script lang="ts" setup>
import { GoodsType } from "@/types/data";

const props = defineProps<{
  goods: GoodsType[];
}>();
</script>
<template>
  <ul class="goods-list">
    <li v-for="item in props.goods" :key="item.id">
      <RouterLink to="/">
        <img v-lazyLoad="item.picture" alt="" />
        <p class="name ellipsis">{{ item.name }}</p>
        <p class="price">
          <slot :row1="item"></slot>
        </p>
      </RouterLink>
    </li>
  </ul>
</template>

<style scoped lang="less">
.goods-list {
  display: flex;
  justify-content: space-between;
  height: 406px;

  li {
    width: 306px;
    height: 406px;
    background: #f0f9f4;
    .hoverShadow();

    img {
      width: 306px;
      height: 306px;
    }

    p {
      font-size: 22px;
      padding: 12px 30px 0 30px;
      text-align: center;
    }

    .price {
      color: @priceColor;
    }
  }
}
</style>
