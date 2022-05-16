import { Iadjitem } from "@/interface/menuData.Interface";

export interface orderDTO {
  user_id: number;
  order_id: number;
  order_quantity?: number;
  order_orderdate?: string;
  order_pickupdate?: string;
  order_products?: Array<Iorderproduct>;
}

export interface Iorderproduct {
  order_product_id: number;
  order_product_quantity: number;
  product_name: string;
  product_price: number;
  order_product_adjustitem: Array<Iadjitem>;
  order_product_finalprice: number;
}
