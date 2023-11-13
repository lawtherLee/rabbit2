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

    // QQ登录
    async QQLogin(openId: string) {
      const res = await instance.post<IAxiosRes<Profile>>("/login/social", {
        unionId: openId,
        source: 6,
      });
      console.log(res);
    },

    // 用户退出
    async logout() {
      this.profile = {} as Profile;
      setProfile(this.profile);
      await router.push("/login");
    },

    // 绑定qq的短信验证码
    async sendQQBindMsg(mobile: string) {
      await instance.get("/login/social/code", {
        params: {
          mobile,
        },
      });
    },

    // 绑定qq并登录
    async QQBindLogin(unionId: string, mobile: string, code: string) {
      const res = await instance.post("/login/social/bind", {
        unionId,
        mobile,
        code,
      });
      console.log(res);
    },

    // 获取短信验证码
    // 绑定qq的短信验证码
    async sendQQPathMsg(mobile: string) {
      await instance.get("/register/code", {
        params: {
          mobile,
        },
      });
    },

    async qqPatchLogin(data: any) {
      const res = await instance.post<IAxiosRes<Profile>>(
        `/login/social/${data.openId}/complement`,
        data,
      );
      // 1. 保存用户信息到 state 中
      this.profile = res.data.result;
      setProfile(res.data.result);
    },
  },
});
