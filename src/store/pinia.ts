import { defineStore } from "pinia";
import { ref } from "vue";
import { userDTO } from "../components/interfaces/userDTO";
import axios, { AxiosError, AxiosResponse } from "axios";
import { Ref } from "vue";
import axiosRetry from "axios-retry";

import {
  ImenuGroupByCategory,
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
        itemCartId: "364b27be-6f7a-46c7-ba62-1a8259db77a0",
        product_id: 4,
        product_name: "卡拉脆雞美式堡",
        product_price: 60,
        product_image: "https://thumbs.dreamstime.com/z/hamburger-11198171.jpg",
        adjustitems: [
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
          }
        ],
        qty: 1,
        afterAdjustSinglePrice: 80,
        finalPrice: 80
      },
      {
        itemCartId: "ea4b4ff8-23f6-4c14-861b-7563d59c8bec",
        product_id: 2,
        product_name: "嫩汁雞排輕捲餅",
        product_price: 60,
        product_image:
          "https://thumbs.dreamstime.com/z/sausage-burger-cheese-sandwich-english-muffin-isolated-white-background-sausage-burger-cheese-sandwich-187211969.jpg",
        adjustitems: [
          {
            adjustitem_id: 3,
            adjustitem_name: "起司",
            adjustitem_priceadjust: 10,
            adjusttype_id: 1
          },
          {
            adjustitem_id: 2,
            adjustitem_name: "荷包蛋",
            adjustitem_priceadjust: 10,
            adjusttype_id: 1
          },
          {
            adjustitem_id: 7,
            adjustitem_name: "玉米",
            adjustitem_priceadjust: 10,
            adjusttype_id: 1
          }
        ],
        qty: 1,
        afterAdjustSinglePrice: 90,
        finalPrice: 90
      }
    ] as IshoppingProduct[],
    singleProductTempData: {} as IshoppingProduct,
    clickedCartItemId: "",
    checkbox: [] as number[]
  }),
  getters: {},
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
          adjustitems: payload.value.adjustitems
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
        (item) => item.itemCartId === queryuuid
      ) as IshoppingProduct;
    },
    getSingleCartItemArrayIndex(queryuuid: string) {
      return this.cartData.findIndex((item) => item.itemCartId === queryuuid);
    }
  }
});
