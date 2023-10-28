// 顶级分类
import { GoodsType } from "@/types/data";

export type TopCategory = {
  id: string;
  name: string;
  picture: null;
  children: subCategory[];
};
// 二级分类
export type SaleProp = {
  id: string;
  name: string;
};
export type Sale = {
  id: string;
  name: string;
  properties: SaleProp[];
};
export type SubCategory = {
  parentName: null;
  name: string;
  saleProperties: Sale[];
  id: string;
  parentId: null;
  picture: string;
  brands: null;
  categories: null;
  goods: GoodsType[];
};
