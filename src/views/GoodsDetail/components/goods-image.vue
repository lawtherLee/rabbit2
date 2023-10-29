<script lang="ts" setup name="GoodsImage">
import { ref } from "vue";
import { useMouseInElement } from "@vueuse/core";

defineProps<{
  goodsImg: string[];
}>();

const active = ref(0);

const target = ref(null);
const { isOutside, elementX, elementY } = useMouseInElement(target);

console.log(isOutside);
</script>
<template>
  <div class="goods-image" v-if="goodsImg">
    <div
      class="large"
      :style="[{ backgroundImage: `url(${goodsImg[active]})` }]"
      v-show="!isOutside"
    ></div>
    <div class="middle" ref="target">
      <img :src="goodsImg[active]" alt="" />
      <div
        :style="{ top: elementY + 'px', left: elementX + 'px' }"
        v-show="!isOutside"
        class="layer"
      ></div>
    </div>
    <ul class="small">
      <li
        v-for="(item, index) in goodsImg"
        :key="item"
        :class="{ active: active === index }"
        @mouseenter="active = index"
      >
        <img :src="item" alt="" />
      </li>
    </ul>
  </div>
</template>

<style scoped lang="less">
.goods-image {
  width: 480px;
  height: 400px;
  position: relative;
  display: flex;
  .large {
    position: absolute;
    top: 0;
    left: 412px;
    width: 400px;
    height: 400px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    background-repeat: no-repeat;
    background-size: 800px 800px;
    background-color: #f8f8f8;
  }
  .middle {
    width: 400px;
    height: 400px;
    background: #f5f5f5;
    .layer {
      width: 200px;
      height: 200px;
      background: rgba(0, 0, 0, 0.2);
      left: 0;
      top: 0;
      position: absolute;
    }
  }
  .small {
    width: 80px;
    li {
      width: 68px;
      height: 68px;
      margin-left: 12px;
      margin-bottom: 15px;
      cursor: pointer;
      &:hover,
      &.active {
        border: 2px solid @xtxColor;
      }
    }
  }
}
</style>
