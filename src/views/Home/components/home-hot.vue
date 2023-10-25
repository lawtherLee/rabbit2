<script setup lang="ts">
import HomePanel from "@/views/Home/components/home-panel.vue";
import useStore from "@/store";
import HomeGoods from "@/views/Home/components/home-goods.vue";
import { computed } from "vue";
import { GoodsType } from "@/types/data";

const { useHomeStore } = useStore();
useHomeStore.getHotGoods();

// 解决ts类型报错 数据保持一致
const goods = computed<GoodsType[]>(() => {
  return useHomeStore.hotGoods.map((item) => {
    return {
      price: "0",
      name: item.alt,
      orderNum: null,
      id: item.id,
      picture: item.picture,
      desc: "",
    };
  });
});
</script>

<template>
  <HomePanel title="人气推荐" sub-title="人气爆款，不容错过">
    <HomeGoods :goods="goods"></HomeGoods>
  </HomePanel>
</template>

<style scoped lang="less"></style>