import { Ref } from "vue";

export interface Imenudata {
  readonly name: string;
  readonly price: number;
  readonly canAddEgg: boolean;
  readonly canAddCheese: boolean;
  nameShow?: string;
  priceShow?: string;
  canAddEggShow?: string;
  canAddCheeseShow?: string;
}
export interface IorderItem extends Imenudata {
  orderItemQty?: number;
}

export interface IorderItems extends IorderItem {
  orderStoreName: string;
  orderItemName: string;
}

export interface IgroupedProps {
  datas: Ref<Imenudata[]>;
  orders: Ref<Map<string, IorderItem>>;
}
