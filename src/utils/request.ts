import axios, { AxiosError } from "axios";
import Message from "@/components/message/index.ts";
import useStore from "@/store";

// 备用接口地址: http://pcapi-xiaotuxian-front-devtest.itheima.net/
export const baseURL = "http://pcapi-xiaotuxian-front.itheima.net/";
const instance = axios.create({
  baseURL,
  timeout: 5000,
});

// 添加请求拦截器
instance.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
    const { userStore } = useStore();
    if (userStore.profile.token) {
      config.headers.Authorization = "Bearer " + userStore.profile.token;
    }
    return config;
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  },
);

// 添加响应拦截器
instance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (
    error: AxiosError<{
      message: string;
    }>,
  ) {
    console.log(error);
    // 对响应错误做点什么
    if (error.response) {
      Message.error(error.response.data.message);
    }
    return Promise.reject(error);
  },
);

export default instance;
