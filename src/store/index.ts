import category from "@/store/modules/category.ts";
import home from "@/store/modules/home.ts";

export default function useStore() {
  return {
    useCategoryStore: category(),
    useHomeStore: home(),
  };
}
