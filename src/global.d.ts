import XtxSkeleton from "@/components/skeleton";
import XtxCarousel from "@/components/carousel";
// 定义全局类型声明
declare module "vue" {
  export interface GlobalComponents {
    // key:全局组件名 value: 对应组件类型
    XtxSkeleton: typeof XtxSkeleton;
    XtxCarousel: typeof XtxCarousel;
  }
}

export {};