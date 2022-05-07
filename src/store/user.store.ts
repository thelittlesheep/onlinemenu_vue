// 必要
import { defineStore, acceptHMRUpdate, storeToRefs } from "pinia";
import { userDTO, userBasicDTO } from "@/interface/userDTO";
import axios, { AxiosError, AxiosResponse } from "axios";
import axiosRetry from "axios-retry";
import { IuserStoreState } from "@/interface/userStore.interface";
import { request, IRequestData } from "@/api/request";
import { mainStore } from "./main.store";

axiosRetry(axios, { retries: 3 });

export const userStore = defineStore("userStore", {
  state: () => ({
    userInfo: {} as userDTO,
    user: {} as userDTO
  }),
  getters: {},
  actions: {
    async register(payload: userBasicDTO): Promise<AxiosResponse<any>> {
      return await axios
        .post("/backend/user", payload)
        .then((res) => {
          return res;
        })
        .catch((e: AxiosError) => {
          throw e;
        });
    },
    async login(payload: userBasicDTO): Promise<any> {
      return await axios.post("/backend/login", payload).catch((e) => {
        throw e.response.data;
      });
    },
    async getuserInfoAndOrders() {
      return request
        .get<IRequestData>({
          url: "/user/userInfoAndOrders",
          showLoading: false,
          interceptors: {
            requestSuccessInterceptor(config) {
              console.log("getuserInfoAndOrders請求的攔截器");
              return config;
            }
          }
        })
        .then((res) => {
          return res;
        });
    },
    async getUserInfo() {
      return request
        .get<IRequestData>({
          url: "/user",
          showLoading: false,
          interceptors: {
            requestSuccessInterceptor(config) {
              console.log("getUserInfo請求的攔截器");
              return config;
            }
          }
        })
        .then((res) => {
          return res.data as userDTO;
        });

      // 讀取cookie並轉為Object
      // const cookieObject = document.cookie
      //   .split("; ")
      //   .map((item) => {
      //     type cookie = {
      //       [key: string]: string;
      //     };
      //     const element: cookie = {};
      //     const i = item.split("=");
      //     element[i[0]] = i[1];
      //     return element;
      //   })
      //   .reduce((acc, prev) => {
      //     return { ...acc, ...prev };
      //   });
      // return axios
      //   .get("/backend/user", {
      //     withCredentials: true
      //     // 使用JWT Auth時，需將JWT token放入header
      //     // headers: {
      //     //   Authorization: `Bearer ${cookieObject.access_token}` // Bearer 跟 token 中間有一個空格
      //     // }
      //   })
      //   .then((res) => {
      //     if (res.status === 200) {
      //       return res.data;
      //     }
      //   });
    },
    async deleteUserSingleOrder(order_id: number) {
      return request
        .delete<IRequestData>({
          url: `/menu/order/${order_id}`,
          showLoading: false,
          interceptors: {
            requestSuccessInterceptor(config) {
              console.log("deleteUserSingleOrder請求的攔截器");
              return config;
            }
          }
        })
        .then((res) => {
          return res;
        });
    }
  }
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(userStore, import.meta.hot));
}
