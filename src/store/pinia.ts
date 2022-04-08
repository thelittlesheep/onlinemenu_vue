import { defineStore } from "pinia";
import { ref } from "vue";
import { userDTO } from "../components/interfaces/userDTO";
import axios, { AxiosError, AxiosResponse } from "axios";
import { Ref } from "vue";
import axiosRetry from "axios-retry";

import {
  ImenuGroupByCategory,
  Iproductdata,
  IshoppingProduct
} from "../components/menu/menuData/menuDataInterface";
import { cartdataDTO } from "@/components/interfaces/cartDataDTO";

axiosRetry(axios, { retries: 3 });

export const usepinia = defineStore("main", {
  state: () => ({
    user: {} as userDTO,
    menudatas: [] as Array<ImenuGroupByCategory>,
    dialogVis: false,
    drawer: false,
    cartData: [
      {
        product_id: 1,
        product_name: "嫩汁雞排美式堡",
        product_price: 60,
        product_image: "https://thumbs.dreamstime.com/z/hamburger-7831093.jpg",
        category_id: 1,
        shoppingProduct_uuid: "eccf2ddd-f257-4e4d-97e4-3a0bf6e6e042",
        shoppingProduct_qty: 3,
        shoppingProduct_afterAdjustSinglePrice: 60,
        shoppingProduct_finalPrice: 180,
        shoppingProduct_adjustitems: []
      }
    ] as IshoppingProduct[],
    singleProductTempData: {} as IshoppingProduct,
    clickedCartItemId: "",
    clickedProductId: NaN,
    clickedProductCategoryId: NaN,
    checkbox: [] as number[],
    isModifyMode: false
  }),
  getters: {
    getClickedTempProductData: (state) => {
      return state.menudatas
        .find(
          (category) => category.category_id === state.clickedProductCategoryId
        )
        ?.products.find(
          (product) => product.product_id === state.clickedProductId
        ) as Iproductdata;
    },
    getClickedTempCategoryData: (state) => {
      return state.menudatas.find(
        (category) => category.category_id === state.clickedProductCategoryId
      ) as ImenuGroupByCategory;
    },
    singleProductFinalPrice: (state): number => {
      return (
        state.singleProductTempData.shoppingProduct_qty *
        state.singleProductTempData.shoppingProduct_afterAdjustSinglePrice
      );
    },
    isEmptyCart: (state) => {
      return state.cartData.length === 0 ? true : false;
    }
  },
  actions: {
    async postCreateUserForm(user: userDTO): Promise<AxiosResponse<userDTO>> {
      return await axios
        .post("http://localhost:3000/menu/user", user)
        .then((res) => {
          return res;
        })
        .catch((e) => {
          throw e;
        });
    },
    async getMenuData(): Promise<AxiosResponse<Array<ImenuGroupByCategory>>> {
      return await axios
        .get("http://localhost:3000/menu/product")
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
      payload: Ref<cartdataDTO>
    ): Promise<AxiosResponse<cartdataDTO>> {
      // console.log(payload);

      return await axios
        .post("http://localhost:3000/menu/order", {
          user_id: 1,
          order_quantity: 1,
          order_orderdate: "2022-02-11 19:30:00",
          order_pickupdate: "2022-02-11 20:30:00",
          product_id: payload.value.product_id,
          order_product_quantity: payload.value.order_product_quantity,
          shoppingProduct_adjustitems: payload.value.adjustitems
        })
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
    }
  }
});
