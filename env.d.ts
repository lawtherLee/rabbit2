// declare module "*.vue" {
//   import type { DefineComponent } from "vue";
//   const vueComponent: DefineComponent<{}, {}, any>;
//   export default vueComponent;
// }

namespace QC {
  const Login: {
    check: () => boolean;
    getMe: () => void;
  };
}
