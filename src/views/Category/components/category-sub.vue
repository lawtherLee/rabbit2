<script setup lang="ts">
import useStore from "@/store";

const { useCategoryStore } = useStore();
</script>

<template>
  <!-- 所有二级分类 -->
  <div class="sub-list">
    <h3>全部分类</h3>
    <ul>
      <li v-for="item in useCategoryStore.topCategory.children" :key="item.id">
        <router-link href="javascript:" :to="'/category/sub/' + item.id">
          <img :src="item.picture" />
          <p>{{ item.name }}</p>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<style scoped lang="less">
.sub-list {
  margin-top: 20px;
  background-color: #fff;
  h3 {
    font-size: 28px;
    color: #666;
    font-weight: normal;
    text-align: center;
    line-height: 100px;
  }
  ul {
    display: flex;
    padding: 0 32px;
    flex-wrap: wrap;
    li {
      width: 168px;
      height: 160px;
      a {
        text-align: center;
        display: block;
        font-size: 16px;
        img {
          width: 100px;
          height: 100px;
        }
        p {
          line-height: 40px;
        }
        &:hover {
          color: @xtxColor;
        }
      }
    }
  }
}
</style>
