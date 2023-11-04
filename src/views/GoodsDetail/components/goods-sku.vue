<script setup lang="ts" name="GoodsSku">
import { GoodsInfo, Sku, SpecVal } from "@/types/goods";
import bwPowerSet from "@/utils/power-set.ts";

const props = defineProps<{
  goods: GoodsInfo;
}>();

// 切换选中状态
const changeSelected = (row: SpecVal, values: SpecVal[]) => {
  if (row.disabled) return;
  if (row.selected) {
    row.selected = false;
  } else {
    values.forEach((item) => {
      item.selected = false;
      row.selected = true;
    });
  }

  const selectedArr = getSelected();
  console.log(selectedArr);
};

// sku禁用状态
// 1.筛选有效sku
const optionalSku = () => {
  return props.goods.skus.filter((item: Sku) => item.inventory);
};

const pathMap: any = {};
optionalSku().forEach((item: Sku) => {
  const arr = item.specs.map((spec) => spec.valueName);
  // 处理arr的幂集算法
  console.log(bwPowerSet(arr));
  // 将这些规格情况放入路径字典
  bwPowerSet(arr).forEach((spec) => {
    const pathKey = spec.join("+");
    pathMap[pathKey] = true;
  });
});

// 默认选中：根据每一项的值去路径字典找
const specBtnDisabled = () => {
  console.log(props.goods.specs);
  props.goods.specs.forEach((spec) => {
    spec.values.forEach((item) => {
      const isSpec = pathMap[item.name];
      item.disabled = !isSpec;
    });
  });
};

// 获取当前选中状态
const getSelected = () => {
  const selectedArr: string[] = [];
  props.goods.specs.forEach((item, index) => {
    selectedArr.push("");
    item.values.forEach((spec) => {
      if (spec.selected) {
        selectedArr[index] = spec.name;
      }
    });
  });
  return selectedArr;
};
specBtnDisabled();
</script>

<template>
  <div class="goods-sku">
    <dl v-for="spec in goods.specs">
      <dt>{{ spec.name }}</dt>
      <dd>
        <template v-for="item in spec.values">
          <img
            v-if="item.picture"
            :class="{ disabled: item.disabled, selected: item.selected }"
            :src="item.picture"
            alt=""
            @click="changeSelected(item, spec.values)"
          />

          <span
            @click="changeSelected(item, spec.values)"
            v-else
            :class="{ disabled: item.disabled, selected: item.selected }"
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
