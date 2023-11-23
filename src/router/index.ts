import { createRouter, createWebHistory } from "vue-router";
import useStore from "@/store";

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
        {
          path: "/cart",
          component: () => import("@/views/cart/index.vue"),
        },
        {
          path: "/member/checkout",
          component: () => import("@/views/Member/pay/checkout.vue"),
        },
        {
          path: "/member/pay",
          component: () => import("@/views/Member/pay/index.vue"),
        },
        {
          path: "/pay/callback",
          component: () => import("@/views/Member/pay/callback.vue"),
        },
      ],
    },
    {
      path: "/login",
      component: () => import("@/views/Login/index.vue"),
    },
    {
      path: "/login/callback",
      component: () => import("@/views/Login/callback.vue"),
    },
  ],
});

router.beforeEach((to, from, next) => {
  const { cartStore } = useStore();
  if (!cartStore.isLogin && to.path.startsWith("/member")) {
    next("/login");
  } else {
    next();
  }
});
export default router;
