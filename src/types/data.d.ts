// axios相应数据类型
export interface IAxiosRes<T> {
  code?: string;
  msg: string;
  result: T;
}

// 首页以及分类
export type CategoryItem = {
  id: number;
  name: string;
  children: CategoryItem[];
  picture: string;
  goods: GoodsType[];
  open: boolean;
};

export type GoodsType = {
  price: string;
  name: string;
  orderNum: null;
  id: string;
  picture: string;
  desc: string;
};

export type HomeBanner = {
  imgUrl: string;
  hrefUrl: string;
  id: string;
  type: string;
};
// 首页人气推荐
export type HomeHotGoods = {
  alt: string;
  id: string;
  picture: string;
  title: string;
};
// 首页热门品牌
export type HomeBrand = {
  desc: string;
  id: string;
  logo: string;
  name: string;
  nameEn: string;
  picture: string;
  place: string;
  type: null;
};
// 首页产品类型
export type subProduct = {
  id: string;
  layer: number;
  name: string;
  parent: null;
};
export type HomeProduct = {
  id: string;
  name: string;
  picture: string;
  saleInfo: string;
  children: subProduct[];
  goods: GoodsType[];
};
