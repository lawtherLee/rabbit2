import { defineStore } from "pinia";
import instance from "@/utils/request.ts";
import { IAxiosRes } from "@/types/data";
import { CartItem } from "@/types/cart";

export default defineStore("cart", {
  state() {
    return {
      cartList: [] as CartItem[],
    };
  },
  actions: {
    // 添加购物车
    async addCart(skuId: string, count: number) {
      const res = await instance.post("/member/cart", { skuId, count });
      console.log(res);
    },

    // 获取购物车数据
    async getCartData() {
      const res = await instance.get<IAxiosRes<CartItem[]>>("/member/cart");
      this.cartList = res.data.result;
    },
  },
});
