import XtxSkeleton from "@/components/skeleton";
import XtxCarousel from "@/components/carousel";
import XtxMore from "@/components/more/index.vue";
import XtxBread from "@/components/bread/index.vue";
import XtxBreadItem from "@/components/bread/item.vue";
import XtxGoodsItem from "@/components/goodsItem/index.vue";
import XtxCity from "@/components/city/index.vue";
import XtxNumbox from "@/components/number/index.vue";
import XtxButton from "@/components/button/index.vue";
import XtxCheckbox from "@/components/checkbox/index.vue";
import XtxMessage from "@/components/message/index.vue";
import XtxConfirm from "@/components/confirm/index.vue";
// 定义全局类型声明
declare module "vue" {
  export interface GlobalComponents {
    // key:全局组件名 value: 对应组件类型
    XtxSkeleton: typeof XtxSkeleton;
    XtxCarousel: typeof XtxCarousel;
    XtxMore: typeof XtxMore;
    XtxBread: typeof XtxBread;
    XtxBreadItem: typeof XtxBreadItem;
    XtxGoodsItem: typeof XtxGoodsItem;
    XtxCity: typeof XtxCity;
    XtxNumbox: typeof XtxNumbox;
    XtxButton: typeof XtxButton;
    XtxCheckbox: typeof XtxCheckbox;
    XtxMessage: typeof XtxMessage;
    XtxConfirm: typeof XtxConfirm;
  }
}

export {};
