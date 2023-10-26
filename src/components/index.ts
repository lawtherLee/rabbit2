import XtxSkeleton from "@/components/skeleton/index.vue";
import { App } from "vue";
import XtxCarousel from "@/components/carousel/index.vue";
import XtxMore from "@/components/more/index.vue";
import { useIntersectionObserver } from "@vueuse/core";
import defaultImg from "@/assets/images/200.png";

const components = [XtxSkeleton, XtxCarousel, XtxMore];

// export default function (app: App) {
//   app.component("xtx-skeleton", XtxSkeleton);
// }

// app.use的install函数
export default function (app: App) {
  components.forEach((item) => {
    app.component(item.name, item);
  });

  // 图片懒加载
  app.directive("lazyLoad", {
    mounted(el, binding) {
      const { stop } = useIntersectionObserver(el, ([{ isIntersecting }]) => {
        if (isIntersecting) {
          el.src = binding.value;
          el.onerror = function () {
            el.src = defaultImg;
          };
          stop();
        }
      });
    },
  });
}
