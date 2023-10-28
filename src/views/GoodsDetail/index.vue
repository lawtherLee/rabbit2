<script setup lang="ts">
import { useRoute } from "vue-router";
import useStore from "@/store";

const route = useRoute();

const { goodsStore } = useStore();
goodsStore.getGoodsInfo(route.params.id as string);
</script>

<template>
  <div class="goods-container">
    <div class="container">123</div>
  </div>
</template>

<style scoped lang="less"></style>
