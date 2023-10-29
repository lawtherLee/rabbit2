<script lang="ts" setup name="GoodsImage">
defineProps<{
  goodsImg: string[];
}>();
</script>
<template>
  <div class="goods-image">
    <div class="middle">
      <img
        src="https://yanxuan-item.nosdn.127.net/4356c9fc150753775fe56b465314f1eb.png"
        alt=""
      />
    </div>
    <ul class="small">
      <li v-for="item in goodsImg" :key="item">
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
  .middle {
    width: 400px;
    height: 400px;
    background: #f5f5f5;
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
