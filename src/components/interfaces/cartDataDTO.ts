export interface cartdataDTO {
  user_id?: number;
  order_quantity?: number;
  order_orderdate?: string;
  order_pickupdate?: string;
  product_id?: number;
  order_product_quantity?: number;
  adjustitems?: number[];
}

export class cartdata implements cartdataDTO {
  user_id?: number | undefined;
  order_quantity: number;
  constructor() {
    this.order_quantity = 1;
  }
}
