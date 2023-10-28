import { defineStore } from "pinia";
import instance from "@/utils/request.ts";
import {
  GoodsType,
  HomeBanner,
  HomeBrand,
  HomeHotGoods,
  HomeProduct,
  IAxiosRes,
} from "@/types/data";

export default defineStore("home", {
  state: () => {
    return {
      bannerList: [] as HomeBanner[],
      newGoods: [] as GoodsType[],
      hotGoods: [] as HomeHotGoods[],
      brandList: [] as HomeBrand[],
      productList: [] as HomeProduct[],
    };
  },
  actions: {
    // 获取轮播图
    async getBannerList() {
      if (this.bannerList.length) return;
      const res = await instance.get<IAxiosRes<HomeBanner[]>>("/home/banner");
      this.bannerList = res.data.result;
    },
    // 获取新鲜好物
    async getNewGoods() {
      // <IAxiosRes<any>>
      const res = await instance.get<IAxiosRes<GoodsType[]>>("/home/new");
      // console.log(res);
      this.newGoods = res.data.result;
    },
    // 获取人气推荐
    async getHotGoods() {
      const res = await instance.get<IAxiosRes<HomeHotGoods[]>>("/home/hot");
      // console.log(res);
      this.hotGoods = res.data.result;
    },
    // 获取品牌数据
    async getBrandList() {
      const res = await instance.get<IAxiosRes<HomeBrand[]>>("/home/brand");
      this.brandList = res.data.result;
    },
    // 获取产品数据
    async getProductList() {
      const res = await instance.get<IAxiosRes<HomeProduct[]>>("/home/goods");
      this.productList = res.data.result;
    },
  },
});
