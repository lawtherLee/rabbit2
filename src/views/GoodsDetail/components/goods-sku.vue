<script setup lang="ts" name="GoodsSku">
import { GoodsInfo, SpecVal } from "@/types/goods";

defineProps<{
  goods: GoodsInfo;
}>();

const changeSelected = (row: SpecVal, values: SpecVal[]) => {
  if (row.selected) {
    row.selected = false;
  } else {
    values.forEach((item) => {
      item.selected = false;
      row.selected = true;
    });
  }
};
</script>
<template>
  <div class="goods-sku">
    <dl v-for="spec in goods.specs">
      <dt>{{ spec.name }}</dt>
      <dd>
        <template v-for="item in spec.values">
          <img
            v-if="item.picture"
            :class="{ selected: item.selected }"
            :src="item.picture"
            alt=""
            @click="changeSelected(item, spec.values)"
          />

          <span
            @click="changeSelected(item, spec.values)"
            v-else
            :class="{ selected: item.selected }"
          >
            {{ item.name }}
          </span>
        </template>
      </dd>
    </dl>
  </div>
</template>

<style scoped lang="less">
.sku-state-mixin () {
  border: 1px solid #e4e4e4;
  margin-right: 10px;
  cursor: pointer;
  &.selected {
    border-color: @xtxColor;
  }
  &.disabled {
    opacity: 0.6;
    border-style: dashed;
    cursor: not-allowed;
  }
}
.goods-sku {
  padding-left: 10px;
  padding-top: 20px;
  dl {
    display: flex;
    padding-bottom: 20px;
    align-items: center;
    dt {
      width: 50px;
      color: #999;
    }
    dd {
      flex: 1;
      color: #666;
      > img {
        width: 50px;
        height: 50px;
        margin-top: 5px;
        .sku-state-mixin ();
      }
      > span {
        display: inline-block;
        height: 30px;
        line-height: 30px;
        padding: 0 20px;
        margin-top: 5px;
        .sku-state-mixin ();
      }
    }
  }
}
</style>
