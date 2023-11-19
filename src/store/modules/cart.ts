import { defineStore } from "pinia";
import instance from "@/utils/request.ts";
import { IAxiosRes } from "@/types/data";
import { CartItem } from "@/types/cart";
import Message from "@/components/message/index.ts";
import useStore from "@/store";

export default defineStore("cart", {
  persist: true,
  state() {
    return {
      cartList: [] as CartItem[],
    };
  },
  actions: {
    // 添加购物车
    async addCart(data: CartItem) {
      if (this.isLogin) {
        const res = await instance.post("/member/cart", {
          skuId: data.skuId,
          count: data.count,
        });
        console.log(res);
        await this.getCartData();
      } else {
        const findItem = this.cartList.find((item) => item.id === data.id);
        if (findItem) {
          findItem.count += data.count;
        } else {
          this.cartList.unshift(data);
        }
      }
    },

    // 获取购物车数据
    async getCartData() {
      if (this.isLogin) {
        const res = await instance.get<IAxiosRes<CartItem[]>>("/member/cart");
        this.cartList = res.data.result;
        return;
      }
      // 主动更新本地商品价格
      for (const item of this.cartList) {
        const res = await instance.get("/goods/stock/" + item.skuId);
        item.nowPrice = res.data.result.nowPrice;
        item.stock = res.data.result.stock;
      }
    },

    // 删除购物车
    async delCart(skuId: string[]) {
      if (this.isLogin) {
        await instance.delete("/member/cart", {
          data: {
            ids: skuId,
          },
        });
        await this.getCartData();
      } else {
        this.cartList = this.cartList.filter((item) => {
          return !skuId.includes(item.skuId);
        });
      }
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
      if (this.isLogin) {
        await instance.put("/member/cart/" + id, data);
        Message.success("更新成功");
        return;
      }
      const findItem = this.cartList.find((item) => item.id === id);

      if (!findItem) return;
      if (data.selected === undefined) {
        findItem.count = data.count;
      } else {
        findItem.selected = data.selected;
      }
    },

    // 更新全选
    async updateAllCheck(selected: boolean) {
      if (this.isLogin) {
        await instance.put("/member/cart/selected", { selected });
        await this.getCartData();
        return;
      }
      this.cartList.forEach((item) => (item.selected = selected));
    },

    // 合并本地购物车缓存
    async mergeStorageCart() {
      const mergeData = this.cartList.map((item) => ({
        skuId: item.skuId,
        selected: item.selected,
        count: item.count,
      }));
      await instance.post("/member/cart/merge", mergeData);
      await this.getCartData();
    },
  },
  getters: {
    // 判断是否登录
    isLogin(): boolean {
      const { userStore } = useStore();
      return !!userStore.profile.token;
    },

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
