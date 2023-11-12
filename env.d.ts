// declare module "*.vue" {
//   import type { DefineComponent } from "vue";
//   const vueComponent: DefineComponent<{}, {}, any>;
//   export default vueComponent;
// }

declare namespace QC {
  declare const Login: {
    check: () => boolean;
    getMe: () => void;
    api: () => any;
  };

  declare const api = (str: string) => any;
}
