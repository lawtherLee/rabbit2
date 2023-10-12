import XtxSkeleton from "@/components/skeleton/index.vue";
import { App } from "vue";

const components = [XtxSkeleton];

// export default function (app: App) {
//   app.component("xtx-skeleton", XtxSkeleton);
// }

export default function (app: App) {
  components.forEach((item) => {
    app.component(item.name, item);
  });
}
