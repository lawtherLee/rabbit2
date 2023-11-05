import instance from "@/utils/request.ts";

/**
 * 获取商品热销榜单
 * @param id 商品id
 * @param limit 数量限制
 * @param type 榜单类型
 */
export function getHotAPI(id: string, limit: number, type: number) {
  return instance.get("/goods/hot", {
    params: {
      id,
      limit,
      type,
    },
  });
}
