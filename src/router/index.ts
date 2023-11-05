import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(),
  scrollBehavior() {
    return { top: 0 };
  },
  routes: [
    {
      path: "/",

      component: () => import("@/views/Layout/index.vue"),
      children: [
        {
          path: "",
          component: () => import("@/views/Home/index.vue"),
        },
        {
          path: "/category/:id",
          component: () => import("@/views/Category/index.vue"),
        },
        {
          path: "/category/sub/:id",
          component: () => import("@/views/Category/sub.vue"),
        },
        {
          path: "/goods/:id",
          component: () => import("@/views/GoodsDetail/index.vue"),
        },
      ],
    },
    {
      path: "/login",
      component: () => import("@/views/Login/index.vue"),
    },
  ],
});
export default router;
