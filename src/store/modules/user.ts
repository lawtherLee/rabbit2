import { defineStore } from "pinia";
import instance from "@/utils/request.ts";
import { IAxiosRes } from "@/types/data";
import { Profile } from "@/types/user.ts";

export default defineStore("user", {
  state: () => {
    return {
      profile: {},
    };
  },
  actions: {
    // 账号登录
    async accountLogin(password: string, account: string) {
      console.log("账号登录");
      const res = await instance.post<IAxiosRes<Profile>>("/login", {
        password,
        account,
      });
      console.log(res);
      this.profile = res.data.result;
    },
  },
});
