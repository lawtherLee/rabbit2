import category from "@/store/modules/category.ts";
import home from "@/store/modules/home.ts";
import goods from "@/store/modules/goods.ts";

export default function useStore() {
  return {
    useCategoryStore: category(),
    useHomeStore: home(),
    goodsStore: goods(),
  };
}
