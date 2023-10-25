import XtxSkeleton from "@/components/skeleton/index.vue";
import { App } from "vue";
import XtxCarousel from "@/components/carousel/index.vue";
import XtxMore from "@/components/more/index.vue";

const components = [XtxSkeleton, XtxCarousel, XtxMore];

// export default function (app: App) {
//   app.component("xtx-skeleton", XtxSkeleton);
// }

// app.use的install函数
export default function (app: App) {
  components.forEach((item) => {
    app.component(item.name, item);
  });
}
