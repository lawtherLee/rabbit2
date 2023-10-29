<script lang="ts" setup name="XtxCity">
import { ref, watch } from "vue";
import { onClickOutside } from "@vueuse/core";
import axios from "axios";
import { CityType } from "@/types/data";

// 默认地址
defineProps<{
  address: string;
}>();

// 更改地址
const emit = defineEmits(["changeAddress"]);

// 控制显示隐藏
const active = ref(false);
const target = ref(null);
onClickOutside(target, () => (active.value = false));

// 获取城市数据
const cityList = ref<CityType[]>([]);
const cacheList = ref<CityType[]>([]);
const getCityList = async () => {
  const res = await axios.get<CityType[]>(
    "https://yjy-oss-files.oss-cn-zhangjiakou.aliyuncs.com/tuxian/area.json",
  );
  cityList.value = res.data;
  cacheList.value = res.data;
};
getCityList();

// 选择城市
const selectCity = ref({
  provinceCode: "",
  provinceName: "",
  cityCode: "",
  cityName: "",
  countryCode: "",
  countryName: "",
});
const onSelectCity = ({ level, code, name, areaList }: CityType) => {
  switch (level) {
    case 0:
      selectCity.value.provinceCode = code;
      selectCity.value.provinceName = name;
      break;
    case 1:
      selectCity.value.cityCode = code;
      selectCity.value.cityName = name;
      break;
    case 2:
      selectCity.value.countryCode = code;
      selectCity.value.countryName = name;
      active.value = false;
      emit("changeAddress", selectCity.value);
      return;
  }
  cityList.value = areaList;
};

watch(active, (value) => {
  if (!value) {
    cityList.value = cacheList.value;
  }
});
</script>

<template>
  <div class="xtx-city" ref="target">
    <div
      class="select"
      @click="active = !active"
      :class="active ? 'active' : ''"
    >
      <span class="placeholder" v-if="address">{{ address }}</span>
      <span class="placeholder" v-else>请选择配送地址</span>
      <span class="value"></span>
      <i class="iconfont icon-angle-down"></i>
    </div>
    <div class="option" v-show="active">
      <span
        @click="onSelectCity(item)"
        class="ellipsis"
        v-for="item in cityList"
        :key="item.code"
      >
        {{ item.name }}
      </span>
    </div>
  </div>
</template>

<style scoped lang="less">
.xtx-city {
  display: inline-block;
  position: relative;
  z-index: 400;
  .select {
    border: 1px solid #e4e4e4;
    height: 30px;
    padding: 0 5px;
    line-height: 28px;
    cursor: pointer;
    &.active {
      background: #fff;
    }
    .placeholder {
      color: #999;
    }
    .value {
      color: #666;
      font-size: 12px;
    }
    i {
      font-size: 12px;
      margin-left: 5px;
    }
  }
  .option {
    width: 542px;
    border: 1px solid #e4e4e4;
    position: absolute;
    left: 0;
    top: 29px;
    background: #fff;
    min-height: 30px;
    line-height: 30px;
    display: flex;
    flex-wrap: wrap;
    padding: 10px;
    > span {
      width: 130px;
      text-align: center;
      cursor: pointer;
      border-radius: 4px;
      padding: 0 3px;
      &:hover {
        background: #f5f5f5;
      }
    }
  }
}
</style>
