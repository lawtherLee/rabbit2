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
