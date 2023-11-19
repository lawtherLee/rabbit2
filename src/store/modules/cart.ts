import { defineStore } from "pinia";
import instance from "@/utils/request.ts";
import { IAxiosRes } from "@/types/data";
import { CartItem } from "@/types/cart";
import Message from "@/components/message/index.ts";

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
      await this.getCartData();
    },

    // 获取购物车数据
    async getCartData() {
      const res = await instance.get<IAxiosRes<CartItem[]>>("/member/cart");
      this.cartList = res.data.result;
    },

    // 删除购物车
    async delCart(skuId: string[]) {
      await instance.delete("/member/cart", {
        data: {
          ids: skuId,
        },
      });
      await this.getCartData();
    },

    // 监听数量变化
    async changeBuyCount(id: string, count: number) {
      const findItem = this.cartList.find((item) => item.skuId === id);
      if (findItem) {
        findItem.count = count;
      }
      await this.updateCart(id, { count });
    },

    // 更新选中状态和数量
    async updateCart(id: string, data: { selected?: boolean; count: number }) {
      await instance.put("/member/cart/" + id, data);
      Message.success("更新成功");
    },

    // 更新全选
    async updateAllCheck(selected: boolean) {
      await instance.put("/member/cart/selected", { selected });
      await this.getCartData();
    },
  },
  getters: {
    cartCount(): number {
      return this.cartList.reduce((count, item) => count + item.count, 0);
    },
    selectedCount(): number {
      return this.cartList.reduce((count: number, item: CartItem) => {
        if (item.selected) {
          return count + item.count;
        }
        return count;
      }, 0);
    },
    cartTotalPrice(): string {
      return this.cartList
        .reduce((price, item) => {
          return price + item.count * item.price;
        }, 0)
        .toFixed(2);
    },
    selectedTotalPrice(): string {
      return this.cartList
        .reduce((price: number, item: CartItem) => {
          if (item.selected) {
            return price + item.count * item.price;
          }
          return price;
        }, 0)
        .toFixed(2);
    },
    // 是否全选
    isAllCheck(): boolean {
      return this.cartList.every((item: CartItem) => item.selected);
    },
  },
});
