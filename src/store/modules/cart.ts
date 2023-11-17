import { defineStore } from "pinia";
import instance from "@/utils/request.ts";

export default defineStore("cart", {
  state() {
    return {};
  },
  actions: {
    async addCart(skuId: string, count: number) {
      const res = await instance.post("/member/cart", { skuId, count });
      console.log(res);
    },
  },
});
