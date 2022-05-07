// 必要
import { defineStore, acceptHMRUpdate } from "pinia";
import { userBasicDTO, userDTO } from "@/interface/userDTO";
import axios, { AxiosResponse } from "axios";
import { Ref } from "vue";
import axiosRetry from "axios-retry";
import { v4 as uuidv4 } from "uuid";
// 資料型態
import {
  ImenuGroupByCategory,
  Iproductdata,
  IshoppingProduct
} from "@/interface/menuData.Interface";
import { Iorderproduct, orderDTO } from "@/interface/orderDTO";
import moment from "moment";
import { userStore } from "./user.store";
// 環境變數
const dev_remote_url = import.meta.env.VITE_BACKEND_DEV_REMOTE_HOST;
const dev_url = import.meta.env.VITE_BACKEND_DEV_HOST;
const url = dev_url;
console.log("Mainstore");

axiosRetry(axios, { retries: 3 });
export const mainStore = defineStore("mainStore", {
  state: () => ({
    menudatas: [] as Array<ImenuGroupByCategory>,
    dialogVis: false,
    drawerVis: false,
    isModifyMode: false,
    isLogin: false,
    cartData: [
      // {
      //   product_id: 1,
      //   product_name: "嫩汁雞排美式堡",
      //   product_price: 60,
      //   product_image: "https://thumbs.dreamstime.com/z/hamburger-7831093.jpg",
      //   category_id: 1,
      //   shoppingProduct_uuid: "eccf2ddd-f257-4e4d-97e4-3a0bf6e6e042",
      //   shoppingProduct_qty: 3,
      //   shoppingProduct_afterAdjustSinglePrice: 60,
      //   shoppingProduct_finalPrice: 180,
      //   shoppingProduct_adjustitems: []
      // },
      // {
      //   product_id: 4,
      //   product_name: "卡拉脆雞美式堡",
      //   product_price: 60,
      //   product_image: "https://thumbs.dreamstime.com/z/hamburger-11198171.jpg",
      //   category_id: 1,
      //   shoppingProduct_uuid: "40e72d70-3670-4b81-bc35-0c5b881be591",
      //   shoppingProduct_qty: 1,
      //   shoppingProduct_afterAdjustSinglePrice: 90,
      //   shoppingProduct_finalPrice: 90,
      //   shoppingProduct_adjustitems: [
      //     {
      //       adjustitem_id: 2,
      //       adjustitem_name: "荷包蛋",
      //       adjustitem_priceadjust: 10,
      //       adjusttype_id: 1
      //     },
      //     {
      //       adjustitem_id: 4,
      //       adjustitem_name: "生菜",
      //       adjustitem_priceadjust: 10,
      //       adjusttype_id: 1
      //     },
      //     {
      //       adjustitem_id: 5,
      //       adjustitem_name: "花生醬",
      //       adjustitem_priceadjust: 10,
      //       adjusttype_id: 1
      //     }
      //   ]
      // },
      // {
      //   product_id: 2,
      //   product_name: "嫩汁雞排輕捲餅",
      //   product_price: 60,
      //   product_image:
      //     "https://thumbs.dreamstime.com/z/sausage-burger-cheese-sandwich-english-muffin-isolated-white-background-sausage-burger-cheese-sandwich-187211969.jpg",
      //   category_id: 2,
      //   shoppingProduct_uuid: "15c15ffc-c784-440f-8b6e-4b543649ab91",
      //   shoppingProduct_qty: 1,
      //   shoppingProduct_afterAdjustSinglePrice: 115,
      //   shoppingProduct_finalPrice: 115,
      //   shoppingProduct_adjustitems: [
      //     {
      //       adjustitem_id: 3,
      //       adjustitem_name: "起司",
      //       adjustitem_priceadjust: 10,
      //       adjusttype_id: 1
      //     },
      //     {
      //       adjustitem_id: 4,
      //       adjustitem_name: "生菜",
      //       adjustitem_priceadjust: 10,
      //       adjusttype_id: 1
      //     },
      //     {
      //       adjustitem_id: 5,
      //       adjustitem_name: "花生醬",
      //       adjustitem_priceadjust: 10,
      //       adjusttype_id: 1
      //     },
      //     {
      //       adjustitem_id: 6,
      //       adjustitem_name: "肉鬆",
      //       adjustitem_priceadjust: 10,
      //       adjusttype_id: 1
      //     },
      //     {
      //       adjustitem_id: 8,
      //       adjustitem_name: "培根",
      //       adjustitem_priceadjust: 15,
      //       adjusttype_id: 1
      //     }
      //   ]
      // },
      // {
      //   product_id: 3,
      //   product_name: "嫩汁雞排瑪芬堡",
      //   product_price: 60,
      //   product_image:
      //     "https://thumbs.dreamstime.com/z/taco-filling-cherry-tomatoes-chicken-cucumbers-onions-63100029.jpg",
      //   category_id: 3,
      //   shoppingProduct_uuid: "7b8febf3-ae64-49e9-919c-cc0af87a30f9",
      //   shoppingProduct_qty: 1,
      //   shoppingProduct_afterAdjustSinglePrice: 80,
      //   shoppingProduct_finalPrice: 80,
      //   shoppingProduct_adjustitems: [
      //     {
      //       adjustitem_id: 2,
      //       adjustitem_name: "荷包蛋",
      //       adjustitem_priceadjust: 10,
      //       adjusttype_id: 1
      //     },
      //     {
      //       adjustitem_id: 4,
      //       adjustitem_name: "生菜",
      //       adjustitem_priceadjust: 10,
      //       adjusttype_id: 1
      //     }
      //   ]
      // }
    ] as IshoppingProduct[],
    order: {} as orderDTO,
    shoppingProduct: {} as IshoppingProduct,
    clickedCartItemId: "",
    clickedProductId: NaN,
    clickedProductCategoryId: NaN,
    checkbox: [] as number[]
  }),
  getters: {
    getClickedTempProductData: (state) => {
      return state.menudatas
        .find(
          (category) => category.category_id === state.clickedProductCategoryId
        )
        ?.products.find(
          (product: { product_id: number }) =>
            product.product_id === state.clickedProductId
        ) as Iproductdata;
    },
    getClickedTempCategoryData: (state) => {
      return state.menudatas.find(
        (category) => category.category_id === state.clickedProductCategoryId
      ) as ImenuGroupByCategory;
    },
    singleProductFinalPrice: (state): number => {
      return (
        state.shoppingProduct.shoppingProduct_qty *
        state.shoppingProduct.shoppingProduct_afterAdjustSinglePrice
      );
    },
    isEmptyCart: (state) => {
      return state.cartData.length === 0 ? true : false;
    },
    adjustitemsTocheckbox: (state): number[] | [] => {
      return state.shoppingProduct.shoppingProduct_adjustitems
        ? state.shoppingProduct.shoppingProduct_adjustitems.map(
            (adjustitem) => {
              return adjustitem.adjustitem_id;
            }
          )
        : [];
    }
  },
  actions: {
    async getMenuData(): Promise<AxiosResponse<Array<ImenuGroupByCategory>>> {
      return await axios
        .get(url + "/menu/product")
        .then((res) => {
          return res;
        })
        .catch((e) => {
          if (!e.status) {
            throw "Network Error Axios Can't reach server";
          } else {
            //   console.log(e.response?.status);
            throw e;
          }
        });
    },
    async postMenuCartData(
      payload: Ref<orderDTO>
    ): Promise<AxiosResponse<orderDTO>> {
      // console.log(payload);

      return await axios
        .post(
          "/backend/menu/order",
          {
            user_id: payload.value.user_id,
            order_quantity: payload.value.order_products?.length,
            order_orderdate: payload.value.order_orderdate,
            order_pickupdate: payload.value.order_pickupdate,
            order_products: payload.value.order_products
          },
          { withCredentials: true }
        )
        .then((res) => {
          return res;
        })
        .catch((e) => {
          //   console.log(e.response?.status);
          throw e;
        });
    },
    getSingleCartItem(queryuuid: string) {
      return this.cartData.find(
        (item) => item.shoppingProduct_uuid === queryuuid
      ) as IshoppingProduct;
    },
    getSingleCartItemArrayIndex(queryuuid: string) {
      return this.cartData.findIndex(
        (item) => item.shoppingProduct_uuid === queryuuid
      );
    },
    setNewshoppingProduct() {
      return {
        ...this.getClickedTempProductData,
        category_id: this.getClickedTempCategoryData.category_id,
        shoppingProduct_uuid: uuidv4(),
        shoppingProduct_qty: 1,
        shoppingProduct_afterAdjustSinglePrice:
          this.getClickedTempProductData.product_price,
        shoppingProduct_finalPrice:
          this.getClickedTempProductData.product_price,
        shoppingProduct_adjustitems: []
      };
    },
    displayLocalDateTime(date: string | undefined) {
      return date
        ? moment(date).format("y年 MMM Do (ddd) A hh:mm")
        : "時間格式有誤";
    },
    getOrderTotalPrice(
      order_products: Array<Iorderproduct> | undefined
    ): number {
      return order_products
        ? order_products.reduce((acc, cur) => {
            return acc + cur.order_product_finalprice;
          }, 0)
        : NaN;
    },
    getOrderSingleProductTotalPrice(
      order_products: Iorderproduct[] | undefined
    ) {
      if (order_products) {
        order_products.forEach((item) => {
          const tempAdjustitemsSum = item.order_product_adjustitem.reduce(
            (acc, cur) => {
              return acc + cur.adjustitem_priceadjust;
            },
            0
          );

          item.product_price = item.product_price + tempAdjustitemsSum;

          item.order_product_finalprice =
            item.order_product_quantity * item.product_price;
        });
      } else {
        return NaN;
      }
      // order_products
      //   ? order_products.forEach((item) => {
      //       item.order_product_finalprice =
      //         item.order_product_quantity * item.product_price;
      //     })
      //   : null;
    },
    modifyshoppingProductadjustitems(val: Array<number>) {
      val.forEach((selectedId) => {
        this.getClickedTempCategoryData.adjusttypes.forEach((category) => {
          category.adjustitems.forEach((adjustitems) => {
            if (adjustitems.adjustitem_id === selectedId) {
              this.shoppingProduct.shoppingProduct_adjustitems.push(
                adjustitems
              );
              this.shoppingProduct.shoppingProduct_afterAdjustSinglePrice +=
                adjustitems.adjustitem_priceadjust;
              this.shoppingProduct.shoppingProduct_finalPrice =
                this.shoppingProduct.shoppingProduct_afterAdjustSinglePrice;
            }
          });
        });
      });
      // 將shoppingProduct_adjustitems進行排序
      this.shoppingProduct.shoppingProduct_adjustitems.sort((a, b) => {
        return a.adjustitem_id - b.adjustitem_id;
      });
    }
  }
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(mainStore, import.meta.hot));
}
