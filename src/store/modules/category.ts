import { defineStore } from "pinia";
import request from "@/utils/request.ts";
import instance from "@/utils/request.ts";
import { CategoryItem, IAxiosRes } from "@/types/data";
import { topCategory } from "@/store/constants.ts";
import { SubCategory, TopCategory } from "@/types/category";

const defaultCategory = topCategory.map((item) => {
  return {
    name: item,
  };
});
export default defineStore("category", {
  state: () => {
    return {
      list: defaultCategory as CategoryItem[],
      topCategory: {} as TopCategory,
      subCategory: {} as SubCategory,
    };
  },
  actions: {
    async getCategory() {
      const res = await request.get<IAxiosRes<CategoryItem[]>>(
        "/home/category/head",
      );
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
    // 获取顶级分类
    async getTopCategory(id: string) {
      const res = await instance.get<IAxiosRes<TopCategory>>(
        "/category?id=" + id,
      );
      console.log(res);
      this.topCategory = res.data.result;
    },
    // 获取二级类目详情
    async getSubCategory(id: string) {
      const res = await instance.get<IAxiosRes<SubCategory>>(
        "/category/sub/filter/?id=" + id,
      );
      // console.log(res);
      this.subCategory = res.data.result;
    },
  },
});
