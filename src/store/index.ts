import category from "@/store/modules/category.ts";

export default function useStore() {
  return {
    useCategoryStore: category(),
  };
}
