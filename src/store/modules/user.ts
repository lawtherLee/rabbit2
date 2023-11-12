import { defineStore } from "pinia";
import instance from "@/utils/request.ts";
import { IAxiosRes } from "@/types/data";
import { Profile } from "@/types/user.ts";
import { getProfile, setProfile } from "@/utils/storage.ts";
import router from "@/router";

export default defineStore("user", {
  state: () => {
    return {
      profile: getProfile() as Profile,
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
      setProfile(res.data.result);
    },

    // 获取验证码
    async getCode(mobile: string) {
      await instance.get("/login/code", {
        params: {
          mobile,
        },
      });
    },

    // 短信登录
    async mobileLogin(mobile: string, code: string) {
      const res = await instance.post<IAxiosRes<Profile>>("/login/code", {
        mobile,
        code,
      });
      // 1. 保存用户信息到 state 中
      this.profile = res.data.result;
      setProfile(res.data.result);
    },

    // 用户退出
    async logout() {
      this.profile = {} as Profile;
      setProfile(this.profile);
      await router.push("/login");
    },
  },
});
