<script setup lang="ts">
import HomePanel from "@/views/Home/components/home-panel.vue";
import useStore from "@/store";
import HomeGoods from "@/views/Home/components/home-goods.vue";
import { computed, ref } from "vue";
import { GoodsType } from "@/types/data";
import { useIntersectionObserver } from "@vueuse/core";

const { useHomeStore } = useStore();

const hotRef = ref(null);
useIntersectionObserver(hotRef, ([{ isIntersecting }]) => {
  if (isIntersecting) {
    useHomeStore.getHotGoods();
  }
});

// 解决ts类型报错 数据保持一致
const goods = computed<GoodsType[]>(() => {
  return useHomeStore.hotGoods.map((item) => {
    return {
      price: "0",
      name: item.title,
      orderNum: null,
      id: item.id,
      picture: item.picture,
      desc: item.alt,
    };
  });
});
</script>

<template>
  <div class="home-hot" ref="hotRef">
    <HomePanel title="人气推荐" sub-title="人气爆款，不容错过">
      <template #body>
        <HomeGoods :goods="goods">
          <template v-slot="{ row1 }">
            <span>{{ row1.desc }}</span>
          </template>
        </HomeGoods>
      </template>
    </HomePanel>
  </div>
</template>

<style scoped lang="less"></style>
