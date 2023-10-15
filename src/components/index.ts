import XtxSkeleton from "@/components/skeleton/index.vue";
import { App } from "vue";
import XtxCarousel from "@/components/carousel/index.vue";

const components = [XtxSkeleton, XtxCarousel];

// export default function (app: App) {
//   app.component("xtx-skeleton", XtxSkeleton);
// }

export default function (app: App) {
  components.forEach((item) => {
    app.component(item.name, item);
  });
}
