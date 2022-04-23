import { IshoppingProduct } from "@/interface/menuDataInterface";

export interface orderDTO {
  user_id?: number;
  order_quantity?: number;
  order_orderdate?: string;
  order_pickupdate?: string;
  order_products?: Array<IshoppingProduct>;
}
