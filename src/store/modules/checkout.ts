import { defineStore } from "pinia";
import instance from "@/utils/request.ts";
import { IAxiosRes } from "@/types/data";
import { CheckoutInfo } from "@/types/checkout.ts";

export default defineStore("checkout", {
  state: () => {
    return {
      checkoutInfo: {} as CheckoutInfo,
    };
  },
  actions: {
    async getCheckoutInfo() {
      const res =
        await instance.get<IAxiosRes<CheckoutInfo>>("/member/order/pre");
      this.checkoutInfo = res.data.result;
    },
  },
});
