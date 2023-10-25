import { defineStore } from "pinia";
import instance from "@/utils/request.ts";
import { GoodsType, HomeBanner, IAxiosRes } from "@/types/data";

export default defineStore("home", {
  state: () => {
    return {
      bannerList: [] as HomeBanner[],
      newGoods: [],
    };
  },
  actions: {
    // 获取轮播图
    async getBannerList() {
      const res = await instance.get<IAxiosRes<HomeBanner[]>>("/home/banner");
      this.bannerList = res.data.result;
    },
    // 获取新鲜好物
    async getNewGoods() {
      // <IAxiosRes<any>>
      const res = await instance.get<IAxiosRes<GoodsType[]>>("/home/new");
      console.log(res);
      this.newGoods = res.data.result;
    },
  },
});
