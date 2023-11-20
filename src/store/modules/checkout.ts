import { defineStore } from "pinia";
import instance from "@/utils/request.ts";
import { IAxiosRes } from "@/types/data";
import { CheckoutInfo, UserAddress } from "@/types/checkout.ts";

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
      console.log(res);
      this.checkoutInfo = res.data.result;
    },
  },
  getters: {
    showUserAddress(): UserAddress | null {
      if (!this.checkoutInfo.userAddresses?.length) return null;
      const findItem = this.checkoutInfo.userAddresses.find(
        (item) => item.isDefault === 0,
      );
      return findItem || this.checkoutInfo.userAddresses[0];
    },
  },
});
