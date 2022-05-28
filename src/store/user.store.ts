// 必要
import { defineStore, acceptHMRUpdate, storeToRefs } from "pinia";
import { userDTO, userBasicDTO } from "@/interface/userDTO";
import axios, { AxiosError, AxiosResponse } from "axios";
import axiosRetry from "axios-retry";
import { IuserStoreState } from "@/interface/userStore.interface";
import { request, IRequestData } from "@/api/request";
import { mainStore } from "./main.store";
import router from "@/router";
import { orderDTO } from "@/interface/orderDTO";

const url = import.meta.env.VITE_BACKEND_HOST;

axiosRetry(axios, { retries: 3 });

export const userStore = defineStore("userStore", {
  state: () => ({
    userInfo: {} as userDTO,
    user: {} as userDTO,
    onClickOrderId: NaN
  }),
  getters: {},
  actions: {
    async register(payload: userBasicDTO): Promise<AxiosResponse<any>> {
      return await axios
        .post(`${url}/users`, payload)
        .then((res) => {
          return res;
        })
        .catch((e: AxiosError) => {
          throw e;
        });
    },
    async login(payload: userBasicDTO) {
      return request.post<AxiosResponse>({
        url: "/users/login",
        data: payload,
        showLoading: false,
        interceptors: {
          requestSuccessInterceptor(config) {
            return config;
          }
        },
        withCredentials: true
      });
    },
    async logout(): Promise<void> {
      return request.post({
        url: "/logout",
        showLoading: false,
        interceptors: {
          requestSuccessInterceptor(config) {
            return config;
          }
        },
        withCredentials: true
      });
    },
    async getuserInfoAndOrders() {
      return request
        .get<IRequestData>({
          url: "/users/userInfoAndOrders",
          showLoading: false,
          interceptors: {
            requestSuccessInterceptor(config) {
              return config;
            }
          },
          withCredentials: true
        })
        .then((res) => {
          return res;
        });
    },
    async getUserInfo() {
      return request
        .get<IRequestData>({
          url: "/users",
          showLoading: false,
          interceptors: {
            requestSuccessInterceptor(config) {
              return config;
            }
          },
          withCredentials: true
        })
        .then((res) => {
          return res.data as userDTO;
        });
    },
    // async getUserSingleOrder(order_id: number) {
    //   return request
    //     .get<IRequestData>({
    //       url: `/menu/order/${order_id}`,
    //       showLoading: false,
    //       interceptors: {
    //         requestSuccessInterceptor(config) {
    //           return config;
    //         }
    //       },
    //       withCredentials: true
    //     })
    //     .then((res) => {
    //       return res;
    //     });
    // },
    async deleteUserSingleOrder(user_id: number, order_id: number) {
      return request
        .delete<IRequestData>({
          url: `/users/${user_id}/orders/${order_id}`,
          showLoading: false,
          interceptors: {
            requestSuccessInterceptor(config) {
              return config;
            }
          },
          withCredentials: true
        })
        .then((res) => {
          return res;
        })
        .catch((e) => {
          throw e;
        });
    }
  }
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(userStore, import.meta.hot));
}
