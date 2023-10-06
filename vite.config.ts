import {defineConfig} from "vite";
import vue from "@vitejs/plugin-vue"; // https://vitejs.dev/config/
import vueSetupExtend from "vite-plugin-vue-setup-extend"; // https://vitejs.dev/config/
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vueSetupExtend()],
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
});
