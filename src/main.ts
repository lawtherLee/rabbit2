import { createApp } from "vue";
import App from "./App.vue";

// 引入样式重置,将不同浏览器样式统一
import "normalize.css";
// 引入公共样式
import "@/assets/styles/common.less";
import router from "@/router";
import { createPinia } from "pinia";
import XtxUi from "@/components";

const app = createApp(App);
const pinia = createPinia();

app.use(XtxUi);

app.use(pinia);
app.use(router);
app.mount("#app");
