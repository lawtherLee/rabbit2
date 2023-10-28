<script lang="ts" setup name="HomeBrand">
import HomePanel from "./home-panel.vue";
import useStore from "@/store";
import { useLazyData } from "@/hooks";
import { ref } from "vue";

const { useHomeStore } = useStore();
const brandRef = useLazyData(() => {
  useHomeStore.getBrandList();
});

// 切换品牌
const index = ref(0);
</script>

<template>
  <div ref="brandRef">
    <HomePanel title="热门品牌" sub-title="国际经典 品质保证">
      <template v-slot:more>
        <a
          href="javascript:"
          class="iconfont icon-angle-left prev"
          :class="{ disabled: index === 0 }"
          @click="index = 0"
        />
        <a
          href="javascript:"
          class="iconfont icon-angle-right next"
          :class="{ disabled: index === 1 }"
          @click="index = 1"
        />
      </template>
      <template #body>
        <transition>
          <div v-if="useHomeStore.brandList.length" class="box" ref="box">
            <ul
              class="list"
              :style="{ transform: `translateX(-${index * 1240}px)` }"
            >
              <li v-for="item in useHomeStore.brandList" :key="item.id">
                <RouterLink to="/">
                  <img :src="item.picture" alt="" />
                </RouterLink>
              </li>
            </ul>
          </div>
          <div v-else class="skeleton">
            <XtxSkeleton
              class="item"
              v-for="i in 5"
              :key="i"
              animated
              bg="#e4e4e4"
              :width="240"
              :height="305"
            />
          </div>
        </transition>
      </template>
    </HomePanel>
  </div>
</template>

<style scoped lang="less">
.home-panel {
  background: #f5f5f5;
}
.iconfont {
  width: 20px;
  height: 20px;
  background: #ccc;
  color: #fff;
  display: inline-block;
  text-align: center;
  margin-left: 5px;
  background: @xtxColor;
  &::before {
    font-size: 12px;
    position: relative;
    top: -2px;
  }
  &.disabled {
    background: #ccc;
    cursor: not-allowed;
  }
}
.box {
  display: flex;
  width: 100%;
  height: 345px;
  overflow: hidden;
  padding-bottom: 40px;
  .list {
    width: 200%;
    display: flex;
    transition: all 1s;
    li {
      margin-right: 10px;
      width: 240px;
      &:nth-child(5n) {
        margin-right: 0;
      }
      img {
        width: 240px;
        height: 305px;
      }
    }
  }
}
.skeleton {
  width: 100%;
  display: flex;
  .item {
    margin-right: 10px;
    &:nth-child(5n) {
      margin-right: 0;
    }
  }
}
</style>
