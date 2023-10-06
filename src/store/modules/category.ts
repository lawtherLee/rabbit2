import { defineStore } from "pinia";
import request from "@/utils/request.ts";
import { CategoryItem, IAxiosRes } from "@/types/data";
import { topCategory } from "@/store/constants.ts";

const defaultCategory = topCategory.map((item) => {
  return {
    name: item,
  };
});
export default defineStore("category", {
  state: () => {
    return {
      list: defaultCategory as CategoryItem[],
    };
  },
  actions: {
    async getCategory() {
      const res = await request.get<IAxiosRes<CategoryItem[]>>(
        "/home/category/head",
      );
      console.log(res);
      res.data.result.forEach((item) => {
        item.open = false;
      });
      this.list = res.data.result;
    },
    // 显示二级分类盒子
    // shouSub(id: number) {
    //   const findItem = this.list.find((item) => item.id === id);
    //   if (findItem) findItem.open = true;
    // },
    // hideSub(id: number) {
    //   const findItem = this.list.find((item) => item.id === id);
    //   if (findItem) findItem.open = false;
    // },
    toggleSub(id: number, open: boolean) {
      const findItem = this.list.find((item) => item.id === id);
      if (findItem) findItem.open = open;
    },
  },
});
