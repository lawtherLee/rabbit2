import { defineStore } from "pinia";
import instance from "@/utils/request.ts";
import { HomeBanner, IAxiosRes } from "@/types/data";

export default defineStore("home", {
  state: () => {
    return {
      bannerList: [] as HomeBanner[],
    };
  },
  actions: {
    // 获取轮播图
    async getBannerList() {
      const res = await instance.get<IAxiosRes<HomeBanner[]>>("/home/banner");
      this.bannerList = res.data.result;
    },
  },
});
