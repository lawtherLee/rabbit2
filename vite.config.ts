import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue"; // https://vitejs.dev/config/
import vueSetupExtend from "vite-plugin-vue-setup-extend"; // https://vitejs.dev/config/
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue({ reactivityTransform: true }), vueSetupExtend()],
  resolve: {
    alias: {
      "@": "/src",
    },
  },
  css: {
    preprocessorOptions: {
      less: {
        additionalData: `
          @import "@/assets/styles/variables.less";
          @import "@/assets/styles/mixins.less";
        `,
      },
    },
  },
  // 配置第三方登录
  server: {
    host: "www.corho.com",
    port: 8080,
    open: true,
    cors: true,
  },
});
