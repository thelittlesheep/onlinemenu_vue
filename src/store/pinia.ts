import { defineStore } from "pinia";
import { userDTO } from "@/components/interfaces/userDTO";
import axios, { AxiosResponse } from "axios";
import { Ref } from "vue";
import axiosRetry from "axios-retry";
import { v4 as uuidv4 } from "uuid";

import {
  ImenuGroupByCategory,
  Iproductdata,
  IshoppingProduct
} from "@/interface/menuDataInterface";
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
      },
      {
        product_id: 4,
        product_name: "卡拉脆雞美式堡",
        product_price: 60,
        product_image: "https://thumbs.dreamstime.com/z/hamburger-11198171.jpg",
        category_id: 1,
        shoppingProduct_uuid: "40e72d70-3670-4b81-bc35-0c5b881be591",
        shoppingProduct_qty: 1,
        shoppingProduct_afterAdjustSinglePrice: 90,
        shoppingProduct_finalPrice: 90,
        shoppingProduct_adjustitems: [
          {
            adjustitem_id: 2,
            adjustitem_name: "荷包蛋",
            adjustitem_priceadjust: 10,
            adjusttype_id: 1
          },
          {
            adjustitem_id: 4,
            adjustitem_name: "生菜",
            adjustitem_priceadjust: 10,
            adjusttype_id: 1
          },
          {
            adjustitem_id: 5,
            adjustitem_name: "花生醬",
            adjustitem_priceadjust: 10,
            adjusttype_id: 1
          }
        ]
      },
      {
        product_id: 2,
        product_name: "嫩汁雞排輕捲餅",
        product_price: 60,
        product_image:
          "https://thumbs.dreamstime.com/z/sausage-burger-cheese-sandwich-english-muffin-isolated-white-background-sausage-burger-cheese-sandwich-187211969.jpg",
        category_id: 2,
        shoppingProduct_uuid: "15c15ffc-c784-440f-8b6e-4b543649ab91",
        shoppingProduct_qty: 1,
        shoppingProduct_afterAdjustSinglePrice: 115,
        shoppingProduct_finalPrice: 115,
        shoppingProduct_adjustitems: [
          {
            adjustitem_id: 3,
            adjustitem_name: "起司",
            adjustitem_priceadjust: 10,
            adjusttype_id: 1
          },
          {
            adjustitem_id: 4,
            adjustitem_name: "生菜",
            adjustitem_priceadjust: 10,
            adjusttype_id: 1
          },
          {
            adjustitem_id: 5,
            adjustitem_name: "花生醬",
            adjustitem_priceadjust: 10,
            adjusttype_id: 1
          },
          {
            adjustitem_id: 6,
            adjustitem_name: "肉鬆",
            adjustitem_priceadjust: 10,
            adjusttype_id: 1
          },
          {
            adjustitem_id: 8,
            adjustitem_name: "培根",
            adjustitem_priceadjust: 15,
            adjusttype_id: 1
          }
        ]
      },
      {
        product_id: 3,
        product_name: "嫩汁雞排瑪芬堡",
        product_price: 60,
        product_image:
          "https://thumbs.dreamstime.com/z/taco-filling-cherry-tomatoes-chicken-cucumbers-onions-63100029.jpg",
        category_id: 3,
        shoppingProduct_uuid: "7b8febf3-ae64-49e9-919c-cc0af87a30f9",
        shoppingProduct_qty: 1,
        shoppingProduct_afterAdjustSinglePrice: 80,
        shoppingProduct_finalPrice: 80,
        shoppingProduct_adjustitems: [
          {
            adjustitem_id: 2,
            adjustitem_name: "荷包蛋",
            adjustitem_priceadjust: 10,
            adjusttype_id: 1
          },
          {
            adjustitem_id: 4,
            adjustitem_name: "生菜",
            adjustitem_priceadjust: 10,
            adjusttype_id: 1
          }
        ]
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
    },
    setNewSingleProductTempData() {
      this.singleProductTempData = {
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
    }
  }
});
