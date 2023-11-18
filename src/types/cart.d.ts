// 单个购物车商品
export interface CartItem {
  id: string;
  skuId: string;
  name: string;
  attrsText: string;
  picture: string;
  price: number;
  nowPrice: string;
  nowOriginalPrice: string;
  selected: boolean;
  stock: number;
  count: number;
  isEffective: boolean;
  // discount?: any;
  isCollect: boolean;
  postFee: number;
}
