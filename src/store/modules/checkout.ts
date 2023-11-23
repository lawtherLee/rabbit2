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
    async addAddress(address: UserAddress) {
      await instance.post("/member/address", address);
      // 添加完地址，重新渲染
      await this.getCheckoutInfo();
    },
    async updateAddress(address: UserAddress) {
      await instance.put(`/member/address/${address.id}`, address);
      // 添加完地址，重新渲染
      await this.getCheckoutInfo();
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
