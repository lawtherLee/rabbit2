<script lang="ts" setup name="XtxNumbox">
//
const {
  min = 1,
  isShowLabel,
  buyCount,
} = defineProps<{
  isShowLabel: boolean;
  buyCount: number;
  min?: number;
}>();

const emit = defineEmits(["update:buyCount"]);
const subCount = () => {
  if (buyCount <= min) return;
  emit("update:buyCount", buyCount - 1);
};

const addCount = () => {
  emit("update:buyCount", buyCount + 1);
};
</script>
<template>
  <div class="xtx-numbox">
    <div v-if="isShowLabel" class="label">数量</div>
    <div class="numbox">
      <a href="javascript:" @click="subCount">-</a>
      <input type="text" readonly :value="buyCount" />
      <a href="javascript:" @click="addCount">+</a>
    </div>
  </div>
</template>

<style scoped lang="less">
.xtx-numbox {
  display: flex;
  align-items: center;
  .label {
    width: 60px;
    color: #999;
    padding-left: 10px;
  }
  .numbox {
    width: 120px;
    height: 30px;
    border: 1px solid #e4e4e4;
    display: flex;
    > a {
      width: 29px;
      line-height: 28px;
      text-align: center;
      background: #f8f8f8;
      font-size: 16px;
      color: #666;
      &:first-of-type {
        border-right: 1px solid #e4e4e4;
      }
      &:last-of-type {
        border-left: 1px solid #e4e4e4;
      }
    }
    > input {
      width: 60px;
      padding: 0 5px;
      text-align: center;
      color: #666;
    }
  }
}
</style>
