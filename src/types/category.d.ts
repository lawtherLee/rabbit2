// 顶级分类
import { GoodsType } from "@/types/data";

export type TopCategory = {
  id: string;
  name: string;
  picture: null;
  children: subCategory[];
};
// 二级分类
export type SubCategory = {
  parentName: null;
  name: string;
  saleProperties: null;
  id: string;
  parentId: null;
  picture: string;
  brands: null;
  categories: null;
  goods: GoodsType[];
};
