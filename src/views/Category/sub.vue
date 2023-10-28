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
    <!-- 商品区域 -->
    <div class="goods-list">
      <!-- 排序区域 -->
      <div class="sub-sort">
        <div class="sort">
          <a href="javascript:" class="active">默认排序</a>
          <a href="javascript:">最新商品</a>
          <a href="javascript:">最高人气</a>
          <a href="javascript:">评论最多</a>
          <a href="javascript:">
            价格排序
            <i class="arrow up" />
            <i class="arrow down" />
          </a>
        </div>
      </div>
      <!-- 商品列表 -->
      <ul>
        <li v-for="goods in useCategoryStore.subCategory.goods" :key="goods.id">
          <XtxGoodsItem :goods="goods" />
        </li>
      </ul>
    </div>
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
  // 商品区域
  .goods-list {
    background: #fff;
    padding: 0 25px;
    margin-top: 25px;
    ul {
      display: flex;
      flex-wrap: wrap;
      padding: 0 5px;
      li {
        margin-right: 20px;
        margin-bottom: 20px;
        &:nth-child(5n) {
          margin-right: 0;
        }
      }
    }
    .sub-sort {
      height: 80px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .sort {
        display: flex;
        a {
          height: 30px;
          line-height: 28px;
          border: 1px solid #e4e4e4;
          padding: 0 20px;
          margin-right: 20px;
          color: #999;
          border-radius: 2px;
          position: relative;
          transition: all 0.3s;
          &.active {
            background: @xtxColor;
            border-color: @xtxColor;
            color: #fff;
          }
          .arrow {
            position: absolute;
            border: 5px solid transparent;
            right: 8px;
            &.up {
              top: 3px;
              border-bottom-color: #bbb;
              &.active {
                border-bottom-color: @xtxColor;
              }
            }
            &.down {
              top: 15px;
              border-top-color: #bbb;
              &.active {
                border-top-color: @xtxColor;
              }
            }
          }
        }
      }
      .check {
        .xtx-checkbox {
          margin-left: 20px;
          color: #999;
        }
      }
    }
  }
}
</style>
