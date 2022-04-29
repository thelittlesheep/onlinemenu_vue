import { Ref } from "vue";

interface Iadjtypes {
  adjusttype_id: number;
  adjusttype_name: string;
  adjusttype_type: string;
  adjustitems: [Iadjitem];
}

interface Iadjitem {
  adjustitem_id: number;
  adjustitem_name: string;
  adjustitem_priceadjust: number;
  adjusttype_id?: number;
}

interface Icategory {
  category_id: number;
  category_name: string;
}

interface Iproductdata {
  product_id: number;
  product_name: string;
  product_price: number;
  product_image: string;
  category_id: number;
}
interface IorderItem extends Iproductdata {
  orderItemQty?: number;
}

interface IorderItems extends IorderItem {
  orderStoreName: string;
  orderItemName: string;
}

interface IgroupedProps {
  menudatas: Ref<Array<Iproductdata>>;
  orders: Ref<Map<string, IorderItem>>;
}

interface ImenuGroupByCategory extends Icategory {
  adjusttypes: [Iadjtypes];
  products: [Iproductdata];
}

interface IshoppingProduct extends Iproductdata {
  shoppingProduct_uuid: string;
  shoppingProduct_qty: number;
  shoppingProduct_finalPrice: number;
  shoppingProduct_afterAdjustSinglePrice: number;
  shoppingProduct_adjustitems: Array<Iadjitem>;
}

export {
  Iadjtypes,
  Iadjitem,
  Icategory,
  Iproductdata,
  IorderItem,
  IorderItems,
  IgroupedProps,
  ImenuGroupByCategory,
  IshoppingProduct
};
