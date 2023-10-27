<script setup lang="ts">
import HomePanel from "@/views/Home/components/home-panel.vue";
import HomeGoods from "@/views/Home/components/home-goods.vue";
import useStore from "@/store";
import { ref } from "vue";
import { useIntersectionObserver } from "@vueuse/core";

const { useHomeStore } = useStore();

const newRef = ref(null);
useIntersectionObserver(newRef, ([{ isIntersecting }]) => {
  if (isIntersecting) {
    useHomeStore.getNewGoods();
  }
});
</script>

<template>
  <div class="home-new" ref="newRef">
    <HomePanel title="新鲜好物" sub-title="新鲜出炉 品质靠谱">
      <!--          查看更多-->
      <template #more>
        <xtx-more to="/goods">查看更多</xtx-more>
      </template>
      <!--          面板主体-->
      <template #body>
        <home-goods :goods="useHomeStore.newGoods">
          <template v-slot="{ row1 }">
            <span>${{ row1.price }}</span>
          </template>
        </home-goods>
      </template>
    </HomePanel>
  </div>
</template>

<style scoped lang="less"></style>
