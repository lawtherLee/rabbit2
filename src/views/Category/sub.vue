<script setup lang="ts">
import useStore from "@/store";
import { useRoute } from "vue-router";
import { watchEffect } from "vue";

const { useCategoryStore } = useStore();
const route = useRoute();

watchEffect(() => {
  if (!route.params.id) return;
  useCategoryStore.getSubCategory(route.params.id as string);
});
</script>

<template>
  <div class="category-container-sub">
    <xtx-bread>
      <xtx-bread-item to="/">首页</xtx-bread-item>
      <xtx-bread-item
        :to="'/category/' + useCategoryStore.subCategory.parentId"
      >
        {{ useCategoryStore.subCategory.parentName }}
      </xtx-bread-item>
      <xtx-bread-item>
        {{ useCategoryStore.subCategory.name }}
      </xtx-bread-item>
    </xtx-bread>
    <!--    筛选区域-->
    <!-- 筛选区 -->
    <div class="sub-filter">
      <div
        class="item"
        v-for="sale in useCategoryStore.subCategory.saleProperties"
        :key="sale.id"
      >
        <div class="head">{{ sale.name }}</div>
        <div class="body">
          <a href="javascript:">全部</a>
          <a href="javascript:" v-for="prop in sale.properties" :key="prop.id">
            {{ prop.name }}
          </a>
        </div>
      </div>
    </div>

    <div class="sub-filter"></div>
  </div>
</template>

<style scoped lang="less">
.category-container-sub {
  width: 1240px;
  margin: auto;
  // 筛选区
  .sub-filter {
    background: #fff;
    padding: 25px;
    .item {
      display: flex;
      line-height: 40px;
      .head {
        width: 80px;
        color: #999;
      }
      .body {
        flex: 1;
        a {
          margin-right: 36px;
          transition: all 0.3s;
          display: inline-block;
          &.active,
          &:hover {
            color: @xtxColor;
          }
        }
      }
    }
  }
}
</style>
